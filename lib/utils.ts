import { GameBeatmap, Guess } from "../../types";
import levenshtein from "damerau-levenshtein";

interface LevenshteinResponse {
  steps: number;
  relative: number;
  similarity: number;
}

export function isValidGuess(
  guess: string,
  comparisonMap: GameBeatmap,
  threshold: number
) {
  let guessResult: Guess = {
    valid: true,
    type: "unknown",
    validness: 0,
  };

  let titleSimilarity = 0;
  let artistSimilarity = 0;
  let mapperSimilarity = 0;
  let fullTitleSimilarity = 0;

  // checking against possible full title
  fullTitleSimilarity = levenshtein(
    guess.toLowerCase(),
    `${comparisonMap.metadata.artist.toLowerCase()} ${comparisonMap.metadata.title.toLowerCase()}`
  ).similarity;

  // checking against possible titles
  comparisonMap.validTitles.map((title) => {
    const lev: LevenshteinResponse = levenshtein(
      guess.toLowerCase(),
      title.toLowerCase()
    );

    lev.similarity > titleSimilarity
      ? (titleSimilarity = lev.similarity)
      : null;
  });

  // checking against possible artists
  comparisonMap.validArtists.map((artist) => {
    const lev: LevenshteinResponse = levenshtein(
      guess.toLowerCase(),
      artist.toLowerCase()
    );

    lev.similarity > artistSimilarity
      ? (artistSimilarity = lev.similarity)
      : null;
  });

  // checking against possible mappers
  comparisonMap.validMappers.map((mapper) => {
    const lev: LevenshteinResponse = levenshtein(
      guess.toLowerCase(),
      mapper.toLowerCase()
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
