import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
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
      <View style={[styles.iconBadge, { backgroundColor: colors.accent + '20' }]}>
        <ThemedText style={styles.quoteIcon}>✨</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={[styles.quoteText, { color: colors.text }]}>{quote}</ThemedText>
      </View>
      <Pressable
        style={[
          styles.refreshButton,
          {
            backgroundColor: colors.primary,
          },
        ]}
        onPress={onRefresh}>
        <IconSymbol size={20} name="arrow.clockwise" color="#FFFFFF" />
      </Pressable>
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quoteIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  quoteText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
