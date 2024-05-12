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
      <GameProgress maps={props.gameData.beatmaps}></GameProgress>
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
