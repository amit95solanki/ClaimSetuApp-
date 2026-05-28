import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';
import { useFormWizard } from '../store/useFormWizard';

const { width } = Dimensions.get('window');

const StartYourClaim = ({ navigation }: any) => {
  const { theme } = useTheme();

  // State selectors
  const [selectedBank, setSelectedBank] = useState<string>('sbi');
  const [selectedType, setSelectedType] = useState<string>('savings');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* Header with Back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke={theme.colors.text}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Start Your Claim</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.muted }]}>Kis bank ka claim process karna hai?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Select Bank Section */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SELECT BANK</Text>
          <View style={styles.bankList}>
            {/* Bank 1: SBI */}
            <TouchableOpacity
              style={[
                styles.bankCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedBank === 'sbi' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedBank('sbi')}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.logoBg, { backgroundColor: '#E1EBFD' }]}>
                  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="9" fill="#1A4FB0" />
                    <Rect x="10" y="8" width="4" height="8" fill="#FFFFFF" />
                    <Circle cx="12" cy="12" r="3" fill="#1A4FB0" />
                  </Svg>
                </View>
                <Text style={[styles.bankName, { color: theme.colors.text }]}>State Bank of India</Text>
              </View>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 5l7 7-7 7"
                  stroke={selectedBank === 'sbi' ? theme.colors.primary : theme.colors.muted}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Bank 2: HDFC */}
            <TouchableOpacity
              style={[
                styles.bankCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedBank === 'hdfc' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedBank('hdfc')}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.logoBg, { backgroundColor: '#FEEAEA' }]}>
                  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <Rect x="4" y="4" width="16" height="16" rx="2" fill="#E53935" />
                    <Rect x="7" y="7" width="10" height="10" fill="#FFFFFF" />
                    <Path d="M12 7V17M7 12H17" stroke="#E53935" strokeWidth="2.5" />
                  </Svg>
                </View>
                <Text style={[styles.bankName, { color: theme.colors.text }]}>HDFC Bank</Text>
              </View>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 5l7 7-7 7"
                  stroke={selectedBank === 'hdfc' ? theme.colors.primary : theme.colors.muted}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Bank 3: ICICI */}
            <TouchableOpacity
              style={[
                styles.bankCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedBank === 'icici' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedBank('icici')}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.logoBg, { backgroundColor: '#FFF5E6' }]}>
                  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="9" fill="#FF9933" />
                    <Path d="M9 15V9h2v6H9zm4-4c0-.6.4-1 1-1h2v2h-2v2h2v2h-3v-5z" fill="#FFFFFF" />
                  </Svg>
                </View>
                <Text style={[styles.bankName, { color: theme.colors.text }]}>ICICI Bank</Text>
              </View>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 5l7 7-7 7"
                  stroke={selectedBank === 'icici' ? theme.colors.primary : theme.colors.muted}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Bank 4: LIC */}
            <TouchableOpacity
              style={[
                styles.bankCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedBank === 'lic' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedBank('lic')}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.logoBg, { backgroundColor: '#F3E5F5' }]}>
                  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="9" fill="#7B1FA2" />
                    <Path d="M12 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" fill="#FFFFFF" />
                  </Svg>
                </View>
                <Text style={[styles.bankName, { color: theme.colors.text }]}>LIC of India</Text>
              </View>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 5l7 7-7 7"
                  stroke={selectedBank === 'lic' ? theme.colors.primary : theme.colors.muted}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* Claim Type Section */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CLAIM TYPE</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.muted }]}>Kis type ka claim hai?</Text>

          <View style={styles.typeGrid}>
            {/* Type 1: Savings Account */}
            <TouchableOpacity
              style={[
                styles.typeCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedType === 'savings' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedType('savings')}
            >
              <View style={[styles.typeIconBg, { backgroundColor: '#E1F5FE' }]}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm5 10H7v-1c0-1.7 3.3-2.5 5-2.5s5 .8 5 2.5v1z"
                    fill="#0288D1"
                  />
                </Svg>
              </View>
              <Text style={[styles.typeTitle, { color: theme.colors.text }]}>Savings Account</Text>
              <Text style={[styles.typeDesc, { color: theme.colors.muted }]}>Passbook / Account</Text>
            </TouchableOpacity>

            {/* Type 2: Fixed Deposit */}
            <TouchableOpacity
              style={[
                styles.typeCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedType === 'fd' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedType('fd')}
            >
              <View style={[styles.typeIconBg, { backgroundColor: '#E0F2F1' }]}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19 12h-2v3h-3v2h5v-5zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-5H9V9h3c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1zm0-4h2c.6 0 1-.4 1-1s-.4-1-1-1h-2v2z"
                    fill="#00796B"
                  />
                </Svg>
              </View>
              <Text style={[styles.typeTitle, { color: theme.colors.text }]}>Fixed Deposit (FD)</Text>
              <Text style={[styles.typeDesc, { color: theme.colors.muted }]}>Deposit Account</Text>
            </TouchableOpacity>

            {/* Type 3: Insurance */}
            <TouchableOpacity
              style={[
                styles.typeCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: selectedType === 'insurance' ? theme.colors.primary : theme.colors.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedType('insurance')}
            >
              <View style={[styles.typeIconBg, { backgroundColor: '#EDE7F6' }]}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 10.9h6c-.5 3.6-2.5 6.8-6 8V12h-6V6.9l6-2.7v7.7z"
                    fill="#512DA8"
                  />
                </Svg>
              </View>
              <Text style={[styles.typeTitle, { color: theme.colors.text }]}>Insurance / LIC</Text>
              <Text style={[styles.typeDesc, { color: theme.colors.muted }]}>Policy Claim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity 
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: 'center',
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4
          }}
          activeOpacity={0.8}
          onPress={() => {
            const { setBankAndType } = useFormWizard.getState();
            // TODO: In a real app we'd map 'sbi', 'hdfc' to actual DB UUIDs
            setBankAndType(selectedBank, selectedType);
            navigation.navigate('FormWizard');
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
            Continue to Forms
          </Text>
        </TouchableOpacity>
      </View>

      {/* Security message footer */}
      <View style={styles.footer}>
        <Svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            fill="#2E7D32"
          />
        </Svg>
        <Text style={[styles.secureText, { color: theme.colors.text }]}>Aapka data 100% secure hai</Text>
      </View>
    </SafeAreaView>
  );
};

export default StartYourClaim;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 6,
    alignSelf: 'flex-start',
    marginLeft: -6,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionBlock: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 14,
  },
  bankList: {
    gap: 10,
  },
  bankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 54,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankName: {
    fontSize: 14,
    fontWeight: '700',
  },
  typeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  typeCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 6,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  typeIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  typeTitle: {
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 12,
    marginBottom: 2,
    height: 24, // Ensures text fits cleanly
  },
  typeDesc: {
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  secureText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
