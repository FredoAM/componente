import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Test from "./test";
import Test1 from "./testtt";
import {ChakraProvider} from "@chakra-ui/react";
import TestMenu from './testMenu'
 
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Test1 />
      
    </ChakraProvider>
      
  </React.StrictMode>
);
