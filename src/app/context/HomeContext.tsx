'use client'

import React, {createContext, ReactNode, useEffect, useState} from 'react';

// Um tipo de dado que define quais dados e operações serão criados
type HomeContextData = {
    contadorMusica: number;
    quantidadeMusicas: number;
    playing: boolean;
    
    passarMusica: () => void;
    voltarMusica: () => void;
    configPlayPause: () => void;
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
    const [audio, setAudio] = useState<HTMLAudioElement>();
    
    useEffect(()=>{
        const newAudio = new Audio("audios/KocchiNoKento.mp3");
        setAudio(newAudio);
    }, [])

    const configPlayPause = () => {
        if(playing){
            pause();
        }
        else{
            play();
        }
        setPlay(!playing);
    }

    const play = () => {
        if (!audio) return;
            audio.play();
    }
    const pause = () => {
        if (!audio) return;
            audio.pause();
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
                playing, configPlayPause,
                contadorMusica, passarMusica, voltarMusica,
                quantidadeMusicas,
            }
        }>
          {children}
        </HomeConstext.Provider>
    )
}

export default HomeContextProvider;