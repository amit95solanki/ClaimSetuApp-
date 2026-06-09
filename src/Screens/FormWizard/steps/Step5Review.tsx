// Step 5: Review all data before submission
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard } from '../../../store/useFormWizard';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step5Review = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const { deceasedDetails, legalHeirs, witnesses, documents } = useFormWizard();

  const renderRow = (label: string, value?: string | null) => {
    if (!value) return null;
    return (
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: theme.colors.muted }]}>{label}</Text>
        <Text style={[styles.rowValue, { color: theme.colors.text }]}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Review & Submit</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Please verify all details before proceeding to payment.
        </Text>

        {/* Deceased Details */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <View style={styles.sectionHeader}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deceased Details</Text>
          </View>
          {renderRow('Full Name', deceasedDetails.fullName)}
          {renderRow('Name (Hindi)', deceasedDetails.fullNameHindi)}
          {renderRow('Date of Birth', deceasedDetails.dateOfBirth)}
          {renderRow('Date of Death', deceasedDetails.dateOfDeath)}
          {renderRow('Gender', deceasedDetails.gender)}
          {renderRow('Aadhaar', deceasedDetails.aadhaarNumber ? `****${deceasedDetails.aadhaarNumber.slice(-4)}` : undefined)}
          {renderRow('PAN', deceasedDetails.panNumber)}
          {renderRow('Account No.', deceasedDetails.accountNumber)}
          {renderRow('Account Type', deceasedDetails.accountType)}
          {renderRow('FD Receipt', deceasedDetails.fdReceiptNumber)}
          {renderRow('Address', deceasedDetails.address)}
          {renderRow('City', deceasedDetails.city)}
          {renderRow('State', deceasedDetails.state)}
          {renderRow('Pincode', deceasedDetails.pincode)}
        </View>

        {/* Legal Heirs */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <View style={styles.sectionHeader}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Legal Heirs ({legalHeirs.length})</Text>
          </View>
          {legalHeirs.map((heir, i) => (
            <View key={heir.id} style={[styles.subCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.subCardTitle, { color: theme.colors.text }]}>
                {i + 1}. {heir.fullName} ({heir.relationship})
              </Text>
              {renderRow('Share', `${heir.sharePercentage}%`)}
              {renderRow('Mobile', heir.mobile)}
              {renderRow('Aadhaar', heir.aadhaarNumber ? `****${heir.aadhaarNumber.slice(-4)}` : undefined)}
              {renderRow('PAN', heir.panNumber)}
              {renderRow('Bank A/C', heir.bankAccountNumber ? `****${heir.bankAccountNumber.slice(-4)}` : undefined)}
              {renderRow('IFSC', heir.bankIfsc)}
              {renderRow('Bank', heir.bankName)}
            </View>
          ))}
        </View>

        {/* Witnesses */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <View style={styles.sectionHeader}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M12 9a3 3 0 100 6 3 3 0 000-6z" stroke={theme.colors.primary} strokeWidth="2" />
            </Svg>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Witnesses ({witnesses.length})</Text>
          </View>
          {witnesses.map((w, i) => (
            <View key={w.id} style={[styles.subCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.subCardTitle, { color: theme.colors.text }]}>
                Witness {i + 1}: {w.fullName}
              </Text>
              {renderRow('Mobile', w.mobile)}
              {renderRow('Aadhaar', w.aadhaarNumber ? `****${w.aadhaarNumber.slice(-4)}` : undefined)}
              {renderRow('Address', w.address)}
              {renderRow('Known Since', w.knownSinceYears ? `${w.knownSinceYears} years` : undefined)}
            </View>
          ))}
        </View>

        {/* Documents */}
        <View style={[styles.section, { borderColor: theme.colors.border }]}>
          <View style={styles.sectionHeader}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Documents ({documents.length})</Text>
          </View>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.docItem}>
              <Text style={{ color: theme.colors.success, fontWeight: '700', fontSize: 14 }}>✓</Text>
              <Text style={[styles.docName, { color: theme.colors.text }]}>{doc.docLabel}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: theme.colors.primary, flex: 1 }]}
          onPress={onNext}
        >
          <Text style={[styles.navButtonText, { color: '#FFF' }]}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step5Review;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  section: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rowLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
  rowValue: { fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'right' },
  subCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  subCardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  docName: { fontSize: 14, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    gap: 12,
  },
  navButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: { fontSize: 16, fontWeight: '700' },
});
