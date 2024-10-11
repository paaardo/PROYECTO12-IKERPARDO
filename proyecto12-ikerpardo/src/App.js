import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Bingo from './components/Bingo';
import TresEnRaya from './components/TresEnRaya';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div>
        <Link to="/bingo">
          <button className="app-button">Jugar Bingo</button>
        </Link>
        <Link to="/tres-en-raya">
          <button className="app-button">Jugar Tres en Raya</button>
        </Link>
      </div>
      <Routes>
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/tres-en-raya" element={<TresEnRaya />} />
      </Routes>
    </div>
  );
};

export default App;
