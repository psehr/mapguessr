"use server";

import { SprintGameData } from "../../types";
import "dotenv/config";

const defaultPath = process.env.LOCAL_API_URL!;
let headers = new Headers();
headers.append("authorization", process.env.LOCAL_API_KEY!);

export async function getSprint(user: string): Promise<SprintGameData> {
  return new Promise(async (resolve, reject) => {
    await fetch(`${defaultPath}/sprint/${user}`, { headers: headers }).then(
      async (d) => {
        d.status == 200 ? resolve(d.json()) : reject(d.status);
      }
    );
  });
}
