import React from 'react';


const SearchBox = ({ value, onChange }) => {

  return <div className="searchArea">
    <div className="row">
      <div className="searchbox">
        <div className="sboxcolumnn-1">
          <img alt="search" src="images/search.png" />
        </div>
        <input
          type="text"
          name="searchbox"
          placeholder="search blogs..."
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </div>
  </div>
}

export default SearchBox;