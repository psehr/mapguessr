import { useEffect, useState } from "react";
import { Chat, SprintGameData } from "../../../../types";
import Chatbox from "../components/chat/Chatbox";
import GameProgress from "../components/gameprogress/GameProgress";
import Playfield from "../components/playfield/Playfield";
import { findCurrent } from "../functions/game";
import { openChatSession } from "../functions/chat";

export default function Game(props: {
  updateView: any;
  gameData: SprintGameData;
  updateData: any;
  chatData: Chat;
  updateChat: any;
  startGame: any;
}) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center md:space-x-6 text-c-dark">
      {/* A recap of the current game, hidden on mobile */}
      <GameProgress maps={props.gameData.beatmaps}></GameProgress>
      {/* Main part, the timer, beatmap cover and an input field for the player to use */}
      <Playfield
        gameData={props.gameData}
        updateData={props.updateData}
        updateView={props.updateView}
        chatData={props.chatData}
        updateChat={props.updateChat}
        startGame={props.startGame}
      ></Playfield>
      {/* A chatbox with logs of the current game, and possibly user messages. Also hidden on mobile */}
      <Chatbox
        chatData={props.chatData}
        updateChat={props.updateChat}
      ></Chatbox>
    </div>
  );
}
