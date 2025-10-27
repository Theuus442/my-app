/**
 * Constantes de dados reutilizáveis
 * Evita hardcoding e facilita manutenção
 */

import { MeditationSession, Article, Achievement } from '@/types';

export const MOTIVATIONAL_QUOTES = [
  'Você é mais forte do que imagina! 💪',
  'Respire fundo. Você está no controle. 🌬️',
  'Cada pequeno passo importa. Continue! 🚶',
  'Hoje é um novo começo. Aproveite! ☀️',
  'Você merece cuidar de si mesmo. 💝',
  'Está tudo bem não estar bem o tempo todo. 🤗',
  'Seu progresso é válido, por menor que seja. 📈',
] as const;

export const MEDITATION_SESSIONS: MeditationSession[] = [
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

export const MOOD_OPTIONS = [
  { emoji: '💔', label: 'Muito Ruim', value: 1 },
  { emoji: '😔', label: 'Ruim', value: 2 },
  { emoji: '😌', label: 'Normal', value: 3 },
  { emoji: '😊', label: 'Bem', value: 4 },
  { emoji: '🌟', label: 'Ótimo', value: 5 },
] as const;

export const MOOD_REASONS = [
  'Trabalho',
  'Relacionamento',
  'Saúde',
  'Finanças',
  'Família',
  'Amigos',
  'Pessoal',
  'Outro',
] as const;

export const LIBRARY_CATEGORIES = [
  'Respiração',
  'Gratidão',
  'TCC',
  'Artigos',
  'Mindfulness',
] as const;

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'A Respiração 4-7-8',
    description: 'Técnica simples para acalmar a mente',
    category: 'Respiração',
    content: 'A respiração 4-7-8 é uma técnica simples mas poderosa...',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Meditação Mindfulness',
    description: 'Guia completo para iniciantes',
    category: 'Mindfulness',
    content: 'Mindfulness é a prática de estar presente no momento...',
    readTime: 8,
  },
  {
    id: '3',
    title: 'Técnicas de TCC para Ansiedade',
    description: 'Ferramentas práticas para lidar com a ansiedade',
    category: 'TCC',
    content: 'A Terapia Cognitivo-Comportamental oferece ferramentas eficazes...',
    readTime: 10,
  },
  {
    id: '4',
    title: 'Diário de Gratidão',
    description: 'Como iniciar e manter a prática',
    category: 'Gratidão',
    content: 'Um diário de gratidão pode transformar sua perspectiva...',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Saúde Mental e Sono',
    description: 'A importância do descanso para bem-estar',
    category: 'Artigos',
    content: 'O sono adequado é fundamental para a saúde mental...',
    readTime: 7,
  },
  {
    id: '6',
    title: 'Exercício de Respiração Alternada',
    description: 'Balanceie energia e calma',
    category: 'Respiração',
    content: 'A respiração alternada pelas narinas é uma técnica antiga...',
    readTime: 5,
  },
  {
    id: '7',
    title: 'Reconhecimento de Pensamentos Automáticos',
    description: 'Entenda seus padrões mentais',
    category: 'TCC',
    content: 'Os pensamentos automáticos são aqueles que surgem naturalmente...',
    readTime: 9,
  },
  {
    id: '8',
    title: 'Prática Diária de Gratidão',
    description: 'Transforme sua realidade em 30 dias',
    category: 'Gratidão',
    content: 'Uma prática simples de gratidão diária pode mudar sua vida...',
    readTime: 6,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Primeiro Passo',
    description: 'Completar primeira meditação',
    icon: '⭐',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Uma Semana',
    description: '7 dias consecutivos',
    icon: '✨',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Dedicado',
    description: '30 dias consecutivos',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Mestre da Meditação',
    description: '100 minutos totais',
    icon: '💎',
    unlocked: false,
  },
  {
    id: '5',
    title: 'Grato',
    description: 'Registrar 10 itens de gratidão',
    icon: '💫',
    unlocked: true,
  },
  {
    id: '6',
    title: 'Equilibrado',
    description: 'Manter humor em 80%+',
    icon: '🌈',
    unlocked: false,
  },
];
