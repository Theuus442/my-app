/**
 * Funções helpers reutilizáveis
 * Lógica comum em um único lugar
 */

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getCurrentTime = (): string => {
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

export const getMoodEmoji = (mood: number): string => {
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

export const getWellnessColor = (level: number): string => {
  if (level < 40) return '#FF6B6B';
  if (level < 70) return '#FFD93D';
  return '#6BCB77';
};

export const getProgressPercentage = (current: number, total: number): number => {
  if (total === 0) return 0;
  return (current / total) * 100;
};

export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const formatDate = (date: Date, locale = 'pt-BR'): string => {
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDaysSince = (date: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateStreak = (entries: Array<{ date: Date }>): number => {
  if (entries.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < entries.length; i++) {
    const entryDate = new Date(entries[i].date);
    entryDate.setHours(0, 0, 0, 0);

    const diffTime = currentDate.getTime() - entryDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
};
