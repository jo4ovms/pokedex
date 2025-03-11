import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { PokeAPI } from "../services/pokeapi.service";

import {
  Pokemon,
  PokemonBasic,
  PokemonSpecies,
  Translation,
} from "../types/pokemon.types";
import PokemonGrid from "../components/PokemonGrid";
import PokemonModal from "../components/PokemonModal";
import PokemonSearch from "../components/PokemonSearch";
import RegionSelector from "../components/RegionSelector";
import { loadFavorites, saveFavorites } from "../utils/helpers";
import Grid from "@mui/material/Grid2";

const PokemonPage = () => {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);
  const [translations] = useState<Record<number, Translation>>({});
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const LIMIT = 20;
  const pokemonService = useMemo(() => new PokeAPI(), []);
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const handleSearch = useCallback(
    async (pokemonIdentifier: string) => {
      if (!pokemonIdentifier.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const result = await pokemonService.getPokemon(
          pokemonIdentifier.toLowerCase()
        );

        const [speciesData] = await Promise.all([
          pokemonService.getPokemonSpecies(result.id),
        ]);

        setPokemon(result);
        setSpecies(speciesData);

        setModalOpen(true);
      } catch {
        setError("Pokémon não encontrado!");
        setPokemon(null);
        setSpecies(null);
      } finally {
        setLoading(false);
      }
    },
    [pokemonService]
  );

  const handlePokemonSelect = async (selectedPokemon: PokemonBasic) => {
    setSearchText(selectedPokemon.name);

    const pokemonAlreadyLoaded = pokemon && pokemon.id === selectedPokemon.id;

    if (pokemonAlreadyLoaded) {
      setModalOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [pokemonData, speciesData] = await Promise.all([
        pokemonService.getPokemon(selectedPokemon.id),
        pokemonService.getPokemonSpecies(selectedPokemon.id),
      ]);

      setPokemon(pokemonData);
      setSpecies(speciesData);
      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados do Pokémon:", error);
      setError("Não foi possível carregar os dados do Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const navigatePokemon = async (direction: "prev" | "next") => {
    if (!pokemon) return;

    const newId =
      direction === "prev" ? Math.max(1, pokemon.id - 1) : pokemon.id + 1;

    setLoading(true);
    setError(null);

    try {
      const [pokemonData, speciesData] = await Promise.all([
        pokemonService.getPokemon(newId),
        pokemonService.getPokemonSpecies(newId),
      ]);

      setPokemon(pokemonData);
      setSpecies(speciesData);
    } catch (error) {
      console.error("Erro ao navegar para o Pokémon:", error);
      setError("Não foi possível carregar os dados do Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!pokemon) return;

    setFavorites((prev) => {
      if (prev.includes(pokemon.id)) {
        return prev.filter((id) => id !== pokemon.id);
      } else {
        return [...prev, pokemon.id];
      }
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
        Pokédex
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <RegionSelector
              selectedRegion={selectedRegion}
              onChange={setSelectedRegion}
              disabled={loading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <PokemonSearch
              onSearch={handleSearch}
              loading={loading}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </Grid>
        </Grid>
      </Paper>

      <PokemonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        pokemon={pokemon}
        species={species}
        favorites={favorites}
        translation={translations[pokemon?.id || 0]}
        onNavigate={navigatePokemon}
        onToggleFavorite={toggleFavorite}
      />

      <PokemonGrid
        onPokemonSelect={handlePokemonSelect}
        selectedRegion={selectedRegion}
        initialLimit={LIMIT}
        translations={translations}
        isSearching={loading}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PokemonPage;
