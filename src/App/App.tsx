import { Component } from 'react';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import type { RickAndMortyCharacter } from '@/api/types';
import { SearchForm } from '@/SearchForm/SearchForm';
import { CharacterCard } from '@/CharacterCard/CharacterCard';
import styles from './App.module.css';
import { CACHE_KEY } from '@/api/constants';
import type { AppState } from './types';
import { PaginationControl } from '@/PaginationControl/PaginationControl';

export class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 0,
  };

  async componentDidMount() {
    const totalPages = await rickAndMortyApi.getTotalPages();
    const savedSearchQuery = rickAndMortyApi.getFromLocalStorage(
      CACHE_KEY.searchQuery
    );

    this.setState({ totalPages });
    if (savedSearchQuery) {
      this.setState({ searchQuery: savedSearchQuery }, () => {
        this.fetchCharacters(savedSearchQuery);
      });
    } else {
      this.fetchCharacters();
    }
  }

  async fetchCharacters(searchQuery: string = '') {
    try {
      const characters = await rickAndMortyApi.getCharacters(
        searchQuery,
        this.state.currentPage
      );
      const charactersWithImages = await Promise.all(
        characters.map(async (character) => {
          const imageUrl = await rickAndMortyApi.getCharacterById(character.id);
          return { ...character, image: imageUrl };
        })
      );
      this.setState({ characters: charactersWithImages });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
  }

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery, currentPage: 1 }, () => {
      rickAndMortyApi.saveToLocalStorage(CACHE_KEY.searchQuery, searchQuery);
      this.fetchCharacters(searchQuery);
    });
  };

  handleNextPage = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 }),
        () => this.fetchCharacters(this.state.searchQuery)
      );
    }
  };

  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage - 1 }),
        () => this.fetchCharacters(this.state.searchQuery)
      );
    }
  };

  render() {
    const { characters, currentPage, totalPages } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <div className={styles.header}>
          <SearchForm onSearch={this.handleSearch} />
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={this.handlePreviousPage}
            onNextPage={this.handleNextPage}
          />
        </div>
        <ul className={styles.list}>
          {characters.length > 0 ? (
            characters.map((character: RickAndMortyCharacter) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))
          ) : (
            <p>No characters found</p>
          )}
        </ul>
      </div>
    );
  }
}
