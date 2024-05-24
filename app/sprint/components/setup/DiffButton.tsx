import { Chat, ChatMessage, DifficultySettingsTypes } from "@/types";
import { newMessage } from "../../functions/chat";

export default function DiffButton(props: {
  type: DifficultySettingsTypes;
  updateSelectedDiff: any;
  currDiff: DifficultySettingsTypes;
  chatData: Chat;
  updateChat: any;
  isGameStarting: boolean;
}) {
  let chatMsg: ChatMessage = {
    status: "announce",
    content: "",
    style: {
      bold: true,
      color: "green",
    },
    timestamp: Date.now(),
  };
  const renderButtonType = () => {
    switch (props.type) {
      case "easy":
        return (
          <button
            className={`w-28 h-12 bg-green-600 border-2 border-green-500 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
              props.currDiff != "easy" ? "opacity-50" : null
            }`}
            disabled={props.isGameStarting}
            onClick={() => {
              props.updateSelectedDiff("easy");

              chatMsg.content = "Difficulty set to: Easy";
              chatMsg.style.color = "green";
              newMessage(props.chatData, chatMsg, props.updateChat);
            }}
          >
            Easy 👍
          </button>
        );
      case "normal":
        return (
          <button
            className={`w-28 h-12 bg-yellow-700 border-2 border-yellow-600 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
              props.currDiff != "normal" ? "opacity-50" : null
            }`}
            disabled={props.isGameStarting}
            onClick={() => {
              props.updateSelectedDiff("normal");
              chatMsg.content = "Difficulty set to: Normal";
              chatMsg.style.color = "yellow";
              newMessage(props.chatData, chatMsg, props.updateChat);
            }}
          >
            Normal👌
          </button>
        );
      case "hard":
        return (
          <button
            className={`w-28 h-12 bg-red-600 border-2 border-red-500 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
              props.currDiff != "hard" ? "opacity-50" : null
            }`}
            disabled={props.isGameStarting}
            onClick={() => {
              props.updateSelectedDiff("hard");
              chatMsg.content = "Difficulty set to: Hard";
              chatMsg.style.color = "red";
              newMessage(props.chatData, chatMsg, props.updateChat);
            }}
          >
            Hard 🤘
          </button>
        );

      default:
        break;
    }
  };

  return renderButtonType();
}
