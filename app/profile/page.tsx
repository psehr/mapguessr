import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "../components/SignInButton";
import TestButton from "./TestButton";
import GameHistory from "./GameHistory";
import UserPanel from "./UserPanel";
import { getUser, getUserSprint } from "@/lib/local_api";
import { UserComplex } from "../../../types";

export default async function Profile() {
  const session = await auth();

  if (session) {
    let usr = await getUser(session.user?.name!);
    let usrGames = await getUserSprint(session.user?.name!);
    const fullUser: UserComplex = { user: usr, games: usrGames };
    return (
      <div className="size-[71%] flex flex-row justify-center items-center m-auto gap-10">
        <div className="w-[75%] h-full flex flex-col bg-c-dark bg-opacity-50 rounded-xl">
          <GameHistory></GameHistory>
        </div>
        <div className="w-[25%] h-full bg-c-dark bg-opacity-50 rounded-xl">
          <UserPanel userData={fullUser}></UserPanel>
        </div>
      </div>
    );
  }
}
