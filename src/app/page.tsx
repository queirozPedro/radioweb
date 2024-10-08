'use client'

import Image from "next/image";
import { HomeContext } from "./context/HomeContext";
import { useContext, useEffect } from "react";
import { BiPlayCircle, BiPauseCircle, BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark  } from "react-icons/hi2";
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
    panner, configPanner, musicIndex, mutarVolume,
    duracao, tempoAtual, controlarTempo

  } = context;

  useEffect(() => {
    selecionarMusica(0);
  }, [])

  return (
    <main className="flex min-h-screen p-24">
      {/*div que contem o a música, as opções de play, pause, passar, voltar e a lista de músicas*/}
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center justify-center text-center w-3/4">
          <div className="border rounded-lg p-6 shadow-lg flex flex-col items-center justify-center h-[500px] w-[400px]">

            <div className="flex flex-col items-center justify-center">
              {musics[musicIndex]?.image && (
                <Image
                  src={musics[musicIndex].image}
                  alt={`Capa da música ${nomeMusica}`}
                  width={300}
                  height={300}
                  className="h-32 w-auto rounded"
                />
              )}
            <h1 className="text-[20px] mb-[30px] mt-[20px]">{nomeMusica}</h1>
            <input type="range"
            min="0"
            max={duracao}
            value={tempoAtual}
            onChange={(e) => controlarTempo(Number(e.target.value))}
          />
          <p className="opacity-80, tracking-wide">{Math.floor(tempoAtual / 60)+":"+(Math.floor(tempoAtual) % 60).toString().padStart(2, '0')} / {Math.floor(duracao / 60)+":"+(Math.floor(duracao) % 60).toString().padStart(2, '0')}</p>
            </div>


            <div className="flex items-center">
              <button onClick={() => voltarMusica()}>
                <BiSkipPreviousCircle className="text-[50px]" />
              </button>
              <button onClick={() => configPlayPause()}>
                {playing ? <BiPauseCircle className="text-[50px]" /> : <BiPlayCircle className="text-[50px]" />}
              </button>
              <button onClick={() => passarMusica()}>
                <BiSkipNextCircle className="text-[50px]" />
              </button>
            </div>

            <div className="mt-[30px]">
              <div className="flex items-center justify-center mb-[5px] mt-[5px]">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.01"
                  value={volume}
                  onChange={(e) => configVolume(Number(e.target.value))}
                />
                <button onClick={() => mutarVolume()} className="ml-[5px]">
                  {volume > 0? <HiMiniSpeakerWave />: <HiMiniSpeakerXMark />}
                </button>
              </div>
              <div className="flex items-center mb-[5px] mt-[5px]">
                <p className="text-[15px] font-bold mr-[5px]" style={{ opacity: -panner + 0.8}}>L</p>
                <input
                  type="range"
                  min="-0.8"
                  max="1"
                  value={panner}
                  onChange={e => configPanner(Number(e.target.value))}                          
                  step="0.05"
                />
                <p className="text-[15px] font-bold ml-[5px]" style={{ opacity: panner + 0.8}}>R</p>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col items-start w-1/4 p-4 border-l border-gray-300 max-h-[500px] overflow-y-auto">
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