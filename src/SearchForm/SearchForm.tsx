import type { FormEvent, RefObject } from 'react';
import { Component, createRef } from 'react';
import { CACHE_KEY } from '@/services/api/constants';
import styles from './SearchForm.module.css';
import type { SearchFormProps } from './types';
import { storageService } from '@/services/storageService';

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
