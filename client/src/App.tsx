import React, { useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Router from "./Router";
import socketService from "./services/socketService";
import { QueryProvider } from "@/providers";
import { initializeTasks } from "@/services";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#6b7280",
    },
    success: {
      main: "#10b981",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#3b82f6",
    },
  },
});

function App() {
  useEffect(() => {
    socketService.connect();

    initializeTasks().catch((error) => {
      console.error("Error initializing tasks:", error);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
