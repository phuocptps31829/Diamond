import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavbarProvider } from "./contexts/NavBarContext.jsx";
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

const queryClient = new QueryClient({
  keepPreviousData: true,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <NavbarProvider>
        <App />
      </NavbarProvider>
    </QueryClientProvider>
    <ToastContainer />
    <Toaster
      position="top-right"
      reverseOrder={ false }
      gutter={ 10 }
      containerClassName="mt-[90px]"
      containerStyle={ {} }
      toastOptions={ {
        className: 'custom-hot-toast min-w-[300px] px-5 py-3 text-base',
        duration: 4000,
        // success: {
        //   theme: {
        //     primary: 'green',
        //     secondary: 'black',
        //   },
        // },
        // error: {
        //   theme: {
        //     primary: 'green',
        //     secondary: 'black',
        //   },
        // }
      } }
    />
  </React.StrictMode>,
);