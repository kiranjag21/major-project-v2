import React from "react";

const Search = ({ searchHandler }) => {
  const handleSearchInputChange = e => {
    searchHandler(e.target.value);
  };

  return (
     <div className="container" style={{margin:"auto"}}>
         <input class="searchbox"
          type="text"
          style={{fontFamily:'poppins'}}
          placeholder="Search Your Favourite Restaurant"
          onChange={handleSearchInputChange}
        />
         </div>
  );
};

export default Search;