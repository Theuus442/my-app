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
      <View style={styles.content}>
        <ThemedText style={styles.quoteText}>{quote}</ThemedText>
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
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  quoteText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
