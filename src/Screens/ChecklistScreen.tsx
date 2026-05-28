import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';

const ChecklistScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Checklist</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.muted }]}>Claim file submit karne ke liye jaroori paperwork</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Document Checklist Items */}
        <View style={[styles.checklistCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Required Documents 📝</Text>

          <View style={styles.checkRow}>
            <View style={[styles.checkCircle, { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
              <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓</Text>
            </View>
            <View style={styles.checkTextContent}>
              <Text style={[styles.docName, { color: theme.colors.text }]}>Death Certificate</Text>
              <Text style={[styles.docDesc, { color: theme.colors.muted }]}>Original copy scan required</Text>
            </View>
          </View>

          <View style={styles.checkRow}>
            <View style={[styles.checkCircle, { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
              <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓</Text>
            </View>
            <View style={styles.checkTextContent}>
              <Text style={[styles.docName, { color: theme.colors.text }]}>Deceased Aadhaar Card</Text>
              <Text style={[styles.docDesc, { color: theme.colors.muted }]}>Proof of identity check</Text>
            </View>
          </View>

          <View style={styles.checkRow}>
            <View style={[styles.checkCircle, { backgroundColor: '#FFF5F0', borderColor: '#FEE5D9' }]}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>•</Text>
            </View>
            <View style={styles.checkTextContent}>
              <Text style={[styles.docName, { color: theme.colors.text }]}>Passbook / Account Proof</Text>
              <Text style={[styles.docDesc, { color: theme.colors.muted }]}>First page copy with account details</Text>
            </View>
          </View>

          <View style={styles.checkRow}>
            <View style={[styles.checkCircle, { backgroundColor: '#FFF5F0', borderColor: '#FEE5D9' }]}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>•</Text>
            </View>
            <View style={styles.checkTextContent}>
              <Text style={[styles.docName, { color: theme.colors.text }]}>Claimant Aadhaar & PAN Card</Text>
              <Text style={[styles.docDesc, { color: theme.colors.muted }]}>Primary heir identity documents</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChecklistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 4,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  checklistCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  checkTextContent: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
  },
  docDesc: {
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
});
