// Step 4: Document Upload (Checklist)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../../Style/ThemeContext';
import { useFormWizard, ClaimDocument } from '../../../store/useFormWizard';
import Svg, { Path } from 'react-native-svg';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const REQUIRED_DOCUMENTS: { docType: string; docLabel: string }[] = [
  { docType: 'death_certificate', docLabel: 'Death Certificate' },
  { docType: 'aadhaar_deceased', docLabel: 'Aadhaar Card (Deceased)' },
  { docType: 'pan_deceased', docLabel: 'PAN Card (Deceased)' },
  { docType: 'bank_passbook', docLabel: 'Bank Passbook / Statement' },
  { docType: 'cancelled_cheque', docLabel: 'Cancelled Cheque (Heir)' },
];

const Step4Documents = ({ onNext, onBack }: Props) => {
  const { theme } = useTheme();
  const documents = useFormWizard((state) => state.documents);
  const addDocument = useFormWizard((state) => state.addDocument);

  const isDocUploaded = (docType: string) => {
    return documents.some((d) => d.docType === docType);
  };

  const pickDocument = async (docType: string, docLabel: string) => {
    try {
      const res = await pick({
        type: [types.pdf, types.images],
        allowMultiSelection: false,
      });
      const file = res[0];
      
      addDocument({
        id: Date.now().toString(),
        docType,
        docLabel,
        fileName: file.name || `${docType}_scan.pdf`,
        fileUrl: file.uri,
        fileSizeKb: file.size ? Math.round(file.size / 1024) : 120,
        documentStatus: 'pending',
        isRequired: true,
      });
    } catch (err) {
      if (!(isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED)) {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleUpload = (docType: string, docLabel: string) => {
    if (isDocUploaded(docType)) {
      Alert.alert(
        'Replace File',
        `Do you want to replace the uploaded ${docLabel}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Replace', style: 'destructive', onPress: () => pickDocument(docType, docLabel) }
        ]
      );
    } else {
      pickDocument(docType, docLabel);
    }
  };

  const uploadedCount = REQUIRED_DOCUMENTS.filter((d) => isDocUploaded(d.docType)).length;
  const isValid = uploadedCount === REQUIRED_DOCUMENTS.length;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Document Upload</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Upload all required documents. Tap each item to upload.
        </Text>

        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${(uploadedCount / REQUIRED_DOCUMENTS.length) * 100}%`, backgroundColor: theme.colors.primary },
            ]}
          />
        </View>
        <Text style={[styles.progressLabel, { color: theme.colors.muted }]}>
          {uploadedCount} / {REQUIRED_DOCUMENTS.length} documents uploaded
        </Text>

        {REQUIRED_DOCUMENTS.map((doc) => {
          const uploaded = isDocUploaded(doc.docType);
          return (
            <TouchableOpacity
              key={doc.docType}
              style={[
                styles.docRow,
                {
                  borderColor: uploaded ? theme.colors.success : theme.colors.border,
                  backgroundColor: uploaded ? '#E8F5E920' : theme.colors.card,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleUpload(doc.docType, doc.docLabel)}
            >
              <View style={styles.docLeft}>
                {uploaded ? (
                  <View style={[styles.checkCircle, { backgroundColor: theme.colors.success }]}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <Path d="M20 6L9 17l-5-5" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  </View>
                ) : (
                  <View style={[styles.emptyCircle, { borderColor: theme.colors.border }]} />
                )}
                <View>
                  <Text style={[styles.docLabel, { color: theme.colors.text }]}>{doc.docLabel}</Text>
                  {uploaded ? (
                    <Text style={[styles.docStatus, { color: theme.colors.success }]}>✓ Uploaded</Text>
                  ) : (
                    <Text style={[styles.docStatus, { color: theme.colors.muted }]}>Tap to upload</Text>
                  )}
                </View>
              </View>

              {uploaded ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: theme.colors.primary, fontSize: 12, fontWeight: '600', marginRight: 4 }}>Replace</Text>
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <Path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
              ) : (
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            { backgroundColor: isValid ? theme.colors.primary : theme.colors.border, flex: 1 },
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
  subtitle: { fontSize: 14, marginBottom: 20 },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  docLabel: { fontSize: 15, fontWeight: '600' },
  docStatus: { fontSize: 12, marginTop: 2 },
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
