'use client'

import React, { createContext, ReactNode, useEffect, useState, useRef } from 'react';
import { musics } from '../dados/music';

type HomeContextData = {
    musicIndex: number;
    quantMusicas: number;
    playing: boolean;
    nomeMusica: string
    volume: number;
    oldVolume: number;
    panner: number;
    tempoAtual: number;
    duracao: number;
    
    mutarVolume: () => void;
    passarMusica: () => void;
    voltarMusica: () => void;
    configPlayPause: () => void;
    selecionarMusica: (i: number) => void;
    configVolume: (value: number) => void;
    configPanner: (value: number) => void;
    controlarTempo: (value: number) => void;
}

export const HomeContext = createContext<HomeContextData | undefined>(undefined); 

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {    
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [oldVolume, setOldVolume] = useState(0);
    const [gain, setGain] = useState<GainNode>(); 
    const [musicIndex, setMusicIntex] = useState(0);
    const [quantMusicas] = useState(musics.length); 
    const [audio, setAudio] = useState<HTMLAudioElement>(); 
    const [nomeMusica, setNomeMusica] = useState(""); 
    const [stereo, setStereo] = useState<StereoPannerNode>();
    const [panner, setPanner] = useState(0);
    const [tempoAtual, setTempoAtual] = useState(0);
    const [duracao, setDuracao] = useState(0);
    
    /**
     * UseEffect um hook(gancho) que será executado sempre que o valor de áudio for alterado.
     * Esse monitora o estado do aúdio e garante que ele esteja sempre tocando desde que exista um.
     */
    useEffect(() => {  
        if (playing) {
            if(!audio) return;
            audio.play();
        }
        if(audio){
            audio.onloadedmetadata = () => {
                setDuracao(audio.duration)
            }
            audio.ontimeupdate = () => {
                setTempoAtual(audio.currentTime)
            }
        }
        // Isso aqui é o efeito colateral da mudança no valor de áudio.
    }, [audio]);
    // [audio] é a dependência do hook

    const controlarTempo = (value: number) => {
        if(audio){
            audio.currentTime = value
            setTempoAtual(value)
        }
    }

    const passarMusica = () => {
        selecionarMusica(musicIndex + 1 >= quantMusicas? 0: musicIndex + 1);
    }

    const voltarMusica = () => {
        selecionarMusica(musicIndex - 1 < 0? quantMusicas - 1: musicIndex - 1);
    }

    const mutarVolume = () => {
        if(volume > 0){
            setOldVolume(volume)
            configVolume(0)
        } else if(oldVolume > 0){
            configVolume(oldVolume)
        }
    }

    const selecionarMusica = (i: number) => {
        // Seleciona uma música pelo indice i
        setMusicIntex(i);
        // Cria um objeto do tipo Audio
        const updatedAudio = new Audio(`${musics[i].urlAudio}`);
        // Pausa a música
        pause();
        // Atualiza o áudio
        setAudio(updatedAudio);
        // Passa o nome da música
        setNomeMusica(`${musics[i].nome}`)
        // AudioContext é uma interface que permite a manipulação do áudio
        const audioContext = new AudioContext();
        // Serve como ponte entre o AudioContext e o elemento de áudio, um ponto de entrada.
        const media = audioContext.createMediaElementSource(updatedAudio);
        // Cria um nó de ganho, que permite aumentar e abaixar o volume da música.
        const updatedGain = audioContext.createGain();
        // Cria a manipulação do Stereo que permite controlar a quantidade de áudio dos lados.
        const updatedStereo = audioContext.createStereoPanner();
        // Conecta o ganho na mídia
        media.connect(updatedGain);
        // Conecta o ganho ao canal Stereo
        updatedGain.connect(updatedStereo);
        // Conecta o áudio ao Stereo
        updatedStereo.connect(audioContext.destination);
        
        // Quando ouver o play, o áudio continua
        updatedAudio.onplay = () => {
            audioContext.resume();
        }

        // Atualiza o estado do Gain e o do Stereo
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
            musicIndex, passarMusica, voltarMusica,
            quantMusicas, nomeMusica, selecionarMusica, 
            volume, configVolume,
            panner, configPanner,
            mutarVolume, oldVolume,
            duracao, tempoAtual, controlarTempo,
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
