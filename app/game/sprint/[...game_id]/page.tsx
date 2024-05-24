"use client";

import { getGame, getUser, getUserSprint } from "@/lib/local_api";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { GameModes, SprintGameData, User, UserComplex } from "@/types";
import GameProgress from "@/app/sprint/components/gameprogress/GameProgress";
import Loading from "@/app/sprint/views/Loading";
import UserCard from "@/app/profile/components/usercard/UserCard";
import GameRecap from "@/app/components/Tables/GameRecap/GameRecap";
import MiddleBlock from "./MiddleBlock";

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
      getUserSprint(foundUser.username, game?.difficulty!).then((games) => {
        setUser({ games: games, user: foundUser });
      });
    });
  }, []);
  if (game && user) {
    return (
      <div className="h-[90%] w-[90%] md:h-[71%] md:w-[90%] flex flex-row justify-center items-center m-auto gap-10">
        <div className="w-[25%] h-full flex flex-col place-content-center items-center">
          <GameProgress maps={game?.beatmaps}></GameProgress>
        </div>
        <div className="w-[40%] h-full flex flex-col place-content-center items-center">
          <MiddleBlock sgd={game}></MiddleBlock>
        </div>
        <div className="w-[20%] h-full flex flex-col">
          <UserCard
            userData={user}
            scope="public"
            currentDiff={game.difficulty}
          ></UserCard>
        </div>
      </div>
    );
  } else {
    return <Loading></Loading>;
  }
}
