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

interface AnimatedCompanionProps {
  size?: number;
  wellnessLevel?: number;
}

export function AnimatedCompanion({ size = 160, wellnessLevel = 75 }: AnimatedCompanionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);

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

    // Pulse animation for glow
    pulseAnim.value = withRepeat(
      withTiming(1, {
        duration: 2500,
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

    // Subtle rotation
    rotateAnim.value = withRepeat(
      withTiming(1, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, [floatAnim, pulseAnim, glowAnim, rotateAnim]);

  const floatAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(floatAnim.value, [0, 0.5, 1], [0, -24, 0], Extrapolate.CLAMP),
      },
    ],
  }));

  const scaleAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(pulseAnim.value, [0, 0.5, 1], [1, 1.12, 1], Extrapolate.CLAMP),
      },
    ],
  }));

  const glowAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnim.value, [0, 0.5, 1], [0.3, 0.9, 0.3], Extrapolate.CLAMP),
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotateAnim.value, [0, 1], [0, 360], Extrapolate.CLAMP)}deg`,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Multi-layer glow effect */}
      <Animated.View
        style={[
          styles.glowLayer1,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: size * 0.75,
            borderColor: colors.secondary,
          },
          glowAnimStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.glowLayer2,
          {
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: size * 0.65,
            borderColor: colors.primary,
          },
          glowAnimStyle,
        ]}
      />

      {/* Main companion container */}
      <Animated.View
        style={[
          styles.companionWrapper,
          floatAnimStyle,
          scaleAnimStyle,
        ]}>
        <View
          style={[
            styles.companion,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: colors.primary,
            },
          ]}>
          {/* Gradient overlay shine */}
          <View
            style={[
              styles.shine,
              {
                width: size * 0.35,
                height: size * 0.35,
                borderRadius: size * 0.175,
              },
            ]}
          />

          {/* Head - Modern geometric design */}
          <View
            style={[
              styles.head,
              {
                width: size * 0.48,
                height: size * 0.48,
                borderRadius: size * 0.24,
                backgroundColor: colors.secondary,
              },
            ]}>
            {/* Eyes - Modern style */}
            <View style={styles.eyesContainer}>
              <View
                style={[
                  styles.eye,
                  {
                    width: size * 0.1,
                    height: size * 0.1,
                    borderRadius: size * 0.05,
                  },
                ]}>
                <View
                  style={[
                    styles.pupil,
                    {
                      width: size * 0.05,
                      height: size * 0.05,
                      borderRadius: size * 0.025,
                      backgroundColor: '#0A0E27',
                    },
                  ]}>
                  <View style={styles.eyeHighlight} />
                </View>
              </View>

              <View
                style={[
                  styles.eye,
                  {
                    width: size * 0.1,
                    height: size * 0.1,
                    borderRadius: size * 0.05,
                  },
                ]}>
                <View
                  style={[
                    styles.pupil,
                    {
                      width: size * 0.05,
                      height: size * 0.05,
                      borderRadius: size * 0.025,
                      backgroundColor: '#0A0E27',
                    },
                  ]}>
                  <View style={styles.eyeHighlight} />
                </View>
              </View>
            </View>

            {/* Mouth - Happy smile with curve */}
            <View
              style={[
                styles.mouth,
                {
                  width: size * 0.18,
                  height: size * 0.08,
                  borderRadius: size * 0.09,
                  borderBottomColor: '#0A0E27',
                  borderBottomWidth: size * 0.02,
                },
              ]}
            />
          </View>

          {/* Body - Modern rounded rectangle */}
          <View
            style={[
              styles.body,
              {
                width: size * 0.65,
                height: size * 0.32,
                borderRadius: size * 0.12,
                backgroundColor: colors.gradientStart,
              },
            ]}>
            {/* Accent dots on body */}
            <View
              style={[
                styles.bodyAccent,
                {
                  width: size * 0.08,
                  height: size * 0.08,
                  borderRadius: size * 0.04,
                },
              ]}
            />
            <View
              style={[
                styles.bodyAccent,
                {
                  width: size * 0.08,
                  height: size * 0.08,
                  borderRadius: size * 0.04,
                  marginLeft: size * 0.35,
                },
              ]}
            />
          </View>

          {/* Wellness indicator ring */}
          <View
            style={[
              styles.wellnessRing,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: colors.secondary,
                borderWidth: 2,
                opacity: wellnessLevel / 100 * 0.6,
              },
            ]}
          />
        </View>
      </Animated.View>

      {/* Floating particles effect */}
      {[0, 1, 2].map((index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              width: size * 0.08,
              height: size * 0.08,
              borderRadius: size * 0.04,
              backgroundColor: colors.secondary,
              left: `${30 + index * 20}%`,
              opacity: 0.4,
            },
          ]}
        />
      ))}
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  glowLayer2: {
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
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  shine: {
    position: 'absolute',
    top: '12%',
    left: '12%',
    backgroundColor: '#FFFFFF',
    opacity: 0.35,
  },
  head: {
    position: 'absolute',
    top: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    top: '18%',
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  pupil: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeHighlight: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    top: '20%',
    right: '20%',
    opacity: 0.7,
  },
  mouth: {
    position: 'absolute',
    bottom: '12%',
  },
  body: {
    position: 'absolute',
    bottom: '8%',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bodyAccent: {
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
  },
  wellnessRing: {
    position: 'absolute',
  },
  particle: {
    position: 'absolute',
    bottom: -30,
  },
});
