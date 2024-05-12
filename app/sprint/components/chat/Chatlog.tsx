import { ReactNode, useEffect, useRef } from "react";
import { Chat } from "../../../../../types";
import ChatMsg from "./ChatMsg";

export default function ChatLog(props: { chatData: Chat }) {
  const renderChat = (chat: Chat) => {
    let chatNodes: ReactNode[] = [];
    chat.messages.forEach((msg) =>
      chatNodes.push(<ChatMsg chatMessage={msg} key={msg.timestamp}></ChatMsg>)
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
    <div className="w-[90%] h-fit overflow-scroll snap-end my-2 space-y-2 transition-all ease-in-out">
      {renderChat(props.chatData)}
      <div ref={bottomOfChatRef}></div>
    </div>
  );
}
