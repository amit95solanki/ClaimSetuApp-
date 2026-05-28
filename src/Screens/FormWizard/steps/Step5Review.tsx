// Step 5: Review
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard } from '../../../store/useFormWizard';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step5Review = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const state = useFormWizard();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Review Details</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Please review the details before proceeding to payment.</Text>

        <View style={[styles.section, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Deceased Details</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.muted }]}>Name</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{state.deceasedDetails.fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.muted }]}>Account No</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{state.deceasedDetails.accountNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.muted }]}>Date of Death</Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>{state.deceasedDetails.dateOfDeath}</Text>
          </View>
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Legal Heirs ({state.legalHeirs.length})</Text>
          {state.legalHeirs.map(heir => (
            <View key={heir.id} style={styles.itemRow}>
              <Text style={[styles.itemText, { color: theme.colors.text }]}>{heir.fullName}</Text>
              <Text style={[styles.itemSub, { color: theme.colors.muted }]}>{heir.relationship} • {heir.sharePercentage}%</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Witnesses ({state.witnesses.length})</Text>
          {state.witnesses.map(w => (
            <View key={w.id} style={styles.itemRow}>
              <Text style={[styles.itemText, { color: theme.colors.text }]}>{w.fullName}</Text>
              <Text style={[styles.itemSub, { color: theme.colors.muted }]}>{w.mobile}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navButton, { backgroundColor: theme.colors.primary, flex: 1 }]}
          onPress={onNext}
        >
          <Text style={[styles.navButtonText, { color: '#FFF' }]}>Confirm & Proceed</Text>
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
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { fontSize: 14, fontWeight: '500' },
  value: { fontSize: 14, fontWeight: '600' },
  itemRow: { marginBottom: 8 },
  itemText: { fontSize: 14, fontWeight: '600' },
  itemSub: { fontSize: 12 },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: { fontSize: 16, fontWeight: '700' },
});
