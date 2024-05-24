import { ReactNode } from "react";

export type Beatmap = {
  timestamp: string;
  id: string;
  link: string;
  fullTitle: string;
  artist: string;
  artistUnicode: string;
  cover: string;
  cover2x: string;
  slimcover: string;
  slimcover2x: string;
  card: string;
  card2x: string;
  title: string;
  titleUnicode: string;
  diffs: Array<string>;
  tags: Array<string>;
  submitYear: string;
  rankYear?: string;
  status: string;
  creator: string;
  creatorAliases: Array<string>;
  allCreators: Array<string>;
  playcount: number;
  favourites: number;
  popularityRating: number;
  difficultyLevel: DifficultySettingsTypes;
  playedOccurences: number;
  skippedOccurences: number;
};

export type LogEntry = {
  status: "info" | "ok" | "fatal" | "warn";
  description?: string;
  timestamp?: string;
};

export type Guess = {
  value: string
  valid: boolean;
  validness: number;
  type: "full" | "artist" | "title" | "mapper" | "unknown";
};

export type ChatMessage = {
  timestamp: number;
  status: "announce" | "usermessage";
  content: string;
  style: {
    bold: boolean;
    color: "standard" | "red" | "green" | "yellow";
  };
  from?: string;
  link?: string;
};

export type Chat = {
  messages: ChatMessage[];
  id: string;
};

export type BeatmapStatus = "current" | "found" | "not found";

export type GameBeatmap = {
  status: BeatmapStatus
  splitTime: number
  validGuess?: string
  validGuessInfo?: Guess
  guesses?: Guess[]
  accuracy?: number
  skipped: boolean
  metadata: {
    id: string;
    cover: string;
    slimcover: string;
    title: string;
    artist: string;
    creator: string;
    tags: string[];
    rankYear?: string;
    submitYear: string;
    diffnames: string[];
  };
  validTitles: string[];
  validArtists: string[];
  validMappers: string[];
};

export type GameStatus = "new" | "ongoing" | "finished" | "errored";

export type SprintGameData = {
  id: string;
  status: GameStatus;
  difficulty: DifficultySettingsTypes;
  beatmaps: GameBeatmap[];
  skips: number;
  skippedMaps: GameBeatmap[];
  additionalBeatmaps: GameBeatmap[];
  chatlog: ChatMessage[];
  startTime?: number;
  endTime?: number;
  finalTime?: number;
  skipsUsed?: number;
  guessesLength?: number;
  cpm?: number;
  accuracy?: number;
  rating?: number;
  multiplier?: number
  user_id: string;
  user?: User
};

export type User = {
  created: number,
  id: number,
  image: string,
  last_logged: number,
  username: string,
  country: string,
  role: 'player' | 'admin'
}

export type UserComplex = {
  user: User,
  games: SprintGameData[]
}

export type gameSorting = {
  col: "time" | "acc" | 'rating' | "skips" | "apm" | "rank" | "date";
  order: "asc" | "desc";
};

export type BeatmapSorting = {
  col: "date" | "poprating" | 'skiprate'
  order: "asc" | "desc";
}

export type BeatmapFilters = {
  diffLevel?: DifficultySettingsTypes
  searchString: string
}

export type GameModes = 'sprint'

export type DifficultySettingsTypes = 'easy' | 'normal' | 'hard' | 'special' | 'unknown' | 'any';

export type DifficultySettings = {
  type: DifficultySettingsTypes
  skips: number
  minThreshold: number
  maxThreshold: number
}

export type Scope = 'public' | 'private'

export type BeatmapAdmin = {
  id: string;
  link: string;
  cover: string;
  title: string;
  artist: string;
  mappers: string[];
  fulltitle: string;
  popRating: number;
  difficultyLevel: DifficultySettingsTypes;
  lastUpdated: string;
  skipcount: number;
  playcount: number;
};
