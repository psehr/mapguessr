import { useEffect, useState } from "react";
import { Chat, DifficultySettingsTypes } from "@/types";
import LeftBlock from "../components/setup/LeftBlock";
import MiddleBlock from "../components/setup/MiddleBlock";
import RightBlock from "../components/setup/RightBlock";
import { getDefaultSkips, getRatingMultiplier } from "@/lib/utils";
import { Session } from "next-auth";
import { startGame } from "../functions/game";
import { clearChat } from "../functions/chat";

export default function Setup(props: {
  session: Session;
  chatData: Chat;
  updateChat: any;
  setSprintGameData: any;
  setView: any;
}) {
  const [currentDiff, setCurrentDiff] =
    useState<DifficultySettingsTypes>("normal");
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [currSkips, setCurrSkips] = useState(getDefaultSkips(currentDiff));
  const [isGameStarting, setIsGameStarting] = useState(false);

  useEffect(() => {
    clearChat(props.updateChat);
  }, []);

  useEffect(() => {
    setCurrentMultiplier(getRatingMultiplier(currentDiff, currSkips));
  }, [currSkips]);

  useEffect(() => {
    setCurrSkips(getDefaultSkips(currentDiff));
  }, [currentDiff]);

  const startGameFct = () => {
    startGame(
      props.setSprintGameData,
      props.setView,
      props.updateChat,
      props.session,
      currentDiff,
      currSkips,
      currentMultiplier
    );
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center md:space-x-6 text-c-dark">
      <div className="w-1/4 h-[70%] rounded-xl flex flex-col">
        <LeftBlock
          currentDiff={currentDiff}
          setCurrentDiff={setCurrentDiff}
          chatData={props.chatData}
          updateChat={props.updateChat}
          currentMulti={currentMultiplier}
          setCurrentSkips={setCurrSkips}
          currentSkips={currSkips}
          isGameStarting={isGameStarting}
        ></LeftBlock>
      </div>
      <div className="w-[40%] h-[80%] base-container rounded-xl flex flex-col">
        <MiddleBlock
          startGame={startGameFct}
          chatData={props.chatData}
          updateChat={props.updateChat}
          currentDiff={currentDiff}
          currentMultiplier={currentMultiplier}
          currentSkips={currSkips}
          isGameStarting={isGameStarting}
          setIsGameStarting={setIsGameStarting}
        ></MiddleBlock>
      </div>
      <div className="w-1/4 h-[70%] rounded-xl flex flex-col">
        <RightBlock
          chatData={props.chatData}
          updateChat={props.updateChat}
          session={props.session}
        ></RightBlock>
      </div>
    </div>
  );
}
