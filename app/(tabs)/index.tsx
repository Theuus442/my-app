import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions } from 'react-native';
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
import { MOTIVATIONAL_QUOTES } from '@/constants/data';
import { getCurrentTime } from '@/utils/helpers';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const { isTablet, isSmall, isWeb, width } = useDeviceSize();
  const screenWidth = width;

  const [wellnessLevel] = useState(75);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const settingsBtnScale = useSharedValue(1);

  const greetingSize = scaleFont(isSmall ? 22 : isTablet && !isWeb ? 28 : 26);
  const dateSize = scaleFont(isSmall ? 12 : isTablet && !isWeb ? 13 : 12);

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

  const settingsBtnAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: settingsBtnScale.value }],
  }));

  const isWideScreen = screenWidth > 768;
  const contentMaxWidth = isWideScreen ? 1000 : screenWidth;
  const sidePadding = isWideScreen ? moderateScale(32) : moderateScale(20);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={[styles.headerWrapper, { paddingHorizontal: sidePadding }]}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <ThemedText
                style={[
                  styles.greeting,
                  {
                    color: colors.text,
                    fontSize: greetingSize,
                    lineHeight: greetingSize * 1.1,
                  },
                ]}>
                Olá, User! 🌟
              </ThemedText>
              <ThemedText
                style={[
                  styles.dateTime,
                  {
                    color: colors.textSecondary,
                    fontSize: dateSize,
                    marginTop: 8,
                  },
                ]}>
                {getCurrentTime()}
              </ThemedText>
            </View>
            <Animated.View style={settingsBtnAnimStyle}>
              <Pressable
                style={[
                  styles.settingsButton,
                  {
                    backgroundColor: colors.secondary + '12',
                    borderColor: colors.secondary + '30',
                  },
                ]}
                onPress={handleSettingsPress}
                android_ripple={{ color: colors.secondary + '20' }}>
                <IconSymbol size={24} name="gear" color={colors.secondary} />
              </Pressable>
            </Animated.View>
          </View>
        </View>

        {/* Main Content Container */}
        <View
          style={[
            styles.contentContainer,
            {
              maxWidth: contentMaxWidth,
              alignSelf: 'center',
              width: '100%',
              paddingHorizontal: sidePadding,
            },
          ]}>
          {/* Companion Card - Hero Section */}
          <View
            style={[
              styles.companionCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}>
            <View style={styles.companionBackground} />
            <AnimatedCompanion size={isTablet ? 150 : 120} wellnessLevel={wellnessLevel} />
          </View>

          {/* Wellness Bar */}
          <WellnessBar level={wellnessLevel} containerStyle={styles.wellnessBarContainer} />

          {/* Quote Card */}
          <View style={styles.quoteCardWrapper}>
            <QuoteCard
              quote={MOTIVATIONAL_QUOTES[currentQuoteIndex]}
              onRefresh={handleRefreshQuote}
              containerStyle={styles.quoteCardContainer}
            />
          </View>

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Ações Rápidas
            </ThemedText>

            {isWideScreen ? (
              <View style={styles.actionsGridWide}>
                <QuickActionCard
                  emoji="🧠"
                  title="Meditação"
                  description="5 minutos"
                  accentColor="#6BCB77"
                  onPress={handleMeditationPress}
                  containerStyle={styles.actionCardWide}
                />
                <QuickActionCard
                  emoji="💫"
                  title="Gratidão"
                  description="Registre bênçãos"
                  accentColor="#FF6B6B"
                  onPress={handleGratitudePress}
                  containerStyle={styles.actionCardWide}
                />
                <QuickActionCard
                  emoji="✨"
                  title="Humor"
                  description="Como se sente?"
                  accentColor="#4D96FF"
                  onPress={handleMoodPress}
                  containerStyle={styles.actionCardWide}
                />
              </View>
            ) : (
              <View style={styles.actionsGridMobile}>
                <QuickActionCard
                  emoji="🧠"
                  title="Meditação"
                  description="5 minutos"
                  accentColor="#6BCB77"
                  onPress={handleMeditationPress}
                />
                <QuickActionCard
                  emoji="💫"
                  title="Gratidão"
                  description="Registre bênçãos"
                  accentColor="#FF6B6B"
                  onPress={handleGratitudePress}
                />
                <QuickActionCard
                  emoji="✨"
                  title="Humor"
                  description="Como se sente?"
                  accentColor="#4D96FF"
                  onPress={handleMoodPress}
                />
              </View>
            )}
          </View>
        </View>

        <View style={{ height: 40 }} />
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
    flexGrow: 1,
    paddingVertical: moderateScale(8),
  },
  headerWrapper: {
    paddingVertical: moderateScale(12),
    paddingTop: moderateScale(16),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  greeting: {
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  dateTime: {
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  settingsButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentContainer: {
    gap: 20,
  },
  companionCard: {
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: moderateScale(28),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    overflow: 'hidden',
  },
  companionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },
  wellnessBarContainer: {
    paddingHorizontal: 0,
    marginVertical: 0,
    gap: 12,
  },
  quoteCardWrapper: {
    marginHorizontal: -4,
  },
  quoteCardContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  quickActionsSection: {
    gap: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  actionsGridMobile: {
    gap: 12,
  },
  actionsGridWide: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCardWide: {
    flex: 1,
    minHeight: 100,
  },
});
