import BarreNav from './components/Barre-nav/Barre-nav'
import BlockJeux from './components/block-jeux/block-jeux'
import './App.css'
import { useState, useEffect } from "react";

function App() {
  const url = "http://127.0.0.1:8000/";
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [score, setScore] = useState(localStorage.getItem("score"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("score");
    setLoggedIn(false);
  };

  return (
    <>
      <BarreNav></BarreNav>
      <div className='content'>
        <BlockJeux></BlockJeux>
      </div>
    </>
  )
}

export default App

