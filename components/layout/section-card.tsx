import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale, scaleFont } from '@/utils/responsive';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  titleSize?: number;
  paddingHorizontal?: number;
  marginBottom?: number;
}

/**
 * Card de seção reutilizável
 * Padroniza layout de seções com títulos
 */
export function SectionCard({
  title,
  children,
  containerStyle,
  titleSize = 16,
  paddingHorizontal = 20,
  marginBottom = 24,
}: SectionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        {
          paddingHorizontal: moderateScale(paddingHorizontal),
          marginBottom: moderateScale(marginBottom),
        },
        containerStyle,
      ]}>
      <ThemedText
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: scaleFont(titleSize),
            marginBottom: moderateScale(12),
          },
        ]}>
        {title}
      </ThemedText>

      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
  },
});
