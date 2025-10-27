import { useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale } from '@/utils/responsive';

interface AnimatedCompanionProps {
  size?: number;
  wellnessLevel?: number;
}

export function AnimatedCompanion({ size = 160, wellnessLevel = 75 }: AnimatedCompanionProps) {
  const scaledSize = moderateScale(size);
  const colorScheme = useColorScheme();

  const getWellnessColor = () => {
    if (wellnessLevel < 40) return '#FF6B6B';
    if (wellnessLevel < 70) return '#FFD93D';
    return '#6BCB77';
  };

  const floatAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0);
  const bobbleAnim = useSharedValue(0);

  useEffect(() => {
    floatAnim.value = withRepeat(
      withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    pulseAnim.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    bobbleAnim.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [floatAnim, pulseAnim, bobbleAnim]);

  const floatAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 0.5, 1], [0, -20, 0], Extrapolate.CLAMP) },
    ],
  }));

  const scaleAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pulseAnim.value, [0, 0.5, 1], [1, 1.1, 1], Extrapolate.CLAMP) },
    ],
  }));

  const bobbleStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(bobbleAnim.value, [0, 0.5, 1], [0, 3, 0], Extrapolate.CLAMP)}deg` },
    ],
  }));

  const wellnessColor = getWellnessColor();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.aura,
          {
            width: scaledSize * 1.4,
            height: scaledSize * 1.4,
            borderRadius: scaledSize * 0.7,
            backgroundColor: wellnessColor,
          },
          scaleAnimStyle,
        ]}
      />

      <Animated.View style={[styles.characterContainer, floatAnimStyle]}>
        <Animated.View style={bobbleStyle}>
          <View
            style={[
              styles.body,
              {
                width: scaledSize * 0.75,
                height: scaledSize * 0.65,
                borderRadius: scaledSize * 0.35,
                backgroundColor: wellnessColor,
              },
            ]}>
            <View
              style={[
                styles.shine,
                {
                  width: scaledSize * 0.25,
                  height: scaledSize * 0.25,
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                },
              ]}
            />
          </View>

          <View
            style={[
              styles.head,
              {
                width: scaledSize * 0.65,
                height: scaledSize * 0.65,
                borderRadius: scaledSize * 0.325,
                backgroundColor: wellnessColor,
                top: scaledSize * -0.1,
              },
            ]}>
            <View
              style={[
                styles.shine,
                {
                  width: scaledSize * 0.22,
                  height: scaledSize * 0.22,
                  top: scaledSize * 0.08,
                  left: scaledSize * 0.1,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                },
              ]}
            />

            <View style={[styles.eyesContainer, { top: scaledSize * 0.15 }]}>
              <View
                style={[
                  styles.eye,
                  {
                    width: scaledSize * 0.12,
                    height: scaledSize * 0.15,
                    borderRadius: scaledSize * 0.08,
                    left: scaledSize * -0.1,
                  },
                ]}>
                <View
                  style={[
                    styles.pupil,
                    {
                      width: scaledSize * 0.06,
                      height: scaledSize * 0.08,
                      backgroundColor: '#2C3E50',
                    },
                  ]}>
                  <View
                    style={[
                      styles.eyeLight,
                      {
                        width: scaledSize * 0.02,
                        height: scaledSize * 0.02,
                        backgroundColor: '#FFFFFF',
                      },
                    ]}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.eye,
                  {
                    width: scaledSize * 0.12,
                    height: scaledSize * 0.15,
                    borderRadius: scaledSize * 0.08,
                    right: scaledSize * -0.1,
                  },
                ]}>
                <View
                  style={[
                    styles.pupil,
                    {
                      width: scaledSize * 0.06,
                      height: scaledSize * 0.08,
                      backgroundColor: '#2C3E50',
                    },
                  ]}>
                  <View
                    style={[
                      styles.eyeLight,
                      {
                        width: scaledSize * 0.02,
                        height: scaledSize * 0.02,
                        backgroundColor: '#FFFFFF',
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.mouth,
                {
                  width: scaledSize * 0.2,
                  height: scaledSize * 0.08,
                  bottom: scaledSize * 0.15,
                  borderTopLeftRadius: scaledSize * 0.1,
                  borderTopRightRadius: scaledSize * 0.1,
                  borderBottomLeftRadius: scaledSize * 0.02,
                  borderBottomRightRadius: scaledSize * 0.02,
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                },
              ]}
            />
          </View>

          <View
            style={[
              styles.sparkle,
              {
                width: scaledSize * 0.08,
                height: scaledSize * 0.08,
                left: scaledSize * -0.15,
                top: scaledSize * 0.1,
                backgroundColor: wellnessColor,
                opacity: 0.6,
              },
            ]}
          />
          <View
            style={[
              styles.sparkle,
              {
                width: scaledSize * 0.06,
                height: scaledSize * 0.06,
                right: scaledSize * -0.12,
                top: scaledSize * 0.3,
                backgroundColor: wellnessColor,
                opacity: 0.5,
              },
            ]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aura: {
    position: 'absolute',
    opacity: 0.15,
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  shine: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.4,
  },
  eyesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  eye: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  pupil: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeLight: {
    borderRadius: 100,
  },
  mouth: {
    position: 'absolute',
  },
  sparkle: {
    position: 'absolute',
    borderRadius: 100,
  },
});
