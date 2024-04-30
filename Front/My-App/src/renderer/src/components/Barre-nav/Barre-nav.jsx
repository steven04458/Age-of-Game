import { useState, useEffect } from "react";
import './Barre-nav.css'
// import LogoSetting from '../../assets/Setting_line.svg'
import UserCicrle from '../../assets/User_cicrle.svg'
import { Link } from "react-router-dom";

function BarreNav() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis le localStorage lors du chargement du composant
    const storedUsername = localStorage.getItem("username");
    const storedScore = localStorage.getItem("score");
    if (storedUsername) {
      setUsername(storedUsername);
      setScore(storedScore);
    }
  }, []);

  return (
    <>
        <div className='BarreLeft column-center'>
          <div className='CompteUser column-center'>
            <img src={UserCicrle} alt="" />
            {username}
            <div className="separator"></div>
            <Link to="/App">Home</Link>
          </div>
          <div className='column-center'>
            <div className="separator"></div>
            score : {score}
          </div>
        </div>
    </>
  )
}

export default BarreNav
