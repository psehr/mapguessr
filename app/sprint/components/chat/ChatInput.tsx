import { Chat, ChatMessage } from "@/types";
import { newMessage } from "../../functions/chat";

export default function ChatInput(props: {
  chatData: Chat;
  updateChat: any;
  from: string;
}) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let msg: ChatMessage = {
      timestamp: Date.now(),
      status: "usermessage",
      content: event.currentTarget.elements.message.value,
      from: props.from,
      style: { bold: false, color: "standard" },
    };

    newMessage(props.chatData, msg, props.updateChat);
    event.currentTarget.elements.message.value = "";
  };
  return (
    <form action="" className="w-[90%] h-8" onSubmit={handleSubmit}>
      <input
        className="text-c-white font-semibold w-full h-full bg-c-white/20 p-2 text-left text-nowrap text-sm overflow-scroll rounded-xl outline-none"
        type="text"
        name="message"
        placeholder="Chat here.."
        autoComplete="off"
      ></input>
      <input type="submit" hidden />
    </form>
  );
}
