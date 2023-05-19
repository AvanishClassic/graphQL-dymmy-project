import FilterDropdown from "../../component/filterDropdown/filterDropdown";
import { useFilterData } from "../../store/store";
import { FilterProps } from "../../component/filterDropdown/types";
import { Box } from "@mui/material";
import { ProductCardProps } from "./type";

type FilterDropdownListProps = {
  data: ProductCardProps[];
};

const FilterDropdownList = ({ data }: FilterDropdownListProps) => {
  const { setFilterData, filterData } = useFilterData();

  const filterOptions: FilterProps[] = data?.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.name,
    };
  });
  return (
    <Box width={"200px"}>
      <FilterDropdown
        label="Name"
        filteredValue={filterData}
        setFilteredValue={setFilterData}
        filters={[...[{ id: "1", label: "All", value: "" }], ...filterOptions]}
      />
    </Box>
  );
};

export default FilterDropdownList;
