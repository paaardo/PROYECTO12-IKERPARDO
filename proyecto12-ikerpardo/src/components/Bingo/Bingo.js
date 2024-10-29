import React, { useEffect, useCallback, useRef, useState } from 'react';
import useJuego from '../../hooks/useJuego';
import Carton from './Carton';
import BingoTablero from './BingoTablero';
import './Bingo.css';

const Bingo = () => {
  const {
    numerosLlamados,
    carton,
    numeroActual,
    estaPausado,
    juegoTerminado,
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

  const [numeros, setNumeros] = useState(Array.from({ length: 99 }, (_, i) => i + 1));
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

  const handleNumeroClick = (numero) => {
    if (numerosLlamados.includes(numero)) {
      agregarNumero(numero);
    }
  };

  useEffect(() => {
    if (juegoActivo && carton.every((numero) => numerosLlamados.includes(numero))) {
      terminarJuego();
      pausarJuego();
    }
  }, [numerosLlamados, carton, terminarJuego, pausarJuego, juegoActivo]);

  const handleIniciarJuego = () => {
    iniciarJuego();
    generarCarton();
    setNumeros(Array.from({ length: 99 }, (_, i) => i + 1)); 
  };

  return (
    <section className="bingo-container">
      <header>
        <h1>Bingo</h1>
        <button className="boton-iniciar" onClick={handleIniciarJuego} disabled={juegoActivo}>
          Iniciar Bingo
        </button>
        <button className="boton-reiniciar" onClick={handleReiniciarJuego} disabled={!juegoActivo}>
          Reiniciar Bingo
        </button>
      </header>
  
      <article className="carton-container">
        <h2>Tu Cartón:</h2>
        <Carton carton={carton} numerosLlamados={numerosLlamados} onNumeroClick={handleNumeroClick} />
        <button className="boton-cambiar-carton" onClick={generarCarton} disabled={juegoActivo}>
          Cambiar Cartón
        </button>
      </article>
  
      <div>
        {estaPausado ? (
          <button className="boton-reanudar" onClick={reanudarJuego} disabled={juegoTerminado}>
            Reanudar Juego
          </button>
        ) : (
          <button className="boton-pausar" onClick={pausarJuego} disabled={!juegoActivo || juegoTerminado}>
            Pausar Juego
          </button>
        )}
      </div>
  
      <section className="bingo-tablero-container">
        <div className="numero-llamado">
          {numeroActual && <div className="bola">{numeroActual}</div>}
        </div>
        <BingoTablero numerosLlamados={numerosLlamados} />
      </section>
  
      {juegoTerminado && <div className="mensaje-bingo">¡Bingo!</div>}
    </section>
  );
};

export default Bingo;
