import styled from "@emotion/styled";
import { FormControl, FormControlProps } from "@mui/material";

export const FilterDropdownWrapper = styled(FormControl)<FormControlProps>(
  () => ({
    ".MuiSelect-select": {
      padding: "5px!important",
      border: " 2px solid lightgray",
      textAlign: "initial",
    },
    ".MuiFormLabel-root": {
      color: "black",
      fontSize: "16px",
      top: "-8px",
    },
  })
);
