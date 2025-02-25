export function getRandomObjects<T>(arr: T[], num: number): T[] {
  const arrayCopy = [...arr];
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const dayNumber = today.getDate();

  const seed = year * 1000 + month * 31 + dayNumber;

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = (i + seed) % (i + 1);
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, num);
}
