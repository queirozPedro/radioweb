'use client'

import Image from "next/image";
import { HomeConstext } from "./context/HomeContext";
import { useContext } from "react";
import { GiPlayButton } from "react-icons/gi";
import { GiPauseButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";

export default function Home() {
  const {
    playing, configPlayPause, 
    contadorMusica, passarMusica, voltarMusica
  } = useContext(HomeConstext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-[100px]">Música {contadorMusica}</h1>
      <h1 className="text-[100px]">{playing? "Tocando": "Pausada"}</h1>
      <div>
        <button onClick={()=> voltarMusica()}>
          <GiPreviousButton className="text-[80px]"/>
        </button>
        <button onClick={()=> configPlayPause()}>
          {playing? <GiPauseButton className="text-[80px]"/> : <GiPlayButton className="text-[80px]"/>}
        </button>
        <button onClick={()=> passarMusica()}>
          <GiNextButton  className="text-[80px]"/>
        </button> 
      </div>
    </main>
  );
}
