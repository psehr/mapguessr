import React from "react";
import SignOutButton from "./SignOutButton";
import RefreshButton from "./RefreshButton";
import { SprintGameData, UserComplex } from "../../../types";
import { preciseTimeFormat } from "../sprint/functions/utils";

export default function UserPanel(props: { userData: UserComplex }) {
  const joinDate = (timestamp: number) => {
    let d = new Date(timestamp);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };
  const playcount = (games: SprintGameData[]) => {
    return games.length;
  };
  const pb = (games: SprintGameData[]) => {
    return preciseTimeFormat(games[0].finalTime!);
  };
  const rank = () => {
    return "#145";
  };
  const accuracy = () => {
    return "98.34";
  };
  return (
    <div className="w-full h-full flex flex-col">
      {/* Image group */}
      <div className="w-full h-[35%] flex flex-col">
        <div className="w-full h-full relative flex flex-col place-content-center items-center">
          <div className="relative size-48 rounded-xl border-4 border-c-dark-blue overflow-hidden">
            <img
              src="https://a.ppy.sh/9239673?1680647346.jpeg"
              alt=""
              className="absolute w-full h-full"
            />
            <div className="absolute size-48 bg-gradient-to-b from-transparent to-c-darker-blue/70"></div>
          </div>

          <div className="border-2 border-c-dark-blue bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue py-2 px-6 w-fit h-fit absolute text-c-white font-bold text-xl text-center bottom-0 rounded-xl">
            {props.userData.user.username}
          </div>
        </div>
      </div>
      {/* User stats group */}
      <div className="rounded-xl border-2 border-c-dark-blue m-auto bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue w-[70%] h-[50%] flex flex-col text-c-white font-medium text-xl">
        {/* Country flag */}
        <div className="w-full h-[30%] flex place-content-center items-center">
          <img src="https://assets.ppy.sh/old-flags/FR.png" alt="" />
        </div>
        {/* Join date and playcount */}
        <div className="w-full h-[20%] flex flex-col place-content-center items-center">
          <p>Joined {joinDate(props.userData.user.created)}</p>
          <p>
            {playcount(props.userData.games)} game
            {playcount(props.userData.games) > 1 ? "s" : ""} played
          </p>
        </div>
        {/* Sprint PB and rank */}
        <div className="w-full h-[50%] flex flex-col place-content-center items-center">
          <div className="flex flex-row">
            <p className="underline font-bold">Sprint</p>
            <p className="font-bold">🏁</p>
          </div>

          <p className="text-green-400">PB: {pb(props.userData.games)} ⏱️</p>
          <p className="text-yellow-400">{accuracy()}% 🎯</p>
          <p className="text-blue-400">{rank()} 🌍</p>
        </div>
      </div>
      {/* Buttons */}
      <div className="m-auto w-full h-[10%] flex flex-row gap-4 place-content-center items-center">
        <SignOutButton></SignOutButton>
        <RefreshButton></RefreshButton>
      </div>
    </div>
  );
}
