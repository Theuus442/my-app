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
  { emoji: '😢', label: 'Muito Ruim', value: 1 },
  { emoji: '😔', label: 'Ruim', value: 2 },
  { emoji: '😐', label: 'Normal', value: 3 },
  { emoji: '🙂', label: 'Bem', value: 4 },
  { emoji: '😄', label: 'Ótimo', value: 5 },
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

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => {
      if (prev.includes(reason)) {
        return prev.filter((r) => r !== reason);
      } else {
        return [...prev, reason];
      }
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
            <IconSymbol size={24} name="chevron.left" color={colors.primary} />
          </Pressable>
          <ThemedText style={styles.title}>Como me sinto?</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Mood Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Selecione seu humor atual</ThemedText>
          <View style={styles.moods}>
            {MOODS.map((mood) => (
              <Pressable
                key={mood.value}
                style={[
                  styles.moodButton,
                  {
                    backgroundColor:
                      selectedMood === mood.value ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedMood(mood.value)}>
                <ThemedText style={styles.moodEmoji}>{mood.emoji}</ThemedText>
                <ThemedText
                  style={[
                    styles.moodLabel,
                    {
                      color: selectedMood === mood.value ? '#FFFFFF' : colors.text,
                    },
                  ]}>
                  {mood.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Reasons Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>O que afeta seu humor? (opcional)</ThemedText>
          <View style={styles.reasonsGrid}>
            {REASONS.map((reason) => (
              <Pressable
                key={reason}
                style={[
                  styles.reasonChip,
                  {
                    backgroundColor: selectedReasons.includes(reason)
                      ? colors.primary
                      : colors.card,
                    borderColor: colors.border,
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
          <ThemedText style={styles.sectionTitle}>Dica do dia</ThemedText>
          <View
            style={[
              styles.tipCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <ThemedText style={styles.tipTitle}>Respire Fundo</ThemedText>
            <ThemedText style={styles.tipText}>
              Independentemente do seu humor atual, lembre-se que é perfeitamente normal ter
              dias ruins. Você é mais resiliente do que imagina! 💚
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
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  moods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reasonChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  reasonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
