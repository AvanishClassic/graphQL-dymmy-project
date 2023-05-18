import FilterDropdown from "../../component/filterDropdown/filterDropdown";
import { useFilterData } from "../../store/store";
import { FilterProps } from "../../component/filterDropdown/types";
import { Box } from "@mui/material";

const FilterDropdownList = () => {
  const { setFilterData, filterData } = useFilterData();

  const filterOptions: FilterProps[] = [
    {
      id: "1",
      label: "All",
      value: "",
    },
    {
      id: "2",
      label: "Avanish",
      value: "Avanish",
    },
    {
      id: "3",
      label: "Negative",
      value: "negative",
    },
  ];
  return (
    <Box width={"200px"}>
      <FilterDropdown
        label="Name"
        filteredValue={filterData}
        setFilteredValue={setFilterData}
        filters={filterOptions}
      />
    </Box>
  );
};

export default FilterDropdownList;
