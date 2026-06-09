import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../lib/axios';

export type UserProfile = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  updateProfile: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token on startup
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // If we had a /me endpoint we would verify the token here, 
          // but for now we'll just trust it exists.
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const sendOtp = async (email: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/mock-auth/mock-otp-send', { email });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/mock-auth/mock-otp-verify', { email, otp });
      if (response.data.success) {
        // Assume backend returns token and optionally the user
        const { token, user: backendUser, isNewUser } = response.data.data;
        await AsyncStorage.setItem('userToken', token);
        
        if (backendUser && backendUser.name) {
          setUser({ name: backendUser.name, email: backendUser.email });
          setIsAuthenticated(true);
        }
        
        // If it's a new user, they need to update profile, so we might not set isAuthenticated yet.
        // Return true if OTP was valid. The UI will check if we are authenticated to route,
        // or route to Profile step.
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, email: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/mock-auth/mock-profile', { name, email });
      if (response.data.success) {
        setUser({ name, email });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        sendOtp,
        verifyOtp,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
