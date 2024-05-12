import { Chat } from "../../../../../types";
import ChatLog from "./Chatlog";
import ChatInput from "./ChatInput";

export default function Chatbox(props: { chatData: Chat; updateChat: any }) {
  return (
    <div className="hidden md:flex md:flex-col md:w-[16%] md:h-[70%] bg-c-dark bg-opacity-30 justify-end items-center rounded-2xl drop-shadow-lg">
      {/* Chat log */}
      <ChatLog chatData={props.chatData}></ChatLog>
      {/* Input box */}
      <ChatInput
        chatData={props.chatData}
        updateChat={props.updateChat}
      ></ChatInput>
    </div>
  );
}
