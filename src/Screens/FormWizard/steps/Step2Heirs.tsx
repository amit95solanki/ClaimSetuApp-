// Step 2: Heirs
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard, LegalHeir } from '../../../store/useFormWizard';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2Heirs = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const legalHeirs = useFormWizard((state) => state.legalHeirs);
  const addHeir = useFormWizard((state) => state.addHeir);
  const removeHeir = useFormWizard((state) => state.removeHeir);

  const [modalVisible, setModalVisible] = useState(false);
  const [newHeir, setNewHeir] = useState<Partial<LegalHeir>>({ sharePercentage: '100' });

  const handleAdd = () => {
    if (newHeir.fullName && newHeir.relationship && newHeir.sharePercentage) {
      addHeir({
        id: Date.now().toString(),
        fullName: newHeir.fullName,
        relationship: newHeir.relationship,
        sharePercentage: newHeir.sharePercentage,
        mobile: newHeir.mobile,
      } as LegalHeir);
      setNewHeir({ sharePercentage: '100' });
      setModalVisible(false);
    }
  };

  const isValid = legalHeirs.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Legal Heirs</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Add all legal heirs who are claiming the amount.</Text>

        {legalHeirs.map((heir) => (
          <View key={heir.id} style={[styles.heirCard, { borderColor: theme.colors.border }]}>
            <View>
              <Text style={[styles.heirName, { color: theme.colors.text }]}>{heir.fullName}</Text>
              <Text style={[styles.heirRel, { color: theme.colors.muted }]}>{heir.relationship} • {heir.sharePercentage}% Share</Text>
            </View>
            <TouchableOpacity onPress={() => removeHeir(heir.id)} style={styles.deleteBtn}>
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
          <Text style={[styles.addBtnText, { color: theme.colors.primary }]}>+ Add Legal Heir</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Heir Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add Legal Heir</Text>
            
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Full Name *"
              placeholderTextColor={theme.colors.muted}
              value={newHeir.fullName || ''}
              onChangeText={(text) => setNewHeir({...newHeir, fullName: text})}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Relationship (e.g. Son, Daughter) *"
              placeholderTextColor={theme.colors.muted}
              value={newHeir.relationship || ''}
              onChangeText={(text) => setNewHeir({...newHeir, relationship: text})}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Mobile Number"
              placeholderTextColor={theme.colors.muted}
              keyboardType="number-pad"
              value={newHeir.mobile || ''}
              onChangeText={(text) => setNewHeir({...newHeir, mobile: text})}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              placeholder="Share Percentage (e.g. 100) *"
              placeholderTextColor={theme.colors.muted}
              keyboardType="number-pad"
              value={newHeir.sharePercentage || ''}
              onChangeText={(text) => setNewHeir({...newHeir, sharePercentage: text})}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={{ color: theme.colors.muted, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalAdd, { backgroundColor: theme.colors.primary }]} 
                onPress={handleAdd}
              >
                <Text style={{ color: '#FFF', fontWeight: '700' }}>Add Heir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        {/* <TouchableOpacity 
          style={[styles.navButton, { backgroundColor: theme.colors.border }]}
          onPress={onBack}
        >
          <Text style={[styles.navButtonText, { color: theme.colors.text }]}>Back</Text>
        </TouchableOpacity> */}
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

export default Step2Heirs;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  heirCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  heirName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  heirRel: { fontSize: 12 },
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
