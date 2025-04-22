import React from "react";
import { Link } from "react-router-dom";
import './searchBar.css';

const Search = () => {
  return (
    <div className="search-container">
      <h5 className="search-heading">Find Your Perfect Stay</h5>
      <form className="search-form">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Enter Hotel Name" 
        />
        <button 
          type="submit" 
          className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;