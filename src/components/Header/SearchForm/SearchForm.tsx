import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { CACHE_KEY } from '@/shared';
import { useStorage } from '@/services';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { load, save } = useStorage(CACHE_KEY.searchQuery);

  useEffect(() => {
    const cachedValue = load();

    if (cachedValue && searchInput.current) {
      searchInput.current.value = cachedValue;
    }
  }, [load]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = searchInput.current?.value?.trim() || '';
    save(searchQuery && searchQuery);
    onSearch(searchQuery || '');
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex gap-3.5" onSubmit={handleSubmit}>
        <input
          className="focus:border-blue-md focus:ring-blue-lm focus:outline-blue-md min-w-52 rounded-lg border-none bg-white/[0.9] px-2 py-1 focus:ring-2"
          type="search"
          ref={searchInput}
          placeholder="Enter search term"
        />
        <button
          className="sm:hover:bg-blue-md active:bg-blue-md focus:outline-blue-xs cursor-pointer rounded-xl border-none bg-black px-4 py-3 text-white transition-colors duration-300 ease-in-out"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
