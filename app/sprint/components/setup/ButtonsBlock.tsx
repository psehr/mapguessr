import { Chat, DifficultySettingsTypes } from "@/types";
import DiffButton from "./DiffButton";

export default function ButtonsBlock(props: {
  setCurrentDiff: any;
  currentDiff: DifficultySettingsTypes;
  chatData: Chat;
  updateChat: any;
  isGameStarting: boolean;
}) {
  return (
    <>
      <DiffButton
        type="easy"
        updateSelectedDiff={props.setCurrentDiff}
        currDiff={props.currentDiff}
        chatData={props.chatData}
        updateChat={props.updateChat}
        isGameStarting={props.isGameStarting}
      ></DiffButton>
      <DiffButton
        type="normal"
        updateSelectedDiff={props.setCurrentDiff}
        currDiff={props.currentDiff}
        chatData={props.chatData}
        updateChat={props.updateChat}
        isGameStarting={props.isGameStarting}
      ></DiffButton>
      <DiffButton
        type="hard"
        updateSelectedDiff={props.setCurrentDiff}
        currDiff={props.currentDiff}
        chatData={props.chatData}
        updateChat={props.updateChat}
        isGameStarting={props.isGameStarting}
      ></DiffButton>
    </>
  );
}
