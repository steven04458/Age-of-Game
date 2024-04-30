import './assets/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LogReg from './pages/login/LoginRegister'
import Demineur from './pages/demineure/demineur'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogReg />}/>
          <Route path='/App' element={<App />}/>
          <Route path='/Demineur' element={<Demineur />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
