// src/hooks/useJuego.js
import { useReducer } from 'react';

const estadoInicial = {
  juegoActivo: false,
  numerosLlamados: [],
  carton: [],
  numeroActual: null,
  estaPausado: false,
  juegoTerminado: false,
  mostrarBingo: false,
  cartonGenerado: false,
};

const juegoReducer = (estado, accion) => {
  switch (accion.type) {
    case 'INICIAR_JUEGO':
      return {
        ...estado,
        juegoActivo: true,
        numerosLlamados: [],
        numeroActual: null,
        juegoTerminado: false,
        mostrarBingo: false,
        cartonGenerado: true,
      };
    case 'PAUSAR_JUEGO':
      return {
        ...estado,
        estaPausado: true,
      };
    case 'REENUDAR_JUEGO':
      return {
        ...estado,
        estaPausado: false,
      };
    case 'REINICIAR_JUEGO':
      return estadoInicial;
    case 'GENERAR_CARTON':
      return {
        ...estado,
        carton: accion.payload,
      };
    case 'AGREGAR_NUMERO':
      return {
        ...estado,
        numerosLlamados: [...estado.numerosLlamados, accion.payload],
      };
    case 'TERMINAR_JUEGO':
      return {
        ...estado,
        juegoTerminado: true,
      };
    case 'MOSTRAR_BINGO':
      return {
        ...estado,
        mostrarBingo: true,
      };
    default:
      return estado;
  }
};

const useJuego = (juego) => {
  const [estado, despachar] = useReducer(juegoReducer, estadoInicial);

  const iniciarJuego = () => {
    despachar({ type: 'INICIAR_JUEGO' });
  };

  const pausarJuego = () => {
    despachar({ type: 'PAUSAR_JUEGO' });
  };

  const reanudarJuego = () => {
    despachar({ type: 'REENUDAR_JUEGO' });
  };

  const reiniciarJuego = () => {
    despachar({ type: 'REINICIAR_JUEGO' });
  };

  const generarCarton = () => {
    const numerosAleatorios = [];
    while (numerosAleatorios.length < 5) {
      const numero = Math.floor(Math.random() * 99) + 1;
      if (!numerosAleatorios.includes(numero)) {
        numerosAleatorios.push(numero);
      }
    }
    despachar({ type: 'GENERAR_CARTON', payload: numerosAleatorios });
  };

  const agregarNumero = (numero) => {
    despachar({ type: 'AGREGAR_NUMERO', payload: numero });
  };

  const terminarJuego = () => {
    despachar({ type: 'TERMINAR_JUEGO' });
  };

  const mostrarBingo = () => {
    despachar({ type: 'MOSTRAR_BINGO' });
  };

  return {
    ...estado,
    iniciarJuego,
    pausarJuego,
    reanudarJuego,
    reiniciarJuego,
    generarCarton,
    agregarNumero,
    terminarJuego,
    mostrarBingo,
  };
};

export default useJuego;
