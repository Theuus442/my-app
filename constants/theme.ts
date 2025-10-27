/**
 * PsiCompanion - Wellness App Color Palette
 * Colors are defined in light and dark modes for mental health/wellness theme
 */

import { Platform } from 'react-native';

// Primary wellness colors
const primaryGreen = '#4CAF50';
const secondaryGreen = '#81C784';
const lightBackground = '#E8F5E9';
const darkGreen = '#2E7D32';

const tintColorLight = primaryGreen;
const tintColorDark = secondaryGreen;

export const Colors = {
  light: {
    text: '#1B5E20',
    background: lightBackground,
    tint: tintColorLight,
    icon: '#558B2F',
    tabIconDefault: '#9CCC65',
    tabIconSelected: primaryGreen,
    primary: primaryGreen,
    secondary: secondaryGreen,
    accent: '#FBC02D',
    card: '#FFFFFF',
    border: '#C8E6C9',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },
  dark: {
    text: '#C8E6C9',
    background: '#1B5E20',
    tint: tintColorDark,
    icon: '#81C784',
    tabIconDefault: '#66BB6A',
    tabIconSelected: secondaryGreen,
    primary: primaryGreen,
    secondary: secondaryGreen,
    accent: '#FBC02D',
    card: '#2E7D32',
    border: '#558B2F',
    success: '#81C784',
    warning: '#FFB74D',
    error: '#EF5350',
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
