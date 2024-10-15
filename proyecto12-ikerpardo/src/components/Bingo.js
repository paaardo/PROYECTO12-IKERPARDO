import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import useJuego from '../hooks/useJuego';
import './Bingo.css';

const Bingo = () => {
  const {
    numerosLlamados,
    carton,
    numeroActual,
    estaPausado,
    juegoTerminado,
    mostrarBingo,
    cartonGenerado,
    iniciarJuego,
    pausarJuego,
    reanudarJuego,
    reiniciarJuego,
    generarCarton,
    agregarNumero,
    actualizarNumeroActual,
    terminarJuego,
    juegoActivo,
  } = useJuego('bingo');

  const [numeros, setNumeros] = React.useState(Array.from({ length: 99 }, (_, i) => i + 1));
  const montado = useRef(false);
  useEffect(() => {
    if (!montado.current) {
      generarCarton();
      montado.current = true;
    }
  }, [generarCarton]);

  const llamarNumero = useCallback(() => {
    const numero = numeros[Math.floor(Math.random() * numeros.length)];
    agregarNumero(numero);
    actualizarNumeroActual(numero);
    setNumeros(numeros.filter((n) => n !== numero));
  }, [numeros, agregarNumero, actualizarNumeroActual]);

  useEffect(() => {
    if (!estaPausado && !juegoTerminado && juegoActivo) {
      const id = setInterval(() => {
        if (numeros.length > 0) {
          llamarNumero();
        } else {
          clearInterval(id);
        }
      }, 1250);

      return () => clearInterval(id);
    }
  }, [estaPausado, numeros, juegoTerminado, juegoActivo, llamarNumero]);

  const handleReiniciarJuego = () => {
    reiniciarJuego();
    setNumeros(Array.from({ length: 99 }, (_, i) => i + 1));
    generarCarton();
  };

  useEffect(() => {
    if (cartonGenerado && carton.every((numero) => numerosLlamados.includes(numero))) {
      terminarJuego();
      mostrarBingo();
      pausarJuego();
    }
  }, [numerosLlamados, carton, cartonGenerado, terminarJuego, mostrarBingo, pausarJuego]);

  const numerosCarton = useMemo(() => (
    carton.map((numero, index) => (
      <div
        key={index}
        className={`numero-carton ${numerosLlamados.includes(numero) ? 'resaltado-carton' : ''}`}
      >
        {numero}
      </div>
    ))
  ), [carton, numerosLlamados]);

  return (
    <div className="bingo-container">
      <h1>Bingo</h1>
      <div className="carton-container">
        <h2>Tu Cartón:</h2>
        <div className="carton-numeros">
          {numerosCarton}
        </div>
        <button className="boton-cambiar-carton" onClick={generarCarton} disabled={juegoActivo}>
          Cambiar Cartón
        </button>
      </div>
      <button className="boton-iniciar" onClick={iniciarJuego} disabled={juegoActivo}>
        Iniciar Bingo
      </button>
      <button className="boton-reiniciar" onClick={handleReiniciarJuego} disabled={!juegoActivo}>
        Reiniciar Bingo
      </button>
      {estaPausado ? (
        <button className="boton-reanudar" onClick={reanudarJuego} disabled={juegoTerminado}>
          Reanudar Juego
        </button>
      ) : (
        <button className="boton-pausar" onClick={pausarJuego} disabled={!juegoActivo || juegoTerminado}>
          Pausar Juego
        </button>
      )}

      <div className="bingo-tablero-container">
        <div className="bingo-tablero">
          <div className="numeros">
            {Array.from({ length: 99 }, (_, i) => i + 1).map((numero) => (
              <div key={numero} className={`numero ${numerosLlamados.includes(numero) ? 'resaltado' : ''}`}>
                {numero}
              </div>
            ))}
          </div>
        </div>
        <div className="numero-llamado">
        {numeroActual && <div className="bola">{numeroActual}</div>}
        </div>
      </div>
      {juegoTerminado && mostrarBingo && <div className="mensaje-bingo">¡Bingo!</div>}
    </div>
  );
};

export default Bingo;
