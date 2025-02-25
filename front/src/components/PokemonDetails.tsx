import { useState } from "react";
import {
  Box,
  Card,
  Chip,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Favorite,
  FavoriteBorder,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Pokemon, PokemonSpecies, Translation } from "../types/pokemon.types";
import {
  STATS_TRANSLATIONS,
  TYPE_COLORS,
  TYPE_TRANSLATIONS,
} from "../constants/translations";
import { formatPokemonId } from "../utils/helpers";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  species: PokemonSpecies | null;
  favorites: number[];
  translation?: Translation;
  onNavigate: (direction: "prev" | "next") => void;
  onToggleFavorite: () => void;
}

export const PokemonDetails = ({
  pokemon,
  species,
  favorites,
  translation,
  onNavigate,
  onToggleFavorite,
}: PokemonDetailsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getDescription = () => {
    if (!species) return "Descrição não disponível";

    const enEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    return enEntry
      ? enEntry.flavor_text.replace(/\\f/g, " ").replace(/\n/g, " ")
      : "Descrição não disponível";
  };

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <IconButton
          onClick={() => onNavigate("prev")}
          disabled={pokemon.id === 1}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton onClick={onToggleFavorite}>
          {favorites.includes(pokemon.id) ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <IconButton onClick={() => onNavigate("next")}>
          <NavigateNext />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <img
                src={
                  pokemon.sprites.other?.["official-artwork"]?.front_default ||
                  pokemon.sprites.front_default
                }
                alt={translation?.name || pokemon.name}
                style={{ width: 400, height: 400 }}
              />
            </Box>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ textTransform: "capitalize", mb: 2 }}>
            {translation?.name || pokemon.name} #{formatPokemonId(pokemon.id)}
          </Typography>

          <Box sx={{ mb: 2 }}>
            {pokemon.types.map(({ type: { name } }) => (
              <Chip
                key={name}
                label={
                  TYPE_TRANSLATIONS[name as keyof typeof TYPE_TRANSLATIONS] ||
                  name
                }
                sx={{
                  mr: 1,
                  backgroundColor:
                    TYPE_COLORS[name as keyof typeof TYPE_COLORS] || "#777777",
                  color: "white",
                }}
              />
            ))}
          </Box>

          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Status" />
            <Tab label="Informações" />
          </Tabs>

          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {pokemon.stats.map(({ base_stat, stat: { name } }) => (
                  <Box key={name} sx={{ mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {STATS_TRANSLATIONS[
                        name as keyof typeof STATS_TRANSLATIONS
                      ] || name}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(base_stat / 255) * 100}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="body2" sx={{ textAlign: "right" }}>
                      {base_stat}
                    </Typography>
                  </Box>
                ))}
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Altura:</strong> {pokemon.height / 10}m
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Peso:</strong> {pokemon.weight / 10}kg
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Habilidades:</strong>{" "}
                  {translation?.abilities?.join(", ") ||
                    pokemon.abilities
                      .map(({ ability: { name } }) => {
                        return name
                          .replace(/-/g, " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ");
                      })
                      .join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Descrição:</strong> {getDescription()}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PokemonDetails;
