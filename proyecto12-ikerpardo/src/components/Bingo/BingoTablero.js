import React from 'react';
import './Bingo.css';

const BingoTablero = ({ numerosLlamados }) => (
  <div className="bingo-tablero">
    <div className="numeros">
      {Array.from({ length: 99 }, (_, i) => i + 1).map((numero) => (
        <div key={numero} className={`numero ${numerosLlamados.includes(numero) ? 'resaltado' : ''}`}>
          {numero}
        </div>
      ))}
    </div>
  </div>
);

export default BingoTablero;
