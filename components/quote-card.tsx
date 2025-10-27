import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { scaleFont, moderateScale } from '@/utils/responsive';

interface QuoteCardProps {
  quote: string;
  onRefresh: () => void;
  containerStyle?: ViewStyle;
}

export function QuoteCard({ quote, onRefresh, containerStyle }: QuoteCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isRotating, setIsRotating] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const rotation = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const handleRefresh = () => {
    if (!isRotating) {
      setIsRotating(true);
      rotation.value = withSpring(360, { damping: 8, mass: 0.8 }, () => {
        rotation.value = 0;
        setIsRotating(false);
      });
      onRefresh();
    }
  };

  const handleButtonPressIn = () => {
    setIsPressed(true);
    buttonScale.value = withSpring(0.9, { damping: 12, mass: 1 });
  };

  const handleButtonPressOut = () => {
    setIsPressed(false);
    buttonScale.value = withSpring(1, { damping: 12, mass: 1 });
  };

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const buttonScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Inspiração: ${quote}`}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        containerStyle,
      ]}>
      <View style={[styles.accentLine, { backgroundColor: '#FFD93D' }]} />

      <View style={styles.contentWrapper}>
        <View
          style={[
            styles.iconBadge,
            {
              backgroundColor: '#FFD93D' + '20',
              width: moderateScale(48),
              height: moderateScale(48),
              borderRadius: moderateScale(12),
            },
          ]}>
          <ThemedText style={[styles.quoteIcon, { fontSize: scaleFont(20) }]}>
            💡
          </ThemedText>
        </View>

        <View style={styles.textContent}>
          <ThemedText
            style={[
              styles.label,
              {
                color: '#FFD93D',
                fontSize: scaleFont(11),
                fontWeight: '700',
              },
            ]}>
            Inspiração
          </ThemedText>
          <ThemedText
            style={[
              styles.quoteText,
              {
                color: colors.text,
                fontSize: scaleFont(14),
                lineHeight: scaleFont(20),
              },
            ]}>
            {quote}
          </ThemedText>
        </View>
      </View>

      <Animated.View style={rotationStyle}>
        <Animated.View style={buttonScaleStyle}>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel="Atualizar citação"
            style={[
              styles.refreshButton,
              {
                backgroundColor: '#FFD93D',
                width: moderateScale(44),
                height: moderateScale(44),
                borderRadius: moderateScale(11),
              },
            ]}
            onPress={handleRefresh}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            android_ripple={{ color: '#FFD93D' + '30' }}>
            <IconSymbol size={18} name="arrow.clockwise" color="#2C3E50" />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: moderateScale(16),
    paddingLeft: moderateScale(12),
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  quoteIcon: {
    fontSize: 20,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quoteText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    flexShrink: 0,
  },
});
