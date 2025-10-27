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
      onPress={onPress}>
      <View style={styles.header}>
        <ThemedText style={styles.emoji}>{emoji}</ThemedText>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>
      <ThemedText style={styles.description}>{description}</ThemedText>
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
