import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

/**
 * Hook para criar animação de escala reutilizável
 * Evita duplicação de código de animação
 */
export function useScaleAnimation(initialScale = 1) {
  const scale = useSharedValue(initialScale);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerAnimation = (targetScale = 0.96, duration = 300) => {
    scale.value = withSpring(targetScale, { damping: 10, mass: 1 }, () => {
      scale.value = withSpring(initialScale);
    });
  };

  return { scale, animatedStyle, triggerAnimation };
}

/**
 * Hook para criar animação de rotação reutilizável
 */
export function useRotationAnimation() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const triggerRotation = () => {
    rotation.value = withSpring(360, { damping: 8, mass: 0.8 }, () => {
      rotation.value = 0;
    });
  };

  return { rotation, animatedStyle, triggerRotation };
}

/**
 * Hook para gerenciar múltiplas animações de escala
 */
export function useMultipleScaleAnimations(count: number, initialScale = 1) {
  const scales = Array.from({ length: count }, () => useSharedValue(initialScale));

  const animatedStyles = scales.map((scale) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }))
  );

  const triggerAnimation = (index: number, targetScale = 1.15) => {
    scales[index].value = withSpring(targetScale, { damping: 6, mass: 0.8 }, () => {
      scales[index].value = withSpring(initialScale);
    });
  };

  return { scales, animatedStyles, triggerAnimation };
}
