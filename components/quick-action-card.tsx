import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        containerStyle,
      ]}
      onPress={onPress}
      android_ripple={{ color: colors.primary + '20' }}>
      <View style={styles.iconContainer}>
        <ThemedText style={styles.emoji}>{emoji}</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={[styles.title, { color: colors.text }]}>{title}</ThemedText>
        <ThemedText style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </ThemedText>
      </View>
      <View style={[styles.arrow, { backgroundColor: colors.primary + '15' }]}>
        <ThemedText style={{ fontSize: 16 }}>→</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FDFB',
  },
  emoji: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
