import { useSearch } from "./SearchContext";
import "../Styles/SearchCard.css";
import { useEffect, useRef } from "react";

function SearchBar() {
  const { query, setQuery } = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []); //Otomatis focus ke search bar

  return (
    <div className="searchWrapper">
      <div className="searchInputWrapper">
        <span className="searchIcon">🔍</span>

        <input
          type="text"
          placeholder="Cari nama atau username..."
          value={query} //selalu menampilkan teks/query dari context
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)} //setiap ada yang mengetik, setQuery dipanggil dan mengambil teks yang diketik
          className="searchInput"
        />

        {query && (
          <button onClick={() => setQuery("")} className="clearButton">
            X
          </button>
        )}
        {/* Tombol x hanya muncul jika ada sesuatu yang diketik */}
      </div>
    </div>
  );
}

export default SearchBar;
