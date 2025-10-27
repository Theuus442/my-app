import React, { useState, useMemo } from 'react';
import { Article } from '@/types';
import { ARTICLES, LIBRARY_CATEGORIES } from '@/constants/data';
import { StyleSheet, View, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ResponsiveContainer } from '@/components/responsive-container';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  readTime: number;
  isFavorite?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'A Respiração 4-7-8',
    description: 'Técnica simples para acalmar a mente',
    category: 'Respiração',
    content:
      'A respiração 4-7-8 é uma técnica simples mas poderosa...',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Meditação Mindfulness',
    description: 'Guia completo para iniciantes',
    category: 'Mindfulness',
    content:
      'Mindfulness é a prática de estar presente no momento...',
    readTime: 8,
  },
  {
    id: '3',
    title: 'Técnicas de TCC para Ansiedade',
    description: 'Ferramentas práticas para lidar com a ansiedade',
    category: 'TCC',
    content:
      'A Terapia Cognitivo-Comportamental oferece ferramentas eficazes...',
    readTime: 10,
  },
  {
    id: '4',
    title: 'Diário de Gratidão',
    description: 'Como iniciar e manter a prática',
    category: 'Gratidão',
    content:
      'Um diário de gratidão pode transformar sua perspectiva...',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Saúde Mental e Sono',
    description: 'A importância do descanso para bem-estar',
    category: 'Artigos',
    content:
      'O sono adequado é fundamental para a saúde mental...',
    readTime: 7,
  },
  {
    id: '6',
    title: 'Exercício de Respiração Alternada',
    description: 'Balanceie energia e calma',
    category: 'Respiração',
    content:
      'A respiração alternada pelas narinas é uma técnica antiga...',
    readTime: 5,
  },
  {
    id: '7',
    title: 'Reconhecimento de Pensamentos Automáticos',
    description: 'Entenda seus padrões mentais',
    category: 'TCC',
    content:
      'Os pensamentos automáticos são aqueles que surgem naturalmente...',
    readTime: 9,
  },
  {
    id: '8',
    title: 'Prática Diária de Gratidão',
    description: 'Transforme sua realidade em 30 dias',
    category: 'Gratidão',
    content:
      'Uma prática simples de gratidão diária pode mudar sua vida...',
    readTime: 6,
  },
];

const CATEGORIES = ['Respira��ão', 'Gratidão', 'TCC', 'Artigos', 'Mindfulness'];

export default function LibraryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchCategory = !selectedCategory || article.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFavorite = (articleId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(articleId)) {
        newFavorites.delete(articleId);
      } else {
        newFavorites.add(articleId);
      }
      return newFavorites;
    });
  };

  if (selectedArticle) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.articleHeader}>
            <Pressable onPress={() => setSelectedArticle(null)}>
              <IconSymbol size={24} name="chevron.left" color={colors.primary} />
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(selectedArticle.id)}>
              <IconSymbol
                size={24}
                name={favorites.has(selectedArticle.id) ? 'heart.fill' : 'heart'}
                color={colors.primary}
              />
            </Pressable>
          </View>

          <ResponsiveContainer>
          <View style={styles.articleContent}>
            <ThemedText style={styles.articleCategory}>{selectedArticle.category}</ThemedText>
            <ThemedText style={styles.articleTitle}>{selectedArticle.title}</ThemedText>
            <View style={styles.articleMeta}>
              <IconSymbol size={16} name="clock" color={colors.primary} />
              <ThemedText style={styles.readTime}>{selectedArticle.readTime} min de leitura</ThemedText>
            </View>

            <ThemedText style={styles.articleDescription}>{selectedArticle.description}</ThemedText>

            <View style={styles.divider} />

            <ThemedText style={styles.articleBody}>{selectedArticle.content}</ThemedText>
            <ThemedText style={styles.articleBody}>
              {selectedArticle.content} {selectedArticle.content}
            </ThemedText>
          </View>
          </ResponsiveContainer>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ResponsiveContainer>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>Biblioteca</ThemedText>
        </View>

        {/* Search */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <IconSymbol size={20} name="magnifyingglass" color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar artigos..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ThemedText style={styles.sectionTitle}>Categorias</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesList}>
              <Pressable
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategory === null ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(null)}>
                <ThemedText
                  style={[
                    styles.categoryChipText,
                    {
                      color: selectedCategory === null ? '#FFFFFF' : colors.text,
                    },
                  ]}>
                  Todos
                </ThemedText>
              </Pressable>

              {CATEGORIES.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor:
                        selectedCategory === category ? colors.primary : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}>
                  <ThemedText
                    style={[
                      styles.categoryChipText,
                      {
                        color: selectedCategory === category ? '#FFFFFF' : colors.text,
                      },
                    ]}>
                    {category}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Articles */}
        <View style={styles.articlesContainer}>
          <ThemedText style={styles.sectionTitle}>
            Artigos ({filteredArticles.length})
          </ThemedText>
          {filteredArticles.map((article) => (
            <Pressable
              key={article.id}
              style={[
                styles.articleCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => setSelectedArticle(article)}>
              <View style={styles.articleCardContent}>
                <ThemedText style={styles.articleCardCategory}>{article.category}</ThemedText>
                <ThemedText style={styles.articleCardTitle}>{article.title}</ThemedText>
                <ThemedText style={styles.articleCardDescription}>{article.description}</ThemedText>
                <View style={styles.articleCardFooter}>
                  <IconSymbol size={16} name="clock" color={colors.icon} />
                  <ThemedText style={styles.articleCardReadTime}>{article.readTime} min</ThemedText>
                </View>
              </View>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  toggleFavorite(article.id);
                }}>
                <IconSymbol
                  size={24}
                  name={favorites.has(article.id) ? 'heart.fill' : 'heart'}
                  color={colors.primary}
                />
              </Pressable>
            </Pressable>
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  categoriesList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  articlesContainer: {
    paddingHorizontal: 20,
  },
  articleCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  articleCardContent: {
    flex: 1,
  },
  articleCardCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.6,
  },
  articleCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  articleCardDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 18,
  },
  articleCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  articleCardReadTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  articleContent: {
    paddingHorizontal: 20,
  },
  articleCategory: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.6,
  },
  articleTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  readTime: {
    fontSize: 13,
    opacity: 0.6,
  },
  articleDescription: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  articleBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
});
