import { ReactNode, useEffect, useRef } from "react";
import { Chat } from "@/types";
import ChatMsg from "./ChatMsg";

export default function ChatLog(props: { chatData: Chat }) {
  const renderChat = (chat: Chat) => {
    let chatNodes: ReactNode[] = [];
    chat.messages.forEach((msg) =>
      chatNodes.push(
        <ChatMsg chatMessage={msg} key={msg.timestamp + msg.content}></ChatMsg>
      )
    );
    return chatNodes;
  };

  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView();
    }
  }, [props.chatData]);
  return (
    <div className="w-[90%] h-full snap-end space-y-2 transition-all ease-in-out overflow-y-scroll place-content-end">
      {renderChat(props.chatData)}
      <div ref={bottomOfChatRef}></div>
    </div>
  );
}
