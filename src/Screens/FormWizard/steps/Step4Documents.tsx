// Step 4: Documents
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard } from '../../../store/useFormWizard';
import Svg, { Path } from 'react-native-svg';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const REQUIRED_DOCS = [
  { id: 'death_cert', label: 'Death Certificate' },
  { id: 'id_proof', label: 'Aadhaar / ID Proof' },
];

const Step4Documents = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const documents = useFormWizard((state) => state.documents);
  const addDocument = useFormWizard((state) => state.addDocument);

  const handleUploadMock = (docId: string, label: string) => {
    // In real app, launch ImagePicker or DocumentPicker
    addDocument({
      id: docId,
      docLabel: label,
      docType: 'image/jpeg',
      fileUrl: 'mock_file_url.jpg',
      fileName: 'document.jpg'
    });
  };

  const isUploaded = (docId: string) => {
    return documents.some(doc => doc.id === docId);
  };

  const isValid = REQUIRED_DOCS.every(reqDoc => isUploaded(reqDoc.id));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Upload Documents</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Please upload clear photos of the original documents.</Text>

        {REQUIRED_DOCS.map((doc) => {
          const uploaded = isUploaded(doc.id);
          return (
            <View key={doc.id} style={[styles.docCard, { borderColor: theme.colors.border }]}>
              <View style={styles.docLeft}>
                <View style={[styles.iconBg, { backgroundColor: uploaded ? '#E8F5E9' : '#F5F5F5' }]}>
                  {uploaded ? (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#4CAF50"/>
                    </Svg>
                  ) : (
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <Path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#9E9E9E"/>
                    </Svg>
                  )}
                </View>
                <View>
                  <Text style={[styles.docTitle, { color: theme.colors.text }]}>{doc.label}</Text>
                  <Text style={[styles.docStatus, { color: uploaded ? '#4CAF50' : theme.colors.muted }]}>
                    {uploaded ? 'Uploaded' : 'Required'}
                  </Text>
                </View>
              </View>

              {!uploaded && (
                <TouchableOpacity 
                  style={[styles.uploadBtn, { backgroundColor: theme.colors.primary }]}
                  onPress={() => handleUploadMock(doc.id, doc.label)}
                >
                  <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

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

export default Step4Documents;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  docCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  docStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  uploadBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
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
