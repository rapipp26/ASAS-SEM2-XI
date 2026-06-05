import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState(""); //useState untuk nyimpen input pencarian

  //Agar semua komponen bisa mengakses query
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
} // Agar tidak perlu selalu menulis useContext(SearchContext)
