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
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_ALL_LOCATION } from "../../gqloperation/queries";
import InfiniteScroll from "react-infinite-scroll-component";

const defaultCurrentItem = {
  address: "",
  description: "",
  id: "",
  name: "",
  status: "",
  taxId: "",
  updatedAt: "",
  alias: "",
  npi: "",
  telecom: [
    {
      value: "",
      system: "",
    },
  ],
};

const Home = () => {
  const [mode, setMode] = useState("");
  const { filterData } = useFilterData();
  const [limit, setLimit] = useState(10);
  const {
    data: locationData,
    loading,
    fetchMore,
    refetch,
    networkStatus,
  } = useQuery(GET_ALL_LOCATION, {
    variables: { tenant: import.meta.env.VITE_TENANT, offset: 0, limit },
    notifyOnNetworkStatusChange: true,
  });
  const [searchedValue, setSearchedValue] = useState("");
  const [currentlItem, setCurrentItem] =
    useState<ProductCardProps>(defaultCurrentItem);
  const handleClose = () => setMode("");

  useEffect(() => {
    if (!mode) {
      setCurrentItem(defaultCurrentItem);
    }
  }, [mode]);

  const shouldSearchedData = (item: ProductCardProps) => {
    if (!searchedValue || item.name.includes(searchedValue)) {
      return true;
    }
    return false;
  };

  const shouldFilterName = (item: ProductCardProps) => {
    if (!filterData || item.name === filterData) {
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

  const fetchMoreData = () => {
    const currentLength = locationData.feed.length;
    fetchMore({
      variables: {
        offset: currentLength,
        limit: 10,
      },
    }).then((fetchMoreResult) => {
      setLimit(currentLength + fetchMoreResult.data.feed.length);
    });
  };

  const getPropductData = locationData?.locationList?.resources.filter(
    (item: ProductCardProps) => filterProductData(item)
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
            <Button
              onClick={() => refetch({ tenant: import.meta.env.VITE_TENANT })}
              color="inherit"
              sx={{ border: "1px solid black" }}>
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
            {!loading && (
              <FilterDropdownList
                data={locationData?.locationList?.resources}
              />
            )}
          </Box>
          <Box overflow={"auto"} height={"650px"} mt={4}>
            {loading || networkStatus === NetworkStatus.refetch ? (
              <>Loading...</>
            ) : (
              <InfiniteScroll
                dataLength={getPropductData.length}
                next={fetchMoreData}
                style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                loader={<h4>No data</h4>}
                hasMore={true}
                scrollableTarget="scrollableDiv">
                {getPropductData.map((item: ProductCardProps) => (
                  <Box
                    mb={2}
                    key={item.id}
                    onClick={() => {
                      setCurrentItem(item);
                      setMode("edit");
                    }}>
                    <ProductCard {...item} />
                  </Box>
                ))}
              </InfiniteScroll>
            )}
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
