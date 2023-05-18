export type FilterDropdownProps<T extends string> = {
  filters: FilterProps[];
  label: string;
  filteredValue: T;
  setFilteredValue: (value: T) => void;
};

export interface FilterProps {
  id: string;
  label: string;
  value: string;
}
