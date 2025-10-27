import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface MeditationSession {
  id: string;
  duration: number;
  title: string;
  description: string;
}

interface SessionHistory {
  sessionId: string;
  date: Date;
  completed: boolean;
}

const MEDITATION_SESSIONS: MeditationSession[] = [
  {
    id: '1',
    duration: 5,
    title: 'Respiração Consciente',
    description: 'Técnica simples de respiração para acalmar',
  },
  {
    id: '2',
    duration: 10,
    title: 'Meditação Guiada',
    description: 'Experiência meditativa com orientação de voz',
  },
  {
    id: '3',
    duration: 15,
    title: 'Mindfulness Completo',
    description: 'Sessão completa de atenção plena',
  },
  {
    id: '4',
    duration: 20,
    title: 'Meditação Profunda',
    description: 'Sessão avançada de meditação',
  },
];

export default function MeditationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            Alert.alert(
              'Parabéns!',
              'Você completou a meditação! Seu bem-estar foi fortalecido! 💚'
            );
            if (selectedSession) {
              setSessionHistory((prev) => [
                ...prev,
                {
                  sessionId: selectedSession.id,
                  date: new Date(),
                  completed: true,
                },
              ]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, selectedSession]);

  const handleStartSession = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration * 60);
    setTotalTime(session.duration * 60);
    setIsPlaying(true);
  };

  const handlePauseResume = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setSelectedSession(null);
    setTimeLeft(0);
    setTotalTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const completedCount = sessionHistory.filter((h) => h.completed).length;
  const totalMinutes = sessionHistory.reduce(
    (acc, h) => acc + (MEDITATION_SESSIONS.find((s) => s.id === h.sessionId)?.duration || 0),
    0
  );

  if (selectedSession && isPlaying) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.activeSessionContainer}>
          <View style={styles.header}>
            <Pressable onPress={handleStop}>
              <IconSymbol size={24} name="chevron.left" color={colors.primary} />
            </Pressable>
            <ThemedText style={styles.title}>Meditando</ThemedText>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.timerContainer}>
            <View
              style={[
                styles.timerCircle,
                { borderColor: colors.primary, backgroundColor: colors.card },
              ]}>
              <View
                style={[
                  styles.progressRing,
                  {
                    width: getProgress() * 2,
                    height: 8,
                    backgroundColor: colors.primary,
                    borderRadius: 4,
                  },
                ]}
              />
              <ThemedText style={styles.timerText}>{formatTime(timeLeft)}</ThemedText>
            </View>
          </View>

          <View style={styles.sessionInfo}>
            <ThemedText style={styles.sessionTitle}>{selectedSession.title}</ThemedText>
            <ThemedText style={styles.sessionDescription}>{selectedSession.description}</ThemedText>
          </View>

          <View style={styles.controls}>
            <Pressable
              style={[
                styles.controlButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={handlePauseResume}>
              <IconSymbol
                size={32}
                name={isPlaying ? 'pause.fill' : 'play.fill'}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>Meditação</ThemedText>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.primary,
              },
            ]}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
              <ThemedText style={styles.statEmoji}>✅</ThemedText>
            </View>
            <ThemedText style={[styles.statNumber, { color: colors.primary }]}>
              {completedCount}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Sessões Completas
            </ThemedText>
          </View>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.accent,
              },
            ]}>
            <View style={[styles.statIcon, { backgroundColor: colors.accentBlue + '20' }]}>
              <ThemedText style={styles.statEmoji}>🕐</ThemedText>
            </View>
            <ThemedText style={[styles.statNumber, { color: colors.accentBlue }]}>
              {totalMinutes}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Minutos Totais
            </ThemedText>
          </View>
        </View>

        {/* Sessions List */}
        <View style={styles.sessionsContainer}>
          <ThemedText style={styles.sectionTitle}>Sessões Disponíveis</ThemedText>
          {MEDITATION_SESSIONS.map((session) => (
            <Pressable
              key={session.id}
              style={[
                styles.sessionCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => handleStartSession(session)}>
              <View style={styles.sessionCardContent}>
                <ThemedText style={styles.sessionCardTitle}>{session.title}</ThemedText>
                <ThemedText style={styles.sessionCardDescription}>{session.description}</ThemedText>
              </View>
              <View style={styles.sessionCardDuration}>
                <IconSymbol size={20} name="clock" color={colors.primary} />
                <ThemedText style={styles.durationText}>{session.duration}min</ThemedText>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Session History */}
        {sessionHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <ThemedText style={styles.sectionTitle}>Histórico</ThemedText>
            {sessionHistory.slice(-5).map((history, index) => (
              <View
                key={index}
                style={[
                  styles.historyItem,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <View>
                  <ThemedText style={styles.historyTitle}>
                    {MEDITATION_SESSIONS.find((s) => s.id === history.sessionId)?.title}
                  </ThemedText>
                  <ThemedText style={styles.historyDate}>
                    {history.date.toLocaleString('pt-BR')}
                  </ThemedText>
                </View>
                <IconSymbol size={20} name="checkmark.circle.fill" color={colors.primary} />
              </View>
            ))}
          </View>
        )}

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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  sessionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sessionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionCardContent: {
    flex: 1,
  },
  sessionCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionCardDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  sessionCardDuration: {
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyContainer: {
    paddingHorizontal: 20,
  },
  historyItem: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 11,
    opacity: 0.5,
  },
  activeSessionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    position: 'absolute',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '700',
  },
  sessionInfo: {
    alignItems: 'center',
    marginVertical: 24,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sessionDescription: {
    fontSize: 14,
    opacity: 0.6,
  },
  controls: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
