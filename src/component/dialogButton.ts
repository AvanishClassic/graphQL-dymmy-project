import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

export const DialogButton = styled(Button)<ButtonProps>(() => ({
  background: "#535bf2",
  color: "white",
  ":hover": {
    background: "blue",
  },
}));
