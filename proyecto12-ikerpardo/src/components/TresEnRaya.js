import React, { useEffect, useCallback, useMemo } from 'react';
import useJuego from '../hooks/useJuego';
import './TresEnRaya.css';

const TresEnRaya = () => {
  const {
    reiniciarJuego,
  } = useJuego('tres-en-raya');

  const [tablero, setTablero] = React.useState(Array(9).fill(null));
  const [jugadorActual, setJugadorActual] = React.useState('X');
  const [ganador, setGanador] = React.useState(null);
  const [esperandoIA, setEsperandoIA] = React.useState(false);
  const [turnoIATimeout, setTurnoIATimeout] = React.useState(null);

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
    const espaciosDisponibles = tablero.map((valor, index) => valor === null ? index : null).filter(v => v !== null);
    if (espaciosDisponibles.length === 0 || ganador) return;

    const movimientoIA = espaciosDisponibles[Math.floor(Math.random() * espaciosDisponibles.length)];
    const nuevoTablero = [...tablero];
    nuevoTablero[movimientoIA] = 'O';
    setTablero(nuevoTablero);
    verificarGanador(nuevoTablero);
    setJugadorActual('X');
    setEsperandoIA(false);
  }, [tablero, verificarGanador, ganador]);

  const manejarClick = useCallback((index) => {
    if (tablero[index] || ganador || esperandoIA) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = jugadorActual;
    setTablero(nuevoTablero);
    verificarGanador(nuevoTablero);
    setJugadorActual('O');
    setEsperandoIA(true);
  }, [tablero, jugadorActual, ganador, verificarGanador, esperandoIA]);

  useEffect(() => {
    if (esperandoIA && !ganador) {
      const timeout = setTimeout(realizarMovimientoIA, 1000);
      setTurnoIATimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [esperandoIA, realizarMovimientoIA, ganador]);

  const casillas = useMemo(() => (
    tablero.map((valor, index) => (
      <div key={index} className={`casilla ${esperandoIA || ganador ? 'deshabilitado' : ''}`} onClick={() => manejarClick(index)}>
        {valor}
      </div>
    ))
  ), [tablero, manejarClick, esperandoIA, ganador]);

  const reiniciarPartida = () => {
    setTablero(Array(9).fill(null));
    setJugadorActual('X');
    setGanador(null);
    setEsperandoIA(false);
    clearTimeout(turnoIATimeout);
    reiniciarJuego();
  };

  return (
    <div className="tres-en-raya-container">
      <h1>Tres en Raya</h1>
      <div className="tablero">
        {casillas}
      </div>
      <div className="estado">
        {ganador ? (ganador === 'Empate' ? '¡Es un empate!' : `¡Ganó ${ganador}!`) : `Turno de ${jugadorActual}`}
      </div>
      <div className="contenedor-reiniciar">
        <button className="boton-reiniciar" onClick={reiniciarPartida}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default TresEnRaya;
