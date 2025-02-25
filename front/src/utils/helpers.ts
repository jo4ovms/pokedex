import { PokemonBasic } from "../types/pokemon.types";

export const processPokemons = (
  results: Array<{ name: string; url: string }>
): PokemonBasic[] => {
  return results.map((pokemon) => {
    const id = parseInt(pokemon.url.split("/")[6]);
    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
};

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, "0");
};

export const saveFavorites = (favorites: number[]): void => {
  localStorage.setItem("pokemon-favorites", JSON.stringify(favorites));
};

export const loadFavorites = (): number[] => {
  const saved = localStorage.getItem("pokemon-favorites");
  return saved ? JSON.parse(saved) : [];
};
