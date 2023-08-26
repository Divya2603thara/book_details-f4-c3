import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="navbar">
     
      <div className="search-bar">
        <input type="text" placeholder="Search books..." value={searchQuery} onChange={handleSearchChange} />
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
