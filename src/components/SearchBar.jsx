import React from "react";
import { Link } from "react-router-dom";
import './searchBar.css';

const Search = () => {
  return (
    <div className="container p-3 text-center">
        <h5 className="fw-bold text-secondary ">--- Search For Your Hotel Here --- </h5>
      <form className="row w-100 d-flex">
        <input type="text" className="form-control custom-form-control p-2 col-8" placeholder="Enter Hotel Name" />
        <button type="submit" className="btn px-3 fw-bold col-sm-4 col-3" style={{background:"#E8DFD5"}}>Search</button>
      </form>
      
    </div>
  );
}
export default Search;