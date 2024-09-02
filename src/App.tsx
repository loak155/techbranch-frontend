import './App.css';
import './pagination.css';

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import theme from "./theme/theme";
import { Router } from './router/Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
