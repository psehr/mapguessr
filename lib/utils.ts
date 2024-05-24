import { DifficultySettingsTypes, GameBeatmap, Guess } from "@/types";
import levenshtein from "damerau-levenshtein";

interface LevenshteinResponse {
  steps: number;
  relative: number;
  similarity: number;
}

export const guessStringFormatting = (input: string): string => {
  // all in lower case
  let inputFormatted = input.toLowerCase();

  // filtering out all special characters (except alphanumerical)
  inputFormatted = inputFormatted.replace(/[^a-zA-Z0-9]/g, '');

  return inputFormatted
}

export function isValidGuess(
  guess: string,
  comparisonMap: GameBeatmap,
  threshold: number
) {
  let guessResult: Guess = {
    value: guess,
    valid: true,
    type: "unknown",
    validness: 0,
  };

  if (!guess.length) {
    guessResult.valid = false;
    return guessResult
  }


  let titleSimilarity = 0;
  let artistSimilarity = 0;
  let mapperSimilarity = 0;
  let fullTitleSimilarity = 0;

  let validFullTitle = `${guessStringFormatting(comparisonMap.metadata.artist)} - ${guessStringFormatting(comparisonMap.metadata.title)}`;

  // checking against possible full title
  fullTitleSimilarity = levenshtein(
    guess.toLowerCase(),
    validFullTitle
  ).similarity;

  // checking against possible titles
  comparisonMap.validTitles.map((title) => {
    const lev: LevenshteinResponse = levenshtein(
      guessStringFormatting(guess),
      guessStringFormatting(title),
    );

    lev.similarity > titleSimilarity
      ? (titleSimilarity = lev.similarity)
      : null;
  });

  // checking against possible artists
  comparisonMap.validArtists.map((artist) => {
    const lev: LevenshteinResponse = levenshtein(
      guessStringFormatting(guess),
      guessStringFormatting(artist),
    );

    lev.similarity > artistSimilarity
      ? (artistSimilarity = lev.similarity)
      : null;
  });

  // checking against possible mappers
  comparisonMap.validMappers.map((mapper) => {
    const lev: LevenshteinResponse = levenshtein(
      guessStringFormatting(guess),
      guessStringFormatting(mapper),
    );

    lev.similarity > mapperSimilarity
      ? (mapperSimilarity = lev.similarity)
      : null;
  });

  // set guess types and highest value
  let max = Math.max(
    ...[
      fullTitleSimilarity,
      titleSimilarity,
      artistSimilarity,
      mapperSimilarity,
    ]
  );
  guessResult.validness = max;

  if (max > threshold) {
    switch (max) {
      case fullTitleSimilarity:
        guessResult.type = "full";
        break;
      case titleSimilarity:
        guessResult.type = "title";
        break;
      case artistSimilarity:
        guessResult.type = "artist";
        break;
      case mapperSimilarity:
        guessResult.type = "mapper";
        break;
      default:
        break;
    }
  } else {
    guessResult.valid = false;
  }

  return guessResult;


}

export const formatFullTitle = (map: GameBeatmap, max_length: number) => {
  let base = `${map.metadata.artist} - ${map.metadata.title}`;
  let formatted = "";
  if (base.length > max_length) {
    formatted += "... - ";
    if (map.metadata.title.length > max_length) {
      formatted +=
        map.metadata.title.split(" ")[0] +
        " " +
        map.metadata.title.split(" ")[1] + ' ...';
    } else {
      formatted += map.metadata.title;
    }
  } else {
    formatted = base;
  }
  return formatted;
};

export const formatTitle = (title: string, max_length: number, words: number) => {
  let formatted = '';
  if (title.length > max_length) {
    for (let index = 0; index < words; index++) {
      formatted += title.split(' ')[index];
      formatted += ' ';
    }
    formatted += '...'
  } else formatted += title;
  return formatted
}

export const getRatingMultiplier = (diffLevel: DifficultySettingsTypes, skipAmount: number) => {
  let mult = 1;
  switch (diffLevel) {
    case 'easy':
      mult = 0.5
      break;
    case 'hard':
      mult = 2
      break;
    default:
      break;
  }

  const defaultSkips = getDefaultSkips(diffLevel)
  const diff = defaultSkips - skipAmount;

  mult += diff / 10
  return parseFloat((Math.abs(mult).toFixed(2)));
}

export const getDefaultSkips = (diffLevel: DifficultySettingsTypes): number => {
  switch (diffLevel) {
    case 'easy':
      return 5;
    case 'normal':
      return 3;
    case 'hard':
      return 1;
    default:
      return 3;
  }
}

export const diffColor = (diff: DifficultySettingsTypes) => {
  switch (diff) {
    case "easy":
      return "text-green-400";
    case "normal":
      return "text-yellow-400";
    case "hard":
      return "text-red-400";
    case "special":
      return "text-purple-400";
  }
};

export const capitalizeFirst = (input: string) => {
  return (input.charAt(0).toUpperCase() + input.slice(1))
}
