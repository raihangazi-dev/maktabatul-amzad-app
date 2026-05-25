"use client";
import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext(null);

export function BreadcrumbProvider({ children }) {
  const [extra, setExtra] = useState([]);
  return (
    <BreadcrumbContext.Provider value={{ extra, setExtra }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
