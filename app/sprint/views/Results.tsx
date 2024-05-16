import { Chat, SprintGameData } from "../../../../types";
import Chatbox from "../components/chat/Chatbox";
import GameProgress from "../components/gameprogress/GameProgress";
import ResultsBlock from "../components/results/ResultsBlock";

export default function Results(props: {
  updateView: any;
  gameData: SprintGameData;
  startGame: any;
  chatData: Chat;
  updateChat: any;
}) {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center md:space-x-6 text-c-dark">
      {/* A recap of the current game, hidden on mobile */}
      <div className="hidden md:flex flex-col w-[16%] h-[70%] bg-c-dark bg-opacity-30 justify-start items-center overflow-scroll snap-start py-2 rounded-2xl drop-shadow-lg">
        <GameProgress maps={props.gameData.beatmaps}></GameProgress>
      </div>
      <ResultsBlock
        gameData={props.gameData}
        updateView={props.updateView}
        startGame={props.startGame}
      ></ResultsBlock>
      {/* A chatbox with logs of the current game, and possibly user messages. Also hidden on mobile */}
      <Chatbox
        chatData={props.chatData}
        updateChat={props.updateChat}
      ></Chatbox>
    </div>
  );
}
