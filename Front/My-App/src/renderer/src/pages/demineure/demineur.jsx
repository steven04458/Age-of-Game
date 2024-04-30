import { useState, useEffect } from 'react';
import axios from 'axios';
import './demineur.css';
import BarreNav from '../../components/Barre-nav/Barre-nav';
import Case from '../../assets/demineur/Minesweeper_unopened_square.svg';
import CaseMine from '../../assets/demineur/Papirus-64-apps-kmines.svg';
import Case0 from '../../assets/demineur/Minesweeper_0.svg';
import Case1 from '../../assets/demineur/Minesweeper_1.svg';
import Case2 from '../../assets/demineur/Minesweeper_2.svg';
import Case3 from '../../assets/demineur/Minesweeper_3.svg';
import Case4 from '../../assets/demineur/Minesweeper_4.svg';
import Case5 from '../../assets/demineur/Minesweeper_5.svg';
import Case6 from '../../assets/demineur/Minesweeper_6.svg';
import Case7 from '../../assets/demineur/Minesweeper_7.svg';
import Case8 from '../../assets/demineur/Minesweeper_8.svg';
import Caseflag from '../../assets/demineur/Minesweeper_flag.svg';


function Demineur() {
  const url = "http://127.0.0.1:8000/";
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [token, setToken] = useState("");
  const [gameData, setGameData] = useState(null);
  const [level, setLevel] = useState(1); // Valeur initiale du niveau
  const [gameGrid, setGameGrid] = useState([]);

  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis le localStorage lors du chargement du composant
    const storedUsername = localStorage.getItem("username");
    const storedScore = localStorage.getItem("score");
    const storedToken = localStorage.getItem("token");
    if (storedUsername) {
      setUsername(storedUsername);
      setScore(storedScore);
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
    // Initialiser la grille de jeu lorsque les données de jeu sont chargées
    if (gameData) {
      initializeGameGrid();
    }
  }, [gameData]);

  async function getLaunch(level) {
    try {
      const response = await axios.get(`${url}api/launch?level=${level}`, {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      setGameData(response.data);
      console.log(response.data.id_party);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de jeu :", error);
    }
  }
  function initializeGameGrid() {
    // Convertir les données de jeu en une grille de jeu
    const rows = gameData.table.trim().split('\r\n').map(row => row.split(','));
    const grid = rows.map(row => row.map(cell => ({
      value: cell,
      revealed: false, // Ajouter un état pour chaque case pour indiquer si elle est révélée ou non
    })));
    setGameGrid(grid);
  }

  // Gestion du clic droit pour révéler la case
  const handleRightClick = (event, rowIndex, colIndex) => {
    event.preventDefault(); // Empêche le menu contextuel du navigateur de s'afficher
    const clickedCell = gameGrid[rowIndex][colIndex];
    const numAdjacentFlags = countAdjacentFlags(rowIndex, colIndex);
    if (gameGrid[rowIndex][colIndex].flagged) {
      return;
    }
    if (numAdjacentFlags === Number(clickedCell.value)) {
      revealCellsAround(rowIndex, colIndex);
    }
    if (clickedCell.value === '-1') {
      endParty();
      return;
    }
    const revealEmptyCells = (row, col) => {
      // Vérifiez les cases autour de la case actuelle (dans un rayon de 1 case)
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          // Vérifiez si la case est à l'intérieur de la grille
          if (i >= 0 && i < gameGrid.length && j >= 0 && j < gameGrid[0].length) {
            // Vérifiez si la case est vide et non révélée
            if (gameGrid[i][j].value === '0' && !gameGrid[i][j].revealed) {
              // Mettez à jour l'état de la case pour la révéler
              const updatedGrid = [...gameGrid];
              updatedGrid[i][j].revealed = true;
              setGameGrid(updatedGrid);
              // Révélez également les cases vides autour de cette case révélée
              revealEmptyCells(i, j);
            } else if (!gameGrid[i][j].revealed && gameGrid[i][j].value !== '-1') {
              // Si la case n'est pas une mine, révélez-la
              const updatedGrid = [...gameGrid];
              updatedGrid[i][j].revealed = true;
              setGameGrid(updatedGrid);
            }
          }
        }
      }
    };
    const updatedGrid = [...gameGrid]; // Fait une copie de la grille de jeu
    updatedGrid[rowIndex][colIndex].revealed = true; // Met à jour l'état de la case pour la révéler
    setGameGrid(updatedGrid); // Met à jour la grille de jeu avec la case révélée
    if (gameGrid[rowIndex][colIndex].value === '0') {
      revealEmptyCells(rowIndex, colIndex);
    }
  };

  const endParty = async () => {
    try {
      const response = await axios.post(`${url}api/end_party`, {
        headers: {
          "Authorization": "Bearer " + token,
        },
        id_party: gameData.id_party,
        result: "0", 
        grid_discovered: gameGrid.map(row => row.map(cell => cell.revealed ? cell.value : '-')), // Envoyer l'état final de la grille
      });
      // Gérer la réponse du serveur si nécessaire
    } catch (error) {
      console.error("Erreur lors de la fin de la partie :", error);
    }
  };

  const countAdjacentFlags = (rowIndex, colIndex) => {
    let count = 0;
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        if (i >= 0 && i < gameGrid.length && j >= 0 && j < gameGrid[0].length && !(i === rowIndex && j === colIndex)) {
          if (gameGrid[i][j].flagged) {
            count++;
          }
        }
      }
    }
    return count;
  };
  const revealCellsAround = (rowIndex, colIndex) => {
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        if (i >= 0 && i < gameGrid.length && j >= 0 && j < gameGrid[0].length && !(i === rowIndex && j === colIndex)) {
          const cell = gameGrid[i][j];
          if (!cell.flagged) {
            const updatedGrid = [...gameGrid];
            updatedGrid[i][j].revealed = true;
            setGameGrid(updatedGrid);
          }
        }
      }
    }
  };
  // Gestion du clic gauche pour placer ou retirer un drapeau
  const handleLeftClick = (rowIndex, colIndex) => {
  // Si la case est déjà révélée, ne rien faire
  if (gameGrid[rowIndex][colIndex].revealed) {
    return;
  }

  const updatedGrid = [...gameGrid];
  const clickedCell = updatedGrid[rowIndex][colIndex];

  // Inverse l'état du drapeau pour la case
  clickedCell.flagged = !clickedCell.flagged;

  setGameGrid(updatedGrid);
};


