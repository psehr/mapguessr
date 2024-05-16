import { auth } from "@/auth";
import GameHistory from "./components/gamehistory/GameHistory";
import UserCard from "./components/usercard/UserCard";
import { getUser, getUserSprint } from "@/lib/local_api";
import { UserComplex } from "../../../types";
import Protected from "../sprint/views/Protected";
import Profile from "./components/Profile";

export default async function ProfilePage() {
  const session = await auth();

  if (session) {
    return <Profile username={session.user?.name!}></Profile>;
  } else {
    return <Protected></Protected>;
  }
}
