import { RegionData } from "../types/pokemon.types";

export const REGIONS: Record<string, RegionData> = {
  kanto: {
    name: "Kanto",
    offset: 0,
    limit: 151,
  },
  johto: {
    name: "Johto",
    offset: 151,
    limit: 100,
  },
  hoenn: {
    name: "Hoenn",
    offset: 251,
    limit: 135,
  },
  sinnoh: {
    name: "Sinnoh",
    offset: 386,
    limit: 107,
  },
  unova: {
    name: "Unova",
    offset: 493,
    limit: 156,
  },
  kalos: {
    name: "Kalos",
    offset: 649,
    limit: 72,
  },
  alola: {
    name: "Alola",
    offset: 721,
    limit: 88,
  },
  galar: {
    name: "Galar",
    offset: 809,
    limit: 89,
  },
};
