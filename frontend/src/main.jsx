import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { NavbarProvider } from "./contexts/NavBarContext.jsx";
=======
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
import "./index.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <NavbarProvider>
        <App />
      </NavbarProvider>
=======
      <App />
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
    </QueryClientProvider>
  </React.StrictMode>,
);
