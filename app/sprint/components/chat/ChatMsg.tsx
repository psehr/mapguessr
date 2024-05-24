import { ChatMessage } from "@/types";

export default function ChatMsg(props: { chatMessage: ChatMessage }) {
  let textColor;
  switch (props.chatMessage.style.color) {
    case "standard":
      break;
    case "green":
      textColor = "text-green-400";
      break;
    case "red":
      textColor = "text-red-400";
      break;
    case "yellow":
      textColor = "text-yellow-400";
      break;
  }

  return (
    <div
      className={`w-full h-max bg-black/20 text-c-white p-2 text-left text-wrap content-center text-sm rounded-lg ${textColor} ${
        props.chatMessage.style.bold ? "font-bold" : "font-semibold"
      }`}
    >
      {`${props.chatMessage.from ? props.chatMessage.from + ": " : ""}${
        props.chatMessage.content + " "
      }`}
      {props.chatMessage.link ? (
        <a
          href={props.chatMessage.link}
          target="_blank"
          className="text-blue-400 underline"
        >
          [Link]
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
