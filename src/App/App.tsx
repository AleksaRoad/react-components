import { Component } from 'react';
import styles from './App.module.css';
import { CACHE_KEY } from '@/shared';
import type { AppState } from './types';
import { storageService } from '@/services';
import { rickAndMortyService } from '@/services';
import { Header } from '@/components';
import { Footer } from '@/components';
import { Main } from '@/components';
import { Spinner } from '@/components';

export class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
    loading: false,
    apiErrorMessage: '',
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
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `${error}`;
      this.setState({ apiErrorMessage: errorMessage, loading: false });
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
    const showPagination = searchQuery.length > 0 && totalPages > 1;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <Header
          onSearch={this.handleSearch}
          apiErrorMessage={this.state.apiErrorMessage}
        />
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <Main
            characters={characters}
            searchQuery={searchQuery}
            apiErrorMessage={this.state.apiErrorMessage}
          />
        )}
        <Footer
          showPagination={showPagination}
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => this.handlePageChange(currentPage - 1)}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
