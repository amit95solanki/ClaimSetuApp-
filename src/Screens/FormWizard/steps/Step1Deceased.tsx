import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard } from '../../../store/useFormWizard';

interface Props {
  onNext: () => void;
}

const Step1Deceased = ({ onNext }: Props) => {
  const { theme } = useTheme();
  const deceasedDetails = useFormWizard((state) => state.deceasedDetails);
  const updateDeceasedDetails = useFormWizard((state) => state.updateDeceasedDetails);

  const isValid = deceasedDetails.fullName && deceasedDetails.dateOfDeath && deceasedDetails.accountNumber;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Deceased Details</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Enter details of the deceased account holder.</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Full Name (as per Bank) *</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="e.g. Ramesh Kumar"
            placeholderTextColor={theme.colors.muted}
            value={deceasedDetails.fullName || ''}
            onChangeText={(text) => updateDeceasedDetails({ fullName: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Date of Death *</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.muted}
            value={deceasedDetails.dateOfDeath || ''}
            onChangeText={(text) => updateDeceasedDetails({ dateOfDeath: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Account / FD Number *</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="e.g. 01234567890"
            placeholderTextColor={theme.colors.muted}
            keyboardType="number-pad"
            value={deceasedDetails.accountNumber || ''}
            onChangeText={(text) => updateDeceasedDetails({ accountNumber: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Aadhaar Number (Optional)</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="12-digit Aadhaar"
            placeholderTextColor={theme.colors.muted}
            keyboardType="number-pad"
            value={deceasedDetails.aadhaarNumber || ''}
            onChangeText={(text) => updateDeceasedDetails({ aadhaarNumber: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>PAN Number (Optional)</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
            placeholder="10-digit PAN"
            placeholderTextColor={theme.colors.muted}
            autoCapitalize="characters"
            value={deceasedDetails.panNumber || ''}
            onChangeText={(text) => updateDeceasedDetails({ panNumber: text })}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.nextButton, 
            { backgroundColor: isValid ? theme.colors.primary : theme.colors.border }
          ]}
          disabled={!isValid}
          onPress={onNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step1Deceased;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
