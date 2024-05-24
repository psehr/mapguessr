"use client";

import React, { useEffect, useState } from "react";
import { Chat, DifficultySettingsTypes } from "@/types";
import DiffButton from "./DiffButton";
import ButtonsBlock from "./ButtonsBlock";

export default function DiffSelector(props: {
  setCurrentDiff: any;
  currentDiff: DifficultySettingsTypes;
  chatData: Chat;
  updateChat: any;
  currentMulti: number;
  currentSkips: number;
  setCurrentSkips: any;
  isGameStarting: boolean;
}) {
  return (
    <div className="w-full h-full text-c-white flex flex-row place-content-center items-center gap-4">
      <ButtonsBlock
        chatData={props.chatData}
        currentDiff={props.currentDiff}
        setCurrentDiff={props.setCurrentDiff}
        updateChat={props.updateChat}
        isGameStarting={props.isGameStarting}
      ></ButtonsBlock>
    </div>
  );
}
