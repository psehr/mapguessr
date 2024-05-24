import { useState } from "react";
import { Chat, SprintGameData } from "@/types";
import Timer from "../playfield/Timer";
import ResultsButtons from "./ResultsButtons";
import FinalTime from "./FinalTime";
import GameRecap from "../../../components/Tables/GameRecap/GameRecap";
import GameResultsStats from "@/app/game/sprint/[...game_id]/GameResultsStats";

export default function ResultsBlock(props: {
  gameData: SprintGameData;
  updateView: any;
  startGame: any;
  chatData: Chat;
  updateChat: any;
}) {
  return (
    <div className="w-full h-full flex flex-col place-content-center items-center gap-4">
      <div className="w-[90%] h-[20%] flex flex-col place-content-center items-center rounded-xl">
        <GameResultsStats sgd={props.gameData}></GameResultsStats>
      </div>
      <div className="w-[90%] h-[70%] flex flex-col place-content-center items-center rounded-xl">
        <GameRecap sgd={props.gameData}></GameRecap>
      </div>
      <div className="w-[90%] h-[10%] flex flex-col place-content-center items-center rounded-xl">
        <ResultsButtons
          startGame={props.startGame}
          updateView={props.updateView}
          chatData={props.chatData}
          updateChat={props.updateChat}
        ></ResultsButtons>{" "}
      </div>
    </div>
  );
}
