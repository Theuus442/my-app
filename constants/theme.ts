/**
 * PsiCompanion - Premium Wellness App Design System
 * Carefully crafted color palette for mental health and well-being
 */

import { Platform } from 'react-native';

// Premium wellness color palette
const primaryGreen = '#2D9B6E';
const secondaryGreen = '#5ECB99';
const lightGreen = '#A8E6C4';
const paleGreen = '#F0FAF7';
const darkGreen = '#1B5E3F';

const accentPeach = '#FF9B85';
const accentBlue = '#6DD5ED';
const accentYellow = '#FFD89B';

const tintColorLight = primaryGreen;
const tintColorDark = secondaryGreen;

export const Colors = {
  light: {
    text: '#2C3E50',
    textSecondary: '#546E7A',
    background: '#F8FDFB',
    tint: tintColorLight,
    icon: '#5ECB99',
    tabIconDefault: '#B0BEC5',
    tabIconSelected: primaryGreen,
    primary: primaryGreen,
    secondary: secondaryGreen,
    accent: accentPeach,
    accentBlue: accentBlue,
    accentYellow: accentYellow,
    card: '#FFFFFF',
    cardGradientStart: '#FFFFFF',
    cardGradientEnd: '#F5FFFE',
    border: '#D4EFE3',
    divider: '#E0E0E0',
    success: primaryGreen,
    warning: '#FF9800',
    error: '#E74C3C',
    overlay: '#000000',
  },
  dark: {
    text: '#ECF0F1',
    textSecondary: '#BDC3C7',
    background: '#0F1419',
    tint: tintColorDark,
    icon: '#5ECB99',
    tabIconDefault: '#66BB6A',
    tabIconSelected: secondaryGreen,
    primary: primaryGreen,
    secondary: secondaryGreen,
    accent: accentPeach,
    accentBlue: accentBlue,
    accentYellow: accentYellow,
    card: '#1A2027',
    cardGradientStart: '#1A2027',
    cardGradientEnd: '#0F1419',
    border: '#2C5F48',
    divider: '#37474F',
    success: secondaryGreen,
    warning: '#FFB74D',
    error: '#EF5350',
    overlay: '#FFFFFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
