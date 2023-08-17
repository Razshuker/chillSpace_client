import './App.css';
import React, { useEffect } from 'react'
import AppRoutes from './appRoutes';
import { MyContext } from './context/myContext';
import { useUser } from './hooks/useUser';
import { TOKEN_KEY } from './services/apiService';
import { useFavorite } from './hooks/useFavorite';
import { useCloudinary } from './hooks/useCloudinary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scroll from './components/scroll';
import OpenAi from './components/openAi';
import axios from 'axios'
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;


function App() {

  const { getUserInfo, userInfo, setUserInfo } = useUser();
  const { getFavorites, favorites, setFavorites, onDeleteOrAddToFavorite } = useFavorite();
  const { uploadImage } = useCloudinary();

  useEffect(() => {
    console.log(Cookies.get("hh"));
    if (localStorage[TOKEN_KEY]) {
      getUserInfo();
    }
  }, [])

  const clearLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    console.log("cleared");
  }
  // delete the local storage every 10 hours (when the token is invalid)
  setInterval(clearLocalStorage, 36000000)

  return (
    <MyContext.Provider value={{
      getUserInfo, userInfo, setUserInfo,
      getFavorites, favorites, setFavorites, onDeleteOrAddToFavorite,
      uploadImage
    }}>
      {/* <OpenAi /> */}
      <Scroll />
      <AppRoutes />
      <ToastContainer />
    </MyContext.Provider>
  );
}

export default App;
