import './App.css';
import React from 'react'
import AppRoutes from './appRoutes';
import { MyContext } from './context/myContext';
import { useUser } from './hooks/useUser';

function App() {

  const { userInfo } = useUser();

  return (
    <MyContext.Provider value={{ userInfo }}>
      <AppRoutes />
    </MyContext.Provider>
  );
}

export default App;
