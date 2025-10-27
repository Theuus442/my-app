import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { moderateScale, verticalScale, scaleFont, useDeviceSize, containerMaxWidth } from '@/utils/responsive';
import { GratitudeEntry } from '@/types';
import { formatDate } from '@/utils/helpers';

export default function GratitudeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { isTablet } = useDeviceSize();

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
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: moderateScale(16),
            paddingBottom: verticalScale(40),
            maxWidth: containerMaxWidth(isTablet),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[
          styles.header,
          {
            paddingHorizontal: moderateScale(20),
            paddingTop: verticalScale(12),
            paddingBottom: verticalScale(12),
          },
        ]}>
          <Pressable onPress={() => router.push('/(tabs)/')}>
            <IconSymbol size={24} name="chevron.left" color={colors.primary} />
          </Pressable>
          <ThemedText style={[styles.title, { fontSize: scaleFont(20) }]}>Diário de Gratidão</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Info */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              marginHorizontal: moderateScale(20),
              marginBottom: verticalScale(20),
              borderRadius: moderateScale(12),
              padding: moderateScale(16),
            },
          ]}>
          <ThemedText style={[styles.infoEmoji, { fontSize: scaleFont(24) }]}>📝</ThemedText>
          <ThemedText style={[styles.infoText, { fontSize: scaleFont(14), lineHeight: scaleFont(20) }]}>
            Anote 3 coisas pelas quais você é grato todos os dias. Isso pode transformar sua
            perspectiva de vida!
          </ThemedText>
        </View>

        {/* Input Section */}
        <View style={[styles.inputSection, { paddingHorizontal: moderateScale(20), marginBottom: verticalScale(24) }]}>
          <ThemedText style={[styles.sectionTitle, { fontSize: scaleFont(16), marginBottom: verticalScale(12) }]}>Adicionar novo registro</ThemedText>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: moderateScale(12),
                paddingHorizontal: moderateScale(16),
                paddingVertical: verticalScale(12),
              },
            ]}>
            <TextInput
              style={[styles.input, { color: colors.text, fontSize: scaleFont(14), minHeight: verticalScale(90) }]}
              placeholder="O que você é grato hoje?"
              placeholderTextColor={colors.icon}
              value={inputValue}
              onChangeText={setInputValue}
              multiline
              maxLength={200}
            />
            <View style={styles.inputFooter}>
              <ThemedText style={[styles.charCount, { fontSize: scaleFont(12) }]}>
                {inputValue.length}/200
              </ThemedText>
              <Pressable
                style={[
                  styles.addButton,
                  {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    borderRadius: moderateScale(20),
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
        <View style={[styles.entriesSection, { paddingHorizontal: moderateScale(20) }]}>
          <ThemedText style={[styles.sectionTitle, { fontSize: scaleFont(16), marginBottom: verticalScale(12) }]}>
            Minhas Bênçãos ({entries.length})
          </ThemedText>
          {entries.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: moderateScale(12),
                  padding: moderateScale(28),
                },
              ]}>
              <ThemedText style={[styles.emptyStateEmoji, { fontSize: scaleFont(48), marginBottom: verticalScale(12) }]}>🌱</ThemedText>
              <ThemedText style={[styles.emptyStateText, { fontSize: scaleFont(14) }]}>
                Comece a registrar suas bênçãos!
              </ThemedText>
            </View>
          ) : (
            entries.map((entry) => (
              <View
                key={entry.id}
                style={[
                  styles.entryCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: moderateScale(12),
                    padding: moderateScale(12),
                    marginBottom: verticalScale(12),
                    gap: moderateScale(12),
                  },
                ]}>
                <View style={styles.entryContent}>
                  <ThemedText style={[styles.entryText, { fontSize: scaleFont(14), lineHeight: scaleFont(20) }]}>{entry.text}</ThemedText>
                  <ThemedText style={[styles.entryDate, { fontSize: scaleFont(12) }]}>
                    {formatDate(entry.date)}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => handleDeleteEntry(entry.id)}
                  style={[styles.deleteButton, { padding: moderateScale(8) }]}>
                  <IconSymbol size={20} name="trash" color={colors.error || '#F44336'} />
                </Pressable>
              </View>
            ))
          )}
        </View>

        <View style={{ height: verticalScale(20) }} />
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
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  infoCard: {
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoEmoji: {},
  infoText: {
    flex: 1,
  },
  inputSection: {},
  sectionTitle: {
    fontWeight: '600',
  },
  inputContainer: {
    borderWidth: 1,
  },
  input: {
    marginBottom: 8,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    opacity: 0.6,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  entriesSection: {},
  emptyState: {
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyStateEmoji: {},
  emptyStateText: {
    fontWeight: '500',
  },
  entryCard: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryContent: {
    flex: 1,
  },
  entryText: {},
  entryDate: {
    opacity: 0.5,
  },
  deleteButton: {},
});
