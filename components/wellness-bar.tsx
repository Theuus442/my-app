import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { scaleFont, moderateScale } from '@/utils/responsive';

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
    <View style={[styles.container, containerStyle]} accessible accessibilityRole="region" accessibilityLabel={`Nível de bem-estar ${clampedLevel} por cento`}>
      <View style={styles.header}>
        <View>
          <ThemedText style={[styles.label, { color: '#6BCB77', fontSize: scaleFont(12), fontWeight: '700' }]}>Nível de Bem-estar</ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary, fontSize: scaleFont(11) }]}>Sua jornada de bem-estar</ThemedText>
        </View>
        <View style={[styles.percentageBadge, { backgroundColor: '#6BCB77' + '20' }]}>
          <ThemedText style={[styles.percentage, { color: '#6BCB77', fontSize: scaleFont(14), fontWeight: '800' }]}>{clampedLevel}%</ThemedText>
        </View>
      </View>
      <View
        style={[
          styles.barBackground,
          {
            backgroundColor: colors.border,
            height: moderateScale(12),
            borderRadius: moderateScale(6),
          },
        ]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: '#6BCB77',
            },
            animatedBarStyle,
          ]}
        />
        <View style={[styles.barGlow, { backgroundColor: colors.secondary, width: moderateScale(40) }]} />
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
