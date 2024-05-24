import { preciseTimeFormat } from "@/app/sprint/functions/utils";
import { BeatmapAdmin, BeatmapSorting, SprintGameData, gameSorting } from "@/types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"
TimeAgo.addDefaultLocale(en);

export const accuracy = (game: SprintGameData) => {
    let accuracies: number[] = [];

    game.beatmaps.forEach((map) => {
        accuracies.push(map.accuracy!);
    });
    let sum = 0;
    accuracies.forEach((acc) => (sum += acc));
    let finalAcc = ((sum / accuracies.length) * 100).toFixed(2);
    return finalAcc.toString();
};

export const gameTimeAgo = (timestamp: number) => {
    const timeAgo = new TimeAgo("en-US");

    let d = new Date(timestamp);
    return timeAgo.format(d);
};

export const isPB = (game: SprintGameData, games: SprintGameData[]) => {
    const t = game.finalTime;
    let g = [...games];
    sortGames(g, { col: "time", order: "asc" });
    return t == g[0].finalTime ? true : false;
};

export const joinDate = (timestamp: number) => {
    let d = new Date(timestamp);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

export const playcount = (games: SprintGameData[]) => {
    return games.length;
};

export const pb = (games: SprintGameData[]) => {
    return preciseTimeFormat(games[0]?.finalTime!);
};

export const rating = (game: SprintGameData) => {
    return game.rating ? game.rating.toFixed() : "?";
};

export const sortGames = (games: SprintGameData[], sorting: gameSorting) => {
    let sorted = [...games];
    switch (sorting.col) {
        case "time":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = a.finalTime! - b.finalTime!)
                    : (c = b.finalTime! - a.finalTime!);
                return c;
            });
            break;

        case "acc":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = parseFloat(accuracy(a)) - parseFloat(accuracy(b)))
                    : (c = parseFloat(accuracy(b)) - parseFloat(accuracy(a)));
                return c;
            });
            break;
        case "rating":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = (a.rating! || 0) - (b.rating || 0))
                    : (c = (b.rating! || 0) - (a.rating || 0));
                return c;
            });
            break;
        case "skips":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = a.skipsUsed! - b.skipsUsed!)
                    : (c = b.skipsUsed! - a.skipsUsed!);
                return c;
            });
            break;
        case "apm":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = a.skipsUsed! - b.skipsUsed!)
                    : (c = b.skipsUsed! - a.skipsUsed!);
                return c;
            });
            break;
        case "rank":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = a.skipsUsed! - b.skipsUsed!)
                    : (c = b.skipsUsed! - a.skipsUsed!);
                return c;
            });
            break;
        case "date":
            sorted.sort((a, b) => {
                let c;
                sorting.order == "asc"
                    ? (c = b.endTime! - a.endTime!)
                    : (c = a.endTime! - b.endTime!);
                return c;
            });
            break;
    }
    return sorted;
};

export function sortBeatmaps(beatmaps: BeatmapAdmin[], sorting: BeatmapSorting) {
    let sorted = [...beatmaps];

    switch (sorting.col) {
        case 'date':
            sorted.sort((a, b) => {
                let c;
                sorting.order == 'asc'
                    ? (c = Date.parse(a.lastUpdated) - Date.parse(b.lastUpdated))
                    : (c = Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated));
                return c
            })
            break;
        case 'poprating':
            sorted.sort((a, b) => {
                let c;
                sorting.order == 'asc'
                    ? (c = a.popRating - b.popRating)
                    : (c = b.popRating - a.popRating)
                return c
            })
            break;
        case 'skiprate':
            sorted.sort((a, b) => {
                let c;
                sorting.order == 'asc'
                    ? (c = (a.skipcount / (a.playcount + 0.0000001)) - (b.skipcount / (b.playcount + 0.0000001)))
                    : (c = (b.skipcount / (b.playcount + 0.0000001)) - (a.skipcount / (a.playcount + 0.0000001)))
                return c
            })
            break;
    }
    return sorted;
}