const renderCell = (value) => {
  switch (value) {
    case '-1':
      return <img src={CaseMine} alt="Mine" />;
    case '0':
      return <img src={Case0} alt="Empty" />;
    case '1':
      return <img src={Case1} alt="One" />;
    case '2':
      return <img src={Case2} alt="Two" />;
    case '3':
      return <img src={Case3} alt="Three" />;
    case '4':
      return <img src={Case4} alt="Four" />;
    case '5':
      return <img src={Case5} alt="Five" />;
    case '6':
      return <img src={Case6} alt="Six" />;
    case '7':
      return <img src={Case7} alt="Seven" />;
    case '8':
      return <img src={Case8} alt="Eight" />;
    default:
      return <img src={Case} alt="Unknown" />;
  }
};

  return (
    <>
      <BarreNav />
      <div className='content'>
        <div>
          <button onClick={() => getLaunch(level)}>Lancer la partie</button>
          <input type="number" max="5" min="1" maxLength="1" value={level} onChange={(e) => setLevel(e.target.value)} />
        </div>
        <div className='jeux'>
          <div>
            {/* Afficher la grille de jeu en fonction de l'état des cases */}
            {gameGrid.map((row, rowIndex) => (
              <div key={rowIndex} className='row'>
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className='cell'
                    onClick={() => handleLeftClick(rowIndex, colIndex)} // Gestion du clic gauche
                    onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)} // Gestion du clic droit
                  >
                    {cell.revealed ? renderCell(cell.value) : cell.flagged ? <img src={Caseflag} alt="Flag" /> : <img src={Case} alt="Unknown" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );  
}

export default Demineur;
