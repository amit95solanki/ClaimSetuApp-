// Step 3: Witnesses
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard, Witness } from '../../../store/useFormWizard';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const EMPTY_WITNESS: Partial<Witness> = {};

const Step3Witnesses = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const witnesses = useFormWizard((state) => state.witnesses);
  const addWitness = useFormWizard((state) => state.addWitness);
  const removeWitness = useFormWizard((state) => state.removeWitness);

  const [modalVisible, setModalVisible] = useState(false);
  const [newWitness, setNewWitness] = useState<Partial<Witness>>(EMPTY_WITNESS);

  const handleAdd = () => {
    if (newWitness.fullName) {
      addWitness({
        id: Date.now().toString(),
        witnessNumber: witnesses.length + 1,
        fullName: newWitness.fullName,
        aadhaarNumber: newWitness.aadhaarNumber,
        mobile: newWitness.mobile,
        address: newWitness.address,
        knownSinceYears: newWitness.knownSinceYears,
      } as Witness);
      setNewWitness(EMPTY_WITNESS);
      setModalVisible(false);
    }
  };

  const isValid = witnesses.length >= 2;

  const renderModalInput = (
    label: string,
    field: keyof Witness,
    placeholder: string,
    options?: { keyboardType?: any; maxLength?: number }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.colors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, backgroundColor: theme.colors.background }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        keyboardType={options?.keyboardType || 'default'}
        maxLength={options?.maxLength}
        value={String((newWitness as any)[field] || '')}
        onChangeText={(text) => {
          if (field === 'knownSinceYears') {
            setNewWitness({ ...newWitness, [field]: parseInt(text) || undefined });
          } else {
            setNewWitness({ ...newWitness, [field]: text });
          }
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Witness Details</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Add at least 2 witnesses who can verify the claim. They should personally know the deceased.
        </Text>

        {witnesses.map((w, index) => (
          <View key={w.id} style={[styles.witnessCard, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.witnessName, { color: theme.colors.text }]}>
                Witness {index + 1}: {w.fullName}
              </Text>
              {w.mobile ? (
                <Text style={[styles.witnessDetail, { color: theme.colors.muted }]}>📞 {w.mobile}</Text>
              ) : null}
              {w.aadhaarNumber ? (
                <Text style={[styles.witnessDetail, { color: theme.colors.muted }]}>Aadhaar: ****{w.aadhaarNumber.slice(-4)}</Text>
              ) : null}
              {w.knownSinceYears ? (
                <Text style={[styles.witnessDetail, { color: theme.colors.muted }]}>Known since {w.knownSinceYears} years</Text>
              ) : null}
            </View>
            <TouchableOpacity onPress={() => removeWitness(w.id)} style={styles.deleteBtn}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        ))}

        {witnesses.length < 2 && (
          <View style={[styles.warningBox, { backgroundColor: '#FFF3E0', borderColor: '#FFB74D' }]}>
            <Text style={{ color: '#E65100', fontSize: 13, fontWeight: '600' }}>
              ⚠️ Minimum 2 witnesses required. Currently: {witnesses.length}/2
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.addBtn, { borderColor: theme.colors.primary }]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.addBtnText, { color: theme.colors.primary }]}>+ Add Witness</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Witness Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add Witness</Text>

            {renderModalInput('Full Name *', 'fullName', 'e.g. Suresh Sharma')}
            {renderModalInput('Aadhaar Number', 'aadhaarNumber', '12-digit Aadhaar', { keyboardType: 'number-pad', maxLength: 12 })}
            {renderModalInput('Mobile Number', 'mobile', '10-digit number', { keyboardType: 'phone-pad', maxLength: 10 })}
            {renderModalInput('Address', 'address', 'House No, Street, Colony')}
            {renderModalInput('Known Since (Years)', 'knownSinceYears', 'e.g. 5', { keyboardType: 'number-pad' })}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => { setNewWitness(EMPTY_WITNESS); setModalVisible(false); }}>
                <Text style={{ color: theme.colors.muted, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalAdd, { backgroundColor: theme.colors.primary }]}
                onPress={handleAdd}
              >
                <Text style={{ color: '#FFF', fontWeight: '700' }}>Add Witness</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            { backgroundColor: isValid ? theme.colors.primary : theme.colors.border, flex: 1 }
          ]}
          disabled={!isValid}
          onPress={onNext}
        >
          <Text style={[styles.navButtonText, { color: isValid ? '#FFF' : theme.colors.muted }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step3Witnesses;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  witnessCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  witnessName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  witnessDetail: { fontSize: 12, marginTop: 2 },
  deleteBtn: { padding: 8 },
  warningBox: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
  },
  addBtn: {
    padding: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addBtnText: { fontSize: 14, fontWeight: '700' },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    padding: 24,
    borderRadius: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 16,
  },
  modalCancel: { padding: 12 },
  modalAdd: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
});
