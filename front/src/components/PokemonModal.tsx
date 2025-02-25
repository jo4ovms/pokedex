import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Pokemon, PokemonSpecies, Translation } from "../types/pokemon.types";
import PokemonDetails from "./PokemonDetails";

interface PokemonModalProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  favorites: number[];
  translation?: Translation;
  onNavigate: (direction: "prev" | "next") => void;
  onToggleFavorite: () => void;
}

export const PokemonModal = ({
  open,
  onClose,
  pokemon,
  species,
  favorites,
  translation,
  onNavigate,
  onToggleFavorite,
}: PokemonModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!pokemon) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
          zIndex: 1,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        <PokemonDetails
          pokemon={pokemon}
          species={species}
          favorites={favorites}
          translation={translation}
          onNavigate={onNavigate}
          onToggleFavorite={onToggleFavorite}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
