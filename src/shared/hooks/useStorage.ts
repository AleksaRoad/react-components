import { useCallback, useMemo } from 'react';

export const useStorage = (key: string) => {
  const load = useCallback(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      try {
        return JSON.parse(storageValue);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return null;
  }, [key]);

  const save = useCallback(
    (value: string) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return useMemo(() => ({ load, save }), [load, save]);
};
