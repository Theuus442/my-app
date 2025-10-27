import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale, scaleFont } from '@/utils/responsive';

interface QuickActionCardProps {
  emoji: string;
  title: string;
  description: string;
  accentColor?: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  testID?: string;
}

export function QuickActionCard({
  emoji,
  title,
  description,
  accentColor = '#6BCB77',
  onPress,
  containerStyle,
  testID,
}: QuickActionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    scale.value = withSpring(0.95, { damping: 12, mass: 1 });
    opacity.value = withSpring(0.8, { damping: 12, mass: 1 });
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 12, mass: 1 });
    opacity.value = withSpring(1, { damping: 12, mass: 1 });
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${description}`}
      testID={testID}>
      <Pressable
        testID={testID && `${testID}-button`}
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: isPressed ? accentColor + '40' : colors.border,
            shadowColor: isPressed ? accentColor : '#000',
          },
          containerStyle,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: accentColor + '20' }}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: accentColor + '15',
              width: moderateScale(56),
              height: moderateScale(56),
              borderRadius: moderateScale(14),
            },
          ]}>
          <ThemedText style={[styles.emoji, { fontSize: scaleFont(24) }]}>
            {emoji}
          </ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: scaleFont(15),
                fontWeight: '700',
              },
            ]}>
            {title}
          </ThemedText>
          <ThemedText
            style={[
              styles.description,
              {
                color: colors.textSecondary,
                fontSize: scaleFont(13),
              },
            ]}>
            {description}
          </ThemedText>
        </View>

        <View
          style={[
            styles.arrowContainer,
            {
              backgroundColor: accentColor + '12',
              width: moderateScale(40),
              height: moderateScale(40),
              borderRadius: moderateScale(10),
            },
          ]}>
          <ThemedText
            style={[
              styles.arrow,
              {
                color: accentColor,
                fontSize: scaleFont(16),
                fontWeight: '700',
              },
            ]}>
            →
          </ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(14),
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  emoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  description: {
    fontWeight: '500',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  arrow: {
    fontWeight: '700',
  },
});
