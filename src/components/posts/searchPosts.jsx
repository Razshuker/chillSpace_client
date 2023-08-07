import { useState, useEffect } from "react";
import { API_URL, doApiGet } from "../../services/apiService";

export default function SearchPosts() {
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    doApiPlaces();
  }, []);

  const doApiPlaces = async () => {
    const url = API_URL + "/places?perPage=0";
    const data = await doApiGet(url);
    setOptions(data);
    console.log(data);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleOptionSelect = (option) => {
    setSearchQuery(option.name);
    setInputFocused(false); // Hide the options dropdown after selecting
  };

  // Filter the options based on the user's input
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="searchInput">Searchable Options Input:</label>
        <input
          type="text"
          className="form-control"
          id="searchInput"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Type to search..."
        />
      </div>
      {isInputFocused && filteredOptions.length > 0 && (
        <div className="form-group">
          <label htmlFor="optionsSelect">Options:</label>
          <select
            className="form-control"
            id="optionsSelect"
            size="5"
          >
            {filteredOptions.map((option, index) => (
              <option
                key={index}
                onClick={() => handleOptionSelect(option)}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
