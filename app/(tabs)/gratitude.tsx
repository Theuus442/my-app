import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GratitudeEntry {
  id: string;
  text: string;
  date: Date;
}

export default function GratitudeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [entries, setEntries] = useState<GratitudeEntry[]>([
    {
      id: '1',
      text: 'Sou grato pela minha saúde e capacidade de cuidar de mim',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      text: 'Agradeço pelas pessoas que me amam e apoiam',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAddEntry = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Por favor, escreva algo que você é grato');
      return;
    }

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      date: new Date(),
    };

    setEntries([newEntry, ...entries]);
    setInputValue('');
    Keyboard.dismiss();

    Alert.alert('Registrado!', 'Sua gratidão foi anotada. Continue sendo grato! 💚');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
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
          <ThemedText style={styles.title}>Diário de Gratidão</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <ThemedText style={styles.infoEmoji}>📝</ThemedText>
          <ThemedText style={styles.infoText}>
            Anote 3 coisas pelas quais você é grato todos os dias. Isso pode transformar sua
            perspectiva de vida!
          </ThemedText>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <ThemedText style={styles.sectionTitle}>Adicionar novo registro</ThemedText>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="O que você é grato hoje?"
              placeholderTextColor={colors.icon}
              value={inputValue}
              onChangeText={setInputValue}
              multiline
              maxLength={200}
            />
            <View style={styles.inputFooter}>
              <ThemedText style={styles.charCount}>
                {inputValue.length}/200
              </ThemedText>
              <Pressable
                style={[
                  styles.addButton,
                  {
                    backgroundColor:
                      inputValue.trim() === '' ? colors.border : colors.primary,
                  },
                ]}
                onPress={handleAddEntry}
                disabled={inputValue.trim() === ''}>
                <IconSymbol size={20} name="plus" color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Entries */}
        <View style={styles.entriesSection}>
          <ThemedText style={styles.sectionTitle}>
            Minhas Bênçãos ({entries.length})
          </ThemedText>
          {entries.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <ThemedText style={styles.emptyStateEmoji}>🌱</ThemedText>
              <ThemedText style={styles.emptyStateText}>
                Comece a registrar suas bênçãos!
              </ThemedText>
            </View>
          ) : (
            entries.map((entry) => (
              <View
                key={entry.id}
                style={[
                  styles.entryCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}>
                <View style={styles.entryContent}>
                  <ThemedText style={styles.entryText}>{entry.text}</ThemedText>
                  <ThemedText style={styles.entryDate}>
                    {entry.date.toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => handleDeleteEntry(entry.id)}
                  style={styles.deleteButton}>
                  <IconSymbol size={20} name="trash" color={colors.error || '#F44336'} />
                </Pressable>
              </View>
            ))
          )}
        </View>

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
    fontSize: 20,
    fontWeight: '700',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoEmoji: {
    fontSize: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 14,
    minHeight: 80,
    marginBottom: 8,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    fontSize: 11,
    opacity: 0.6,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entriesSection: {
    paddingHorizontal: 20,
  },
  emptyState: {
    borderRadius: 12,
    padding: 32,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  entryCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  entryContent: {
    flex: 1,
  },
  entryText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 11,
    opacity: 0.5,
  },
  deleteButton: {
    padding: 8,
  },
});
