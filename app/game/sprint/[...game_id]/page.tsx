"use client";

import { getGame, getUser, getUserSprint } from "@/lib/local_api";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import {
  GameModes,
  SprintGameData,
  User,
  UserComplex,
} from "../../../../../types";
import GameProgress from "@/app/sprint/components/gameprogress/GameProgress";
import Loading from "@/app/sprint/views/Loading";
import UserCard from "@/app/profile/components/usercard/UserCard";

export default function GameDetails({
  params,
}: {
  params: { game_id: string };
}) {
  const [game, setGame] = useState<SprintGameData>();
  const [user, setUser] = useState<UserComplex>();

  const mode = usePathname().split("/")[2] as GameModes;
  const user_id = params.game_id.toString().split("_")[0];

  useEffect(() => {
    getGame(mode, params.game_id).then((foundGame) => {
      setGame(foundGame);
    });
    getUser("id", user_id).then((foundUser) => {
      getUserSprint(foundUser.username).then((games) => {
        setUser({ games: games, user: foundUser });
      });
    });
  }, []);
  if (game && user) {
    return (
      <div className="h-[90%] w-[90%] md:h-[71%] md:w-[90%] flex flex-row justify-center items-center m-auto gap-10">
        <div className="w-[25%] h-full flex flex-col">
          <GameProgress maps={game?.beatmaps}></GameProgress>
        </div>
        <div className="w-[50%] h-full flex flex-col bg-black/20"></div>
        <div className="w-[25%] h-full flex flex-col">
          <UserCard userData={user} scope="public"></UserCard>
        </div>
      </div>
    );
  } else {
    return <Loading></Loading>;
  }
}
