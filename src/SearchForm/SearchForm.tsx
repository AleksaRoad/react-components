import type { FormEvent, RefObject } from 'react';
import { Component, createRef } from 'react';
import { CACHE_KEY } from '@/api/constants';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import styles from './SearchForm.module.css';
import type { SearchFormProps } from './types';

export class SearchForm extends Component<SearchFormProps> {
  private searchInput: RefObject<HTMLInputElement | null> = createRef();

  componentDidMount() {
    const savedSearchQuery = rickAndMortyApi.getFromLocalStorage(
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
      rickAndMortyApi.saveToLocalStorage(CACHE_KEY.searchQuery, searchQuery);
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
      <div className={styles.searchContainer}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            type="search"
            ref={this.searchInput}
            placeholder="Enter search term"
            onFocus={this.handleFocus}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}
