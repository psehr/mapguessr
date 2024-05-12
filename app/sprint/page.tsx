"use client";

import { useEffect, useState } from "react";
import Setup from "./views/Setup";
import Game from "./views/Game";
import Results from "./views/Results";
import { findCurrent, startGame } from "./functions/game";
import { Chat, SprintGameData } from "../../../types";
import Loading from "./views/Loading";
import { openChatSession } from "./functions/chat";

export default function Sprint() {
  const [view, setView] = useState("setup");
  const [sprintGameData, setSprintGameData] = useState<SprintGameData>();

  let [chatData, setChatData] = useState(openChatSession());

  const updateData = (data: SprintGameData) => {
    setSprintGameData(data);
  };

  const updateChat = (data: Chat) => {
    setChatData(data);
  };

  const currentView = () => {
    switch (view) {
      case "setup":
        return (
          <Setup
            startGame={() =>
              startGame(setSprintGameData, setView, chatData, updateChat)
            }
            chatData={chatData}
            updateChat={updateChat}
          ></Setup>
        );
      case "loading":
        return <Loading></Loading>;
      case "game":
        return (
          <Game
            updateView={setView}
            gameData={sprintGameData!}
            updateData={updateData}
            chatData={chatData}
            updateChat={updateChat}
            startGame={() =>
              startGame(setSprintGameData, setView, chatData, updateChat)
            }
          ></Game>
        );
      case "results":
        return (
          <Results
            updateView={setView}
            gameData={sprintGameData!}
            startGame={() =>
              startGame(setSprintGameData, setView, chatData, updateChat)
            }
            chatData={chatData}
            updateChat={updateChat}
          ></Results>
        );
    }
  };
  return currentView();
}
