"use client";

import AuthProvider from "./Context/AuthContext";
import Router from "./Routes/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
