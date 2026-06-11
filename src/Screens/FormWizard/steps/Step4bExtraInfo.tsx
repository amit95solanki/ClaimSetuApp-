import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard } from '../../../store/useFormWizard';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4bExtraInfo = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const customFieldsSchema = useFormWizard((state) => state.customFieldsSchema);
  const customFieldsData = useFormWizard((state) => state.customFieldsData);
  const updateCustomField = useFormWizard((state) => state.updateCustomField);

  // If there are no custom fields, just skip or show a generic message
  if (!customFieldsSchema || customFieldsSchema.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>No Extra Information Required</Text>
          <Text style={[styles.subtitle, { color: theme.colors.muted, marginTop: 10 }]}>
            This bank does not require any additional custom fields. You can proceed to the next step.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.btnOutline, { borderColor: theme.colors.border }]} onPress={onBack}>
            <Text style={[styles.btnOutlineText, { color: theme.colors.text }]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: theme.colors.primary }]} onPress={onNext}>
            <Text style={styles.btnPrimaryText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Basic validation: ensure all fields have some value
  const isValid = customFieldsSchema.every((field: any) => {
    const val = customFieldsData[field.key];
    return val !== undefined && val !== null && val.toString().trim() !== '';
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Bank Specific Information</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Please fill in these additional details required by the selected bank.
        </Text>

        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          {customFieldsSchema.map((field: any) => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>{field.label}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                placeholderTextColor={theme.colors.muted}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                value={customFieldsData[field.key] || ''}
                onChangeText={(text) => updateCustomField(field.key, text)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btnOutline, { borderColor: theme.colors.border }]} onPress={onBack}>
          <Text style={[styles.btnOutlineText, { color: theme.colors.text }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnPrimary,
            { backgroundColor: isValid ? theme.colors.primary : theme.colors.border },
          ]}
          disabled={!isValid}
          onPress={onNext}
        >
          <Text style={styles.btnPrimaryText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step4bExtraInfo;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  card: { borderWidth: 1, borderRadius: 16, padding: 20, marginBottom: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 50, fontSize: 15 },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  btnOutline: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlineText: { fontSize: 16, fontWeight: '600' },
  btnPrimary: {
    flex: 2,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
