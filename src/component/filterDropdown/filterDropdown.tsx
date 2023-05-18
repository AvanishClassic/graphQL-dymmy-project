import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FilterDropdownWrapper } from "../filterDropdownWrapper";
import { FilterDropdownProps } from "./types";

const FilterDropdown = <T extends string>({
  label,
  filteredValue,
  setFilteredValue,
  filters,
}: FilterDropdownProps<T>) => {
  const handleFilterdChange = (
    event: SelectChangeEvent<typeof filteredValue>
  ) => {
    const {
      target: { value },
    } = event;
    setFilteredValue(value as T);
  };

  return (
    <FilterDropdownWrapper>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filteredValue}
        label={filteredValue}
        onChange={handleFilterdChange}>
        {filters.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FilterDropdownWrapper>
  );
};

export default FilterDropdown;
