import { Component } from 'react';
import type { RickAndMortyCharacter } from '@/shared/types';
import { SearchForm } from '@/SearchForm/SearchForm';
import { CharacterCard } from '@/CharacterCard/CharacterCard';
import styles from './App.module.css';
import { CACHE_KEY, ERROR_MESSAGES } from '@/shared/constants';
import type { AppState } from './types';
import { PaginationControl } from '@/PaginationControl/PaginationControl';
import { storageService } from '@/services/storageService';
import { Spinner } from '@/App/Spinner/Spinner';
import clsx from 'clsx';
import { rickAndMortyService } from '@/services/rickAndMortyService';

export class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
    loading: false,
  };

  async componentDidMount() {
    const savedSearchQuery = storageService.loadSearchQuery(
      CACHE_KEY.searchQuery
    );
    await this.loadData(savedSearchQuery || '', 1);
  }

  async loadData(searchQuery: string, page: number) {
    this.setState({ loading: true });

    try {
      const { charactersWithImages, totalPages } =
        await rickAndMortyService.fetchCharacters(searchQuery, page);
      this.setState({
        characters: charactersWithImages,
        totalPages,
        searchQuery,
        loading: false,
      });
    } catch (error) {
      console.error(ERROR_MESSAGES.FAILED_TO_FETCH_DATA, error);
      this.setState({ loading: false });
    }
  }

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery, currentPage: 1, loading: true }, () => {
      storageService.saveSearchQuery(CACHE_KEY.searchQuery, searchQuery);
      this.loadData(searchQuery, 1);
    });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page, loading: true }, () => {
      this.loadData(this.state.searchQuery, page);
    });
  };

  render() {
    const { characters, currentPage, totalPages, loading, searchQuery } =
      this.state;
    const isResultsFound = characters.length > 0;
    const showPagination = searchQuery.length > 0 && totalPages > 1;

    return (
      <div className={styles.container} key="app-container">
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <div className={styles.header}>
          <SearchForm onSearch={this.handleSearch} />
        </div>
        {loading ? (
          <Spinner />
        ) : isResultsFound ? (
          <ul className={styles.list}>
            {characters.map((character: RickAndMortyCharacter) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={clsx(styles.noResults)}>
            {`No results found for your search for `}
            <span className={styles.searchQuery}>{`'${searchQuery}'`}</span>
          </p>
        )}
        <div className={styles.footer}>
          {showPagination && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={() => this.handlePageChange(currentPage - 1)}
              onNextPage={() => this.handlePageChange(currentPage + 1)}
            />
          )}
        </div>
      </div>
    );
  }
}
