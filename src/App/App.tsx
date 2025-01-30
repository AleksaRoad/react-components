import { Component } from 'react';
import styles from './App.module.css';
import { rickAndMortyApi } from '@/api/rickAndMortyApi';
import type { RickAndMortyCharacter } from '@/api/types';
import type { AppState } from './types';
import { CharacterCard } from '@/CharacterCard/CharacterCard';
import { SearchForm } from '@/SearchForm/SearchForm';

export class App extends Component<unknown, AppState> {
  state = {
    characters: [],
  };

  async componentDidMount() {
    const characters: RickAndMortyCharacter[] =
      await rickAndMortyApi.getAllCharacters();
    const charactersWithImages = await Promise.all(
      characters.map(async (character) => {
        const imageUrl = await rickAndMortyApi.getCharacterById(character.id);
        return { ...character, image: imageUrl };
      })
    );
    this.setState({ characters: charactersWithImages });
  }

  render() {
    const { characters } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <div className={styles.searchContainer}>
          <SearchForm />
        </div>
        <div className={styles.itemsContainer}>
          <ul className={styles.list}>
            {characters.map((character: RickAndMortyCharacter) => (
              <li key={character.id}>
                <CharacterCard key={character.id} character={character} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
