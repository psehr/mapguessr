export function timeFormat(timeMs: number): string {
  let timeSec = parseFloat((timeMs / 1000).toFixed(0));
  let rawMins = timeSec / 60;
  let mins = Math.floor(rawMins);
  let sec = Math.round((rawMins - mins) * 60);
  return `${mins < 10 ? 0 : ""}${mins}:${sec < 10 ? 0 : ""}${sec}`;
}

export function preciseTimeFormat(timeMs: number): string {
  let timeSec = parseFloat((timeMs / 1000).toFixed(0));
  let pTimeSec = parseFloat(
    (parseFloat((timeMs / 1000).toFixed(4)) - timeSec).toFixed(2)
  );
  let rawMins = timeSec / 60;
  let mins = Math.floor(rawMins);
  let sec = Math.round((rawMins - mins) * 60);
  return `${mins < 10 ? 0 : ""}${mins}:${sec < 10 ? 0 : ""}${(sec + pTimeSec).toFixed(2)}`;
}
