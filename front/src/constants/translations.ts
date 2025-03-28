import { PokemonStat, PokemonType } from "../types/pokemon.types";

export const TYPE_COLORS: Record<PokemonType, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const TYPE_TRANSLATIONS: Record<PokemonType, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Metálico",
  fairy: "Fada",
};

export const STATS_TRANSLATIONS: Record<PokemonStat, string> = {
  hp: "Vida",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defesa Especial",
  speed: "Velocidade",
};

export const ABILITIES_TRANSLATIONS: Record<string, string> = {
  overgrow: "Supercrescimento",
  blaze: "Chama",
  torrent: "Torrente",
  shield_dust: "Pó Escudo",
  shed_skin: "Pele Derretida",
  compound_eyes: "Olhos Compostos",
  swarm: "Enxame",
  keen_eye: "Olhos Atentos",
  run_away: "Fuga",
  intimidate: "Intimidação",
  static: "Estático",
  sand_veil: "Véu de Areia",
  lightning_rod: "Para-Raios",
  chlorophyll: "Clorofila",
  levitate: "Levitação",
  effect_spore: "Esporos",
  synchronize: "Sincronizar",
  clear_body: "Corpo Limpo",
  natural_cure: "Cura Natural",
  serene_grace: "Graça Serena",
  swift_swim: "Nado Rápido",
  battle_armor: "Armadura de Batalha",
  sturdy: "Robustez",
  damp: "Umidade",
  limber: "Flexibilidade",
  sand_stream: "Fluxo de Areia",
  pressure: "Pressão",
  thick_fat: "Gordura Espessa",
  early_bird: "Pássaro Matinal",
  flame_body: "Corpo de Chamas",
  hydration: "Hidratação",
  multiscale: "Multiescamas",
  guts: "Coragem",
  wonder_guard: "Guarda Milagrosa",
  marvel_scale: "Escamas Maravilha",
  illuminate: "Iluminação",
};
