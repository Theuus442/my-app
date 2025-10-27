import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { AnimatedCompanion } from '@/components/animated-companion';
import { WellnessBar } from '@/components/wellness-bar';
import { QuoteCard } from '@/components/quote-card';
import { QuickActionCard } from '@/components/quick-action-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { scaleFont, moderateScale, useDeviceSize } from '@/utils/responsive';
import { ResponsiveContainer } from '@/components/responsive-container';

const MOTIVATIONAL_QUOTES = [
  'Você é mais forte do que imagina! 💪',
  'Respire fundo. Você está no controle. 🌬️',
  'Cada pequeno passo importa. Continue! 🚶',
  'Hoje é um novo começo. Aproveite! ☀️',
  'Você merece cuidar de si mesmo. ���',
  'Está tudo bem não estar bem o tempo todo. 🤗',
  'Seu progresso é válido, por menor que seja. 📈',
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  // lightweight device sizing hook
  const { isTablet, isSmall, isWeb } = useDeviceSize();

  const [wellnessLevel] = useState(75);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const settingsBtnScale = useSharedValue(1);

  // More conservative sizing for web, better for small screens
  const greetingSize = scaleFont(isSmall ? 20 : isTablet && !isWeb ? 28 : 24);
  const dateSize = scaleFont(isSmall ? 11 : isTablet && !isWeb ? 13 : 12);

  const handleRefreshQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_QUOTES.length);
  }, []);

  const handleSettingsPress = () => {
    settingsBtnScale.value = withSpring(0.9, { damping: 10, mass: 1 }, () => {
      settingsBtnScale.value = withSpring(1);
    });
    router.push('/(tabs)/settings');
  };

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

  const settingsBtnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: settingsBtnScale.value }],
  }));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ResponsiveContainer>
        {/* Header with Gradient Background */}
        <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <ThemedText style={[styles.greeting, { color: colors.text, fontSize: greetingSize, lineHeight: Math.round(greetingSize * 1.05) }]}>
              Olá, User! 🌟
            </ThemedText>
              <ThemedText style={[styles.dateTime, { color: colors.textSecondary, fontSize: dateSize, lineHeight: Math.round(dateSize * 1.2) }]}>
                {getCurrentTime()}
              </ThemedText>
            </View>
            <Animated.View style={settingsBtnAnimStyle}>
              <Pressable
                style={[
                  styles.settingsButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={handleSettingsPress}>
                <IconSymbol size={24} name="gear" color={colors.secondary} />
              </Pressable>
            </Animated.View>
          </View>
        </View>

        {/* Companion Card - Hero Section */}
        <View
          style={[
            styles.companionCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              paddingVertical: moderateScale(isTablet ? 32 : 20),
              marginHorizontal: moderateScale(isTablet ? 24 : 16),
              borderRadius: moderateScale(isTablet ? 28 : 20),
              maxWidth: isTablet ? 600 : '100%',
              width: '100%',
            },
          ]}>
          <View style={styles.companionBackground} />
          <AnimatedCompanion size={isTablet ? 140 : 110} wellnessLevel={wellnessLevel} />
        </View>

        {/* Wellness Bar */}
        <WellnessBar level={wellnessLevel} containerStyle={{ maxWidth: isTablet ? 760 : '100%', marginHorizontal: isTablet ? 28 : 20 }} />

        {/* Quote Card */}
        <View style={{ paddingHorizontal: isTablet ? 28 : 0 }}>
          <QuoteCard
            quote={MOTIVATIONAL_QUOTES[currentQuoteIndex]}
            onRefresh={handleRefreshQuote}
            containerStyle={{ maxWidth: isTablet ? 760 : '100%' }}
          />
        </View>

        {/* Quick Actions Section */}
        <View style={[styles.quickActionsSection, { paddingHorizontal: isTablet ? 28 : 20 }]}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</ThemedText>
          <View style={[styles.quickActionsGrid, { flexDirection: isTablet ? 'row' : 'column', gap: 12 }]}>
            <QuickActionCard
              emoji="🧠"
              title="Meditação"
              description="5 minutos"
              accentColor="#6BCB77"
              onPress={handleMeditationPress}
              containerStyle={[styles.actionCard, { flex: isTablet ? 1 : undefined }]}
            />
            <QuickActionCard
              emoji="💫"
              title="Gratidão"
              description="Registre bênçãos"
              accentColor="#FF6B6B"
              onPress={handleGratitudePress}
              containerStyle={[styles.actionCard, { flex: isTablet ? 1 : undefined }]}
            />
            <QuickActionCard
              emoji="✨"
              title="Humor"
              description="Como se sente?"
              accentColor="#4D96FF"
              onPress={handleMoodPress}
              containerStyle={[styles.actionCard, { flex: isTablet ? 1 : undefined }]}
            />
          </View>
        </View>

        {/* Spacing */}
        </ResponsiveContainer>
        <View style={{ height: 24 }} />
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
  headerContainer: {
    paddingBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.7,
  },
  dateTime: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  settingsButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  companionCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 40,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    overflow: 'hidden',
  },
  companionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.02,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  quickActionsGrid: {
    gap: 12,
  },
  actionCard: {
    minHeight: 92,
  },
});
