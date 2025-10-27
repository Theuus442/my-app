# Style Guide - PsiCompanion

Guia detalhado para manter o código consistente e legível.

## 📐 Formatação

### Indentação
- **Espaços**: 2 (não tabs)
- **Configuração**: `.editorconfig` ou seu editor

### Comprimento de Linha
- **Máximo**: 100 caracteres
- **Exceção**: URLs, strings longas

```typescript
// ✅ Bom
const longString = 'This is a very long string that explains ' +
  'something important in the codebase and needs to be broken';

// ❌ Ruim
const longString = 'This is a very long string that explains something important in the codebase and needs to be broken';
```

## 🏗️ Estrutura de Arquivos

### Componentes

```typescript
// 1. Imports (separados por tipo)
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks';

import { MyType } from '@/types';
import { formatDate } from '@/utils/helpers';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onPress: () => void;
}

// 3. Component
export function MyComponent({ title, onPress }: MyComponentProps) {
  // Hooks primeiro
  const [count, setCount] = useState(0);
  const colorScheme = useColorScheme();

  // Callbacks
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  // Memos
  const displayText = useMemo(() => {
    return `${title} (${count})`;
  }, [title, count]);

  // Render
  return (
    <View>
      <ThemedText>{displayText}</ThemedText>
    </View>
  );
}

// 4. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Arquivo de Constantes

```typescript
// constants/data.ts

// Agrupar por contexto
export const MEDITATION_SESSIONS = [
  // ...
];

export const MOOD_OPTIONS = [
  // ...
];

export const MOODS_REASONS = [
  // ...
];
```

### Arquivo de Tipos

```typescript
// types/index.ts

// Agrupar por domínio
export interface MeditationSession {
  // ...
}

export interface SessionHistory {
  // ...
}

export interface MoodEntry {
  // ...
}
```

## 📝 Nomenclatura

### Arquivos
```
components/
  MyComponent.tsx         # Componente (PascalCase)
  my-component.tsx        # Componente (kebab-case) - preferir PascalCase

utils/
  helpers.ts              # Utilitários (camelCase)
  format-date.ts          # Com hífens se muitos (camelCase)

types/
  index.ts                # Tipos centralizados
```

### Variáveis e Funções

```typescript
// ✅ Bom
const MAX_RETRIES = 3;
const userEmail = '';
function calculateTotal() {}
const handleButtonPress = () => {};

// ❌ Evitar
const max_retries = 3;
const USER_EMAIL = '';
function CalcTotal() {}
const onButtonPress = () => {};
```

### Props

```typescript
interface ButtonProps {
  // Ações: on + NomeDo Evento
  onPress: () => void;
  onLongPress?: () => void;

  // Estados: is/has + Descrição
  isLoading?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;

  // Dados
  title: string;
  count?: number;

  // Estilos
  containerStyle?: ViewStyle;
  testID?: string;
}
```

### Booleans

```typescript
// ✅ Bom
const isVisible = true;
const hasError = false;
const canSubmit = true;

// ❌ Evitar
const visible = true;
const error = false;
const submit = true;
```

## 🎨 Padrões de Código

### Inicialização de State

```typescript
// ✅ Com tipo explícito
const [items, setItems] = useState<MenuItem[]>([]);
const [count, setCount] = useState<number>(0);

// ✅ Inferência de tipo
const [name, setName] = useState('');

// ❌ Evitar 'any'
const [data, setData] = useState<any>([]);
```

### UseEffect

```typescript
// ✅ Com dependências explícitas
useEffect(() => {
  loadData();
}, []);

useEffect(() => {
  saveData(userId);
  return () => {
    // Cleanup
  };
}, [userId]);

// ❌ Sem dependências (perigoso)
useEffect(() => {
  loadData();
});
```

### Condicionais

```typescript
// ✅ Ternário simples
return <View>{isLoading ? <Spinner /> : <Content />}</View>;

// ✅ && para um elemento
return <View>{hasError && <Error message={error} />}</View>;

// ✅ if para lógica complexa
if (!isLoaded) {
  return <Spinner />;
}

// ❌ Ternário complexo
return (
  <View>
    {
      isLoading ? (
        <Spinner />
      ) : hasError ? (
        <Error />
      ) : isEmpty ? (
        <Empty />
      ) : (
        <Content />
      )
    }
  </View>
);
```

### Desestruturação

```typescript
// ✅ Bom
function Component({ title, isLoading }: ComponentProps) {
  const { width, height } = useWindowDimensions();
  return <View />;
}

// ❌ Evitar
function Component(props: ComponentProps) {
  const title = props.title;
  const isLoading = props.isLoading;
}
```

## 🎭 Padrões de Estilos

### StyleSheet

```typescript
// ✅ Agrupado logicamente
const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },

  // Header styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },

  // Content styles
  content: {
    flex: 1,
  },
  contentItem: {
    marginBottom: 12,
  },
});

// ❌ Evitar (sem organização)
const styles = StyleSheet.create({
  container: {},
  title: {},
  header: {},
  item: {},
  text: {},
});
```

### Valores Dinâmicos

```typescript
// ✅ Valores dinâmicos apenas quando necessário
<View
  style={[
    styles.container,
    {
      backgroundColor: colors.background,
      paddingHorizontal: moderateScale(20),
    },
  ]}
/>

// ❌ Todos dinâmicos
<View
  style={{
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  }}
/>
```

## 🔤 Strings e Mensagens

### Mensagens de Usuário

```typescript
// ✅ Constantes centralizadas
const MESSAGES = {
  SUCCESS: 'Operação realizada com sucesso!',
  ERROR: 'Ocorreu um erro. Tente novamente.',
  LOADING: 'Carregando...',
};

// ✅ Mensagens com variáveis
`Olá, ${userName}! Você tem ${notificationCount} notificações.`

// ❌ Hardcoded em múltiplos lugares
Alert.alert('Sucesso', 'Operação realizada com sucesso!');
// ... em outro lugar
console.log('Operação realizada com sucesso!');
```

## 📦 Imports

### Ordem de Imports

```typescript
// 1. Biblioteca React/RN
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

// 2. Biblioteca externa
import Animated from 'react-native-reanimated';

// 3. Componentes internos
import { ThemedText } from '@/components/themed-text';
import { ScreenContainer } from '@/components/layout';

// 4. Hooks
import { useColorScheme } from '@/hooks';

// 5. Tipos
import type { MenuItem } from '@/types';

// 6. Constantes e utilidades
import { Colors } from '@/constants/theme';
import { formatDate } from '@/utils/helpers';
```

## ✅ Checklist de Qualidade

- [ ] Indentação consistente (2 espaços)
- [ ] Sem trailing whitespace
- [ ] Linha em branco no final do arquivo
- [ ] Sem console.log em produção
- [ ] Sem código comentado
- [ ] Nomes descritivos (não `x`, `temp`, `foo`)
- [ ] Máximo 100 caracteres por linha
- [ ] Imports organizados
- [ ] Tipos explícitos
- [ ] Padrão de destructuring aplicado
- [ ] useCallback para funções em props
- [ ] useMemo para cálculos custosos
- [ ] Acessibilidade verificada

## 🛠️ Ferramentas

### Prettier (Formatação Automática)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### ESLint (Linting)

Veja `.eslintrc.json` para configuração.

### TypeScript (Type Checking)

```bash
npx tsc --noEmit
```

## 📚 Referências

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

