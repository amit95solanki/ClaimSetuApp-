import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../Style/ThemeContext';
import Svg, { Path, Circle } from 'react-native-svg';

const ClaimReadyScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" fill="#E8F5E9" />
            <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#4CAF50" />
          </Svg>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>Claim Submitted!</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          We have received your claim details. You can track the status in the 'My Claims' section.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('MainTabs', { screen: 'My Claims' })}
        >
          <Text style={styles.btnText}>View My Claims</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.btnOutlined, { borderColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={[styles.btnOutlinedText, { color: theme.colors.primary }]}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClaimReadyScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  iconContainer: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
  footer: { padding: 20, gap: 12, marginBottom: 20 },
  btn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnOutlined: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', borderWidth: 2 },
  btnOutlinedText: { fontSize: 16, fontWeight: '700' },
});
