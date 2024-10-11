import React, { useEffect, useCallback, useMemo } from 'react';
import useJuego from '../hooks/useJuego';
import './TresEnRaya.css';

const TresEnRaya = () => {
  const {
    juegoActivo,
    iniciarJuego,
    reiniciarJuego,
  } = useJuego('tres-en-raya');

  const [tablero, setTablero] = React.useState(Array(9).fill(null));
  const [jugadorActual, setJugadorActual] = React.useState('X');
  const [ganador, setGanador] = React.useState(null);
  const [esperandoIA, setEsperandoIA] = React.useState(false);

  const verificarGanador = useCallback((nuevoTablero) => {
    const combinacionesGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (nuevoTablero[a] && nuevoTablero[a] === nuevoTablero[b] && nuevoTablero[a] === nuevoTablero[c]) {
        setGanador(nuevoTablero[a]);
        return;
      }
    }
    
    if (!nuevoTablero.includes(null)) {
      setGanador('Empate');
    }
  }, []);

  const realizarMovimientoIA = useCallback(() => {
    setTimeout(() => {
      const espaciosDisponibles = tablero.map((valor, index) => valor === null ? index : null).filter(v => v !== null);
      if (espaciosDisponibles.length === 0) return;

      const movimientoIA = espaciosDisponibles[Math.floor(Math.random() * espaciosDisponibles.length)];
      const nuevoTablero = [...tablero];
      nuevoTablero[movimientoIA] = 'O';
      setTablero(nuevoTablero);
      verificarGanador(nuevoTablero);
      setJugadorActual('X');
    }, 1000);
  }, [tablero, verificarGanador]);

  const manejarClick = useCallback((index) => {
    if (tablero[index] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = jugadorActual;
    setTablero(nuevoTablero);
    verificarGanador(nuevoTablero);
    setJugadorActual('O');
    setEsperandoIA(true);
  }, [tablero, jugadorActual, ganador, verificarGanador]);

  useEffect(() => {
    if (esperandoIA) {
      realizarMovimientoIA();
      setEsperandoIA(false);
    }
  }, [esperandoIA, realizarMovimientoIA]);

  const casillas = useMemo(() => (
    tablero.map((valor, index) => (
      <div key={index} className="casilla" onClick={() => manejarClick(index)}>
        {valor}
      </div>
    ))
  ), [tablero, manejarClick]);

  return (
    <div className="tres-en-raya-container">
      <h1>Tres en Raya</h1>
      <button className="boton-iniciar" onClick={iniciarJuego} disabled={juegoActivo}>
        Iniciar Juego
      </button>
      <button className="boton-reiniciar" onClick={reiniciarJuego} disabled={!juegoActivo}>
        Reiniciar Juego
      </button>
      <div className="tablero">
        {casillas}
      </div>
      {ganador && <div className="mensaje">{ganador === 'Empate' ? '¡Es un empate!' : `¡Ganó ${ganador}!`}</div>}
    </div>
  );
};

export default TresEnRaya;
