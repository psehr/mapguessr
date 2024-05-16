"use server";

import { GameModes, LogEntry, SprintGameData, User } from "../../types";
import "dotenv/config";

const defaultPath = process.env.LOCAL_API_URL!;
let headers = new Headers();
headers.append("authorization", process.env.LOCAL_API_KEY!);

export async function newSprint(user_id: string): Promise<SprintGameData> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/sprint/${user_id}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  });
}

export async function getLeaderboards(mode: GameModes): Promise<SprintGameData[]> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/leaderboards/${mode}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  });
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
      const response = await fetch(`${defaultPath}/sprint`, {
        method: "POST", // or 'PUT'
        headers: {
          "content-type": 'application/json',
          "authorization": process.env.LOCAL_API_KEY!
        },
        body: JSON.stringify(data)
      });
      resolve(await response.json())

    } catch (error) {
      reject(error)
    }
  });
}

export async function getUser(by: 'id' | 'username', identifier: string): Promise<User> {
  return new Promise(async (resolve, reject) => {
    try {
      if (by == 'username') {
        const response = await fetch(`${defaultPath}/users/byUsername/${identifier}`, {
          method: "GET", // or 'PUT'
          headers: {
            "authorization": process.env.LOCAL_API_KEY!
          },
        });
        resolve(await response.json())
      } else {
        const response = await fetch(`${defaultPath}/users/byId/${identifier}`, {
          method: "GET", // or 'PUT'
          headers: {
            "authorization": process.env.LOCAL_API_KEY!
          },
        });
        resolve(await response.json())
      }
    } catch (error) {
      reject(error)
    }
  });
}

export async function getUserSprint(username: string): Promise<SprintGameData[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${defaultPath}/users/sprint/${username}`, {
        method: "GET", // or 'PUT'
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


