import React from "react";
import Header from "./Components/Header"
import FetchAndCreateCard from "./Functions/FetchAndCreateCard";
import { SearchProvider } from "./Functions/SearchContext";

function App() {
  return(
    <>
    <Header></Header>
    <SearchProvider>
      <FetchAndCreateCard></FetchAndCreateCard>
    </SearchProvider>
    </>
  )
}

export default App;