'use client'

import React, {createContext, ReactNode, useState} from 'react';

// Um tipo de dado que define quais dados e operações serão criados
type HomeContextData = {
    contadorMusica: number;
    quantidadeMusicas: number;
    playing: boolean;
    
    passarMusica: () => void;
    voltarMusica: () => void;
    playPause: () => void;
}

export const HomeConstext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

// Vai porver as informações
const HomeContextProvider = ({children}:ProviderProps) => {    
    const [playing, setPlay] = useState(false);
    const [contadorMusica, setMusica] = useState(1);
    const [quantidadeMusicas, setQuantMusicas] = useState(20);
    
    const playPause = () => {
        setPlay(playing? false: true);
    }
    const passarMusica = () => {
        setMusica(contadorMusica >= quantidadeMusicas? 1: contadorMusica + 1);
    }
    const voltarMusica = () => {
        setMusica(contadorMusica <= 1? quantidadeMusicas: contadorMusica - 1);
    }

    return (
        <HomeConstext.Provider value={
            {
                playing, playPause,
                contadorMusica, passarMusica, voltarMusica,
                quantidadeMusicas
            }
        }>
          {children}
        </HomeConstext.Provider>
    )
}

export default HomeContextProvider;