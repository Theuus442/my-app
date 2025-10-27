# PsiCompanion - Arquitetura e Estrutura do Projeto

## 📁 Estrutura de Pastas

```
project/
├── app/                          # Rotas e telas principais (Expo Router)
│   ├── (tabs)/                  # Grupo de telas com tabs
│   │   ├── index.tsx            # Tela inicial
│   │   ├── meditation.tsx       # Telas de meditação
│   │   ├── library.tsx          # Biblioteca de artigos
│   │   ├── progress.tsx         # Progresso e conquistas
│   │   ├── mood.tsx             # Rastreamento de humor
│   │   ├── gratitude.tsx        # Diário de gratidão
│   │   ├── explore.tsx          # Exploração
│   │   ├── settings.tsx         # Configurações
│   │   └── _layout.tsx          # Layout das tabs
│   ├── _layout.tsx              # Layout raiz
│   └── modal.tsx                # Modal compartilhado
│
├── components/                   # Componentes reutilizáveis
│   ├── layout/                  # Componentes de layout padrão
│   │   ├── screen-container.tsx # Container para telas
│   │   ├── screen-header.tsx    # Header padronizado
│   │   ├── stat-card.tsx        # Card de estatísticas
│   │   ├── section-card.tsx     # Card de seção
│   │   └── index.ts             # Índice de exportações
│   ├── ui/                      # Componentes UI baixo nível
│   │   ├── icon-symbol.tsx      # Ícones
│   │   └── collapsible.tsx      # Componente expansível
│   ├── animated-companion.tsx   # Mascote animado
│   ├── wellness-bar.tsx         # Barra de bem-estar
│   ├── quote-card.tsx           # Card de citação
│   ├── quick-action-card.tsx    # Card de ação rápida
│   ├── themed-text.tsx          # Texto com tema
│   ├── responsive-container.tsx # Container responsivo
│   └── ...
│
├── hooks/                        # Hooks customizados
│   ├── use-animation.ts         # Animações reutilizáveis
│   ├── use-local-storage.ts     # Persistência de dados
│   ├── use-color-scheme.ts      # Tema (light/dark)
│   ├── use-theme-color.ts       # Cores do tema
│   └── index.ts                 # Índice de exportações
│
├── constants/                    # Constantes do projeto
│   ├── theme.ts                 # Definições de cores e fontes
│   └── data.ts                  # Dados constantes (arrays)
│
├── types/                        # Tipos TypeScript centralizados
│   └── index.ts                 # Definições de interfaces
│
├── utils/                        # Utilitários e helpers
│   ├── responsive.ts            # Funções de responsividade
│   └── helpers.ts               # Funções auxiliares gerais
│
├── package.json                  # Dependências
├── tsconfig.json                # Configuração TypeScript
├── app.json                     # Configuração Expo
└── ARCHITECTURE.md              # Este arquivo
```

## 🎯 Padrões e Convenções

### Nomeação

- **Componentes**: PascalCase (`QuoteCard.tsx`, `ScreenHeader.tsx`)
- **Funções/Variáveis**: camelCase (`formatTime`, `getCurrentTime`)
- **Constantes**: UPPER_SNAKE_CASE (`MOTIVATIONAL_QUOTES`, `MEDITATION_SESSIONS`)
- **Arquivos de tipo**: `*.ts` para exports centralizados
- **Arquivos de componente**: `*.tsx`

### Estrutura de Componentes

```typescript
// 1. Imports
import React from 'react';
import { StyleSheet, View } from 'react-native';

// 2. Tipos/Interfaces
interface ComponentProps {
  title: string;
  onPress: () => void;
}

// 3. Componente
export function MyComponent({ title, onPress }: ComponentProps) {
  return (
    <View>
      {/* Conteúdo */}
    </View>
  );
}

// 4. Estilos
const styles = StyleSheet.create({
  // Estilos...
});
```

### Tipagem TypeScript

- **Centralizar tipos** em `types/index.ts`
- **Reutilizar interfaces** em vez de duplicar
- **Usar tipos específicos** em vez de `any`
- **Exportar interfaces públicas** dos componentes

Exemplo:
```typescript
// ❌ Evitar (inline)
interface Props {
  items: Array<{ id: string; title: string }>;
}

// ✅ Preferir (centralizado)
import { Article } from '@/types';

interface Props {
  items: Article[];
}
```

