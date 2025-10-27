import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook para armazenar dados localmente (JSON)
 * Reutilizável para salvar qualquer tipo de dado
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega valor inicial do AsyncStorage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Erro ao carregar ${key}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key]);

  // Função para salvar valor
  const setValue = useCallback(
    async (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Erro ao salvar ${key}:`, error);
      }
    },
    [key, storedValue]
  );

  // Função para remover valor
  const removeValue = useCallback(async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover ${key}:`, error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue, isLoading };
}

/**
 * Hook para Array armazenado localmente
 */
export function useLocalStorageArray<T extends { id: string }>(
  key: string,
  initialValue: T[] = []
) {
  const { value, setValue, removeValue } = useLocalStorage<T[]>(key, initialValue);

  const addItem = useCallback(
    (item: T) => {
      setValue((prev) => [item, ...prev]);
    },
    [setValue]
  );

  const removeItem = useCallback(
    (id: string) => {
      setValue((prev) => prev.filter((item) => item.id !== id));
    },
    [setValue]
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<T>) => {
      setValue((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    },
    [setValue]
  );

  return { items: value, addItem, removeItem, updateItem, clear: removeValue };
}
