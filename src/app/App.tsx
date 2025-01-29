import { Component } from 'react';
import styles from './App.module.css';
import { RickAndMortyApi } from '@/api/rickAndMortyApi';
import type { RickAndMortyCharacter } from '@/api/types';
import type { AppProps, AppState } from './types';
import { CharacterItem } from '@/CharacterItem/СharacterItem';
import { SearchForm } from '@/SearchForm/SearchForm';

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      characters: props.characters || [],
    };
  }

  async componentDidMount() {
    if (!this.props.characters || this.props.characters.length === 0) {
      const api = new RickAndMortyApi();
      const data: RickAndMortyCharacter[] = await api.fetchCharacters();
      this.setState({ characters: data });
    }
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
              <CharacterItem key={character.id} character={character} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
