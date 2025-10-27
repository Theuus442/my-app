import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { scaleFont, moderateScale } from '@/utils/responsive';

interface ScreenHeaderProps {
  title: string;
  backButton?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  titleSize?: number;
}

/**
 * Header reutilizável para todas as telas
 * Padroniza layout e comportamento
 */
export function ScreenHeader({
  title,
  backButton = false,
  rightIcon,
  onRightIconPress,
  containerStyle,
  titleSize = 22,
}: ScreenHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.header,
        {
          paddingHorizontal: moderateScale(20),
          paddingVertical: moderateScale(16),
        },
        containerStyle,
      ]}>
      <View style={styles.leftSection}>
        {backButton && (
          <Pressable
            onPress={handleBackPress}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Voltar">
            <IconSymbol size={24} name="chevron.left" color={colors.primary} />
          </Pressable>
        )}
        {!backButton && <View style={{ width: 24 }} />}
      </View>

      <ThemedText
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: scaleFont(titleSize),
            fontWeight: '700',
            letterSpacing: -0.3,
          },
        ]}>
        {title}
      </ThemedText>

      <View style={styles.rightSection}>
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            accessible
            accessibilityRole="button"
            accessibilityLabel={rightIcon}>
            <IconSymbol size={24} name={rightIcon} color={colors.primary} />
          </Pressable>
        )}
        {!rightIcon && <View style={{ width: 24 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
