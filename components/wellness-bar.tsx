import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
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
  const barWidth = useSharedValue(0);

  useEffect(() => {
    barWidth.value = withTiming(clampedLevel, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedLevel, barWidth]);

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View>
          <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
            Nível de Bem-estar
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sua jornada de bem-estar
          </ThemedText>
        </View>
        <View style={[styles.percentageBadge, { backgroundColor: colors.secondary + '15' }]}>
          <ThemedText style={[styles.percentage, { color: colors.secondary }]}>
            {clampedLevel}%
          </ThemedText>
        </View>
      </View>
      <View
        style={[
          styles.barBackground,
          {
            backgroundColor: colors.border,
          },
        ]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: colors.secondary,
            },
            animatedBarStyle,
          ]}
        />
        <View style={[styles.barGlow, { backgroundColor: colors.secondary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  percentageBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  barBackground: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  barGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    opacity: 0.3,
    borderRadius: 6,
  },
});
