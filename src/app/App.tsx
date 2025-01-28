import { Component } from "react";
import styles from "./App.module.css";
import { RickAndMortyApi } from "../api/rickAndMortyApi";
import {
  RickAndMortyCharacter,
  RickAndMortyCharacterResponse,
} from "../api/rickAndMortyApi.types";
import { AppProps, AppState } from "./app.types";
import { CharacterItem } from "../item/СharacterItem";

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
      const data: RickAndMortyCharacterResponse = await api.fetchCharacters();
      this.setState({ characters: data.results });
    }
  }

  render() {
    const { characters } = this.state;
    return (
      <>
        <div className={styles.container}>
          <div className={styles.itemsContainer}>
            <ul className={styles.list}>
              {characters.map((character: RickAndMortyCharacter) => (
                <CharacterItem key={character.id} character={character} />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
