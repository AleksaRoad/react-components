import type { RickAndMortyCharacterResponse } from "./types";

export class RickAndMortyApi {
  private endpoints: { [key: string]: string };

  constructor(baseUrl: string = "https://rickandmortyapi.com/api") {
    this.endpoints = {
      characters: `${baseUrl}/character`,
      locations: `${baseUrl}/location`,
      episodes: `${baseUrl}/episode`,
    };
  }

  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  }

  async fetchCharacters(): Promise<RickAndMortyCharacterResponse> {
    return this.fetchData<RickAndMortyCharacterResponse>(this.endpoints.characters);
  }
}
