import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../Style/ThemeContext';
import { useAuth } from '../Style/AuthContext';

const LoginScreen = () => {
  const { theme, isDark } = useTheme();
  const { sendOtp, verifyOtp, updateProfile, isLoading } = useAuth();

  // Onboarding Screen Steps: 'email' | 'otp' | 'profile'
  const [step, setStep] = useState<'email' | 'otp' | 'profile'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [profileName, setProfileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle email verification submission
  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      setErrorMessage('Kripya valid email address enter karein');
      return;
    }
    setErrorMessage('');
    try {
      await sendOtp(email.trim().toLowerCase());
      setStep('otp');
    } catch (err) {
      setErrorMessage('Kuch galti hui, kripya baad mein try karein');
    }
  };

  // Handle OTP verification submission
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setErrorMessage('OTP 6-digits ka hona chahiye');
      return;
    }
    setErrorMessage('');
    try {
      const isValid = await verifyOtp(email.trim().toLowerCase(), otp);
      if (isValid) {
        setStep('profile');
      } else {
        setErrorMessage('Galat OTP, sahi code enter karein ya (123456) try karein');
      }
    } catch (err) {
      setErrorMessage('Verification failed. Try again.');
    }
  };

  // Handle Profile settings verification submission
  const handleProfileSubmit = async () => {
    if (!profileName.trim()) {
      setErrorMessage('Kripya aapna naam enter karein');
      return;
    }
    setErrorMessage('');
    try {
      await updateProfile(profileName.trim(), email.trim().toLowerCase());
    } catch (err) {
      setErrorMessage('Profile update fail ho gaya.');
    }
  };

  // Render appropriate step input card
  const renderStepCard = () => {
    switch (step) {
      case 'email':
        return (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Start Your Journey 🚀</Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
              Apna email address enter karein verification ke liye. Hum ek OTP code bhejenge.
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>EMAIL ADDRESS</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: errorMessage ? theme.colors.error : theme.colors.border,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                  },
                ]}
                placeholder="example@gmail.com"
                placeholderTextColor={theme.colors.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage('');
                }}
              />
            </View>

            {errorMessage ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.gradientBtnContainer} activeOpacity={0.8} onPress={handleEmailSubmit}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.gradientBtnText}>Send Verification OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );

      case 'otp':
        return (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Enter 6-Digit OTP 🔑</Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
              Humne ek verification code <Text style={{ fontWeight: '700' }}>{email}</Text> par bheja hai. (Sahi mock OTP: <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>123456</Text>)
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>OTP CODE</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: errorMessage ? theme.colors.error : theme.colors.border,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                    textAlign: 'center',
                    fontSize: 20,
                    letterSpacing: 8,
                  },
                ]}
                placeholder="000000"
                placeholderTextColor={theme.colors.muted}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  if (errorMessage) setErrorMessage('');
                }}
              />
            </View>

            {errorMessage ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{errorMessage}</Text> : null}

            <View style={styles.resendBlock}>
              <Text style={[styles.resendLabel, { color: theme.colors.muted }]}>Code nahi mila?</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleEmailSubmit}>
                <Text style={[styles.resendBtn, { color: theme.colors.primary }]}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.gradientBtnContainer} activeOpacity={0.8} onPress={handleOtpSubmit}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.gradientBtnText}>Verify & Continue</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => setStep('email')}>
              <Text style={[styles.backBtnText, { color: theme.colors.muted }]}>← Email badlein</Text>
            </TouchableOpacity>
          </View>
        );

      case 'profile':
        return (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Apna Naam Bataein ✍️</Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>
              Dashboard aur paperworks ko customize karne ke liye apna full name enter karein.
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: errorMessage ? theme.colors.error : theme.colors.border,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                  },
                ]}
                placeholder="Enter Your Name"
                placeholderTextColor={theme.colors.muted}
                autoCorrect={false}
                value={profileName}
                onChangeText={(text) => {
                  setProfileName(text);
                  if (errorMessage) setErrorMessage('');
                }}
              />
            </View>

            {errorMessage ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.gradientBtnContainer} activeOpacity={0.8} onPress={handleProfileSubmit}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.gradientBtnText}>Complete Profile Setup</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Dynamic Header Wave / Shield matching high-fidelity styling */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.heroHeader}
        >
          {/* Circular Shield Logo */}
          <View style={styles.logoCircle}>
            <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="7" r="2.5" fill="#E8621A" />
              <Circle cx="6.5" cy="9.5" r="2" fill="#E8621A" />
              <Circle cx="17.5" cy="9.5" r="2" fill="#E8621A" />
              <Path d="M2.5 17.5c0-1.8 1.5-3.2 3.2-3.2h1.6c.9 0 1.7.4 2.2 1.1l1.5 2.1c.3.4.9.4 1.2 0l1.5-2.1c.5-.7 1.3-1.1 2.2-1.1h1.6c1.7 0 3.2 1.4 3.2 3.2v2h-17v-2z" fill="#E8621A" />
            </Svg>
          </View>
          <Text style={styles.brandTitle}>ClaimSetu</Text>
          <Text style={styles.brandTagline}>"Har Claim Ka Saathi"</Text>
        </LinearGradient>

        {/* Dynamic Step card view */}
        <View style={styles.cardContainer}>{renderStepCard()}</View>

        {/* Security badge at bottom */}
        <View style={styles.secureBlock}>
          <Svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}>
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.944A11.954 11.954 0 0117.834 5C17.944 5.65 18 6.32 18 7.001c0 5.225-3.34 9.67-8 11.317c-4.66-1.647-8-6.092-8-11.317c0-.682.057-1.35.166-2.001A11.954 11.954 0 0110 1.944zm3.707 6.764a1 1 0 00-1.414-1.414L9 10.586L7.707 9.293a1 1 0 00-1.414 1.414l2 2c.39.39 1.024.39 1.414 0l4-4z"
              fill={theme.colors.success}
            />
          </Svg>
          <Text style={[styles.secureText, { color: theme.colors.success }]}>Aapka data 100% secure aur encrypted hai</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  heroHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    elevation: 6,
    shadowColor: '#E8621A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  brandTagline: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.9,
    fontWeight: '500',
    marginTop: 2,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: -20, // Overlays card slightly on the header gradient
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  gradientBtnContainer: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#E8621A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  gradientBtn: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resendBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  resendLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  resendBtn: {
    fontSize: 13,
    fontWeight: '700',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  secureBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    paddingHorizontal: 20,
  },
  secureText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
