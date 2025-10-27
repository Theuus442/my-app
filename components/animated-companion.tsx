import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale } from '@/utils/responsive';

interface AnimatedCompanionProps {
  size?: number;
  wellnessLevel?: number;
}

export function AnimatedCompanion({ size = 160, wellnessLevel = 75 }: AnimatedCompanionProps) {
  const scaledSize = moderateScale(size);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const bounceAnim = useSharedValue(0);
  const eyeAnim = useSharedValue(0);

  useEffect(() => {
    // Floating animation - smooth vertical movement
    floatAnim.value = withRepeat(
      withTiming(1, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Pulse animation for body
    pulseAnim.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Glow intensity
    glowAnim.value = withRepeat(
      withTiming(1, {
        duration: 3500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Bounce effect
    bounceAnim.value = withRepeat(
      withTiming(1, {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Eye blink and expression
    eyeAnim.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [floatAnim, pulseAnim, glowAnim, bounceAnim, eyeAnim]);

  const floatAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(floatAnim.value, [0, 0.5, 1], [0, -28, 0], Extrapolate.CLAMP),
      },
    ],
  }));

  const scaleAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(pulseAnim.value, [0, 0.5, 1], [1, 1.08, 1], Extrapolate.CLAMP),
      },
    ],
  }));

  const glowAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnim.value, [0, 0.5, 1], [0.4, 0.95, 0.4], Extrapolate.CLAMP),
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleY: interpolate(bounceAnim.value, [0, 0.25, 0.5, 1], [1, 0.98, 1.02, 1], Extrapolate.CLAMP),
      },
    ],
  }));

  const eyeScaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleY: interpolate(eyeAnim.value, [0, 0.15, 0.3, 1], [1, 0.3, 1, 1], Extrapolate.CLAMP),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Multi-layer premium glow effect */}
      <Animated.View
        style={[
          styles.glowLayer1,
          {
            width: scaledSize * 1.8,
            height: scaledSize * 1.8,
            borderRadius: scaledSize * 0.9,
            borderColor: colors.secondary,
          },
          glowAnimStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.glowLayer2,
          {
            width: scaledSize * 1.5,
            height: scaledSize * 1.5,
            borderRadius: scaledSize * 0.75,
            borderColor: colors.primary,
          },
          glowAnimStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.glowLayer3,
          {
            width: scaledSize * 1.25,
            height: scaledSize * 1.25,
            borderRadius: scaledSize * 0.625,
            borderColor: colors.accent,
          },
          glowAnimStyle,
        ]}
      />

      {/* Main companion container with animations */}
      <Animated.View
        style={[styles.companionWrapper, floatAnimStyle]}>
        <Animated.View style={[bounceStyle]}>
          <View
            style={[
              styles.companion,
              {
                width: scaledSize,
                height: size,
              },
            ]}>
            {/* Main body background with gradient effect */}
            <View
              style={[
                styles.bodyBase,
                {
                  width: scaledSize * 0.9,
                  height: scaledSize * 0.6,
                  borderRadius: scaledSize * 0.25,
                  bottom: scaledSize * 0.05,
                  backgroundColor: colors.primary,
                },
              ]}>
              <Animated.View
                style={[
                  styles.bodyShine,
                  {
                    width: scaledSize * 0.3,
                    height: scaledSize * 0.25,
                  },
                  scaleAnimStyle,
                ]}
              />
            </View>

            {/* Head - Refined and expressive */}
            <View
              style={[
                styles.head,
                {
                  width: scaledSize * 0.55,
                  height: scaledSize * 0.6,
                  borderRadius: scaledSize * 0.3,
                  backgroundColor: colors.secondary,
                },
              ]}>
              {/* Head shine/highlight */}
              <View
                style={[
                  styles.headShine,
                  {
                    width: scaledSize * 0.2,
                    height: scaledSize * 0.2,
                    borderRadius: scaledSize * 0.1,
                  },
                ]}
              />

              {/* Eyes container with animation */}
              <Animated.View style={[styles.eyesContainer, eyeScaleStyle]}>
                {/* Left eye */}
                <View
                  style={[
                    styles.eyeWrapper,
                    {
                      width: scaledSize * 0.12,
                      height: scaledSize * 0.14,
                    },
                  ]}>
                  <View style={[styles.eye, { backgroundColor: '#FFFFFF' }]}>
                    <View
                      style={[
                        styles.pupil,
                        {
                          width: scaledSize * 0.055,
                          height: scaledSize * 0.07,
                          backgroundColor: colors.secondary,
                        },
                      ]}>
                      <View
                        style={[
                          styles.eyeLight,
                          {
                            width: scaledSize * 0.02,
                            height: scaledSize * 0.025,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>

                {/* Right eye */}
                <View
                  style={[
                    styles.eyeWrapper,
                    {
                      width: scaledSize * 0.12,
                      height: scaledSize * 0.14,
                    },
                  ]}>
                  <View style={[styles.eye, { backgroundColor: '#FFFFFF' }]}>
                    <View
                      style={[
                        styles.pupil,
                        {
                          width: scaledSize * 0.055,
                          height: scaledSize * 0.07,
                          backgroundColor: colors.secondary,
                        },
                      ]}>
                      <View
                        style={[
                          styles.eyeLight,
                          {
                            width: scaledSize * 0.02,
                            height: scaledSize * 0.025,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </Animated.View>

              {/* Nose - Subtle */}
              <View
                style={[
                  styles.nose,
                  {
                    width: scaledSize * 0.05,
                    height: scaledSize * 0.08,
                    borderRadius: scaledSize * 0.025,
                  },
                ]}
              />

              {/* Mouth - Beautiful smile */}
              <View
                style={[
                  styles.mouthContainer,
                  {
                    width: scaledSize * 0.22,
                  },
                ]}>
                <View
                  style={[
                    styles.mouth,
                    {
                      borderRadius: scaledSize * 0.08,
                      borderBottomWidth: scaledSize * 0.025,
                    },
                  ]}
                />
              </View>
            </View>

            {/* Cheeks - adds charm and life */}
            <View
              style={[
                styles.cheek,
                {
                  width: scaledSize * 0.1,
                  height: scaledSize * 0.08,
                  borderRadius: scaledSize * 0.05,
                  left: scaledSize * 0.08,
                },
              ]}
            />
            <View
              style={[
                styles.cheek,
                {
                  width: scaledSize * 0.1,
                  height: scaledSize * 0.08,
                  borderRadius: scaledSize * 0.05,
                  right: scaledSize * 0.08,
                },
              ]}
            />

            {/* Wellness aura ring */}
            <Animated.View
              style={[
                styles.wellnessRing,
                {
                  width: scaledSize * 1.15,
                  height: scaledSize * 1.15,
                  borderRadius: scaledSize * 0.575,
                  borderColor: colors.secondary,
                  borderWidth: 2,
                  opacity: wellnessLevel / 100 * 0.5,
                },
                scaleAnimStyle,
              ]}
            />
          </View>
        </Animated.View>
      </Animated.View>

      {/* Floating sparkle particles - subtle shine effect */}
      {[0, 1, 2].map((index) => {
        const sparkleOffset = 30 + index * 20;
        return (
          <Animated.View
            key={index}
            style={[
              styles.sparkle,
              {
                width: scaledSize * 0.05,
                height: scaledSize * 0.05,
                borderRadius: scaledSize * 0.025,
                left: `${sparkleOffset}%`,
                bottom: -20,
                opacity: 0.6,
              },
              glowAnimStyle,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  glowLayer1: {
    position: 'absolute',
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  glowLayer2: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  glowLayer3: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  companionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  companion: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 20,
  },
  bodyBase: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyShine: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    backgroundColor: '#FFFFFF',
    opacity: 0.25,
    borderRadius: 9999,
  },
  head: {
    position: 'absolute',
    top: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  headShine: {
    position: 'absolute',
    top: '10%',
    left: '15%',
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 18,
    position: 'absolute',
    top: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pupil: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  eyeLight: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    top: '15%',
    right: '15%',
    opacity: 0.8,
  },
  nose: {
    position: 'absolute',
    top: '50%',
    backgroundColor: '#FFD6E8',
    opacity: 0.6,
  },
  mouthContainer: {
    position: 'absolute',
    bottom: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mouth: {
    width: '100%',
    height: '50%',
    borderBottomColor: '#FF6B9D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cheek: {
    position: 'absolute',
    top: '42%',
    backgroundColor: '#FFB6D9',
    opacity: 0.4,
  },
  wellnessRing: {
    position: 'absolute',
  },
  sparkle: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 9999,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 3,
  },
});
