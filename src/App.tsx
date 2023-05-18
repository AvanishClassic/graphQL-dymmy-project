import { SnackbarProvider } from "notistack";
import { GlobalStyles, css } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./router/router";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";

const appStyles = css`
  a {
    text-decoration: none;

  body {
    background: #ffffff;
  }

  #root {
    width: 100%;
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={3000}>
        <GlobalStyles styles={appStyles} />
        <RouterProvider router={routes} />
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
