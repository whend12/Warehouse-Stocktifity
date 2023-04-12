import React, { useState } from "react";

const data = [
  "Apple",
  "Banana",
  "Cherry",
  "Durian",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Jackfruit",
  "Kiwi",
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClick = (result) => {
    setSearchTerm(result);
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchResults.length < 5 && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleClick(result)}>
              {result}
            </li>
          ))}
        </ul>
      )}

      {data.map((result) => (
        <li>{result}</li>
      ))}
    </div>
  );
};

export default Header;
