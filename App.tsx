import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/Style/ThemeContext';
import { AuthProvider, useAuth } from './src/Style/AuthContext';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import StartYourClaim from './src/Screens/StartYourClaim';
import MainTabNavigator from './src/Roots/MainRoots/MainTabNavigator';

import FormWizardScreen from './src/Screens/FormWizard/FormWizardScreen';
import PaymentScreen from './src/Screens/PaymentScreen';
import ClaimReadyScreen from './src/Screens/ClaimReadyScreen';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="StartYourClaim" component={StartYourClaim} />
      <Stack.Screen name="FormWizard" component={FormWizardScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ClaimReadyScreen" component={ClaimReadyScreen} />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <SafeAreaWrapper />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const SafeAreaWrapper = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {isAuthenticated ? <AuthenticatedStack /> : <LoginScreen />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

