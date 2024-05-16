import { Scope } from "../../../../../types";
import RefreshButton from "./RefreshButton";
import SignOutButton from "./SignOutButton";

export default function Buttons(props: { scope: Scope }) {
  return (
    <div className="m-auto w-full h-[10%] flex flex-row gap-4 place-content-center items-center">
      {props.scope == "private" ? (
        <>
          <SignOutButton></SignOutButton>
          <RefreshButton></RefreshButton>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
