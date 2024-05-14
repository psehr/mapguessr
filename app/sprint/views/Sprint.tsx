"use client";

import { useEffect, useState } from "react";
import Setup from "./Setup";
import Game from "./Game";
import Results from "./Results";
import { findCurrent, startGame } from "../functions/game";
import { Chat, SprintGameData } from "../../../../types";
import Loading from "./Loading";
import { openChatSession } from "../functions/chat";
import React from "react";
import { Session } from "next-auth";

export default function Sprint(props: { session: Session }) {
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
              startGame(
                setSprintGameData,
                setView,
                chatData,
                updateChat,
                props.session
              )
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
              startGame(
                setSprintGameData,
                setView,
                chatData,
                updateChat,
                props.session
              )
            }
          ></Game>
        );
      case "results":
        return (
          <Results
            updateView={setView}
            gameData={sprintGameData!}
            startGame={() =>
              startGame(
                setSprintGameData,
                setView,
                chatData,
                updateChat,
                props.session
              )
            }
            chatData={chatData}
            updateChat={updateChat}
          ></Results>
        );
    }
  };
  return currentView();
}
