'use client'

import Image from "next/image";
import { HomeContext } from "./context/HomeContext";
import { useContext } from "react";
import { GiPlayButton, GiPauseButton, GiNextButton, GiPreviousButton } from "react-icons/gi";
import { musics } from "./dados/music";

export default function Home() {
  const context = useContext(HomeContext);

  if (!context) {
    return <div>Carregando</div>;
  }

  const {
    playing, configPlayPause,
    nomeMusica, passarMusica, voltarMusica

  } = context;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-[100px]">{nomeMusica}</h1>
        <div className="flex items-center">
          <button onClick={() => voltarMusica()}>
            <GiPreviousButton className="text-[80px]" />
          </button>
          <button onClick={() => configPlayPause()}>
            {playing ? <GiPauseButton className="text-[80px]" /> : <GiPlayButton className="text-[80px]" />}
          </button>
          <button onClick={() => passarMusica()}>
            <GiNextButton className="text-[80px]" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          {musics.map((music, i) => (
            <button>
              <div key={i} className="mb-2 cursor-pointer">
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