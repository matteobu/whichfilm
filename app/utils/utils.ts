export const getRandomFilms = (films: any[], count: number) => {
  const randomFilms = [];
  const seenIndices = new Set();
  while (randomFilms.length < count && films.length > 0) {
    const randomIndex = Math.floor(Math.random() * films.length);
    if (!seenIndices.has(randomIndex)) {
      randomFilms.push(films[randomIndex]);
      seenIndices.add(randomIndex);
    }
  }
  return randomFilms;
};

export async function extractAndVerifySimilarTitles(text, originalTitle) {
  const regex = /"([^"]+)"/g; // Matches anything inside double quotes
  const possibleTitles = [...text.matchAll(regex)].map((match) => match[1]); // Extracts the film titles

  // Clean titles by removing trailing punctuation and trimming whitespace
  const cleanedTitles = possibleTitles.map((title) =>
    title.replace(/[.,!?;]$/, '').trim()
  );

  // Remove original title and filter out duplicates
  const filteredTitles = [...new Set(cleanedTitles)] // Remove duplicates
    .filter((title) => title !== originalTitle); // Remove the original title

  return filteredTitles; // Return the filtered list of similar films
}