### Estado e Persistência

Para dados que precisam ser persistidos:

```typescript
import { useLocalStorage } from '@/hooks';

function MyComponent() {
  const { value: favorites, setValue } = useLocalStorage<string[]>('favorites', []);
  
  return (
    // Componente...
  );
}
```

### Animações

Use os hooks de animação para evitar duplicação:

```typescript
import { useScaleAnimation } from '@/hooks';

function MyButton() {
  const { animatedStyle, triggerAnimation } = useScaleAnimation();
  
  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={() => triggerAnimation()}>
        {/* Botão */}
      </Pressable>
    </Animated.View>
  );
}
```

## 🔄 Fluxo de Dados

### Temas (Light/Dark)

```
useColorScheme() → Colors.light/Colors.dark → Component
      ↓
use-theme-color.ts (hook auxiliar)
```

### Responsividade

```
useDeviceSize() → Scale functions → Component
      ↓
scaleFont, moderateScale, verticalScale
```

### Dados Locais

```
useLocalStorage() → AsyncStorage → Component state
```

## 📦 Estrutura de Constantes

### data.ts
- Arrays de dados (MEDITATION_SESSIONS, ARTICLES, etc.)
- Opções de seleção (MOOD_OPTIONS, MOOD_REASONS, etc.)
- Dados que raramente mudam

### theme.ts
- Paleta de cores
- Definições de fonte
- Estilos globais

## 🎨 Sistema de Design

### Cores

```typescript
Colors.light = {
  text: '#0F172A',
  primary: '#10B981',      // Verde
  secondary: '#06B6D4',    // Ciano
  accent: '#8B5CF6',       // Roxo
  // ... mais cores
};
```

### Responsividade

- **phones**: < 360px (isSmall)
- **tablets**: ≥ 768px (isTablet)
- **large**: > 414px (isLarge)
- **desktop**: > 1024px (isDesktop)

## 🔧 Funções Auxiliares (helpers.ts)

Funções reutilizáveis para lógica comum:

```typescript
- formatTime(seconds): "MM:SS"
- getCurrentTime(): Data formatada
- getMoodEmoji(mood): Emoji do humor
- getWellnessColor(level): Cor baseada em nível
- formatDate(date): Data formatada
- calculateStreak(entries): Dias consecutivos
```

## ✨ Boas Práticas

1. **DRY (Don't Repeat Yourself)**
   - Extrair código duplicado em componentes/funções

2. **Composição**
   - Quebrar componentes grandes em menores
   - Reutilizar componentes de layout

3. **Tipagem**
   - Sempre usar tipos específicos
   - Centralizar tipos no `types/index.ts`

4. **Performance**
   - Usar `useMemo` para cálculos custosos
   - Usar `useCallback` para funções em props
   - Memoizar componentes se necessário

5. **Acessibilidade**
   - Adicionar `accessible` e `accessibilityRole`
   - Usar `accessibilityLabel` significativo
   - Testar com leitores de tela

6. **Organização**
   - Manter estilos junto do componente
   - Imports agrupados por tipo
   - Ordem: externos → internos → tipos

## 🚀 Como Adicionar Novos Recursos

### 1. Novo tipo/interface
```typescript
// types/index.ts
export interface NovoTipo {
  // ...
}
```

### 2. Novo componente
```typescript
// components/novo-componente.tsx
import { NovoTipo } from '@/types';

export function NovoComponente(props: NovoTipo) {
  // Implementação
}
```

### 3. Nova constante
```typescript
// constants/data.ts
export const NOVA_CONSTANTE = [...]
```

### 4. Novo hook
```typescript
// hooks/use-novo-hook.ts
export function useNovoHook() {
  // Lógica
}
```

## 📋 Checklist para Refatoração

- [ ] Código duplicado eliminado
- [ ] Tipos centralizados em `types/index.ts`
- [ ] Constantes em `constants/data.ts`
- [ ] Helpers em `utils/helpers.ts`
- [ ] Componentes menores e reutilizáveis
- [ ] Hooks para lógica comum
- [ ] Estilos consistentes
- [ ] Acessibilidade verificada
- [ ] Performance otimizada
- [ ] Nomes claros e consistentes

