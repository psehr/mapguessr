import { Session } from "next-auth";
import { Chat } from "@/types";
import Chatbox from "../chat/Chatbox";
import PreviousMap from "postcss/lib/previous-map";

export default function RightBlock(props: {
  chatData: Chat;
  updateChat: any;
  session: Session;
}) {
  return (
    <div className="w-full h-full">
      <Chatbox
        chatData={props.chatData}
        updateChat={props.updateChat}
        from={props.session.user!.name!}
      ></Chatbox>
    </div>
  );
}
