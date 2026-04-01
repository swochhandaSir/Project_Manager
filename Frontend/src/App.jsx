import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import AppRouter from "./routes/routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  );
}
