import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
export default function SearchPlacePosts() {
    const [placesAr, setPlacesAr] = useState([]);
    const nav = useNavigate();
  
    useEffect(() => {
      doApiPlaces();
    }, []);
  
    const handleOnSelect = (item) => {
        nav("?place=" + item.name)};
  
    const doApiPlaces = async () => {
        try {
            const url = API_URL + "/places/placesNames";
            const data = await doApiGet(url);
            setPlacesAr(data);
        } catch (error) {
            console.log(error);
        }
    };
  
    const formatResult = (item) => {
      return (
        <span style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      );
    };
  
    return (
      <div>
        <ReactSearchAutocomplete
          items={placesAr}
          autoFocus
          formatResult={formatResult}
          placeholder="Search by place.."
          onSelect={handleOnSelect}
          fuseOptions={{ keys: ["name"]}}
          resultStringKeyName="name"
          onClear={()=>nav("/posts")}   
          maxResults={5}
        />
      </div>
    );
}
