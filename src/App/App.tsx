import { Component } from 'react';
import type { RickAndMortyCharacter } from '@/shared/types';
import { SearchForm } from '@/SearchForm/SearchForm';
import { CharacterCard } from '@/CharacterCard/CharacterCard';
import styles from './App.module.css';
import { CACHE_KEY, ERROR_MESSAGES } from '@/shared/constants';
import type { AppState, CustomError } from './types';
import { PaginationControl } from '@/PaginationControl/PaginationControl';
import { storageService } from '@/services/storageService';
import { Spinner } from '@/App/Spinner/Spinner';
import clsx from 'clsx';
import { rickAndMortyService } from '@/services/rickAndMortyService';
import { ErrorBoundary } from '@/services/errorBoundary/errorBoundary';
import { ErrorBoundaryButton } from '@/services/errorBoundary/ErrorBoundaryButton';

export class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: false,
    errorMessage: '',
  };

  async componentDidMount() {
    const savedSearchQuery =
      storageService.loadSearchQuery(CACHE_KEY.searchQuery) || '';
    await this.loadData(savedSearchQuery, 1);
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
        error: false,
        errorMessage: '',
      });
    } catch (error) {
      console.error(ERROR_MESSAGES.FAILED_TO_FETCH_DATA, error);
      this.setState({
        loading: false,
        error: true,
        errorMessage: ERROR_MESSAGES.FAILED_TO_FETCH_DATA,
      });
    }
  }

  handleSearch = (searchQuery: string) => {
    this.setState(
      { searchQuery, currentPage: 1, loading: true, error: false },
      () => {
        storageService.saveSearchQuery(CACHE_KEY.searchQuery, searchQuery);
        this.loadData(searchQuery, 1);
      }
    );
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page, loading: true, error: false }, () => {
      this.loadData(this.state.searchQuery, page);
    });
  };

  handleError = () => {
    const error: CustomError = new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    error.status = 400;
    this.setState({ error: true, errorMessage: error.message });
    throw error;
  };

  render() {
    const {
      characters,
      currentPage,
      totalPages,
      loading,
      searchQuery,
      error,
      errorMessage,
    } = this.state;
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
        ) : error ? (
          <div className={styles.errorContent}>
            <h2>{errorMessage}</h2>
          </div>
        ) : isResultsFound ? (
          <ErrorBoundary fallback={errorMessage}>
            <ul className={styles.list}>
              {characters.map((character: RickAndMortyCharacter) => (
                <li key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ul>
          </ErrorBoundary>
        ) : (
          <p className={clsx(styles.noResults)}>
            {ERROR_MESSAGES.NO_RESULTS_FOUND}
            <span className={styles.searchQuery}>{`'${searchQuery}'`}</span>
          </p>
        )}

        <div className={styles.footer}>
          {showPagination && !error && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={() => this.handlePageChange(currentPage - 1)}
              onNextPage={() => this.handlePageChange(currentPage + 1)}
            />
          )}
          <ErrorBoundaryButton onClick={this.handleError}>
            Trigger Error
          </ErrorBoundaryButton>
        </div>
      </div>
    );
  }
}
