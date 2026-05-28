export const lightTheme = {
  colors: {
    background: '#FFFDF9', // Cream app background
    text: '#2D2416', // Dark brown text
    primary: '#E8621A', // Saffron orange brand primary
    primaryLight: '#FF8C42', // Light saffron
    primaryPale: '#FFF4EE', // Pale saffron accent/background
    dark: '#1A1208', // Deep dark
    muted: '#8A7968', // Muted subtitle text
    border: '#E8DDD0', // Card borders
    success: '#2E7D32', // Green
    error: '#C62828', // Red
    card: '#FFFFFF', // White cards
    alertBg: '#FFF8E1', // Soft alert yellow
    alertAction: '#D87A06', // Orange-brown action link
  },
  fonts: {
    display: 'DMSans-Bold',
    heading: 'DMSans-SemiBold',
    body: 'DMSans-Regular',
    bodyBold: 'DMSans-Bold',
  },
};

export const darkTheme = {
  colors: {
    background: '#1A1208', // Deep dark theme matches main header/splash spec
    text: '#FFFDF9',
    primary: '#E8621A',
    primaryLight: '#FF8C42',
    primaryPale: '#FFF4EE',
    dark: '#1A1208',
    muted: '#E8DDD0',
    border: '#2D2416',
    success: '#2E7D32',
    error: '#C62828',
    card: '#2D2416',
    alertBg: '#FFF8E1',
    alertAction: '#D87A06',
  },
  fonts: {
    display: 'DMSans-Bold',
    heading: 'DMSans-SemiBold',
    body: 'DMSans-Regular',
    bodyBold: 'DMSans-Bold',
  },
};

export type Theme = typeof lightTheme;
