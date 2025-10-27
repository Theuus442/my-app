import { Dimensions, PixelRatio, Platform, useWindowDimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 375; // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

export const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const scaleFont = (size: number) => {
  const newSize = scale(size);
  const rounded = PixelRatio.roundToNearestPixel(newSize);
  const adjusted = Platform.OS === 'ios' ? rounded : rounded - 1; // Slight Android adjustment
  return Math.max(10, Math.round(adjusted));
};

export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export function useDeviceSize() {
  const { width, height } = useWindowDimensions();
  const shortest = Math.min(width, height);
  const isTablet = shortest >= 768;
  const isSmall = shortest < 360;
  const isLarge = shortest > 414;
  return { width, height, isTablet, isSmall, isLarge };
}

export const containerMaxWidth = (isTablet: boolean) => (isTablet ? 880 : 640);
