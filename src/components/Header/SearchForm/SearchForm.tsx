import type { FormEvent, RefObject } from 'react';
import { Component, createRef } from 'react';
import { CACHE_KEY } from '@/shared';
import type { SearchFormProps } from './types';
import { storageService } from '@/services';

export class SearchForm extends Component<SearchFormProps> {
  private searchInput: RefObject<HTMLInputElement | null> = createRef();

  componentDidMount() {
    const savedSearchQuery = storageService.loadSearchQuery(
      CACHE_KEY.searchQuery
    );
    if (savedSearchQuery && this.searchInput.current) {
      this.searchInput.current.value = savedSearchQuery;
    }
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = this.searchInput.current?.value.trim() || '';
    if (searchQuery) {
      storageService.saveSearchQuery(CACHE_KEY.searchQuery, searchQuery);
      this.props.onSearch(searchQuery);
    } else {
      this.props.onSearch('');
    }
  };

  handleFocus = () => {
    if (this.searchInput.current) {
      this.searchInput.current.value = '';
    }
  };

  render() {
    return (
      <div className="flex items-center justify-center">
        <form className="flex gap-3.5" onSubmit={this.handleSubmit}>
          <input
            className="focus:border-blue-md focus:ring-blue-lm min-w-52 rounded-lg border-none bg-white/[0.9] px-2 py-1 focus:ring-2 focus:outline-none"
            type="search"
            ref={this.searchInput}
            placeholder="Enter search term"
            onFocus={this.handleFocus}
          />
          <button
            className="hover:bg-blue-md cursor-pointer rounded-xl border-none bg-black px-4 py-3 text-white transition-colors duration-300 ease-in-out"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
