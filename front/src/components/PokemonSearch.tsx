import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Clear, Search } from "@mui/icons-material";

interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const PokemonSearch = ({
  onSearch,
  loading,
  searchText,
  setSearchText,
}: PokemonSearchProps) => {
  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && searchText.trim()) {
      handleSearch();
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 10 }}>
        <TextField
          fullWidth
          placeholder="Busque por nome ou número"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSearchText("")}
                  size="small"
                  disabled={loading}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSearch}
          disabled={loading || !searchText.trim()}
        >
          {loading ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PokemonSearch;
