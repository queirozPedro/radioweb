'use client'

import React, { createContext, ReactNode, useEffect, useState, useRef } from 'react';
import { musics } from '../dados/music';

type HomeContextData = {
    contadorMusica: number;
    quantidadeMusicas: number;
    playing: boolean;
    nomeMusica: string
    
    passarMusica: () => void;
    voltarMusica: () => void;
    selecionarMusica: (i: number) => void;
    configPlayPause: () => void;
}

export const HomeContext = createContext<HomeContextData | undefined>(undefined); 

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {    
    const [playing, setPlay] = useState(false);
    const [contadorMusica, setMusica] = useState(0);
    const [quantidadeMusicas] = useState(musics.length); 
    const [audio, setAudio] = useState<HTMLAudioElement>(); 
    const [nomeMusica, setNomeMusica] = useState(""); 
    const audioRef = useRef<HTMLAudioElement >();
    
    useEffect(() => {
        const currentMusic = musics[contadorMusica]; 
        const newAudio = new Audio(currentMusic.urlAudio);
        setAudio(newAudio);
        setNomeMusica(currentMusic.nome)
        audioRef.current = newAudio;
        if (playing) {
            newAudio.play();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [contadorMusica, playing]);

    const passarMusica = () => {
        setMusica(contadorMusica >= quantidadeMusicas ? 1 : contadorMusica + 1);
    }

    const voltarMusica = () => {
        setMusica(contadorMusica <= 1 ? quantidadeMusicas : contadorMusica - 1);
    }

    const selecionarMusica = (i: number) => {
        setMusica(i);
    }

    const configPlayPause = () => {
        if (playing) {
            pause();
        } else {
            play();
        }
        setPlay(!playing);
    }

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    return (
        <HomeContext.Provider value={{
            playing, configPlayPause,
            contadorMusica, passarMusica, voltarMusica,
            quantidadeMusicas, nomeMusica, selecionarMusica, 
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
