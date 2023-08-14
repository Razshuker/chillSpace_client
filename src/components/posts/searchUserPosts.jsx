import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { API_URL, doApiGet } from "../../services/apiService";

export default function SearchUserPosts() {
    const [usersAr, setUsersAr] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    doApiUsers();
  }, []);

  const handleOnSelect = (item) => {
    nav(`?user=${item.id}`);
  };

  const doApiUsers = async () => {
    try {
        const url = API_URL + "/users/nickNames";
        const data = await doApiGet(url);
        setUsersAr(data);
    } catch (error) {
        console.log(error);
    }
};

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        {item.nickname}
      </span>
    );
  };

  return (
    <div>
      <ReactSearchAutocomplete
        items={usersAr}
        autoFocus
        formatResult={formatResult}
        placeholder="Search by user.."
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ["nickname"] }}
        resultStringKeyName="nickname"
        onClear={()=>nav("/posts")}
        maxResults={5}
        />
    </div>
  );
};

