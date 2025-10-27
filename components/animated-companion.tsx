import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AnimatedCompanionProps {
  size?: number;
  wellnessLevel?: number;
  containerStyle?: ViewStyle;
}

export function AnimatedCompanion({
  size = 200,
  wellnessLevel = 75,
  containerStyle,
}: AnimatedCompanionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const scale = useSharedValue(1);

  useEffect(() => {
    // Breathing animation: pulse from 1 to 1.1 over 3 seconds
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.companion,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.primary,
          },
          animatedStyle,
        ]}>
        {/* Head */}
        <View
          style={[
            styles.head,
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              backgroundColor: colors.secondary,
            },
          ]}>
          {/* Eyes */}
          <View style={[styles.eyes]}>
            <View
              style={[
                styles.eye,
                {
                  backgroundColor: '#FFFFFF',
                  width: size * 0.08,
                  height: size * 0.08,
                  borderRadius: size * 0.04,
                },
              ]}>
              <View
                style={[
                  styles.pupil,
                  {
                    backgroundColor: '#333333',
                    width: size * 0.04,
                    height: size * 0.04,
                    borderRadius: size * 0.02,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.eye,
                {
                  backgroundColor: '#FFFFFF',
                  width: size * 0.08,
                  height: size * 0.08,
                  borderRadius: size * 0.04,
                },
              ]}>
              <View
                style={[
                  styles.pupil,
                  {
                    backgroundColor: '#333333',
                    width: size * 0.04,
                    height: size * 0.04,
                    borderRadius: size * 0.02,
                  },
                ]}
              />
            </View>
          </View>

          {/* Mouth - Smile */}
          <View
            style={[
              styles.mouth,
              {
                borderBottomColor: '#333333',
                borderBottomWidth: size * 0.02,
                width: size * 0.15,
                borderRadius: size * 0.15,
              },
            ]}
          />
        </View>

        {/* Body (lower half) */}
        <View
          style={[
            styles.body,
            {
              width: size * 0.6,
              height: size * 0.3,
              backgroundColor: colors.secondary,
              borderRadius: size * 0.1,
              bottom: size * 0.05,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  companion: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  head: {
    position: 'absolute',
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  eyes: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    top: '25%',
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pupil: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mouth: {
    position: 'absolute',
    bottom: '20%',
  },
  body: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
