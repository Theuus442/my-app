import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ResponsiveContainer } from '@/components/responsive-container';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  value?: string | boolean;
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [settings, setSettings] = useState({
    notifications: true,
    dailyReminders: true,
    soundEnabled: true,
    userName: 'User',
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const settingItems: SettingItem[] = [
    {
      id: '1',
      title: 'Notificações',
      description: 'Receber lembretes de meditação',
      icon: 'bell.fill',
      value: settings.notifications,
    },
    {
      id: '2',
      title: 'Lembretes Diários',
      description: 'Mensagens positivas todos os dias',
      icon: 'calendar',
      value: settings.dailyReminders,
    },
    {
      id: '3',
      title: 'Sons',
      description: 'Ativar efeitos sonoros',
      icon: 'speaker.wave.2.fill',
      value: settings.soundEnabled,
    },
  ];

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
          <ThemedText style={styles.title}>Configurações</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Perfil</ThemedText>
          <View
            style={[
              styles.profileCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <ThemedText style={styles.avatarText}>U</ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>{settings.userName}</ThemedText>
              <ThemedText style={styles.profileEmail}>Bem-vindo ao PsiCompanion</ThemedText>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferências</ThemedText>
          {settingItems.map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.settingItem,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => toggleSetting(item.id as keyof typeof settings)}>
              <View style={styles.settingItemLeft}>
                <IconSymbol size={20} name={item.icon} color={colors.primary} />
                <View style={styles.settingItemText}>
                  <ThemedText style={styles.settingItemTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.settingItemDescription}>{item.description}</ThemedText>
                </View>
              </View>
              <View
                style={[
                  styles.toggle,
                  {
                    backgroundColor: item.value ? colors.primary : colors.border,
                  },
                ]}>
                <View
                  style={[
                    styles.toggleDot,
                    {
                      marginLeft: item.value ? 16 : 2,
                    },
                  ]}
                />
              </View>
            </Pressable>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Sobre</ThemedText>
          <View
            style={[
              styles.aboutItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <View>
              <ThemedText style={styles.aboutTitle}>PsiCompanion</ThemedText>
              <ThemedText style={styles.aboutText}>Seu companheiro de bem-estar mental</ThemedText>
            </View>
            <ThemedText style={styles.versionText}>v1.0.0</ThemedText>
          </View>

          <Pressable
            style={[
              styles.aboutItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <ThemedText style={styles.aboutTitle}>Política de Privacidade</ThemedText>
            <IconSymbol size={20} name="chevron.right" color={colors.icon} />
          </Pressable>

          <Pressable
            style={[
              styles.aboutItem,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}>
            <ThemedText style={styles.aboutTitle}>Termos de Serviço</ThemedText>
            <IconSymbol size={20} name="chevron.right" color={colors.icon} />
          </Pressable>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Pressable
            style={[
              styles.dangerButton,
              { backgroundColor: colors.error || '#F44336' + '20' },
            ]}>
            <IconSymbol size={20} name="trash" color={colors.error || '#F44336'} />
            <ThemedText style={[styles.dangerButtonText, { color: colors.error || '#F44336' }]}>
              Limpar todos os dados
            </ThemedText>
          </Pressable>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    opacity: 0.6,
  },
  settingItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingItemDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  aboutItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  aboutText: {
    fontSize: 12,
    opacity: 0.6,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
  dangerButton: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
