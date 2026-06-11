import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';
import { useFormWizard } from '../store/useFormWizard';
import { getBanks, getBankForms } from '../api/services/bankService';
import { Bank, BankForm } from '../api/services/types';

const { width } = Dimensions.get('window');

const StartYourClaim = ({ navigation }: any) => {
  const { theme } = useTheme();

  // State selectors
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const [forms, setForms] = useState<BankForm[]>([]);
  const [loadingForms, setLoadingForms] = useState(false);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const data = await getBanks();
        setBanks(data);
        if (data.length > 0) setSelectedBank(data[0].id);
      } catch (error) {
        console.error('Failed to load banks', error);
      } finally {
        setLoadingBanks(false);
      }
    };
    loadBanks();
  }, []);

  useEffect(() => {
    if (!selectedBank) return;
    
    const loadForms = async () => {
      setLoadingForms(true);
      try {
        const data = await getBankForms(selectedBank);
        setForms(data);
        if (data.length > 0) setSelectedFormId(data[0].id);
        else setSelectedFormId('');
      } catch (error) {
        console.error('Failed to load forms', error);
      } finally {
        setLoadingForms(false);
      }
    };
    loadForms();
  }, [selectedBank]);

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
            {loadingBanks ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : banks.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>No banks available.</Text>
            ) : (
              banks.map((bank) => (
                <TouchableOpacity
                  key={bank.id}
                  style={[
                    styles.bankCard,
                    {
                      backgroundColor: theme.colors.card,
                      borderColor: selectedBank === bank.id ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedBank(bank.id)}
                >
                  <View style={styles.cardLeft}>
                    <View style={[styles.logoBg, { backgroundColor: bank.colorHex || '#E1EBFD' }]}>
                      <Text style={{ color: '#1A4FB0', fontWeight: 'bold', fontSize: 16 }}>
                        {bank.shortCode ? bank.shortCode.substring(0, 3) : bank.name.substring(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={[styles.bankName, { color: theme.colors.text }]}>{bank.name}</Text>
                  </View>
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M9 5l7 7-7 7"
                      stroke={selectedBank === bank.id ? theme.colors.primary : theme.colors.muted}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        {/* Claim Type Section */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CLAIM TYPE</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.muted }]}>Kis type ka claim hai?</Text>

          <View style={styles.typeGrid}>
            {loadingForms ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : forms.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>No forms available for this bank.</Text>
            ) : (
              forms.map((form) => {
                const isSelected = selectedFormId === form.id;
                // Simple generic icon selection based on formName
                let iconColor = '#E1F5FE';
                let svgPath = "M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm5 10H7v-1c0-1.7 3.3-2.5 5-2.5s5 .8 5 2.5v1z";
                let fill = "#0288D1";
                if (form.claimType.toLowerCase().includes('fd')) {
                  iconColor = '#E0F2F1'; fill = '#00796B';
                  svgPath = "M19 12h-2v3h-3v2h5v-5zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-5H9V9h3c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1zm0-4h2c.6 0 1-.4 1-1s-.4-1-1-1h-2v2z";
                } else if (form.claimType.toLowerCase().includes('insurance')) {
                  iconColor = '#EDE7F6'; fill = '#512DA8';
                  svgPath = "M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 10.9h6c-.5 3.6-2.5 6.8-6 8V12h-6V6.9l6-2.7v7.7z";
                }

                return (
                  <TouchableOpacity
                    key={form.id}
                    style={[
                      styles.typeCard,
                      {
                        backgroundColor: theme.colors.card,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedFormId(form.id)}
                  >
                    <View style={[styles.typeIconBg, { backgroundColor: iconColor }]}>
                      <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <Path d={svgPath} fill={fill} />
                      </Svg>
                    </View>
                    <Text style={[styles.typeTitle, { color: theme.colors.text }]}>{form.formName}</Text>
                    <Text style={[styles.typeDesc, { color: theme.colors.muted }]}>{form.claimType}</Text>
                  </TouchableOpacity>
                );
              })
            )}
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
            const selectedForm = forms.find(f => f.id === selectedFormId);
            if (selectedForm) {
              let schema = selectedForm.customFieldsSchema;
              if (typeof schema === 'string') {
                try {
                  schema = JSON.parse(schema);
                } catch (e) {
                  console.error('Failed to parse customFieldsSchema', e);
                  schema = [];
                }
              }
              setBankAndType(selectedBank, selectedForm.claimType, schema);
              navigation.navigate('FormWizard');
            }
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
