import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditação',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="moon.stars.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="books.vertical.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
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
