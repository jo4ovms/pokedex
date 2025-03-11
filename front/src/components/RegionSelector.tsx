import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { REGIONS } from "../constants/regions";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
  disabled?: boolean;
}

export const RegionSelector = ({
  selectedRegion,
  onChange,
  disabled = false,
}: RegionSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Região</InputLabel>
      <Select
        label="Região"
        value={selectedRegion}
        onChange={handleChange}
        disabled={disabled}
      >
        <MenuItem value="all">Todas as Regiões</MenuItem>
        {Object.entries(REGIONS).map(([key, region]) => (
          <MenuItem key={key} value={key}>
            {region.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RegionSelector;
