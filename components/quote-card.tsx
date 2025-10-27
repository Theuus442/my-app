import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface QuoteCardProps {
  quote: string;
  onRefresh: () => void;
  containerStyle?: ViewStyle;
}

export function QuoteCard({ quote, onRefresh, containerStyle }: QuoteCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isRotating, setIsRotating] = useState(false);
  const rotation = useSharedValue(0);

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

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        containerStyle,
      ]}>
      <View style={[styles.accentLine, { backgroundColor: colors.secondary }]} />
      <View style={[styles.iconBadge, { backgroundColor: colors.secondary + '15' }]}>
        <ThemedText style={styles.quoteIcon}>💡</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Inspiração</ThemedText>
        <ThemedText style={[styles.quoteText, { color: colors.text }]}>{quote}</ThemedText>
      </View>
      <Animated.View style={rotationStyle}>
        <Pressable
          style={[
            styles.refreshButton,
            {
              backgroundColor: colors.secondary,
            },
          ]}
          onPress={handleRefresh}>
          <IconSymbol size={20} name="arrow.clockwise" color="#FFFFFF" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
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
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 8,
  },
  quoteIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  quoteText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
});
