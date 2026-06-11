import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../Style/ThemeContext';
import { useAuth } from '../Style/AuthContext';
import { getUserClaims } from '../api/services/claimService';
import { Claim } from '../api/services/types';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();
  
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getUserClaims(); // Can pass user.id if backend supports
        setClaims(data.slice(0, 3)); // Only show top 3 on home
      } catch (error) {
        console.error('Error fetching home claims', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />

      {/* Top Header */}
      <View style={styles.header}>
        {/* Hamburger Menu Button */}
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <Path
              d="M4 6H20M4 12H20M4 18H20"
              stroke={theme.colors.text}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Notification Bell Button with badge */}
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <View style={styles.bellContainer}>
            <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 17H20L18.595 15.595A2.032 2.032 0 0118 14.158V11A6.002 6.002 0 0014 5.341V5A2 2 0 1010 0V5.341C7.67 6.165 6 8.388 6 11V14.158C6 14.776 5.753 15.368 5.313 15.808L4 17H9M15 17V18A3 3 0 119 18V17M15 17H9"
                stroke={theme.colors.text}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            {/* Saffron Notification Dot */}
            <View style={[styles.notificationDot, { backgroundColor: theme.colors.primary, borderColor: theme.colors.background }]} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greetingTitle, { color: theme.colors.text }]}>Namaste, {user?.name || 'Amit Ji'} 🙏</Text>
          <Text style={[styles.greetingSubtitle, { color: theme.colors.muted }]}>
            Hum aapka claim step-by-step complete karwayenge
          </Text>
        </View>

        {/* Start New Claim Button (Saffron Orange Gradient) */}
        <TouchableOpacity
          style={styles.claimButtonContainer}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StartYourClaim')}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <View style={styles.claimBtnContent}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={styles.plusIcon}>
                <Path
                  d="M12 6V12M12 12V18M12 12H18M12 12H6"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.claimBtnText}>Start New Claim</Text>
            </View>
            <Text style={styles.claimBtnSubtext}>Sirf 2 minute mein shuru karein</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Features Row */}
        <View style={styles.featuresRow}>
          {/* Feature 1 */}
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.badgeIconBg}>
              <Svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5C17.944 5.65 18 6.32 18 7.001C18 12.226 14.66 16.671 10 18.318C5.34 16.671 2 12.226 2 7C2 6.318 2.057 5.65 2.166 4.999ZM13.707 8.707A1 1 0 0012.293 7.293L9 10.586L7.707 9.293A1 1 0 006.293 10.707L8.293 12.707C8.684 13.098 9.316 13.098 9.707 12.707L13.707 8.707Z"
                  fill="#2E7D32"
                />
              </Svg>
            </View>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>Bank-ready documents</Text>
          </View>

          {/* Feature 2 */}
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.badgeIconBg}>
              <Svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18A8 8 0 1010 2A8 8 0 0010 18ZM11 7A1 1 0 109 7V9H7A1 1 0 107 11H9V13A1 1 0 1011 13V11H13A1 1 0 1013 9H11V7Z"
                  fill="#2E7D32"
                />
              </Svg>
            </View>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>No lawyer needed</Text>
          </View>

          {/* Feature 3 */}
          <View style={[styles.featureCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.badgeIconBg}>
              <Svg width="26" height="26" viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.267 3.455C6.721 3.455 7.156 3.279 7.485 2.966C7.994 2.482 8.749 2.222 9.5 2.222C10.251 2.222 11.006 2.482 11.515 2.966C11.844 3.279 12.279 3.455 12.733 3.455C13.593 3.455 14.385 3.96 14.772 4.733C14.965 5.12 15.281 5.436 15.668 5.628C16.44 6.015 16.945 6.807 16.945 7.667C16.945 8.121 17.121 8.556 17.434 8.885C17.918 9.394 18.178 10.149 18.178 10.9C18.178 11.651 17.918 12.406 17.434 12.915C17.121 13.244 16.945 13.679 16.945 14.133C16.945 14.993 16.44 15.785 15.668 16.172C15.281 16.365 14.965 16.681 14.772 17.068C14.385 17.84 13.593 18.345 12.733 18.345C12.279 18.345 11.844 18.521 11.515 18.834C11.006 19.318 10.251 19.578 9.5 19.578C8.749 19.578 7.994 19.318 7.485 18.834C7.156 18.521 6.721 18.345 6.267 18.345C5.407 18.345 4.615 17.84 4.228 17.068C4.035 16.681 3.719 16.365 3.332 16.172C2.56 15.785 2.055 14.993 2.055 14.133C2.055 13.679 1.879 13.244 1.566 12.915C1.082 12.406 0.822 11.651 0.822 10.9C0.822 10.149 1.082 9.394 1.566 8.885C1.879 8.556 2.055 8.121 2.055 7.667C2.055 6.807 2.56 6.015 3.332 5.628C3.719 5.436 4.035 5.12 4.228 4.733C4.615 3.96 5.407 3.455 6.267 3.455ZM13.707 8.707A1 1 0 0012.293 7.293L9 10.586L7.707 9.293A1 1 0 006.293 10.707L8.293 12.707C8.684 13.098 9.316 13.098 9.707 12.707L13.707 8.707Z"
                  fill="#2E7D32"
                />
              </Svg>
            </View>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>10x faster process</Text>
          </View>
        </View>

        {/* Nominee Warning Alert Module */}
        <View style={[styles.alertModule, { backgroundColor: theme.colors.alertBg, borderColor: '#FFF1C2' }]}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <View style={styles.alertRight}>
            <Text style={[styles.alertTitle, { color: theme.colors.text }]}>2 assets mein nominee missing hai</Text>
            <TouchableOpacity style={styles.alertBtn} activeOpacity={0.7}>
              <Text style={[styles.alertBtnText, { color: theme.colors.alertAction }]}>Abhi fix karein  →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Claims Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>YOUR CLAIMS</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Claim Cards List */}
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>Loading claims...</Text>
        ) : claims.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>No claims found. Start a new one!</Text>
        ) : (
          claims.map((claim) => (
            <View key={claim.id} style={[styles.claimCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.cardLeft}>
                <View style={[styles.bankLogoBg, { backgroundColor: claim.bank?.colorHex || '#E1EBFD' }]}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="12" r="9" fill="#1A4FB0" />
                    <Rect x="10" y="8" width="4" height="8" fill="#FFFFFF" />
                  </Svg>
                </View>
                <View>
                  <Text style={[styles.claimName, { color: theme.colors.text }]}>
                    {claim.bank?.shortCode || 'Bank'} {claim.claimType} Claim
                  </Text>
                  <Text style={[styles.claimStateText, { color: theme.colors.muted }]}>
                    {claim.status}  •  {new Date(claim.updatedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              {claim.status.toLowerCase() === 'completed' ? (
                <View style={[styles.completedBadge, { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }]}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              ) : (
                <TouchableOpacity style={[styles.actionBtn, { borderColor: '#FEE5D9' }]} activeOpacity={0.7}>
                  <Text style={[styles.actionBtnText, { color: theme.colors.primary }]}>Continue</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    padding: 6,
  },
  bellContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Safe padding below bottom navigator
  },
  greetingSection: {
    marginTop: 12,
    marginBottom: 24,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    lineHeight: 18,
  },
  claimButtonContainer: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#E8621A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    marginRight: 6,
  },
  claimBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  claimBtnSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    fontWeight: '300',
    marginTop: 4,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  featureCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  badgeIconBg: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  alertModule: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  alertRight: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  alertBtn: {
    marginTop: 4,
  },
  alertBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  viewAllText: {
    fontSize: 12,
    color: '#8A7968',
    fontWeight: '500',
  },
  claimCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankLogoBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  claimName: {
    fontSize: 14,
    fontWeight: '700',
  },
  claimStateText: {
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
  actionBtn: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  completedBadge: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completedText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
