import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate sending OTP to email (logs to terminal)
      console.log(`[AuthService] Dummy OTP '123456' sent to: ${email}`);
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 800)); // Smooth UX transition delay
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));
      // Validate OTP (allow 123456 as the golden mock standard, or accept anything if they type it)
      if (otp === '123456' || otp.length === 6) {
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, email: string) => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));
      setUser({ name, email });
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
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
