import { Dimensions, PixelRatio, Platform, useWindowDimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 375; // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

// Conservative scaling: cap growth at larger screens to prevent excessive sizing
const calculateScale = (size: number): number => {
  const baseScale = SCREEN_WIDTH / guidelineBaseWidth;
  // Cap scaling at 1.5x for reasonable growth on large screens
  const cappedScale = Math.min(baseScale, 1.5);
  return size * cappedScale;
};

export const scale = (size: number) => calculateScale(size);
export const verticalScale = (size: number) => {
  const baseScale = SCREEN_HEIGHT / guidelineBaseHeight;
  const cappedScale = Math.min(baseScale, 1.5);
  return size * cappedScale;
};
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const scaleFont = (size: number) => {
  const newSize = calculateScale(size);
  const rounded = PixelRatio.roundToNearestPixel(newSize);
  const adjusted = Platform.OS === 'ios' ? rounded : rounded - 1; // Slight Android adjustment
  return Math.max(10, Math.min(Math.round(adjusted), size * 1.4)); // Cap font growth at 40%
};

export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export function useDeviceSize() {
  const { width, height } = useWindowDimensions();
  const shortest = Math.min(width, height);
  const isTablet = shortest >= 768;
  const isSmall = shortest < 360;
  const isLarge = shortest > 414;
  const isWeb = Platform.OS === 'web';
  const isDesktop = isWeb && width > 1024;
  return { width, height, isTablet, isSmall, isLarge, isWeb, isDesktop };
}

export const containerMaxWidth = (isTablet: boolean) => (isTablet ? 880 : 640);
