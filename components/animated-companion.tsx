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
      {/* Glow effect background */}
      <View
        style={[
          styles.glowBackground,
          {
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: size * 0.65,
            backgroundColor: colors.secondary + '15',
          },
        ]}
      />

      <Animated.View
        style={[
          styles.companion,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.secondary,
          },
          animatedStyle,
        ]}>
        {/* Shine effect */}
        <View
          style={[
            styles.shine,
            {
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: size * 0.2,
            },
          ]}
        />

        {/* Head */}
        <View
          style={[
            styles.head,
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              backgroundColor: colors.primary,
            },
          ]}>
          {/* Eyes */}
          <View style={[styles.eyes]}>
            <View
              style={[
                styles.eye,
                {
                  backgroundColor: '#FFFFFF',
                  width: size * 0.09,
                  height: size * 0.09,
                  borderRadius: size * 0.045,
                },
              ]}>
              <View
                style={[
                  styles.pupil,
                  {
                    backgroundColor: '#1B5E3F',
                    width: size * 0.05,
                    height: size * 0.05,
                    borderRadius: size * 0.025,
                  },
                ]}
              />
              <View
                style={[
                  styles.eyeShine,
                  {
                    width: size * 0.025,
                    height: size * 0.025,
                    borderRadius: size * 0.0125,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.eye,
                {
                  backgroundColor: '#FFFFFF',
                  width: size * 0.09,
                  height: size * 0.09,
                  borderRadius: size * 0.045,
                },
              ]}>
              <View
                style={[
                  styles.pupil,
                  {
                    backgroundColor: '#1B5E3F',
                    width: size * 0.05,
                    height: size * 0.05,
                    borderRadius: size * 0.025,
                  },
                ]}
              />
              <View
                style={[
                  styles.eyeShine,
                  {
                    width: size * 0.025,
                    height: size * 0.025,
                    borderRadius: size * 0.0125,
                  },
                ]}
              />
            </View>
          </View>

          {/* Mouth - Happy smile */}
          <View
            style={[
              styles.mouth,
              {
                borderBottomColor: '#1B5E3F',
                borderBottomWidth: size * 0.025,
                width: size * 0.2,
                borderRadius: size * 0.2,
              },
            ]}
          />

          {/* Blush */}
          <View
            style={[
              styles.blush,
              {
                width: size * 0.08,
                height: size * 0.08,
                borderRadius: size * 0.04,
              },
            ]}
          />
          <View
            style={[
              styles.blush,
              {
                width: size * 0.08,
                height: size * 0.08,
                borderRadius: size * 0.04,
                marginLeft: size * 0.25,
              },
            ]}
          />
        </View>

        {/* Body (lower half) */}
        <View
          style={[
            styles.body,
            {
              width: size * 0.7,
              height: size * 0.35,
              backgroundColor: colors.primary,
              borderRadius: size * 0.12,
              bottom: size * 0.02,
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
  glowBackground: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-65%',
    marginLeft: '-65%',
    zIndex: 0,
  },
  companion: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D9B6E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 5,
  },
  shine: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    zIndex: 1,
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
    gap: 10,
    position: 'absolute',
    top: '20%',
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pupil: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeShine: {
    position: 'absolute',
    top: '15%',
    right: '15%',
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  mouth: {
    position: 'absolute',
    bottom: '15%',
  },
  blush: {
    position: 'absolute',
    bottom: '25%',
    left: '-10%',
    backgroundColor: '#FF9B85',
    opacity: 0.4,
  },
  body: {
    position: 'absolute',
    shadowColor: '#2D9B6E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});
