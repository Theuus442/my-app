import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { scaleFont, moderateScale, clamp } from '@/utils/responsive';
import { clampNumber } from '@/utils/helpers';

interface WellnessBarProps {
  level: number;
  containerStyle?: ViewStyle;
  label?: string;
  sublabel?: string;
  testID?: string;
}

export function WellnessBar({
  level,
  containerStyle,
  label = 'Nível de Bem-estar',
  sublabel = 'Sua jornada de bem-estar',
  testID,
}: WellnessBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const clampedLevel = useMemo(() => clampNumber(level, 0, 100), [level]);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    barWidth.value = withTiming(clampedLevel, {
      duration: 1400,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedLevel, barWidth]);

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  const getWellnessColor = () => {
    if (clampedLevel < 40) return '#FF6B6B';
    if (clampedLevel < 70) return '#FFD93D';
    return '#6BCB77';
  };

  const wellnessColor = getWellnessColor();

  return (
    <View
      style={[styles.container, containerStyle]}
      accessible
      accessibilityRole="region"
      accessibilityLabel={`${label} ${clampedLevel} por cento`}
      testID={testID}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <ThemedText
            style={[
              styles.label,
              {
                color: wellnessColor,
                fontSize: scaleFont(12),
                fontWeight: '700',
              },
            ]}>
            {label}
          </ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
                fontSize: scaleFont(11),
                fontWeight: '500',
              },
            ]}>
            {sublabel}
          </ThemedText>
        </View>
        <View
          style={[
            styles.percentageBadge,
            {
              backgroundColor: wellnessColor + '20',
            },
          ]}>
          <ThemedText
            style={[
              styles.percentage,
              {
                color: wellnessColor,
                fontSize: scaleFont(14),
                fontWeight: '800',
              },
            ]}>
            {clampedLevel}%
          </ThemedText>
        </View>
      </View>

      <View
        style={[
          styles.barContainer,
          {
            backgroundColor: colors.border,
            height: moderateScale(14),
            borderRadius: moderateScale(7),
          },
        ]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: wellnessColor,
            },
            animatedBarStyle,
          ]}
        />
        <View
          style={[
            styles.barGlow,
            {
              backgroundColor: wellnessColor,
              width: moderateScale(48),
            },
          ]}
        />
      </View>

      <View style={[styles.levelIndicators]}>
        <View
          style={[
            styles.levelMarker,
            { left: '0%', backgroundColor: '#FF6B6B' + '40' },
          ]}>
          <ThemedText style={[styles.levelText, { fontSize: scaleFont(9) }]}>
            Baixo
          </ThemedText>
        </View>
        <View
          style={[
            styles.levelMarker,
            { left: '33%', backgroundColor: '#FFD93D' + '40' },
          ]}>
          <ThemedText style={[styles.levelText, { fontSize: scaleFont(9) }]}>
            Médio
          </ThemedText>
        </View>
        <View
          style={[
            styles.levelMarker,
            { left: '66%', backgroundColor: '#6BCB77' + '40' },
          ]}>
          <ThemedText style={[styles.levelText, { fontSize: scaleFont(9) }]}>
            Alto
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 0,
    marginVertical: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  labelContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  barContainer: {
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  barGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
    opacity: 0.25,
    borderRadius: 7,
  },
  levelIndicators: {
    position: 'relative',
    height: 20,
    justifyContent: 'flex-end',
  },
  levelMarker: {
    position: 'absolute',
    height: 16,
    width: '31%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    opacity: 0.6,
  },
  levelText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#2C3E50',
  },
});
