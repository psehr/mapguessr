import { SprintGameData } from "@/types";

export function timeFormat(timeMs: number): string {
  let timeSec = parseFloat((timeMs / 1000).toFixed(0));
  let rawMins = timeSec / 60;
  let mins = Math.floor(rawMins);
  let sec = Math.round((rawMins - mins) * 60);
  return `${mins < 10 ? 0 : ""}${mins}:${sec < 10 ? 0 : ""}${sec}`;
}

export function preciseTimeFormat(timeMs: number): string {
  let rawMins = Math.floor(timeMs / 1000 / 60);
  let rawSecs = Math.floor(timeMs / 1000);
  let rawUndredths = Math.floor(timeMs);

  let mins = rawMins.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  let secs = (rawSecs - rawMins * 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  let hundredths = (Math.abs((rawUndredths - ((rawMins * 60) + (rawSecs * 1000))) / 10)).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0,
    useGrouping: false
  }).slice(0, 2)

  return (`${mins}:${secs}.${hundredths}`)
}

export function formattedTimeSplit(sgd: SprintGameData): string[] {
  const startTime = sgd.startTime;
  let splits: string[] = [];
  sgd.beatmaps.forEach((map) => {
    const diff = map.splitTime - startTime!;
    splits.push(preciseTimeFormat(diff));
  })
  return splits
}

export function calcRating(finalTime: number, accuracy: number, multiplier: number) {
  const a = accuracy;
  const t = finalTime / 1000;

  // accuracy multiplier
  const acc = Math.exp(Math.pow(a, 3)) - 0.2;

  // time multiplier
  const time = t / Math.pow(t, 2);

  const rating = ((acc * time) * 200) * multiplier
  return parseFloat(rating.toFixed(2));
}
