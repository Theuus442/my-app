import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface WellnessBarProps {
  level: number; // 0-100
  containerStyle?: ViewStyle;
}

export function WellnessBar({ level, containerStyle }: WellnessBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const clampedLevel = Math.max(0, Math.min(100, level));

  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={styles.label}>Bem-estar</ThemedText>
      <View
        style={[
          styles.barBackground,
          {
            backgroundColor: colors.border,
          },
        ]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${clampedLevel}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>
      <ThemedText style={styles.percentage}>{clampedLevel}%</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  barBackground: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  percentage: {
    fontSize: 12,
    textAlign: 'right',
    fontWeight: '500',
  },
});
