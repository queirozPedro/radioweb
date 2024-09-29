'use client'

import Image from "next/image";
import { HomeContext } from "./context/HomeContext";
import { useContext, useEffect } from "react";
import { GiPlayButton, GiPauseButton, GiNextButton, GiPreviousButton } from "react-icons/gi";
import { musics } from "./dados/music";

export default function Home() {
  const context = useContext(HomeContext);

  if (!context) {
    return <div>Carregando</div>;
  }

  const {
    playing, configPlayPause,
    nomeMusica, passarMusica, voltarMusica,
    volume, selecionarMusica, configVolume,
    panner, configPanner, musicIndex, quantidadeMusicas

  } = context;

  useEffect(() => {
    selecionarMusica(0);
  }, [])

  return (
    <main className="flex min-h-screen p-24">
    <div className="flex w-full justify-between">
      <div className="flex flex-col items-center justify-center text-center w-3/4">

          {musics[musicIndex]?.image && (
            <Image 
              src={musics[musicIndex].image} 
              alt={`Capa da música ${nomeMusica}`} 
              width={300} // Largura da imagem
              height={300} // Altura da imagem
              className="rounded" // Estilização opcional
            />
          )}

        <h1 className="text-[40px] mb-[30px]">{nomeMusica}</h1>
        <div className="flex items-center">
          <button onClick={() => voltarMusica()}>
            <GiPreviousButton className="text-[50px]" />
          </button>
          <button onClick={() => configPlayPause()}>
            {playing ? <GiPauseButton className="text-[50px]" /> : <GiPlayButton className="text-[50px]" />}
          </button>
          <button onClick={() => passarMusica()}>
            <GiNextButton className="text-[50px]" />
          </button>
        </div>
        
        <div className="mt-[50px]">
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={(e) => configVolume(Number(e.target.value))}
          />
          <input
            type="range"
            min="-1"
            max="1"
            value={panner}
            onChange={e => configPanner(Number(e.target.value))}
            step="0.01"
          />
        </div>
      </div>

      <div className="flex flex-col items-start w-1/4 p-4 border-l border-gray-300 max-h-[400px] overflow-y-auto">
        <h2 className="text-xl mb-4">Playlist</h2>
        {musics.map((music, i) => (
          <button onClick={() => selecionarMusica(i)} key={i} className="w-full">
            <div className="hover:bg-blue-400 p-2 w-full text-left">
              <p className="text-[15px]">{music.nome}</p>
              <p className="text-[10px]">{music.author}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  </main>
  );
}