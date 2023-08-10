// import React from "react";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import { API_URL, doApiGet } from "../../services/apiService";

// export default function SearchPosts() {
//     const [usersAr, setUsersAr] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     doApiUsers();
//   }, []);

//   const handleOnSelect = (item) => {
//     // the item selected
//     nav(`?user=${item._id}`);
//   };

//   const doApiUsers = async () => {
//     try {
//         const url = API_URL + "/users/usersList?perPage=0";
//         const data = await doApiGet(url);
//         setUsersAr(data);
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// };



//   const formatResult = (item) => {
//     return (
//       <span style={{ display: "block", textAlign: "left" }}>
//         {item.nickname}
//       </span>
//     );
//   };

//   return (
//     <div style={{ width: 400 }}>
//       <ReactSearchAutocomplete
//         items={usersAr}
//         autoFocus
//         formatResult={formatResult}
//         placeholder="Search User.."
//         onSelect={handleOnSelect}
//         fuseOptions={{ keys: ["nickname"] ,maxPatternLength: 3, distance: 1}}
//         resultStringKeyName="nickname"
//       />
//     </div>
//   );
// };

