import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale, clamp } from '@/utils/responsive';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const baseHeight = moderateScale(64, 0.4);
  const tabHeight = clamp(baseHeight + Math.max(0, insets.bottom) * 0.6, 56, 86);
  const labelFontSize = moderateScale(10, 0.4);
  const paddingTop = clamp(moderateScale(8, 0.5), 6, 12);
  const paddingBottom = clamp(10 + Math.max(0, insets.bottom) * 0.3, 8, 16);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: Platform.select({ ios: 1, android: 1, default: 1 }),
          height: tabHeight,
          paddingBottom,
          paddingTop,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
        },
        tabBarLabelStyle: {
          fontSize: labelFontSize,
          fontWeight: '700',
          marginTop: 6,
          letterSpacing: -0.2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditação',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="brain" color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="flame.fill" color={color} />,
        }}
      />
      {/* Hidden screens - not shown in tab bar but accessible */}
      <Tabs.Screen
        name="mood"
        options={{
          href: null,
          title: 'Humor',
        }}
      />
      <Tabs.Screen
        name="gratitude"
        options={{
          href: null,
          title: 'Gratidão',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: 'Configurações',
        }}
      />
      {/* Legacy screen - keeping for compatibility */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          title: 'Explore',
        }}
      />
    </Tabs>
  );
}
