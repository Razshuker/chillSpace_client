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

  return (
    <MyContext.Provider value={{ getUserInfo, userInfo, setUserInfo }}>
      <AppRoutes />
    </MyContext.Provider>
  );
}

export default App;
