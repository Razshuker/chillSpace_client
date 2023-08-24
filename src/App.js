import './App.css';
import React, { useEffect } from 'react'
import AppRoutes from './appRoutes';
import { MyContext } from './context/myContext';
import { useUser } from './hooks/useUser';
import { TOKEN_KEY } from './services/apiService';
import { useCloudinary } from './hooks/useCloudinary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OpenAi from './components/openAi';
import axios from 'axios'
axios.defaults.withCredentials = true;


function App() {

  const { getUserInfo, userInfo, setUserInfo } = useUser();
  const { uploadImage } = useCloudinary();

  useEffect(() => {
    if (localStorage[TOKEN_KEY]) {
      getUserInfo();
    }
  }, [])


  return (
    <MyContext.Provider value={{
      getUserInfo, userInfo, setUserInfo,
      uploadImage
    }}>
      {/* <OpenAi /> */}
      <AppRoutes />
      <ToastContainer />
    </MyContext.Provider>
  );
}

export default App;
