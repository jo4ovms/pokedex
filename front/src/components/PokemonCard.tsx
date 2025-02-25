import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PokemonBasic, Translation } from "../types/pokemon.types";
import { formatPokemonId } from "../utils/helpers";

const MotionCard = motion(Card);

interface PokemonCardProps {
  pokemon: PokemonBasic;
  translation?: Translation;
  onClick: (pokemon: PokemonBasic) => void;
}

export const PokemonCard = ({
  pokemon,
  translation,
  onClick,
}: PokemonCardProps) => {
  const handleClick = () => {
    onClick(pokemon);
  };

  return (
    <MotionCard
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={pokemon.sprite}
            alt={translation?.name || pokemon.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
            }}
            loading="lazy"
          />
        </motion.div>

        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
            mt: 2,
          }}
        >
          {translation?.name || pokemon.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
          }}
        >
          #{formatPokemonId(pokemon.id)}
        </Typography>

        {translation?.genus && (
          <Typography variant="caption" display="block" color="text.secondary">
            {translation.genus}
          </Typography>
        )}
      </CardContent>
    </MotionCard>
  );
};

export default PokemonCard;
