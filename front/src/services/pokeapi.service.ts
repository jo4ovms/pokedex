import {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from "../types/pokemon.types";

export class PokeAPI {
  private baseUrl = "https://pokeapi.co/api/v2";

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await fetch(
      `${this.baseUrl}/pokemon/${nameOrId.toString().toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(`Pokemon ${nameOrId} not found`);
    }
    return response.json();
  }

  async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    const response = await fetch(`${this.baseUrl}/pokemon-species/${id}`);
    if (!response.ok) {
      throw new Error(`Pokemon species ${id} not found`);
    }
    return response.json();
  }

  async getPokemonList(
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonListResponse> {
    const response = await fetch(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pokemon list");
    }
    return response.json();
  }
}
