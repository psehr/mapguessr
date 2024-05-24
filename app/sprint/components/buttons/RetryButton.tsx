import { useState } from "react";
import { startGame } from "../../functions/game";
import { Chat, ChatMessage } from "@/types";
import { newMessage } from "../../functions/chat";

const retrySvg = (
  <div className="size-6 flex m-auto">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 2.99988C16.9706 2.99988 21 7.02931 21 11.9999C21 16.9704 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9704 3 11.9999C3 9.17261 4.30367 6.64983 6.34267 4.99988"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></path>
        <path
          d="M3 4.49988H7V8.49988"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></path>
      </g>
    </svg>
  </div>
);

export default function RetryButton(props: {
  startGame: any;
  chatData: Chat;
  updateChat: any;
}) {
  let [buttonText, setButtonText] = useState("");
  let [buttonColor, setButtonColor] = useState(
    "bg-green-600/40 hover:bg-green-600/60"
  );
  let [isGameStarting, setIsGameStarting] = useState(false);
  let chatMsg: ChatMessage = {
    status: "announce",
    style: {
      bold: true,
      color: "yellow",
    },
    content: "",
    timestamp: Date.now(),
  };
  return (
    <button
      className={`h-full w-24 px-8 rounded-2xl text-c-white text-2xl text-center font-bold transition-colors ease-in-out ${buttonColor}`}
      disabled={isGameStarting}
      onClick={() => {
        setIsGameStarting(true);
        setButtonText("3");
        setButtonColor("bg-yellow-600/40");
        chatMsg.content = "⚠️ Game starts in 3... ⚠️";
        newMessage(props.chatData, chatMsg, props.updateChat);
        setTimeout(() => {
          setButtonText("2");
          setButtonColor("bg-orange-600/40");
          let c2 = { ...chatMsg };
          c2.content = "⚠️ Game starts in 2.. ⚠️";
          newMessage(props.chatData, c2, props.updateChat);
          setTimeout(() => {
            setButtonText("1");
            setButtonColor("bg-red-600/40");
            let c3 = { ...c2 };
            c3.content = "⚠️ Game starts in 1. ⚠️";
            newMessage(props.chatData, c3, props.updateChat);
            setTimeout(() => {
              props.startGame();
            }, 1000);
          }, 1000);
        }, 1000);
      }}
    >
      {buttonText ? buttonText : retrySvg}
    </button>
  );
}
