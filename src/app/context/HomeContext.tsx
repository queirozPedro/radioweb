'use client'

import React, { createContext, ReactNode, useEffect, useState, useRef } from 'react';
import { musics } from '../dados/music';

type HomeContextData = {
    contadorMusica: number;
    quantidadeMusicas: number;
    playing: boolean;
    nomeMusica: string
    volume: number;
    panner: number;
    
    passarMusica: () => void;
    voltarMusica: () => void;
    configVolume: (value: number) => void;
    selecionarMusica: (i: number) => void;
    configPlayPause: () => void;
    configPanner: (value: number) => void;
}

export const HomeContext = createContext<HomeContextData | undefined>(undefined); 

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {    
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(1);
    const [gain, setGain] = useState<GainNode>(); 
    const [contadorMusica, setMusica] = useState(0);
    const [quantidadeMusicas] = useState(musics.length); 
    const [audio, setAudio] = useState<HTMLAudioElement>(); 
    const [nomeMusica, setNomeMusica] = useState(""); 
    const [stereo, setStereo] = useState<StereoPannerNode>();
    const [panner, setPanner] = useState(0);
    
    useEffect(() => {
        if (playing) {
            if(!audio) return;
            audio.play();
        }
    }, [audio]);

    const passarMusica = () => {
        setMusica(contadorMusica >= quantidadeMusicas ? 1 : contadorMusica + 1);
    }

    const voltarMusica = () => {
        setMusica(contadorMusica <= 1 ? quantidadeMusicas : contadorMusica - 1);
    }

    const selecionarMusica = (i: number) => {
        setMusica(i);
        const updatedAudio = new Audio(`${musics[i].urlAudio}`);
        pause();
        setAudio(updatedAudio);
        const audioConext = new AudioContext();
        const media = audioConext.createMediaElementSource(updatedAudio);
        const updatedGain = audioConext.createGain();
        const updatedStereo = audioConext.createStereoPanner();
        media.connect(updatedGain);
        updatedGain.connect(updatedStereo);
        updatedStereo.connect(audioConext.destination);
        
        updatedAudio.onplay = () => {
            audioConext.resume();
        }

        setGain(updatedGain);
        setStereo(updatedStereo);
    }

    const configVolume = (value:number) => {
        if (!gain) return;
        gain.gain.value = value;
        setVolume(value);
    }

    const configPanner = (value:number) => {
        if (!stereo) return;
        stereo.pan.value = value;
        setPanner(value);
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
        if (audio) {
            audio.play();
        }
    }

    const pause = () => {
        if (audio) {
            audio.pause();
        }
    }

    return (
        <HomeContext.Provider value={{
            playing, configPlayPause,
            contadorMusica, passarMusica, voltarMusica,
            quantidadeMusicas, nomeMusica, selecionarMusica, 
            volume, configVolume,
            panner, configPanner

        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
