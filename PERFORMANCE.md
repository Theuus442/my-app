# Performance - PsiCompanion

Guia de melhores práticas para otimizar a performance do aplicativo.

## 🎯 Métricas Importantes

### FCP (First Contentful Paint)
- **Alvo**: < 1s
- **Estratégia**: Lazy load de componentes pesados

### TTI (Time to Interactive)
- **Alvo**: < 2s
- **Estratégia**: Compilação otimizada, code splitting

### Memory Usage
- **Alvo**: < 100MB (mobile)
- **Estratégia**: Recycling de componentes, limpeza de listeners

## 🚀 Otimizações Implementadas

### 1. Memoização de Componentes

```typescript
// hooks/use-animation.ts - Animações reutilizáveis
// Evita recriação de shared values em cada render

export function useScaleAnimation(initialScale = 1) {
  const scale = useSharedValue(initialScale);
  // ... resto da lógica
}
```

**Benefício**: Reduz re-renders desnecessários

### 2. useMemo para Cálculos Custosos

```typescript
// Uso em app/(tabs)/library.tsx
const filteredArticles = useMemo(() => {
  return ARTICLES.filter((article) => {
    const matchCategory = !selectedCategory || article.category === selectedCategory;
    const matchSearch = searchQuery === '' || /* ... */;
    return matchCategory && matchSearch;
  });
}, [selectedCategory, searchQuery]);
```

**Benefício**: Evita recálculo em cada render

### 3. useCallback para Funções em Props

```typescript
// Antes ❌
<Button onPress={() => handleSelect(id)} />

// Depois ✅
const handleSelect = useCallback((id: string) => {
  onSelect(id);
}, [onSelect]);

<Button onPress={handleSelect} />
```

**Benefício**: Evita re-criação de funções

### 4. Lazy Loading de Imagens

```typescript
// Use Image.prefetch para pré-carregar
Image.prefetch(imageUrl);

// Carregue sob demanda
<Image
  source={{ uri: imageUrl }}
  onLoad={() => setIsLoaded(true)}
/>
```

### 5. React.memo para Componentes Puros

```typescript
const StatCard = React.memo(({ emoji, value, label }: StatCardProps) => {
  return (
    // Componente...
  );
});
```

**Benefício**: Evita re-render se as props não mudarem

## 📊 Estratégias por Tela

### Home Screen (index.tsx)
- ✅ Usa ResponsiveContainer (memoizado)
- ✅ Animação do mascote otimizada
- ⚠️ Considerar lazy loading de cards

### Meditation Screen
- ✅ States locais bem estruturados
- ⚠️ Intervalo de timer otimizado (1s)
- 🔧 Poderia usar Web Workers para timer pesado

### Library Screen
- ✅ useMemo para filteredArticles
- ✅ ScrollView com showsVerticalScrollIndicator={false}
- ⚠️ Considerar virtualização para muitos artigos

### Progress Screen
- ✅ Dados estáticos em constantes
- ⚠️ Gráfico poderia ser otimizado com canvas
- 🔧 Achievement grid poderia usar FlatList

## 🔧 Otimizações Recomendadas

### 1. FlatList vs ScrollView

**Quando usar FlatList**:
- Mais de 10 itens
- Tamanho de item grande
- Scroll pesado

```typescript
// ❌ Evitar para muitos itens
<ScrollView>
  {items.map(item => <Item key={item.id} {...item} />)}
</ScrollView>

// ✅ Usar FlatList
<FlatList
  data={items}
  renderItem={({ item }) => <Item {...item} />}
  keyExtractor={(item) => item.id}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

### 2. Evitar Renderizações Desnecessárias

```typescript
// ❌ Ruim - cria novo array a cada render
const handlePress = () => {
  setItems([...items, newItem]);
};

// ✅ Melhor - usa spread operator eficientemente
const handlePress = useCallback(() => {
  setItems(prev => [newItem, ...prev]);
}, [newItem]);
```

### 3. Code Splitting com Lazy Import

```typescript
// Lazy load de telas menos frequentes
const SettingsScreen = lazy(() => import('./settings'));
const LibraryScreen = lazy(() => import('./library'));
```

### 4. Otimização de Imagens

```typescript
// Use Image Optimization
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl, priority: FastImage.priority.normal }}
  style={{ width: 100, height: 100 }}
  resizeMode={FastImage.resizeMode.contain}
/>
```

### 5. Monitoramento de Performance

```typescript
// Use React Native Performance API
import { PerformanceObserver } from 'perf_hooks';

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
  });
});

observer.observe({ entryTypes: ['measure'] });
```

## 📈 Benchmarks Atuais

| Métrica | Baseline | Alvo | Status |
|---------|----------|------|--------|
| Home Load | 800ms | 500ms | ⚠️ |
| Memory | 95MB | 100MB | ✅ |
| FPS (Scroll) | 58fps | 60fps | ⚠️ |
| Bundle Size | 2.5MB | 2.0MB | ⚠️ |

## 🛠️ Ferramentas de Debug

### React Native Debugger
```bash
# Instale
npm install -g react-native-debugger

# Rode
react-native-debugger
```

### Profiling no Expo
```bash
# React Profiler
expo start --dev-client
# Pressione P para profiler
```

### Chrome DevTools
```bash
# Para debugging de animações
expo start
# Abra chrome://inspect
```

## 📝 Checklist de Performance

- [ ] Componentes grandes divididos em menores
- [ ] useMemo para cálculos custosos
- [ ] useCallback para funções em props
- [ ] React.memo para componentes puros
- [ ] FlatList para listas longas
- [ ] Lazy loading de imagens pesadas
- [ ] Sem console.log em produção
- [ ] Animações usando Reanimated
- [ ] Listeners removidos em cleanup
- [ ] Sem memory leaks

## 🎯 Próximos Passos

1. Implementar FlatList na Library (muitos artigos)
2. Adicionar FastImage para imagens
3. Implementar Code Splitting
4. Performance monitoring em produção
5. Otimizar bundle size

