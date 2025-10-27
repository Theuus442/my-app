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
      <View style={styles.header}>
        <ThemedText style={[styles.label, { color: colors.text }]}>Bem-estar</ThemedText>
        <ThemedText style={[styles.percentage, { color: colors.primary }]}>
          {clampedLevel}%
        </ThemedText>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  barBackground: {
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
  },
});
