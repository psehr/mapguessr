import { Session } from "next-auth";
import { Chat, SprintGameData } from "@/types";
import Chatbox from "../components/chat/Chatbox";
import GameProgress from "../components/gameprogress/GameProgress";
import ResultsBlock from "../components/results/ResultsBlock";

export default function Results(props: {
  updateView: any;
  gameData: SprintGameData;
  startGame: any;
  chatData: Chat;
  updateChat: any;
  session: Session;
}) {
  return (
    <div className="h-[90%] w-[90%] md:h-[71%] md:w-[90%] flex flex-row justify-center items-center m-auto gap-10">
      {/* A recap of the current game, hidden on mobile */}
      <div className="w-[25%] h-full flex flex-col place-content-center items-center">
        <GameProgress maps={props.gameData.beatmaps}></GameProgress>
      </div>
      <div className="w-[40%] h-full flex flex-col place-content-center items-center">
        <ResultsBlock
          gameData={props.gameData}
          updateView={props.updateView}
          startGame={props.startGame}
          chatData={props.chatData}
          updateChat={props.updateChat}
        ></ResultsBlock>
      </div>
      {/* A chatbox with logs of the current game, and possibly user messages. Also hidden on mobile */}
      <div className="w-[20%] h-full flex flex-col">
        <Chatbox
          chatData={props.chatData}
          updateChat={props.updateChat}
          from={props.session.user?.name!}
        ></Chatbox>
      </div>
    </div>
  );
}
