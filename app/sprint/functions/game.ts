import { Dispatch, SetStateAction } from "react";
import {
  Chat,
  ChatMessage,
  GameBeatmap,
  SprintGameData,
} from "../../../../types";
import { getSprint } from "@/lib/local_api";
import { isValidGuess } from "@/lib/utils";
import { clearChat, newMessage, openChatSession } from "./chat";
import { preciseTimeFormat } from "./utils";

export async function startGame(updateData: any, setView: any, chatData: Chat, updateChat: any) {
  let startMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "red" },
    content: "🏁 Game starts now! 🏁",
  };
  let c = clearChat(updateChat)
  newMessage(c, startMsg, updateChat);
  setView("loading");
  getSprint('pseh').then((sgd) => {
    sgd.beatmaps[0].status = "current";
    sgd.startTime = Date.now();
    sgd.status = "ongoing";
    sgd.skipsUsed = 0;
    updateData(sgd);
    setView("game");
  });
}

export async function endGame(
  sgd: SprintGameData,
  updateData: any,
  setView: any,
  chatData: Chat,
  updateChat: any
) {
  let sgdCopy = { ...sgd };
  sgdCopy.endTime = Date.now();
  sgdCopy.status = "finished";
  let endMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "yellow" },
    content: `⏱️ Your final time was ${preciseTimeFormat(
      sgdCopy.endTime - sgdCopy.startTime!
    )}! ⏱️`,
  };
  newMessage(chatData, endMsg, updateChat);
  updateData(sgdCopy);
  setView("results");
  console.log(sgd)
}

export async function guess(
  guess: string,
  sgd: SprintGameData,
  updateData: any,
  setView: any,
  chatData: Chat,
  updateChat: any
) {
  let currentMap = findCurrent(sgd);
  let guessResult = isValidGuess(guess, currentMap, 0.7);
  let sgdCopy = { ...sgd };
  let chatMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    content: "",
    style: { bold: false, color: "standard" },
  };

  if (guessResult.valid) {
    switch (guessResult.type) {
      case "full":
        chatMsg.content = "You correctly guessed from the full title !";
        break;
      case "artist":
        chatMsg.content = "You correctly guessed from the artist !";
        break;
      case "mapper":
        chatMsg.content = "You correctly guessed from the mapper !";
        break;
      case "title":
        chatMsg.content = "You correctly guessed from the title !";
        break;
    }

    // chatMsg.content += `\n\n(${currentMap.metadata.artist} - ${currentMap.metadata.title} by ${currentMap.metadata.creator})`;
    chatMsg.style.color = "green";

    sgdCopy.beatmaps[findCurrentIndex(sgdCopy)].accuracy = guessResult.validness;
    sgdCopy.beatmaps[findCurrentIndex(sgdCopy)].validGuess = guess;
    sgdCopy.beatmaps[findCurrentIndex(sgdCopy)].splitTime = Date.now()
    sgdCopy.beatmaps[findCurrentIndex(sgdCopy)].status = "found";
    newMessage(chatData, chatMsg, updateChat);

    let nextIndex = findNextIndex(sgdCopy);
    if (nextIndex == -1) {
      return endGame(sgd, updateData, setView, chatData, updateChat);
    }

    sgdCopy.beatmaps[nextIndex].status = "current";
    updateData(sgdCopy);
  } else if (guessResult.validness > 0.5) {
    chatMsg.content = `"${guess}" is close!`
    chatMsg.style.color = 'yellow'
    newMessage(chatData, chatMsg, updateChat);
  }
}

export function skip(sgd: SprintGameData, updateData: any, chatData: Chat, updateChat: any): Boolean {
  let skipMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "yellow" },
    content: `⚠️ Map skipped (${sgd.additionalBeatmaps.length - 1} left) ⚠️`,
  };
  let sgdCopy = { ...sgd }

  if (sgdCopy.additionalBeatmaps.length) {
    let currentMapIndex = findCurrentIndex(sgd);
    sgdCopy.beatmaps[currentMapIndex] = sgdCopy.additionalBeatmaps[sgdCopy.additionalBeatmaps.length - 1];
    sgdCopy.beatmaps[currentMapIndex].status = 'current'
    sgdCopy.additionalBeatmaps.pop()
    sgdCopy.skipsUsed! ++
    updateData(sgdCopy)
    newMessage(chatData, skipMsg, updateChat);
    return true
  } else return false
}

export function findCurrent(sgd: SprintGameData) {
  return sgd.beatmaps.find((beatmap) => beatmap.status == "current")!;
}

export function findCurrentIndex(sgd: SprintGameData) {
  return sgd.beatmaps.findIndex((beatmap) => beatmap.status == "current");
}

export function findNextIndex(sgd: SprintGameData) {
  return sgd.beatmaps.findIndex((beatmap) => beatmap.status == "not found");
}
