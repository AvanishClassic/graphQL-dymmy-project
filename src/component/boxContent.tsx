import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

export const BoxContent = styled(Box)<BoxProps>(() => ({
  padding: "30px 50px",
  height: "100vh",
  boxShadow: "0px 1px 4px 4px rgba(0, 0, 1, 0.25)",
  ".MuiFormControl-root": {
    width: "100%",
  },
}));
