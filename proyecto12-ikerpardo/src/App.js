import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Bingo from './components/Bingo';
import TresEnRaya from './components/TresEnRaya';
import './App.css';

const App = () => {
  const location = useLocation();
  const juegoActivo = location.pathname === '/bingo';

  return (
    <div className="container">
      <div>
        <Link to="/bingo">
          <button className="app-button" disabled={juegoActivo}>Jugar Bingo</button>
        </Link>
        <Link to="/tres-en-raya">
          <button className="app-button" disabled={!juegoActivo}>Jugar Tres en Raya</button>
        </Link>
      </div>
      <Routes>
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/tres-en-raya" element={<TresEnRaya />} />
        <Route path="*" element={<Navigate to="/bingo" />} />      
      </Routes>
    </div>
  );
};

export default App;
