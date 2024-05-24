import { useEffect, useState } from "react";
import { Chat, GameBeatmap, SprintGameData } from "@/types";
import BeatmapCover from "./BeatmapCover";
import GuessInput from "./GuessInput";
import Timer from "./Timer";
import { findCurrent, guess } from "../../functions/game";
import { preciseTimeFormat, timeFormat } from "../../functions/utils";
import RetryButton from "../buttons/RetryButton";
import SkipButton from "../buttons/SkipButton";
import ExitButton from "../buttons/ExitButton";
import SkipLabel from "../buttons/SkipLabel";
import GameStats from "./GameStats";

export default function Playfield(props: {
  gameData: SprintGameData;
  updateData: any;
  updateView: any;
  chatData: Chat;
  updateChat: any;
  startGame: any;
}) {
  let [currentTime, setCurrentTime] = useState(
    Date.now() - props.gameData.startTime! || "0"
  );
  let [currentCover, setCurrentCover] = useState(
    findCurrent(props.gameData).metadata.cover || ""
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.gameData.startTime) {
        setCurrentTime(
          preciseTimeFormat(Date.now() - props.gameData.startTime)
        );
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCover(findCurrent(props.gameData).metadata.cover);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[90%] h-1/2 md:size-[57%] flex flex-col place-content-center items-center gap-8">
      {/* Upper playfield */}
      <div className="px-8 w-1/2 h-1/4 flex flex-row justify-center items-center gap-8">
        <GameStats
          sgd={props.gameData}
          time={currentTime.toString()}
        ></GameStats>
      </div>
      {/* Middle playfield */}
      <div className="w-full h-[500px]">
        {/* Beatmap cover */}
        <BeatmapCover coverUrl={currentCover}></BeatmapCover>
      </div>
      {/* Lower playfield */}
      <div className="relative w-full h-1/4 flex flex-row place-content-center items-center">
        <div className="w-1/4 h-12 flex flex-row place-content-center items-center gap-4">
          <ExitButton updateView={props.updateView}></ExitButton>
          <RetryButton
            startGame={props.startGame}
            chatData={props.chatData}
            updateChat={props.updateChat}
          ></RetryButton>
        </div>
        {/* Guess input */}
        <div className="w-1/2 h-12">
          <GuessInput
            onGuess={(g: string) =>
              guess(
                g,
                props.gameData,
                props.updateData,
                props.updateView,
                props.chatData,
                props.updateChat
              )
            }
            gameData={props.gameData}
          ></GuessInput>
        </div>
        <div className="w-1/4 h-12 flex flex-row place-content-center items-center gap-4">
          <SkipButton
            sgd={props.gameData}
            updateData={props.updateData}
            chatData={props.chatData}
            updateChat={props.updateChat}
          ></SkipButton>
          <SkipLabel sgd={props.gameData}></SkipLabel>
        </div>
      </div>
    </div>
  );
}
