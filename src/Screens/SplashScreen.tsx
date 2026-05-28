import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useTheme } from '../Style/ThemeContext';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();

  // Animation values
  const rotateOuter = useRef(new Animated.Value(0)).current;
  const rotateInner = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.7)).current;
  const opacityLogo = useRef(new Animated.Value(0)).current;
  const slideBrand = useRef(new Animated.Value(24)).current;
  const opacityBrand = useRef(new Animated.Value(0)).current;
  const slideTagline = useRef(new Animated.Value(24)).current;
  const opacityTagline = useRef(new Animated.Value(0)).current;
  const opacityFooter = useRef(new Animated.Value(0)).current;

  // Particle drift values
  const [particles] = useState(() =>
    Array.from({ length: 15 }).map(() => ({
      y: new Animated.Value(height + 50),
      x: Math.random() * width,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  useEffect(() => {
    // 1. Slow Mandala clockwise loop (80 seconds)
    Animated.loop(
      Animated.timing(rotateOuter, {
        toValue: 1,
        duration: 80000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 2. Slow Mandala counter-clockwise loop (60 seconds)
    Animated.loop(
      Animated.timing(rotateInner, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 3. Central logo scale-in & opacity fade-in
    Animated.parallel([
      Animated.timing(scaleLogo, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityLogo, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 4. Slide-up & fade-in brand elements (delay 300ms)
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(slideBrand, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityBrand, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 5. Slide-up & fade-in taglines (delay 450ms)
    Animated.sequence([
      Animated.delay(450),
      Animated.parallel([
        Animated.timing(slideTagline, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityTagline, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 6. Fade-in elegant footer (delay 800ms)
    Animated.sequence([
      Animated.delay(800),
      Animated.timing(opacityFooter, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 7. Looping particle drift animations
    particles.forEach((p, index) => {
      const delay = index * 300;
      const duration = Math.random() * 6000 + 4000;
      const startDrift = () => {
        p.y.setValue(height + 20);
        Animated.loop(
          Animated.timing(p.y, {
            toValue: -50,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };
      setTimeout(startDrift, delay);
    });

    // 8. Auto-navigation transition timer (2.5 seconds)
    const transitionTimer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2500);

    return () => clearTimeout(transitionTimer);
  }, []);

  // Set up rotation interpolations
  const rotateOuterDeg = rotateOuter.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateInnerDeg = rotateInner.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      {/* Background Saffron Glow overlays */}
      <View style={[styles.ambientGlow, styles.topRightGlow]} />
      <View style={[styles.ambientGlow, styles.bottomLeftGlow]} />

      {/* Rotating Mandala Background Layer 1 */}
      <Animated.View
        style={[
          styles.mandalaWrapper,
          {
            transform: [{ rotate: rotateOuterDeg }],
          },
        ]}
      >
        <Svg width={width * 1.5} height={width * 1.5} viewBox="0 0 100 100" fill="none">
          <Circle cx="50" cy="50" r="48" stroke="#E8621A" strokeWidth="0.08" strokeDasharray="0.5 1.5" opacity="0.08" />
          <Circle cx="50" cy="50" r="38" stroke="#E8621A" strokeWidth="0.08" strokeDasharray="2 3" opacity="0.08" />
          <G opacity="0.08">
            {/* Mandala Petals in a loop */}
            {Array.from({ length: 12 }).map((_, idx) => (
              <Path
                key={idx}
                d="M50 5 C53 15 53 25 50 35 C47 25 47 15 50 5"
                transform={`rotate(${idx * 30} 50 50)`}
                fill="#E8621A"
              />
            ))}
          </G>
        </Svg>
      </Animated.View>

      {/* Rotating Mandala Background Layer 2 (Reverse Rotation) */}
      <Animated.View
        style={[
          styles.mandalaWrapper,
          {
            transform: [{ rotate: rotateInnerDeg }],
          },
        ]}
      >
        <Svg width={width * 1.2} height={width * 1.2} viewBox="0 0 100 100" fill="none">
          <Circle cx="50" cy="50" r="42" stroke="#E8621A" strokeWidth="0.04" strokeDasharray="0.2 0.8" opacity="0.06" />
          <Circle cx="50" cy="50" r="25" stroke="#E8621A" strokeWidth="0.04" strokeDasharray="4 2" opacity="0.06" />
        </Svg>
      </Animated.View>

      {/* Floating Particles */}
      {particles.map((p, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: p.x,
              transform: [{ translateY: p.y }],
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              opacity: p.opacity,
            },
          ]}
        />
      ))}

      {/* Main Brand Content Block */}
      <View style={styles.mainCanvas}>
        {/* Breathing Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: opacityLogo,
              transform: [{ scale: scaleLogo }],
            },
          ]}
        >
          {/* Inner Layered Rings */}
          <View style={styles.ringOuter} />
          <View style={styles.ringInner} />

          {/* Diversity 3 Logo representation in SVG */}
          <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            {/* Center head */}
            <Circle cx="12" cy="7" r="2.5" fill="#E8621A" />
            {/* Left head */}
            <Circle cx="6.5" cy="9.5" r="2" fill="#E8621A" />
            {/* Right head */}
            <Circle cx="17.5" cy="9.5" r="2" fill="#E8621A" />
            {/* Left body */}
            <Path d="M2.5 17.5c0-1.8 1.5-3.2 3.2-3.2h1.6c.9 0 1.7.4 2.2 1.1l1.5 2.1c.3.4.9.4 1.2 0l1.5-2.1c.5-.7 1.3-1.1 2.2-1.1h1.6c1.7 0 3.2 1.4 3.2 3.2v2h-17v-2z" fill="#E8621A" />
            {/* Central overlay hands */}
            <Path d="M8.5 16.5c1.5.8 3.5 1.2 5 0" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          </Svg>
        </Animated.View>

        {/* Brand Name Header Pill */}
        <Animated.View
          style={[
            styles.brandNameRow,
            {
              opacity: opacityBrand,
              transform: [{ translateY: slideBrand }],
            },
          ]}
        >
          {/* "Claim" Pill */}
          <View style={styles.navyPill}>
            <Text style={styles.claimText}>Claim</Text>
          </View>
          {/* "Setu" Accent */}
          <Text style={[styles.setuText, { color: theme.colors.primaryLight }]}>Setu</Text>
        </Animated.View>

        {/* English & Hindi Taglines */}
        <Animated.View
          style={[
            styles.taglineBlock,
            {
              opacity: opacityTagline,
              transform: [{ translateY: slideTagline }],
            },
          ]}
        >
          <Text style={styles.taglineEn}>Har Claim Ka Saathi</Text>
          <Text style={styles.taglineHi}>हर क्लेम का साथी</Text>
        </Animated.View>
      </View>

      {/* Elegant Indian Family Flag Footer */}
      <Animated.View style={[styles.footer, { opacity: opacityFooter }]}>
        <Text style={styles.footerLabel}>Made for Indian Families 🇮🇳</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Pure premium white base
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#FFE3CC',
    opacity: 0.12,
  },
  topRightGlow: {
    top: -50,
    right: -100,
  },
  bottomLeftGlow: {
    bottom: -50,
    left: -100,
  },
  mandalaWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#FF9933',
    opacity: 0.3,
  },
  mainCanvas: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#FF9933',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE8D6',
  },
  ringOuter: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderWidth: 1,
    borderColor: '#FFF3EB',
    borderRadius: 64,
  },
  ringInner: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    borderWidth: 1,
    borderColor: '#FFEFE3',
    borderRadius: 58,
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  navyPill: {
    backgroundColor: '#1A237E', // Navy Deep
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 24,
    elevation: 3,
    shadowColor: '#1A237E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  claimText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  setuText: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  taglineBlock: {
    alignItems: 'center',
    gap: 4,
  },
  taglineEn: {
    fontSize: 14,
    color: '#8A7968', // Muted color
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  taglineHi: {
    fontSize: 22,
    color: '#2D2416', // Dark Brown color
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.8,
    color: '#8A7968',
    textTransform: 'uppercase',
  },
});
