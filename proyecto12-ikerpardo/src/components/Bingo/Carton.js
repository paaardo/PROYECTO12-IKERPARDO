import React from 'react';
import './Bingo.css';

const Carton = ({ carton, numerosLlamados, onNumeroClick }) => (
  <div className="carton-numeros">
    {carton.map((numero, index) => (
      <div
        key={index}
        className={`numero-carton ${numerosLlamados.includes(numero) ? 'resaltado-carton' : ''}`}
        onClick={() => onNumeroClick(numero)}
      >
        {numero}
      </div>
    ))}
  </div>
);

export default Carton;
