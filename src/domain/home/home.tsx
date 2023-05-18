import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import { BoxContent } from "../../component/boxContent";
import FilterDropdownList from "./filterDropdownList";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import FeatureModal from "../../component/featureModal/featureModal";
import { useFilterData } from "../../store/store";
import { ProductCardProps } from "./type";

const data: ProductCardProps[] = [
  {
    firstName: "Avanish",
    lastName: "Parashar",
    phoneNumber: 1234567,
    date: " Jan 7 8:30",
  },
  {
    firstName: "Atmeshwar",
    lastName: "Singh",
    phoneNumber: 9749839573,
    date: " Jan 7 8:30",
  },
  {
    firstName: "Deepak",
    lastName: "",
    phoneNumber: 937838473,
    date: " Jan 7 8:30",
  },
  {
    firstName: "Prasaana",
    lastName: "",
    phoneNumber: 8957385843,
    date: " Jan 7 8:30",
  },
];

const Home = () => {
  const [mode, setMode] = useState("");
  const { filterData } = useFilterData();
  const [searchedValue, setSearchedValue] = useState("");
  const [currentlItem, setCurrentItem] = useState<ProductCardProps>({
    firstName: "",
    lastName: "",
    phoneNumber: undefined,
    date: "",
  });
  const handleClose = () => setMode("");

  useEffect(() => {
    if (!mode) {
      console.log("object");
      setCurrentItem({
        firstName: "",
        lastName: "",
        phoneNumber: undefined,
        date: "",
      });
    }
  }, [mode]);

  const shouldSearchedData = (item: ProductCardProps) => {
    if (!searchedValue || item.firstName.includes(searchedValue)) {
      return true;
    }
    return false;
  };

  const shouldFilterName = (item: ProductCardProps) => {
    if (!filterData || item.firstName === filterData) {
      return true;
    }
    return false;
  };

  const filterProductData = (item: ProductCardProps) => {
    if (shouldSearchedData(item) && shouldFilterName(item)) {
      return true;
    }
    return false;
  };

  const getPropductData = data.filter((item: ProductCardProps) =>
    filterProductData(item)
  );

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
          overflow: "hidden",
          pt: "20px",
          pb: "15px",
          display: "flex",
          flexDirection: "column",
        }}>
        <BoxContent component="form">
          <Box display="flex" mb="10px" justifyContent={"space-between"}>
            <Button color="inherit" sx={{ border: "1px solid black" }}>
              <CachedIcon />
            </Button>
            <Button onClick={() => setMode("add")} color="inherit">
              <AddIcon />
            </Button>
          </Box>
          <FormControl>
            <TextField
              onChange={(e) => setSearchedValue(e.target.value)}
              fullWidth
              required
              placeholder="Enter URL"
              value={searchedValue}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
          </FormControl>
          <Box display={"flex"} mt={3} gap={"20px"} flex={1}>
            <FilterDropdownList />
          </Box>
          <Box overflow={"auto"} height={"650px"} mt={4}>
            {getPropductData.map((item) => (
              <Box
                mb={2}
                onClick={() => {
                  setCurrentItem(item);
                  setMode("edit");
                }}>
                <ProductCard {...item} />
              </Box>
            ))}
          </Box>
        </BoxContent>
      </Container>

      <FeatureModal
        currentlItem={currentlItem}
        mode={mode}
        handleClose={handleClose}
      />
    </>
  );
};

export default Home;
