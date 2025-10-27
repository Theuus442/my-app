# Guia de Contribuição - PsiCompanion

Obrigado por contribuir com o PsiCompanion! Este documento descreve os padrões de código e boas práticas do projeto.

## 📋 Antes de Começar

1. Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura do projeto
2. Familiarize-se com os padrões de código abaixo
3. Configure seu editor para respeitar as regras ESLint

## 🎨 Padrões de Código

### TypeScript

**✅ Fazer:**
```typescript
// Use tipos específicos
const users: User[] = [];
const count: number = 0;

// Exporte tipos públicos
export interface MenuItem {
  title: string;
  onPress: () => void;
}
```

**❌ Evitar:**
```typescript
// Evite 'any'
const data: any = {};

// Evite interfaces inline em props
function Component(props: { title: string; count: number }) {}
```

### React Native Components

**✅ Fazer:**
```typescript
import { useCallback, useMemo } from 'react';

export function MyComponent({ items, onSelect }: MyComponentProps) {
  // Use useCallback para funções em props
  const handleSelect = useCallback((id: string) => {
    onSelect(id);
  }, [onSelect]);

  // Use useMemo para cálculos custosos
  const filtered = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  return (
    <View accessible accessibilityRole="list">
      {filtered.map(item => (
        <Item key={item.id} {...item} onPress={handleSelect} />
      ))}
    </View>
  );
}
```

**❌ Evitar:**
```typescript
// Evite criar funções inline
<Button onPress={() => handleSelect(item.id)} />

// Evite cálculos no render
const filtered = items.filter(item => item.active);

// Evite componentes muito grandes (>300 linhas)
```

### Organização de Imports

```typescript
// 1. Biblioteca externa
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

// 2. Componentes internos
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

// 3. Hooks customizados
import { useColorScheme } from '@/hooks';
import { useScaleAnimation } from '@/hooks/use-animation';

// 4. Tipos
import { MenuItem } from '@/types';

// 5. Utilitários
import { formatTime } from '@/utils/helpers';
```

### Nomeação

```typescript
// Componentes: PascalCase
export function QuoteCard() {}

// Funções: camelCase
export function formatDate() {}

// Constantes: UPPER_SNAKE_CASE
export const MEDITATION_SESSIONS = [];

// Interfaces/Types: PascalCase
export interface User {}
export type Status = 'active' | 'inactive';

// Eventos: handleNomeDoEvento
const handlePressButton = () => {};
const handleSelectItem = () => {};
```

### Estilos

**✅ Fazer:**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
```

**❌ Evitar:**
```typescript
// Evite estilos inline quando possível
<View style={{ flex: 1, padding: 16 }} />

// Evite magic numbers
<View style={{ marginTop: 42 }} /> // Use moderateScale(42)
```

### Acessibilidade

**✅ Fazer:**
```typescript
<Pressable
  accessible
  accessibilityRole="button"
  accessibilityLabel="Enviar formulário"
  testID="submit-button"
  onPress={handleSubmit}>
  <ThemedText>Enviar</ThemedText>
</Pressable>
```

**❌ Evitar:**
```typescript
// Sem labels acessíveis
<Pressable onPress={handleSubmit}>
  <ThemedText>→</ThemedText>
</Pressable>
```

## 📁 Estrutura de Pastas

Ao adicionar novos componentes:

```
components/
  ├── novo-componente.tsx    # Se é um componente isolado
  └── feature/
      ├── sub-component.tsx  # Se faz parte de uma feature
      └── index.ts           # Exporte centralizado
```

Ao adicionar novos hooks:

```
hooks/
  ├── use-novo-hook.ts       # Novo hook
  └── index.ts               # Sempre exporte aqui
```

## 🧪 Performance

### Memoização

Use `useMemo` e `useCallback` quando:
- A função é passada como prop
- O cálculo é custoso (arrays grandes, operações complexas)
- O componente renderiza frequentemente

```typescript
// ✅ Bom
const handlePress = useCallback(() => {
  onPress(id);
}, [id, onPress]);

// ✅ Bom para cálculos
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

### Tamanho de Componentes

- Mantenha componentes < 300 linhas
- Quebre em componentes menores
- Reutilize componentes de layout

```typescript
// ❌ Ruim (muitas responsabilidades)
function ProgressScreen() {
  // 400+ linhas com lógica, UI, estilos

// ✅ Bom (separado)
function ProgressScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader title="Progresso" />
      <StatsGrid />
      <AchievementsSection />
    </ScreenContainer>
  );
}
```

## 🔍 Checklist de Qualidade

Antes de submeter seu PR:

- [ ] Código segue o padrão TypeScript (sem `any`)
- [ ] Nomes são claros e descritivos
- [ ] Sem código duplicado
- [ ] Performance otimizada (useMemo, useCallback)
- [ ] Acessibilidade verificada
- [ ] Estilos consistentes com o projeto
- [ ] Sem console.log em produção
- [ ] Componentes bem documentados

## 🚀 Como Submeter uma Contribuição

1. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/sua-feature
   ```

2. Faça suas mudanças seguindo os padrões acima

3. Teste seu código
   ```bash
   npm run lint
   ```

4. Commite suas mudanças
   ```bash
   git commit -m "feat: descrição clara da mudança"
   ```

5. Faça push para seu fork
   ```bash
   git push origin feature/sua-feature
   ```

6. Abra um Pull Request com descrição clara

## 📚 Recursos Úteis

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Estrutura do projeto

## ❓ Dúvidas?

Abra uma issue ou entre em contato com o time de desenvolvimento.

