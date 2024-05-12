import { useState } from "react";
import Chatbox from "../components/chat/Chatbox";
import { Chat, ChatMessage } from "../../../../types";
import { clearChat, newMessage } from "../functions/chat";

export default function Setup(props: {
  startGame: any;
  chatData: Chat;
  updateChat: any;
}) {
  let [buttonText, setButtonText] = useState("Start");
  let [buttonColor, setButtonColor] = useState("bg-green-600");

  return (
    <div className="w-full h-full flex flex-row justify-center items-center md:space-x-6 text-c-dark">
      <div className="w-[16%] h-[70%] bg-c-dark rounded-2xl flex flex-col-reverse">
        <button
          className={`w-32 h-12 p-2 rounded-lg mx-auto mb-8 text-center text-c-white text-2xl font-bold place-content-center transition-colors ease-in-out duration-700 ${buttonColor}`}
          onClick={() => {
            setButtonText("3");
            setButtonColor("bg-yellow-600");
            setTimeout(() => {
              setButtonText("2");
              setButtonColor("bg-orange-600");
              setTimeout(() => {
                setButtonText("1");
                setButtonColor("bg-red-600");
                setTimeout(() => {
                  props.startGame();
                }, 1000);
              }, 1000);
            }, 1000);
          }}
        >
          {buttonText}
        </button>
      </div>
      <Chatbox
        chatData={props.chatData}
        updateChat={props.updateChat}
      ></Chatbox>
    </div>
  );
}
