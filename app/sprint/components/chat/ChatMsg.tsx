import { ChatMessage } from "../../../../../types";

export default function ChatMsg(props: { chatMessage: ChatMessage }) {
  let textColor;
  switch (props.chatMessage.style.color) {
    case "standard":
      break;
    case "green":
      textColor = "text-green-600";
      break;
    case "red":
      textColor = "text-red-400";
      break;
    case "yellow":
      textColor = "text-yellow-600";
      break;
  }

  return (
    <div
      className={`w-full h-max bg-c-white p-2 text-left text-wrap content-center text-sm overflow-scroll rounded-lg ${textColor} ${
        props.chatMessage.style.bold ? " font-bold" : "font-semibold"
      }`}
    >
      {`${props.chatMessage.from ? props.chatMessage.from + ": " : ""}${
        props.chatMessage.content
      }`}
    </div>
  );
}
