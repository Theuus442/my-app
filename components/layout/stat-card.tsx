import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { scaleFont, moderateScale } from '@/utils/responsive';

interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  accentColor?: string;
  containerStyle?: ViewStyle;
  shadowColor?: string;
}

/**
 * Card de estatística reutilizável
 * Reduz duplicação em telas de progresso
 */
export function StatCard({
  emoji,
  value,
  label,
  accentColor = '#6BCB77',
  containerStyle,
  shadowColor = '#000',
}: StatCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor,
          paddingVertical: moderateScale(18),
          paddingHorizontal: moderateScale(12),
        },
        containerStyle,
      ]}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: accentColor + '20',
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(16),
            marginBottom: moderateScale(10),
          },
        ]}>
        <ThemedText style={[styles.emoji, { fontSize: scaleFont(24) }]}>
          {emoji}
        </ThemedText>
      </View>

      <ThemedText
        style={[
          styles.value,
          {
            color: accentColor,
            fontSize: scaleFont(28),
            marginBottom: moderateScale(6),
          },
        ]}>
        {value}
      </ThemedText>

      <ThemedText
        style={[
          styles.label,
          {
            color: colors.textSecondary,
            fontSize: scaleFont(12),
          },
        ]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  value: {
    fontWeight: '800',
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
