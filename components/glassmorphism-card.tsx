import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  intensity?: 'light' | 'medium' | 'heavy';
  borderColor?: string;
}

export function GlassmorphismCard({
  children,
  containerStyle,
  intensity = 'medium',
  borderColor,
}: GlassmorphismCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const intensityMap = {
    light: {
      backgroundColor: colors.glassmorphismBg?.replace('0.7', '0.5') || 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
    },
    medium: {
      backgroundColor: colors.glassmorphismBg || 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
    },
    heavy: {
      backgroundColor: colors.glassmorphismBg?.replace('0.7', '0.85') || 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(30px)',
    },
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: borderColor || colors.border,
        },
        containerStyle,
      ]}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 20,
        }}>
        {/* Glassmorphism background layer */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: intensityMap[intensity].backgroundColor,
            },
          ]}
        />
        {/* Content */}
        <View>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
});
