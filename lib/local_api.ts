"use server";

import { Beatmap, DifficultySettingsTypes, GameModes, LogEntry, SprintGameData, User } from "@/types";
import "dotenv/config";

const defaultPath = process.env.LOCAL_API_URL!;
let headers = new Headers();
headers.append("authorization", process.env.LOCAL_API_KEY!);

export async function newSprint(user_id: string, difficultySetting: DifficultySettingsTypes, skips: number): Promise<SprintGameData> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/sprint/new/${user_id}/${difficultySetting}/${skips}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  });
}

export async function getLeaderboards(mode: GameModes, diffLevel: DifficultySettingsTypes): Promise<SprintGameData[]> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/leaderboards/${mode}/${diffLevel}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  });
}

export async function getGameRank(game_id: string, mode: GameModes, diffLevel: DifficultySettingsTypes): Promise<number> {
  return new Promise(async (resolve, reject) => {
    getLeaderboards(mode, diffLevel).then((games) => {
      let foundIndex = games.findIndex((game) => game.id == game_id);
      typeof foundIndex == 'number' ? resolve(foundIndex + 1) : reject('Game index not found');
    })
  })
}

export async function getGame(mode: GameModes, id: string): Promise<SprintGameData> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/game/${mode}/${id}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  })
}

export async function postSprint(data: SprintGameData): Promise<LogEntry> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/sprint/submit`, {
        method: "POST",
        headers: {
          "content-type": 'application/json',
          "authorization": process.env.LOCAL_API_KEY!
        },
        body: JSON.stringify(data)
      });
      resolve({ status: 'ok' })

    } catch (error) {
      reject(error)
    }
  });
}

export async function getUser(by: 'id' | 'username', identifier: string): Promise<User> {
  return new Promise(async (resolve, reject) => {
    try {
      if (by == 'username') {
        fetch(`${defaultPath}/users/byUsername/${identifier}`, {
          method: "GET",
          headers: {
            "authorization": process.env.LOCAL_API_KEY!
          },
        }).then(async (response) => { resolve(await response.json()) }).catch((e) => reject(e));

      } else {
        fetch(`${defaultPath}/users/byId/${identifier}`, {
          method: "GET",
          headers: {
            "authorization": process.env.LOCAL_API_KEY!
          },
        }).then(async (response) => { resolve(await response.json()) }).catch((e) => reject(e));;
      }
    } catch (error) {
      reject(error)
    }
  });
}

export async function getUserSprint(username: string, diffLevel: DifficultySettingsTypes): Promise<SprintGameData[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/users/sprint/${username}/${diffLevel}`, {
        method: "GET",
        headers: {
          "authorization": process.env.LOCAL_API_KEY!
        },
      });
      resolve(await response.json())

    } catch (error) {
      reject(error)
    }
  });
}

export async function getBeatmaps(): Promise<Beatmap[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/beatmaps`, {
        method: "GET",
        headers: {
          "authorization": process.env.LOCAL_API_KEY!
        },
      });
      resolve(await response.json())
    } catch (e) {
      reject(e)
    }
  })
}

export async function updateAllBeatmaps() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/beatmaps/recalc`, {
        method: "POST",
        headers: {
          "authorization": process.env.LOCAL_API_KEY!
        },
      });
      resolve(await response.json())
    } catch (e) {
      reject(e)
    }
  })
}

export async function removeBeatmaps(beatmap_ids: string[]) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/beatmaps/delete`, {
        method: "POST",
        headers: {
          "content-type": 'application/json',
          "authorization": process.env.LOCAL_API_KEY!
        },
        body: JSON.stringify({ beatmap_ids: beatmap_ids })
      });
      resolve(response.status)
    } catch (e) {
      reject(e)
    }
  })
}

export async function updateBeatmaps(beatmap_ids: string[]) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/beatmaps/add`, {
        method: "POST",
        headers: {
          "content-type": 'application/json',
          "authorization": process.env.LOCAL_API_KEY!
        },
        body: JSON.stringify({ beatmap_ids: beatmap_ids })
      });
      resolve(response.status)
    } catch (e) {
      reject(e)
    }
  })
}


