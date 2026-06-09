import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
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

  // Date picker state
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showDodPicker, setShowDodPicker] = useState(false);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const renderInput = (
    label: string,
    field: string,
    placeholder: string,
    options?: { keyboardType?: any; autoCapitalize?: any; maxLength?: number; required?: boolean }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        {label}{options?.required ? ' *' : ''}
      </Text>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, backgroundColor: theme.colors.background }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        keyboardType={options?.keyboardType || 'default'}
        autoCapitalize={options?.autoCapitalize || 'words'}
        maxLength={options?.maxLength}
        value={(deceasedDetails as any)[field] || ''}
        onChangeText={(text) => updateDeceasedDetails({ [field]: text })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Deceased Details</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Enter details of the deceased account holder.
        </Text>

        {/* Section: Personal Info */}
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Personal Information</Text>

        {renderInput('Full Name (as per Bank)', 'fullName', 'e.g. Ramesh Kumar', { required: true })}
        {renderInput('Full Name (Hindi)', 'fullNameHindi', 'e.g. रमेश कुमार')}

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Date of Birth</Text>
              <TouchableOpacity
                style={[styles.dateBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                onPress={() => setShowDobPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dateBtnText, { color: deceasedDetails.dateOfBirth ? theme.colors.text : theme.colors.muted }]}>
                  {formatDate(deceasedDetails.dateOfBirth) || 'DD/MM/YYYY'}
                </Text>
                <Text style={{ fontSize: 16 }}>📅</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.halfInput}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Date of Death *</Text>
              <TouchableOpacity
                style={[styles.dateBtn, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                onPress={() => setShowDodPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dateBtnText, { color: deceasedDetails.dateOfDeath ? theme.colors.text : theme.colors.muted }]}>
                  {formatDate(deceasedDetails.dateOfDeath) || 'DD/MM/YYYY'}
                </Text>
                <Text style={{ fontSize: 16 }}>📅</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Date Pickers */}
        <DatePicker
          modal
          open={showDobPicker}
          date={deceasedDetails.dateOfBirth ? new Date(deceasedDetails.dateOfBirth) : new Date(1970, 0, 1)}
          mode="date"
          maximumDate={new Date()}
          title="Date of Birth"
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={(date) => {
            updateDeceasedDetails({ dateOfBirth: date.toISOString().split('T')[0] });
            setShowDobPicker(false);
          }}
          onCancel={() => setShowDobPicker(false)}
        />
        <DatePicker
          modal
          open={showDodPicker}
          date={deceasedDetails.dateOfDeath ? new Date(deceasedDetails.dateOfDeath) : new Date()}
          mode="date"
          maximumDate={new Date()}
          title="Date of Death"
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={(date) => {
            updateDeceasedDetails({ dateOfDeath: date.toISOString().split('T')[0] });
            setShowDodPicker(false);
          }}
          onCancel={() => setShowDodPicker(false)}
        />

        {/* Gender Select */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Gender</Text>
          <View style={styles.chipRow}>
            {['Male', 'Female', 'Other'].map((option) => {
              const selected = deceasedDetails.gender === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? theme.colors.primary : theme.colors.background,
                      borderColor: selected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => updateDeceasedDetails({ gender: option })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, { color: selected ? '#FFF' : theme.colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Religion Select */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Religion</Text>
          <View style={styles.chipRow}>
            {['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'].map((option) => {
              const selected = deceasedDetails.religion === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? theme.colors.primary : theme.colors.background,
                      borderColor: selected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => updateDeceasedDetails({ religion: option })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, { color: selected ? '#FFF' : theme.colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section: ID Proof */}
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>ID Proof</Text>

        {renderInput('Aadhaar Number', 'aadhaarNumber', '12-digit Aadhaar', { keyboardType: 'number-pad', maxLength: 12 })}
        {renderInput('PAN Number', 'panNumber', '10-character PAN', { autoCapitalize: 'characters', maxLength: 10 })}

        {/* Section: Bank Details */}
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Bank Account Details</Text>

        {renderInput('Account / FD Number', 'accountNumber', 'e.g. 01234567890', { keyboardType: 'number-pad', required: true })}
        {renderInput('Account Type', 'accountType', 'Savings / FD / RD / Locker')}
        {renderInput('FD Receipt Number (if FD)', 'fdReceiptNumber', 'e.g. FD001234')}

        {/* Section: Address */}
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Address</Text>

        {renderInput('Address', 'address', 'House No, Street, Colony')}

        <View style={styles.row}>
          <View style={styles.halfInput}>
            {renderInput('City', 'city', 'e.g. Lucknow')}
          </View>
          <View style={styles.halfInput}>
            {renderInput('State', 'state', 'e.g. Uttar Pradesh')}
          </View>
        </View>

        {renderInput('Pincode', 'pincode', '6-digit Pincode', { keyboardType: 'number-pad', maxLength: 6 })}
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
          <Text style={[styles.nextButtonText, { color: isValid ? '#FFF' : theme.colors.muted }]}>Next</Text>
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 14,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 16,
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
    fontSize: 15,
  },
  dateBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBtnText: {
    fontSize: 15,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
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
    fontSize: 16,
    fontWeight: '700',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
