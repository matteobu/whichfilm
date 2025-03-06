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
export const isDifferentDay = (storedTimestamp, currentTimestamp) => {
  const storedDate = new Date(storedTimestamp);
  const currentDate = new Date(currentTimestamp);
  return (
    storedDate.getUTCFullYear() !== currentDate.getUTCFullYear() ||
    storedDate.getUTCMonth() !== currentDate.getUTCMonth() ||
    storedDate.getUTCDate() !== currentDate.getUTCDate()
  );
};

export const getInfoForLocalStorage = () => {
  const storedFilms = localStorage.getItem('filmsData');
  const storedTimestamp = localStorage.getItem('filmsTimestamp');
  const currentTime = new Date().getTime();
  return { storedFilms, storedTimestamp, currentTime };
};

export async function extractAndVerifySimilarTitles(
  text: string,
  originalTitle: string
) {
  const regex = /"([^"]+)"/g;
  const possibleTitles = [...text.matchAll(regex)].map((match) => match[1]); // Extracts the film titles

  const cleanedTitles = possibleTitles.map((title) =>
    title.replace(/[.,!?;]$/, '').trim()
  );

  const filteredTitles = [...new Set(cleanedTitles)].filter(
    (title) => title !== originalTitle
  );

  return filteredTitles;
}
