import { Component } from 'react';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import type { RickAndMortyCharacter } from '@/api/types';
import { SearchForm } from '@/SearchForm/SearchForm';
import { CharacterCard } from '@/CharacterCard/CharacterCard';
import styles from './App.module.css';
import { CACHE_KEY } from '@/api/constants';

export class App extends Component {
  state = {
    characters: [],
    searchQuery: '',
  };

  async componentDidMount() {
    const savedSearchQuery = rickAndMortyApi.getFromLocalStorage(
      CACHE_KEY.searchQuery
    );
    if (savedSearchQuery) {
      this.setState({ searchQuery: savedSearchQuery });
      this.fetchCharacters(savedSearchQuery);
    } else {
      this.fetchCharacters();
    }
  }
  async fetchCharacters(searchQuery: string = '') {
    const characters = await rickAndMortyApi.getCharacters(searchQuery);
    const charactersWithImages = await Promise.all(
      characters.map(async (character) => {
        const imageUrl = await rickAndMortyApi.getCharacterById(character.id);
        return { ...character, image: imageUrl };
      })
    );
    this.setState({ characters: charactersWithImages });
  }

  handleSearch = async (searchQuery: string) => {
    this.setState({ searchQuery });

    if (searchQuery) {
      rickAndMortyApi.saveToLocalStorage(CACHE_KEY.searchQuery, searchQuery);
    } else {
      rickAndMortyApi.saveToLocalStorage(CACHE_KEY.searchQuery, '');
    }
    this.fetchCharacters(searchQuery);
  };

  render() {
    const { characters } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <SearchForm onSearch={this.handleSearch} />
        <ul className={styles.list}>
          {characters.map((character: RickAndMortyCharacter) => (
            <li key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
