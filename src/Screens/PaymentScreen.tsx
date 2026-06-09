import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../Style/ThemeContext';
import { useFormWizard } from '../store/useFormWizard';
import axiosInstance from '../lib/axios';
import Svg, { Path } from 'react-native-svg';

const PLANS = [
  { id: 'basic', title: 'Basic', price: '₹99', features: ['PDF Forms Access', 'Standard Support', 'No Review'] },
  { id: 'standard', title: 'Standard', price: '₹299', features: ['PDF Forms Access', 'Expert Review', 'Priority Support'], isPopular: true },
  { id: 'premium', title: 'Premium', price: '₹999', features: ['Everything in Standard', 'Dedicated Assistant', '100% Refund if Rejected'] }
];

const PaymentScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const state = useFormWizard();
  
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: '11111111-1111-1111-1111-111111111111', // MOCK until Auth fully wired
        bankId: state.bankId || '22222222-2222-2222-2222-222222222222',
        claimType: state.claimType,
        planType: selectedPlan,
        deceasedDetails: state.deceasedDetails,
        legalHeirs: state.legalHeirs,
        witnesses: state.witnesses,
        documents: state.documents,
      };

      const response = await axiosInstance.post('/claims/submit', payload);
      
      if (response.data.success) {
        state.resetWizard();
        navigation.navigate('ClaimReadyScreen');
      } else {
        Alert.alert('Error', 'Failed to submit claim: ' + response.data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error connecting to server. Please ensure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 19l-7-7 7-7" stroke={theme.colors.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Choose Plan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {PLANS.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            activeOpacity={0.9}
            onPress={() => setSelectedPlan(plan.id)}
            style={[
              styles.planCard,
              { 
                borderColor: selectedPlan === plan.id ? theme.colors.primary : theme.colors.border,
                backgroundColor: theme.colors.card 
              }
            ]}
          >
            {plan.isPopular && (
              <View style={[styles.popularBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={[styles.planTitle, { color: theme.colors.text }]}>{plan.title}</Text>
              <Text style={[styles.planPrice, { color: theme.colors.primary }]}>{plan.price}</Text>
            </View>
            <View style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <Path d="M20 6L9 17l-5-5" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                  <Text style={[styles.featureText, { color: theme.colors.text }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.payButton, { backgroundColor: theme.colors.primary }]}
          disabled={isSubmitting}
          onPress={handlePayment}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.payButtonText}>Pay {PLANS.find(p => p.id === selectedPlan)?.price} & Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { padding: 6, marginLeft: -6 },
  headerTitle: { fontSize: 20, fontWeight: '700', marginLeft: 12 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  planCard: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  planTitle: { fontSize: 20, fontWeight: '700' },
  planPrice: { fontSize: 24, fontWeight: '800' },
  featuresList: { gap: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureText: { fontSize: 14, fontWeight: '500' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  payButton: { paddingVertical: 18, borderRadius: 14, alignItems: 'center' },
  payButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
