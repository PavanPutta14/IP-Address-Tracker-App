import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = ({ fetchLocation }) => {
  const [inputIP, setInputIP] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocation(inputIP);
    setInputIP("");
  };

  return (
    <div className="container py-3">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter the IP Address here..."
          value={inputIP}
          onChange={(e) => setInputIP(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
