// src/components/Search.jsx
import React, { useState } from "react";

const Search = ({ hotels, setFilteredHotels }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setSearchError("Please enter a hotel name to search.");
      setFilteredHotels([]);
      return;
    } else {
      setSearchError("");
    }

    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="container p-3 text-center">
      <h5 className="fw-bold text-secondary">--- Search For Your Hotel Here ---</h5>

      <form className="row w-100 d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control custom-form-control p-2 col-8"
          placeholder="Enter Hotel Name"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          type="submit"
          className="btn px-3 fw-bold col-sm-4 col-3"
          style={{ background: "#E8DFD5" }}
        >
          Search
        </button>
      </form>

      {searchError && (
        <div className="alert alert-warning mt-2" role="alert">
          {searchError}
        </div>
      )}
    </div>
  );
};

export default Search;
