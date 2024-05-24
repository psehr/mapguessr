"use client";

import { useState } from "react";
import { Chat, DifficultySettingsTypes } from "@/types";
import LbButton from "../buttons/LbButton";
import StartButton from "../buttons/StartButton";
import HelpButton from "../buttons/HelpButton";
import Image from "next/image";

export default function MiddleBlock(props: {
  startGame: any;
  chatData: Chat;
  updateChat: any;
  currentDiff: DifficultySettingsTypes;
  currentSkips: number;
  currentMultiplier: number;
  isGameStarting: boolean;
  setIsGameStarting: any;
}) {
  const [help, setHelp] = useState(false);
  const renderDesc = (help: boolean) => {
    if (!help) {
      return (
        <>
          <div className="w-full h-[40%] flex flex-col gap-8 place-content-center items-center">
            <div className="w-full text-center font-semibold">
              <p> How fast can you guess the 10 osu! backgrounds?</p>
            </div>
            <div className="w-3/4 text-center flex flex-col">
              <p>Compete against everyone in this time-based mode ⏱️</p>
              <p>Wrong or inaccurate guesses lower your accuracy ⚠️</p>
              <p>Final time and accuracy defines your rating 🎮</p>
            </div>
          </div>
          <div className="w-full h-[40%] flex flex-col place-content-center items-center">
            <div className="w-3/4 h-fit rounded-xl overflow-hidden drop-shadow-lg">
              <Image
                src="/image.png"
                alt="Example gameplay"
                width={1785}
                height={720}
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="w-full h-full flex flex-col gap-8 place-content-center items-center">
          <div className="w-3/4 text-center flex flex-col">
            <p>Maps are skippable if needed ⏭️</p>{" "}
          </div>
          <div className="w-3/4 flex flex-col gap-2 place-content-center items-center">
            <div className="text-center flex flex-col">
              <p>🕹️ Difficulty setting changes: </p>
            </div>
            <div className="w-[60%] text-left flex flex-col">
              <p>- Background rarity (by popularity)</p>
              <p>- Your default available skips</p>
              <p>- Rating multiplier</p>
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-2 place-content-center items-center">
            <div className="text-center flex flex-col">
              <p>✅ Valid guesses includes either:</p>
            </div>
            <div className="w-[60%] text-left flex flex-col">
              <p>- The full title (artist and title) 👑</p>
              <p>- The artist 🎤</p>
              <p>- The title 📃</p>
              <p>- The mapper and his aliases 🧑‍🎨</p>
              <p>- The guest difficulties mappers 🖌️</p>
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-2 place-content-center items-center">
            <div className="text-center flex flex-col">
              <p>❌ They don't include:</p>
            </div>
            <div className="w-[60%] text-left flex flex-col">
              <p>- Difficulty names</p>
              <p>- Tags</p>
              <p>- Etc..</p>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div className="h-[10%] w-full flex flex-col font-bold text-2xl text-c-white place-content-center items-center base-container">
        Sprint gamemode 🏃
      </div>
      <div className="h-[75%] w-full flex flex-col font-medium text-xl text-c-white place-content-center items-center">
        {renderDesc(help)}
      </div>
      <div className="h-[15%] w-full flex flex-row place-content-center items-center gap-4">
        <LbButton></LbButton>
        <StartButton
          startGame={props.startGame}
          chatData={props.chatData}
          updateChat={props.updateChat}
          currentDiff={props.currentDiff}
          currentMultiplier={props.currentMultiplier}
          currentSkips={props.currentSkips}
          isGameStarting={props.isGameStarting}
          setIsGameStarting={props.setIsGameStarting}
        ></StartButton>
        <HelpButton help={help} setHelp={setHelp}></HelpButton>
      </div>
    </>
  );
}
