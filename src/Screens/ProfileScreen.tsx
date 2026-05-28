import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../Style/ThemeContext';
import { useAuth } from '../Style/AuthContext';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Profile</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.muted }]}>Manage your account and settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.userIconBg}>
            <Text style={styles.userInitials}>{user?.name ? user.name.slice(0, 2).toUpperCase() : 'AT'}</Text>
          </View>
          <Text style={[styles.userName, { color: theme.colors.text }]}>{user?.name || 'Amit Tiwari'}</Text>
          <Text style={[styles.userEmail, { color: theme.colors.muted }]}>{user?.email || 'amit@vishwakriti.com'}</Text>
        </View>

        {/* Plan card */}
        <View style={[styles.planCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.planHeader}>
            <Text style={[styles.planTitle, { color: theme.colors.text }]}>ClaimSetu Premium 🌟</Text>
            <View style={[styles.planBadge, { backgroundColor: '#FFF5F0', borderColor: '#FEE5D9' }]}>
              <Text style={[styles.planBadgeText, { color: theme.colors.primary }]}>Active</Text>
            </View>
          </View>
          <Text style={[styles.planDesc, { color: theme.colors.muted }]}>
            Unlimited bank death claims forms generation + notary formats download active.
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtnContainer} activeOpacity={0.8} onPress={logout}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Logout Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

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
  profileCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  userIconBg: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFE9DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8621A',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 4,
  },
  planCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  planBadge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  planBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  planDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  logoutBtnContainer: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#E8621A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  logoutBtn: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
