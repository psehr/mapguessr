import { isValidGuess } from "@/lib/utils";
import { SprintGameData } from "@/types";
import { findCurrent } from "../../functions/game";
import { useState } from "react";

export default function GuessInput(props: {
  onGuess: any;
  gameData: SprintGameData;
}) {
  const [borderColor, setBorderColor] = useState("border-transparent");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let guess = event.currentTarget.elements.userGuess.value as string;
    let valid = isValidGuess(guess, findCurrent(props.gameData), 0.7).valid;

    let inputHistoryCopy = [...inputHistory];
    inputHistoryCopy.push(guess);
    setInputHistory(inputHistoryCopy);
    setSelectedIndex(inputHistory.length);

    if (valid) {
      setInputHistory([]);
      setSelectedIndex(0);
      setBorderColor("border-green-600");
      setTimeout(() => {
        setBorderColor("border-transparent");
      }, 500);
    } else {
      setBorderColor("border-red-600");
      setTimeout(() => {
        setBorderColor("border-transparent");
      }, 500);
    }

    props.onGuess(guess);
    event.currentTarget.elements.userGuess.value = "";
  };

  // troubleshoot later
  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case "ArrowUp":
        if (inputHistory.length) {
          if (selectedIndex > 0) {
            e.currentTarget.value = inputHistory[selectedIndex];
            setSelectedIndex(selectedIndex - 1);
          }
        }

        break;
      case "ArrowDown":
        if (inputHistory.length) {
          if (selectedIndex < inputHistory.length - 1) {
            e.currentTarget.value = inputHistory[selectedIndex];
            setSelectedIndex(selectedIndex + 1);
          }
        }

        break;

      default:
        break;
    }
  };
  return (
    <form action="" className="w-full h-full" onSubmit={handleSubmit}>
      <input
        name="userGuess"
        className={
          "drop-shadow-lg w-full h-full bg-c-white/20 text-c-white text-center text-2xl content-center rounded-full outline-none focus:placeholder-transparent transition-colors ease-out duration-300 border-4 " +
          borderColor
        }
        placeholder="Type your guess.."
        autoFocus
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code == "ArrowUp" || e.code == "ArrowDown") {
            keyHandler(e);
          }
        }}
        onChange={(e) => {}}
      ></input>
      <input type="submit" hidden />
    </form>
  );
}
