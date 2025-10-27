import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MOODS = [
  { emoji: '💔', label: 'Muito Ruim', value: 1 },
  { emoji: '😔', label: 'Ruim', value: 2 },
  { emoji: '😌', label: 'Normal', value: 3 },
  { emoji: '😊', label: 'Bem', value: 4 },
  { emoji: '🌟', label: 'Ótimo', value: 5 },
];

const REASONS = [
  'Trabalho',
  'Relacionamento',
  'Saúde',
  'Finanças',
  'Família',
  'Amigos',
  'Pessoal',
  'Outro',
];

export default function MoodScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const moodAnimations = MOODS.map(() => useSharedValue(1));

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => {
      if (prev.includes(reason)) {
        return prev.filter((r) => r !== reason);
      } else {
        return [...prev, reason];
      }
    });
  };

  const handleMoodSelect = (moodValue: number, index: number) => {
    setSelectedMood(moodValue);
    moodAnimations[index].value = withSpring(1.15, { damping: 6, mass: 0.8 }, () => {
      moodAnimations[index].value = withSpring(1);
    });
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      Alert.alert('Por favor, selecione como você está se sentindo');
      return;
    }

    Alert.alert(
      'Obrigado!',
      'Seu humor foi registrado. Continue cuidando de si mesmo! 💚',
      [
        {
          text: 'Voltar',
          onPress: () => router.push('/(tabs)/'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push('/(tabs)/')}>
            <IconSymbol size={28} name="chevron.left" color={colors.secondary} />
          </Pressable>
          <ThemedText style={[styles.title, { color: colors.text }]}>Como me sinto?</ThemedText>
          <View style={{ width: 28 }} />
        </View>

        {/* Mood Selection */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Como você está se sentindo?
          </ThemedText>
          <View style={styles.moods}>
            {MOODS.map((mood, index) => {
              const animStyle = useAnimatedStyle(() => ({
                transform: [{ scale: moodAnimations[index].value }],
              }));

              return (
                <Animated.View key={mood.value} style={animStyle}>
                  <Pressable
                    style={[
                      styles.moodButton,
                      {
                        backgroundColor:
                          selectedMood === mood.value
                            ? colors.secondary
                            : colors.card,
                        borderColor:
                          selectedMood === mood.value
                            ? colors.secondary
                            : colors.border,
                      },
                    ]}
                    onPress={() => handleMoodSelect(mood.value, index)}>
                    <ThemedText style={styles.moodEmoji}>{mood.emoji}</ThemedText>
                    <ThemedText
                      style={[
                        styles.moodLabel,
                        {
                          color:
                            selectedMood === mood.value
                              ? '#FFFFFF'
                              : colors.textSecondary,
                        },
                      ]}>
                      {mood.label}
                    </ThemedText>
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* Reasons Selection */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            O que afeta seu humor? (opcional)
          </ThemedText>
          <View style={styles.reasonsGrid}>
            {REASONS.map((reason) => (
              <Pressable
                key={reason}
                style={[
                  styles.reasonChip,
                  {
                    backgroundColor: selectedReasons.includes(reason)
                      ? colors.accent
                      : colors.card,
                    borderColor: selectedReasons.includes(reason)
                      ? colors.accent
                      : colors.border,
                  },
                ]}
                onPress={() => toggleReason(reason)}>
                <ThemedText
                  style={[
                    styles.reasonText,
                    {
                      color: selectedReasons.includes(reason) ? '#FFFFFF' : colors.text,
                    },
                  ]}>
                  {reason}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            Dica do dia
          </ThemedText>
          <View
            style={[
              styles.tipCard,
              {
                backgroundColor: colors.secondary + '12',
                borderColor: colors.secondary,
              },
            ]}>
            <ThemedText style={[styles.tipTitle, { color: colors.text }]}>
              💫 Respire Fundo
            </ThemedText>
            <ThemedText style={[styles.tipText, { color: colors.textSecondary }]}>
              Independentemente do seu humor atual, lembre-se que é normal ter dias ruins. Você é
              mais resiliente do que imagina! 💚
            </ThemedText>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Submit Button */}
      <View
        style={[
          styles.bottomButtonContainer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}>
        <Pressable
          style={[styles.submitButton, { backgroundColor: colors.secondary }]}
          onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Registrar Humor</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
    letterSpacing: -0.3,
  },
  moods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 36,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  reasonChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  reasonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipCard: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
