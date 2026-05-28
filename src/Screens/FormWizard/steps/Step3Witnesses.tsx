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

const Step3Witnesses = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const witnesses = useFormWizard((state) => state.witnesses);
  const addWitness = useFormWizard((state) => state.addWitness);
  const removeWitness = useFormWizard((state) => state.removeWitness);

  const [modalVisible, setModalVisible] = useState(false);
  const [newWitness, setNewWitness] = useState<Partial<Witness>>({});

  const handleAdd = () => {
    if (newWitness.fullName && newWitness.mobile) {
      addWitness({
        id: Date.now().toString(),
        fullName: newWitness.fullName,
        mobile: newWitness.mobile,
        address: newWitness.address,
      } as Witness);
      setNewWitness({});
      setModalVisible(false);
    }
  };

  const isValid = witnesses.length > 0; // At least one witness

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Witness Details</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Most claims require at least two independent witnesses.</Text>

        {witnesses.map((witness, index) => (
          <View key={witness.id} style={[styles.card, { borderColor: theme.colors.border }]}>
            <View>
              <Text style={[styles.name, { color: theme.colors.text }]}>Witness {index + 1}: {witness.fullName}</Text>
              <Text style={[styles.detail, { color: theme.colors.muted }]}>{witness.mobile}</Text>
              {witness.address && <Text style={[styles.detail, { color: theme.colors.muted }]}>{witness.address}</Text>}
            </View>
            <TouchableOpacity onPress={() => removeWitness(witness.id)} style={styles.deleteBtn}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        ))}

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
            
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Full Name *"
              placeholderTextColor={theme.colors.muted}
              value={newWitness.fullName || ''}
              onChangeText={(text) => setNewWitness({...newWitness, fullName: text})}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Mobile Number *"
              placeholderTextColor={theme.colors.muted}
              keyboardType="number-pad"
              value={newWitness.mobile || ''}
              onChangeText={(text) => setNewWitness({...newWitness, mobile: text})}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Full Address"
              placeholderTextColor={theme.colors.muted}
              value={newWitness.address || ''}
              onChangeText={(text) => setNewWitness({...newWitness, address: text})}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  detail: { fontSize: 12 },
  deleteBtn: { padding: 8 },
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
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 16,
  },
  modalCancel: { padding: 12 },
  modalAdd: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
});
