// FormWizard Main Wrapper
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../Style/ThemeContext';
import Svg, { Path } from 'react-native-svg';
import Step1Deceased from './steps/Step1Deceased';
import Step2Heirs from './steps/Step2Heirs';
import Step3Witnesses from './steps/Step3Witnesses';
import Step4Documents from './steps/Step4Documents';
import Step5Review from './steps/Step5Review';

const { width } = Dimensions.get('window');

const TOTAL_STEPS = 5;

const FormWizardScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Proceed to payment
      navigation.navigate('PaymentScreen');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Deceased onNext={handleNext} />;
      case 2:
        return <Step2Heirs onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Witnesses onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Documents onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5Review onNext={handleNext} onBack={handleBack} />;
      default:
        return <Step1Deceased onNext={handleNext} />;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={handleBack}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke={theme.colors.text}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          Step {currentStep} of {TOTAL_STEPS}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBg, { backgroundColor: theme.colors.border }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: theme.colors.primary,
                width: `${(currentStep / TOTAL_STEPS) * 100}%` 
              }
            ]} 
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderStep()}
      </View>
    </SafeAreaView>
  );
};

export default FormWizardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 6,
    marginLeft: -6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
  },
});
