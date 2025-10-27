import React, { useState } from 'react';
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
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export function QuickActionCard({
  emoji,
  title,
  description,
  onPress,
  containerStyle,
}: QuickActionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.96, { damping: 10, mass: 1 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 10, mass: 1 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle} accessible accessibilityRole="button" accessibilityLabel={`${title}: ${description}`}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: isPressed ? colors.primary : '#000',
            padding: moderateScale(12),
          },
          containerStyle,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: colors.primary + '1A' }}>
        <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '12', width: moderateScale(56), height: moderateScale(56), borderRadius: moderateScale(14) }]}>
          <ThemedText style={[styles.emoji, { fontSize: scaleFont(26) }]}>{emoji}</ThemedText>
        </View>
        <View style={styles.content}>
          <ThemedText style={[styles.title, { color: colors.text, fontSize: scaleFont(15) }]}>{title}</ThemedText>
          <ThemedText style={[styles.description, { color: colors.textSecondary, fontSize: scaleFont(12) }]}>
            {description}
          </ThemedText>
        </View>
        <View style={[styles.arrow, { backgroundColor: colors.primary + '1A', width: moderateScale(36), height: moderateScale(36), borderRadius: moderateScale(10) }]}>
          <ThemedText style={[styles.arrowIcon, { color: colors.primary, fontSize: scaleFont(16) }]}>→</ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  description: {
    lineHeight: 16,
    fontWeight: '500',
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontWeight: '600',
  },
});
