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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.7,
  },
});
