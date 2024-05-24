"use client";
import { useState } from "react";
import { Chat, ChatMessage, DifficultySettingsTypes } from "@/types";
import { newMessage } from "../../functions/chat";

export default function StartButton(props: {
  startGame: any;
  chatData: Chat;
  updateChat: any;
  currentDiff: DifficultySettingsTypes;
  currentSkips: number;
  currentMultiplier: number;
  isGameStarting: boolean;
  setIsGameStarting: any;
}) {
  let [buttonText, setButtonText] = useState("Play 🏃");
  let [buttonColor, setButtonColor] = useState(
    "bg-green-600/40 hover:bg-green-600/60"
  );

  let chatMsg: ChatMessage = {
    status: "announce",
    style: {
      bold: true,
      color: "yellow",
    },
    content: "⚠️ Game starts in 3... ⚠️",
    timestamp: Date.now(),
  };
  return (
    <button
      className={`w-40 h-12 p-2 px-8 rounded-lg text-center text-c-white text-2xl text-nowrap font-bold place-content-center transition-colors ease-in-out overflow-hidden ${buttonColor}`}
      disabled={props.isGameStarting}
      onClick={() => {
        props.setIsGameStarting(true);
        setButtonText("HF ! 🏃");
        setTimeout(() => {
          setButtonText("3");
          setButtonColor("bg-yellow-600/40");
          newMessage(props.chatData, chatMsg, props.updateChat);
          setTimeout(() => {
            setButtonText("2");
            setButtonColor("bg-orange-600/40");
            chatMsg = { ...chatMsg };
            chatMsg.content = "⚠️ Game starts in 2.. ⚠️";
            newMessage(props.chatData, chatMsg, props.updateChat);

            setTimeout(() => {
              setButtonText("1");
              setButtonColor("bg-red-600/40");
              chatMsg = { ...chatMsg };
              chatMsg.content = "⚠️ Game starts in 1.. ⚠️";
              newMessage(props.chatData, chatMsg, props.updateChat);

              setTimeout(() => {
                props.startGame();
              }, 1000);
            }, 1000);
          }, 1000);
        }, 500);
      }}
    >
      {buttonText}
    </button>
  );
}
