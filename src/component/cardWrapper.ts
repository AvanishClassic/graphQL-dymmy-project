import styled from "@emotion/styled";
import { Card, CardProps } from "@mui/material";

export const CardWrapper = styled(Card)<CardProps>(() => ({
  borderRadius: "6px",
  padding: "10px",
  border: "0.4px solid #CAC4D0",
  textAlign: "left",
  width: "90%!important",
  margin: "auto",
  ".MuiCardContent-root": {
    paddingBottom: "16px!important",
  },
  //   boxShadow: "0px 1px 4px 4px rgba(0, 0, 1, 0.25)",
}));
