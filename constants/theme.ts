/**
 * PsiCompanion - 2025 Modern Premium Design System
 * Vibrant, sophisticated color palette with glassmorphism support
 */

import { Platform } from 'react-native';

// Modern 2025 vibrant palette
const primaryGradientStart = '#00D4FF';
const primaryGradientEnd = '#0099CC';
const accentGreen = '#00C853';
const accentPurple = '#9C27B0';
const accentOrange = '#FF6B35';
const accentPink = '#FF1493';

const darkBg = '#0A0E27';
const lightBg = '#F5F8FF';

export const Colors = {
  light: {
    text: '#0A0E27',
    textSecondary: '#525E7F',
    background: lightBg,
    gradientStart: primaryGradientStart,
    gradientEnd: primaryGradientEnd,
    tint: primaryGradientStart,
    icon: accentGreen,
    tabIconDefault: '#9E9E9E',
    tabIconSelected: primaryGradientStart,
    primary: accentGreen,
    secondary: primaryGradientStart,
    accent: accentOrange,
    accentPurple: accentPurple,
    accentPink: accentPink,
    card: '#FFFFFF',
    cardGlassOpacity: 0.8,
    glassmorphismBg: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(0, 200, 83, 0.2)',
    divider: '#E8E8E8',
    success: accentGreen,
    warning: '#FF9800',
    error: '#FF1744',
    overlay: 'rgba(10, 14, 39, 0.5)',
  },
  dark: {
    text: '#F5F8FF',
    textSecondary: '#B0B9D4',
    background: darkBg,
    gradientStart: primaryGradientStart,
    gradientEnd: primaryGradientEnd,
    tint: primaryGradientStart,
    icon: accentGreen,
    tabIconDefault: '#666D7F',
    tabIconSelected: primaryGradientStart,
    primary: accentGreen,
    secondary: primaryGradientStart,
    accent: accentOrange,
    accentPurple: accentPurple,
    accentPink: accentPink,
    card: '#1A1F3A',
    cardGlassOpacity: 0.6,
    glassmorphismBg: 'rgba(26, 31, 58, 0.6)',
    border: 'rgba(0, 200, 83, 0.2)',
    divider: '#2A2F4A',
    success: accentGreen,
    warning: '#FFB74D',
    error: '#FF1744',
    overlay: 'rgba(245, 248, 255, 0.3)',
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
