import './App.css';
import React from 'react'
import AppRoutes from './appRoutes';
import { MyContext } from './context/myContext';
import { useUser } from './hooks/useUser';
import { TOKEN_KEY } from './services/apiService';

function App() {
  const { userInfo } = useUser();

  const clearLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    console.log("cleared");
  }
  // delete the local storage every 10 hours (when the token is invalid)
  setInterval(clearLocalStorage, 36000000)

  return (
    <MyContext.Provider value={{ userInfo }}>
      <AppRoutes />
    </MyContext.Provider>
  );
}

export default App;
