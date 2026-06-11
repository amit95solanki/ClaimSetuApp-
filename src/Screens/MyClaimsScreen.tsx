import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';
import { useAuth } from '../Style/AuthContext';
import { getUserClaims, generatePdf } from '../api/services/claimService';
import { getBankForms } from '../api/services/bankService';
import { Claim } from '../api/services/types';
import { Linking, Alert } from 'react-native';

const MyClaimsScreen = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingClaimId, setDownloadingClaimId] = useState<string | null>(null);

  const handleDownloadForm = async (claim: Claim) => {
    if (!claim.bankId || !claim.claimType) {
      Alert.alert('Error', 'Missing bank or claim type information');
      return;
    }
    
    setDownloadingClaimId(claim.id);
    try {
      // 1. Fetch bank forms to find the bankFormId
      const forms = await getBankForms(claim.bankId);
      const matchingForm = forms.find(f => f.claimType === claim.claimType);
      
      if (!matchingForm) {
        Alert.alert('Error', 'No mapped form template found for this claim type.');
        return;
      }
      
      // 2. Call generate API
      const result = await generatePdf(claim.id, matchingForm.id);
      
      if (result && result.url) {
        // 3. Open URL
        Linking.openURL(result.url);
      } else {
        Alert.alert('Error', 'Failed to generate PDF URL');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to generate document');
    } finally {
      setDownloadingClaimId(null);
    }
  };

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getUserClaims();
        setClaims(data);
      } catch (error) {
        console.error('Failed to fetch claims', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter(c => 
    (c.claimRefId || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.bank?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.bank?.shortCode || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
        ) : filteredClaims.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>No claims found.</Text>
        ) : (
          filteredClaims.map((claim) => (
            <View key={claim.id} style={[styles.claimCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.logoBg, { backgroundColor: claim.bank?.colorHex || '#E1EBFD' }]}>
                  <Circle cx="12" cy="12" r="9" fill="#1A4FB0" />
                </View>
                <View>
                  <Text style={[styles.claimTitle, { color: theme.colors.text }]}>
                    {claim.bank?.shortCode || 'Bank'} {claim.claimType} Claim
                  </Text>
                  <Text style={[styles.claimId, { color: theme.colors.muted }]}>ID: {claim.claimRefId}</Text>
                </View>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.cardFooter}>
                <Text style={[styles.claimDate, { color: theme.colors.muted }]}>Updated {new Date(claim.updatedAt).toLocaleDateString()}</Text>
                <View style={[
                  styles.statusBadge, 
                  claim.status.toLowerCase() === 'completed' 
                    ? { backgroundColor: '#E8F5E9', borderColor: '#C8E6C9' }
                    : { backgroundColor: '#FFF5F0', borderColor: '#FEE5D9' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    claim.status.toLowerCase() === 'completed' ? { color: '#2E7D32' } : { color: theme.colors.primary }
                  ]}>
                    {claim.status}
                  </Text>
                </View>
              </View>

              {/* Download Button */}
              <TouchableOpacity
                style={[styles.downloadBtn, { borderColor: theme.colors.primary }]}
                activeOpacity={0.7}
                onPress={() => handleDownloadForm(claim)}
                disabled={downloadingClaimId === claim.id}
              >
                {downloadingClaimId === claim.id ? (
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : (
                  <>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}>
                      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                    <Text style={[styles.downloadBtnText, { color: theme.colors.primary }]}>Download Form</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
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
    fontSize: 12,
    fontWeight: '600',
  },
  downloadBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 12,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
