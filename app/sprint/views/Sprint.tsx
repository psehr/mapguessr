"use client";

import { useEffect, useState } from "react";
import Setup from "./Setup";
import Game from "./Game";
import Results from "./Results";
import { findCurrent, startGame } from "../functions/game";
import { Chat, SprintGameData } from "@/types";
import Loading from "./Loading";
import { openChatSession } from "../functions/chat";
import React from "react";
import { Session } from "next-auth";
import ErrorPage from "./ErrorPage";

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

  const startGameFct = () => {
    startGame(
      setSprintGameData,
      setView,
      updateChat,
      props.session,
      sprintGameData!.difficulty,
      sprintGameData!.skips,
      sprintGameData!.multiplier!
    );
  };

  const currentView = () => {
    switch (view) {
      case "setup":
        return (
          <Setup
            session={props.session}
            chatData={chatData}
            updateChat={updateChat}
            setSprintGameData={setSprintGameData}
            setView={setView}
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
            session={props.session}
            startGame={startGameFct}
          ></Game>
        );
      case "results":
        return (
          <Results
            updateView={setView}
            gameData={sprintGameData!}
            chatData={chatData}
            updateChat={updateChat}
            startGame={startGameFct}
            session={props.session}
          ></Results>
        );
      case "error":
        return (
          <ErrorPage
            status={500}
            desc="⚠️ There was an error and your game could not be submitted, sorry for
        the trouble ⚠️"
            statusDesc="Internal Error"
            updateView={setView}
          ></ErrorPage>
        );
    }
  };
  return currentView();
}
