import './App.css';
import React, { useEffect } from 'react'
import AppRoutes from './appRoutes';
import { MyContext } from './context/myContext';
import { useUser } from './hooks/useUser';
import { TOKEN_KEY } from './services/apiService';

function App() {

  const { getUserInfo, userInfo, setUserInfo } = useUser();

  useEffect(() => {
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
    <MyContext.Provider value={{ getUserInfo, userInfo, setUserInfo }}>
      <AppRoutes />
    </MyContext.Provider>
  );
}

export default App;
