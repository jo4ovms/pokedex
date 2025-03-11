import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { PokemonBasic, Translation } from "../types/pokemon.types";
import { processPokemons } from "../utils/helpers";
import PokemonCard from "./PokemonCard";
import { REGIONS } from "../constants/regions";

interface PokemonGridProps {
  onPokemonSelect: (pokemon: PokemonBasic) => void;
  selectedRegion: string;
  initialLimit?: number;
  translations?: Record<number, Translation>;
  isSearching?: boolean;
}

export const PokemonGrid = ({
  onPokemonSelect,
  selectedRegion = "all",
  initialLimit = 20,
  translations = {},
  isSearching = false,
}: PokemonGridProps) => {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = initialLimit;

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);

      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

      if (selectedRegion !== "all") {
        const regionData = REGIONS[selectedRegion];
        const regionOffset =
          regionData.offset +
          (offset > 0 ? Math.min(offset, regionData.limit - limit) : 0);
        const regionLimit = Math.min(
          limit,
          regionData.limit -
            (offset > 0 ? Math.min(offset, regionData.limit - limit) : 0)
        );

        url = `https://pokeapi.co/api/v2/pokemon?limit=${regionLimit}&offset=${regionOffset}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Falha ao carregar Pokémons");
      }

      const data = await response.json();
      const newPokemons = processPokemons(data.results);

      setPokemons((prev) => {
        if (offset === 0) {
          return newPokemons;
        }

        const uniquePokemons = [...prev];
        newPokemons.forEach((newPokemon) => {
          if (!uniquePokemons.some((p) => p.id === newPokemon.id)) {
            uniquePokemons.push(newPokemon);
          }
        });
        return uniquePokemons;
      });

      setHasMore(!!data.next);
      setError(null);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setError("Erro ao carregar Pokémons. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [offset, selectedRegion, limit]);

  useEffect(() => {
    setOffset(0);
    setPokemons([]);
  }, [selectedRegion]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + limit);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOffset(0);
            fetchPokemons();
          }}
        >
          Tentar Novamente
        </Button>
      </Box>
    );
  }

  return (
    <Container>
      <motion.div variants={container} initial="hidden" animate="show">
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={`pokemon-${pokemon.id}`}
            >
              <motion.div variants={item}>
                <PokemonCard
                  pokemon={pokemon}
                  translation={translations[pokemon.id]}
                  onClick={onPokemonSelect}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {hasMore && (
          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={loadMore}
              disabled={loading || isSearching}
              sx={{
                minWidth: 200,
                py: 1.5,
              }}
            >
              {loading && !isSearching ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Carregar Mais"
              )}
            </Button>
          </Box>
        )}

        {loading && !pokemons.length && !isSearching && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default PokemonGrid;
