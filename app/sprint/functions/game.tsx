import { Dispatch, SetStateAction } from "react";
import {
  BeatmapStatus,
  Chat,
  ChatMessage,
  DifficultySettingsTypes,
  GameBeatmap,
  GameStatus,
  SprintGameData,
} from "@/types";
import { newSprint, getUser, postSprint } from "@/lib/local_api";
import { isValidGuess } from "@/lib/utils";
import { clearChat, newMessage } from "./chat";
import { calcRating, preciseTimeFormat } from "./utils";
import { Session } from "next-auth";
import Image from "next/image";

export async function startGame(
  updateData: any,
  setView: any,
  updateChat: any,
  session: Session,
  diffLevel: DifficultySettingsTypes,
  skipsAmount: number,
  multiplier: number
) {
  let startMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "red" },
    content: "🏁 Game starts now! 🏁",
  };

  let user = await getUser("username", session.user?.name!).catch((e) => {
    setView("error");
  });

  let c = clearChat(updateChat);
  updateData();
  newMessage(c, startMsg, updateChat);
  setView("loading");
  try {
    newSprint(user!.id.toString(), diffLevel, skipsAmount).then((sgd) => {
      sgd.beatmaps[0].status = "current";
      sgd.startTime = Date.now();
      sgd.status = "ongoing";
      sgd.skipsUsed = 0;
      sgd.guessesLength = 0;
      sgd.rating = 0;
      sgd.multiplier = multiplier;
      sgd.accuracy = 1;
      sgd.beatmaps.forEach((beatmap) => {
        beatmap.guesses = [];
      });
      sgd.additionalBeatmaps.forEach((beatmap) => (beatmap.guesses = []));
      updateData(sgd);
      setView("game");
    });
  } catch (error) {
    setView("error");
  }
}

export async function endGame(
  sgd: SprintGameData,
  updateData: any,
  setView: any,
  chatData: Chat,
  updateChat: any
) {
  setView("loading");
  let sgdCopy = { ...sgd };
  sgdCopy.endTime = Date.now();
  sgdCopy.finalTime = sgdCopy.endTime - sgdCopy.startTime!;
  sgdCopy.cpm = parseInt(
    ((sgdCopy.guessesLength! / (sgdCopy.finalTime / 1000)) * 60).toFixed()
  );
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
  postSprint(sgdCopy)
    .then(() => {})
    .catch((e) => {
      setView("error");
    });
}

export function calcAccuracy(beatmap: GameBeatmap): number {
  let sum = 0;
  beatmap.guesses?.forEach((guess) => (sum += guess.validness));
  return parseFloat((sum / beatmap.guesses!.length).toFixed(2));
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

  sgdCopy.beatmaps[findCurrentIndex(sgdCopy)].guesses?.push(guessResult);

  let foundBeatmaps = sgdCopy.beatmaps.filter(
    (beatmap) => beatmap.status == "found"
  );
  if (foundBeatmaps.length) {
    let accSum = 0;

    for (let index = 0; index < foundBeatmaps.length; index++) {
      const map = foundBeatmaps[index];
      accSum += calcAccuracy(map);
    }
    sgdCopy.accuracy = parseFloat((accSum / foundBeatmaps.length).toFixed(2));
  }

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

    let currentBeatmap = sgdCopy.beatmaps[findCurrentIndex(sgdCopy)];

    chatMsg.style.color = "green";

    currentBeatmap.accuracy = calcAccuracy(currentBeatmap);

    sgdCopy.guessesLength! += guess.length;
    currentBeatmap.validGuess = guess;
    currentBeatmap.validGuessInfo = guessResult;
    currentBeatmap.splitTime = Date.now();

    const currIndex = findCurrentIndex(sgdCopy);
    const isFirst = currIndex == 0;

    currentBeatmap.status = "found";
    newMessage(chatData, chatMsg, updateChat);

    isFirst
      ? (sgdCopy.rating = calcRating(
          currentBeatmap.splitTime - sgdCopy.startTime!,
          currentBeatmap.accuracy!,
          sgdCopy.multiplier || 1
        ))
      : (sgdCopy.rating! += calcRating(
          currentBeatmap.splitTime - sgdCopy.beatmaps[currIndex - 1].splitTime,
          currentBeatmap.accuracy!,
          sgdCopy.multiplier || 1
        ));

    let nextIndex = findNextIndex(sgdCopy);
    if (nextIndex == -1) {
      return endGame(sgdCopy, updateData, setView, chatData, updateChat);
    } else {
      sgdCopy.beatmaps[nextIndex].status = "current";
      updateData(sgdCopy);
    }
  } else if (guessResult.validness > 0.5) {
    chatMsg.content = `"${guess}" is close!`;
    chatMsg.style.color = "yellow";
    newMessage(chatData, chatMsg, updateChat);
  }
}

export function skip(
  sgd: SprintGameData,
  updateData: any,
  chatData: Chat,
  updateChat: any
): Boolean {
  let skipMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "yellow" },
    content: `⚠️ Map skipped (${sgd.additionalBeatmaps.length - 1} left) ⚠️`,
  };
  let answerMsg: ChatMessage = {
    timestamp: Date.now(),
    status: "announce",
    style: { bold: true, color: "yellow" },
    content: `The answer was: `,
    link: "",
  };
  let sgdCopy = { ...sgd };

  if (sgdCopy.additionalBeatmaps.length) {
    let currentMapIndex = findCurrentIndex(sgd);
    answerMsg.content += sgdCopy.beatmaps[currentMapIndex].validTitles[0];
    answerMsg.link += `https://osu.ppy.sh/beatmapsets/${sgdCopy.beatmaps[currentMapIndex].metadata.id}`;
    const skippedMap = {
      ...sgdCopy.beatmaps[currentMapIndex],
      skipped: true,
      status: "not found" as BeatmapStatus,
      splitTime: Date.now(),
    };
    sgdCopy.skippedMaps.push(skippedMap);
    sgdCopy.beatmaps[currentMapIndex] =
      sgdCopy.additionalBeatmaps[sgdCopy.additionalBeatmaps.length - 1];

    sgdCopy.beatmaps[currentMapIndex].status = "current";
    sgdCopy.additionalBeatmaps.pop();
    sgdCopy.skipsUsed!++;
    updateData(sgdCopy);
    newMessage(chatData, skipMsg, updateChat);
    newMessage(chatData, answerMsg, updateChat);
    return true;
  } else return false;
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
