const getStorageService = () => {
  const loadSearchQuery = (key: string): string | null => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue === null || cachedValue.trim() === '') {
      return null;
    }
    return JSON.parse(cachedValue);
  };
  const saveSearchQuery = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    loadSearchQuery,
    saveSearchQuery,
  };
};

export const storageService = getStorageService();
