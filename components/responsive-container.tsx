import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useDeviceSize, containerMaxWidth } from '@/utils/responsive';

export function ResponsiveContainer({ children, style }: ViewProps & { children: React.ReactNode }) {
  const { isTablet } = useDeviceSize();
  const maxWidth = containerMaxWidth(isTablet);

  return (
    <View style={[styles.container, { maxWidth }, style as any]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
});
