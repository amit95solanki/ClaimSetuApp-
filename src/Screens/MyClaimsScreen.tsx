import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';

const MyClaimsScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Claims</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.muted }]}>Aapke active aur completed claim sets</Text>
      </View>

      <View style={[styles.searchWrapper, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
          <Path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke={theme.colors.muted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <TextInput
          placeholder="Search by Bank or Claim ID..."
          placeholderTextColor={theme.colors.muted}
          style={[styles.searchInput, { color: theme.colors.text }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Active Claim */}
        <View style={[styles.claimCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.logoBg, { backgroundColor: '#E1EBFD' }]}>
              <Circle cx="12" cy="12" r="9" fill="#1A4FB0" />
            </View>
            <View>
              <Text style={[styles.claimTitle, { color: theme.colors.text }]}>SBI Death Claim</Text>
              <Text style={[styles.claimId, { color: theme.colors.muted }]}>ID: CS-SBI-2025-001234</Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.cardFooter}>
            <Text style={[styles.claimDate, { color: theme.colors.muted }]}>Updated 2 days ago</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#FFF5F0', borderColor: '#FEE5D9' }]}>
              <Text style={[styles.statusText, { color: theme.colors.primary }]}>Draft</Text>
            </View>
          </View>
        </View>

        {/* Completed Claim */}
        <View style={[styles.claimCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.logoBg, { backgroundColor: '#FEEAEA' }]}>
              <Rect x="4" y="4" width="16" height="16" rx="2" fill="#E53935" />
            </View>
            <View>
              <Text style={[styles.claimTitle, { color: theme.colors.text }]}>HDFC FD Claim</Text>
              <Text style={[styles.claimId, { color: theme.colors.muted }]}>ID: CS-HDF-2025-000842</Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.cardFooter}>
            <Text style={[styles.claimDate, { color: theme.colors.muted }]}>Completed 1 week ago</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
              <Text style={[styles.statusText, { color: '#2E7D32' }]}>Completed</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyClaimsScreen;

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
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  claimCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  claimTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  claimId: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E8DDD0',
    marginVertical: 12,
    opacity: 0.3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  claimDate: {
    fontSize: 11,
    fontWeight: '500',
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
