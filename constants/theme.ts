/**
 * PsiCompanion - 2025 Premium Design System
 * Sophisticated, elegant color palette inspired by modern wellness apps
 */

import { Platform } from 'react-native';

// 2025 Premium wellness palette
const gradientPrimary = '#06B6D4';
const gradientSecondary = '#0891B2';
const accentViolet = '#8B5CF6';
const accentEmerald = '#10B981';
const accentRose = '#F43F5E';
const accentAmber = '#F59E0B';

const darkBgDark = '#030712';
const darkBgCard = '#0F172A';
const lightBgLight = '#F8FAFC';
const lightBgCard = '#FFFFFF';

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#64748B',
    background: lightBgLight,
    gradientStart: gradientPrimary,
    gradientEnd: gradientSecondary,
    tint: gradientPrimary,
    icon: accentEmerald,
    tabIconDefault: '#CBD5E1',
    tabIconSelected: gradientPrimary,
    primary: accentEmerald,
    secondary: gradientPrimary,
    accent: accentViolet,
    accentPurple: accentViolet,
    accentPink: accentRose,
    accentAmber: accentAmber,
    card: lightBgCard,
    cardGlassOpacity: 0.85,
    glassmorphismBg: 'rgba(255, 255, 255, 0.75)',
    border: 'rgba(15, 23, 42, 0.08)',
    divider: '#E2E8F0',
    success: accentEmerald,
    warning: accentAmber,
    error: accentRose,
    overlay: 'rgba(15, 23, 42, 0.4)',
    blur: 'rgba(255, 255, 255, 0.9)',
  },
  dark: {
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    background: darkBgDark,
    gradientStart: gradientPrimary,
    gradientEnd: gradientSecondary,
    tint: gradientPrimary,
    icon: accentEmerald,
    tabIconDefault: '#475569',
    tabIconSelected: gradientPrimary,
    primary: accentEmerald,
    secondary: gradientPrimary,
    accent: accentViolet,
    accentPurple: accentViolet,
    accentPink: accentRose,
    accentAmber: accentAmber,
    card: darkBgCard,
    cardGlassOpacity: 0.7,
    glassmorphismBg: 'rgba(15, 23, 42, 0.7)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: '#334155',
    success: accentEmerald,
    warning: accentAmber,
    error: accentRose,
    overlay: 'rgba(240, 244, 248, 0.2)',
    blur: 'rgba(15, 23, 42, 0.95)',
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
