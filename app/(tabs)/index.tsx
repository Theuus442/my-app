import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { AnimatedCompanion } from '@/components/animated-companion';
import { WellnessBar } from '@/components/wellness-bar';
import { QuoteCard } from '@/components/quote-card';
import { QuickActionCard } from '@/components/quick-action-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

const MOTIVATIONAL_QUOTES = [
  'Você é mais forte do que imagina! 💪',
  'Respire fundo. Você está no controle. 🌬️',
  'Cada pequeno passo importa. Continue! 🚶',
  'Hoje é um novo começo. Aproveite! ☀️',
  'Você merece cuidar de si mesmo. 💚',
  'Está tudo bem não estar bem o tempo todo. 🤗',
  'Seu progresso é válido, por menor que seja. 📈',
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [wellnessLevel] = useState(75);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleRefreshQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_QUOTES.length);
  }, []);

  const handleMeditationPress = () => {
    router.push('/(tabs)/meditation');
  };

  const handleGratitudePress = () => {
    router.push('/(tabs)/gratitude');
  };

  const handleMoodPress = () => {
    router.push('/(tabs)/mood');
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <ThemedText style={[styles.greeting, { color: colors.text }]}>
              Olá, User! 👋
            </ThemedText>
            <ThemedText style={[styles.dateTime, { color: colors.textSecondary }]}>
              {getCurrentTime()}
            </ThemedText>
          </View>
          <Pressable
            style={[
              styles.settingsButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => router.push('/(tabs)/settings')}>
            <IconSymbol size={24} name="gear" color={colors.primary} />
          </Pressable>
        </View>

        {/* Companion Card */}
        <View
          style={[
            styles.companionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}>
          <AnimatedCompanion size={160} wellnessLevel={wellnessLevel} />
        </View>

        {/* Wellness Bar */}
        <WellnessBar level={wellnessLevel} />

        {/* Quote Card */}
        <QuoteCard
          quote={MOTIVATIONAL_QUOTES[currentQuoteIndex]}
          onRefresh={handleRefreshQuote}
        />

        {/* Quick Actions Section */}
        <View style={styles.quickActionsSection}>
          <ThemedText style={styles.sectionTitle}>Ações Rápidas</ThemedText>
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              emoji="🧘"
              title="Meditação Rápida"
              description="5 min"
              onPress={handleMeditationPress}
              containerStyle={styles.actionCard}
            />
            <QuickActionCard
              emoji="📝"
              title="Diário de Gratidão"
              description="Registre bênçãos"
              onPress={handleGratitudePress}
              containerStyle={styles.actionCard}
            />
            <QuickActionCard
              emoji="😊"
              title="Como me sinto?"
              description="Rastrear humor"
              onPress={handleMoodPress}
              containerStyle={styles.actionCard}
            />
          </View>
        </View>

        {/* Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  dateTime: {
    fontSize: 13,
    fontWeight: '500',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  companionCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    color: '#2C3E50',
  },
  quickActionsGrid: {
    gap: 12,
  },
  actionCard: {
    minHeight: 85,
  },
});
