import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { scaleFont } from '@/utils/responsive';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

function normalizeStyle(input: any): any {
  if (!input) return input;
  if (Array.isArray(input)) return input.map(normalizeStyle);
  if (typeof input === 'object') {
    const out: any = {};
    for (const key of Object.keys(input)) {
      const value = input[key];
      if ((key === 'fontSize' || key === 'lineHeight') && typeof value === 'number') {
        out[key] = scaleFont(value);
      } else if (typeof value === 'object') {
        out[key] = normalizeStyle(value);
      } else {
        out[key] = value;
      }
    }
    return out as TextStyle;
  }
  return input;
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const baseStyles = [
    { color },
    type === 'default' ? styles.default : undefined,
    type === 'title' ? styles.title : undefined,
    type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
    type === 'subtitle' ? styles.subtitle : undefined,
    type === 'link' ? styles.link : undefined,
  ];

  const normalizedStyle = normalizeStyle(style);

  return (
    <Text
      style={[...baseStyles, normalizedStyle]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
