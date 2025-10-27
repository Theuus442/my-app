import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ResponsiveContainer } from '@/components/responsive-container';
import { ACHIEVEMENTS } from '@/constants/data';
import { MoodEntry, Achievement } from '@/types';
import { getMoodEmoji, getProgressPercentage } from '@/utils/helpers';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock data for last 7 days mood
  const [moodEntries] = useState<MoodEntry[]>([
    { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), mood: 3 },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), mood: 4 },
    { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), mood: 4 },
    { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), mood: 5 },
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), mood: 4 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), mood: 5 },
    { date: new Date(), mood: 5 },
  ]);

  const streak = 7;
  const totalMeditationMinutes = 145;
  const gratitudeEntries = 12;
  const averageMood = Math.round(moodEntries.reduce((sum, e) => sum + e.mood, 0) / moodEntries.length * 100) / 100;
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1:
        return '💔';
      case 2:
        return '😔';
      case 3:
        return '😌';
      case 4:
        return '😊';
      case 5:
        return '🌟';
      default:
        return '😐';
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ResponsiveContainer>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>Progresso</ThemedText>
        </View>

        {/* Main Stats Cards */}
        <View style={styles.statsGrid}>
          {/* Streak Card */}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#FF6B35',
              },
            ]}>
            <View style={[styles.statBadge, { backgroundColor: '#FF6B35' + '20' }]}>
              <ThemedText style={styles.statEmoji}>🔥</ThemedText>
            </View>
            <ThemedText style={[styles.statValue, { color: '#FF6B35' }]}>{streak}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Dias consecutivos
            </ThemedText>
          </View>

          {/* Meditation Minutes Card */}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.primary,
              },
            ]}>
            <View style={[styles.statBadge, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={styles.statEmoji}>🧘</ThemedText>
            </View>
            <ThemedText style={[styles.statValue, { color: colors.primary }]}>
              {totalMeditationMinutes}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Minutos totais
            </ThemedText>
          </View>

          {/* Gratitude Card */}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.accentPeach,
              },
            ]}>
            <View style={[styles.statBadge, { backgroundColor: colors.accentPeach + '20' }]}>
              <ThemedText style={styles.statEmoji}>💚</ThemedText>
            </View>
            <ThemedText style={[styles.statValue, { color: colors.accentPeach }]}>
              {gratitudeEntries}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Itens de gratidão
            </ThemedText>
          </View>

          {/* Average Mood Card */}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.accentYellow,
              },
            ]}>
            <View style={[styles.statBadge, { backgroundColor: colors.accentYellow + '20' }]}>
              <ThemedText style={styles.statEmoji}>😊</ThemedText>
            </View>
            <ThemedText style={[styles.statValue, { color: colors.accentYellow }]}>
              {(averageMood * 20).toFixed(0)}%
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Humor médio
            </ThemedText>
          </View>
        </View>

        {/* Mood Chart */}
        <View style={styles.chartContainer}>
          <ThemedText style={styles.sectionTitle}>Humor - Últimos 7 Dias</ThemedText>
          <View
            style={[
              styles.chart,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}>
            <View style={styles.chartBars}>
              {moodEntries.map((entry, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(entry.mood / 5) * 100}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                  <ThemedText style={styles.barLabel}>
                    {entry.date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Mood Timeline */}
        <View style={styles.moodTimelineContainer}>
          <ThemedText style={styles.sectionTitle}>Progresso Diário</ThemedText>
          {moodEntries.map((entry, index) => (
            <View
              key={index}
              style={[
                styles.moodItem,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}>
              <View style={styles.moodItemLeft}>
                <ThemedText style={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</ThemedText>
                <View>
                  <ThemedText style={styles.moodDate}>
                    {entry.date.toLocaleDateString('pt-BR')}
                  </ThemedText>
                  <ThemedText style={styles.moodRating}>Humor: {entry.mood}/5</ThemedText>
                </View>
              </View>
              <View
                style={[
                  styles.moodBar,
                  { backgroundColor: colors.primary, width: `${(entry.mood / 5) * 100}%` },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementsHeader}>
            <ThemedText style={styles.sectionTitle}>Conquistas</ThemedText>
            <ThemedText style={styles.achievementCount}>
              {unlockedAchievements}/{ACHIEVEMENTS.length}
            </ThemedText>
          </View>

          {/* Progress Bar */}
          <View
            style={[
              styles.achievementProgressBar,
              { backgroundColor: colors.border },
            ]}>
            <View
              style={{
                height: '100%',
                width: `${(unlockedAchievements / ACHIEVEMENTS.length) * 100}%`,
                backgroundColor: colors.primary,
                borderRadius: 6,
              }}
            />
          </View>

          {/* Achievements Grid */}
          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  {
                    backgroundColor: achievement.unlocked
                      ? colors.card
                      : colors.card + '80',
                    borderColor: achievement.unlocked ? colors.border : colors.border + '50',
                  },
                ]}>
                <ThemedText
                  style={[
                    styles.achievementIcon,
                    { opacity: achievement.unlocked ? 1 : 0.5 },
                  ]}>
                  {achievement.icon}
                </ThemedText>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <IconSymbol size={12} name="checkmark" color="#FFFFFF" />
                  </View>
                )}
                <ThemedText
                  style={[
                    styles.achievementTitle,
                    { opacity: achievement.unlocked ? 1 : 0.5 },
                  ]}>
                  {achievement.title}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.achievementDescription,
                    { opacity: achievement.unlocked ? 0.7 : 0.3 },
                  ]}>
                  {achievement.description}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        </ResponsiveContainer>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minHeight: 200,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 8,
  },
  bar: {
    width: '60%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  moodTimelineContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  moodItem: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moodItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodDate: {
    fontSize: 13,
    fontWeight: '500',
  },
  moodRating: {
    fontSize: 12,
    opacity: 0.6,
  },
  moodBar: {
    height: 4,
    borderRadius: 2,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  achievementProgressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12,
  },
});
