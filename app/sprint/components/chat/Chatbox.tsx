import { Chat } from "@/types";
import ChatLog from "./Chatlog";
import ChatInput from "./ChatInput";

export default function Chatbox(props: {
  chatData: Chat;
  updateChat: any;
  from: string;
}) {
  return (
    <div className="flex flex-col w-full h-full base-container place-content-start items-center">
      <div className="h-[10%] w-full flex flex-col font-bold text-xl text-c-white place-content-center items-center base-container">
        Chatbox 💬
      </div>
      <div className="w-full h-[90%] flex flex-col place-content-end items-center">
        {/* Chat log */}
        <div className="w-full h-[90%] flex flex-col place-content-end items-center overflow-y-hidden">
          <ChatLog chatData={props.chatData}></ChatLog>
        </div>
        {/* Input box */}
        <div className="w-full h-[10%] flex flex-col place-content-center items-center">
          <ChatInput
            chatData={props.chatData}
            updateChat={props.updateChat}
            from={props.from}
          ></ChatInput>
        </div>
      </div>
    </div>
  );
}
