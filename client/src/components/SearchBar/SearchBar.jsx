import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDogByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchDogByName(query));
    navigate(`/home/name?name=${query}`);
  };

  const isQueryEmpty = query.trim().length === 0;

  return (
    <div className={styles["searchbar-container"]}>
      <form onSubmit={handleSearch}>
        <input
          className={styles["searchbar-input"]}
          type="text"
          placeholder="Search for a dog by name..."
          value={query}
          onChange={handleInputChange}
        />
        <a href={`/home/name?name=${query}`}>
          <button
            className={styles["searchbar-button"]}
            type="submit"
            disabled={isQueryEmpty || loading}
          >
            Search
          </button>
        </a>
      </form>
    </div>
  );
};

export default SearchBar;
