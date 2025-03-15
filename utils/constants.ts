// HEADER CONSTANTS
const activeButtonClassName =
  'text-lg font-semibold text-pink-500 hover:text-pink-500 transition duration-300';
const inactiveButtonClassName =
  'text-lg font-semibold text-gray-700 hover:text-pink-900 transition duration-300';
const oramaSearchButtonClassName =
  'text-m font-semibold text-pink-300 bg-gradient-dark-violet border-2 border-pink-300 rounded-lg px-2 py-0.3 hover:bg-violet-100 transition duration-300';

export const mainClassName =
  'flex flex-col bg-gradient-dark-gray-blue text-white h-screen overflow-hidden py-4';

export const FESTIVAL_OR_GENRE = {
  festival: 'festival',
  genre: 'genre',
};

const FESTIVAL_NAMES: Record<string, string> = {
  sundance: 'Sundance',
  cannes: 'Cannes',
  toronto: 'Toronto',
  // tribeca: 'Tribeca',
  berlinale: 'Berlinale',
  // sxsw: 'SXSW',
  venice: 'Venice',
  // afi: 'AFI Fest',
  // locarno: 'Locarno',
  // telluride: 'Telluride',
  // raindance: 'Raindance',
  // busan: 'Busan',
  // rotterdam: 'Rotterdam',
  // ssiff: 'San Sebastián',
  // karlovy: 'Karlovy Vary',
  // hkiff: 'Hong Kong',
  // cleveland: 'Cleveland',
  // siff: 'Seattle',
  // nyff: 'New York',
  // nziiff: 'New Zealand',
};

const TAG_COLORS: Record<string, string> = {
  year: 'bg-indigo-500',
  drama: 'bg-red-500',
  crime: 'bg-purple-500',
  documentary: 'bg-yellow-500',
  adventure: 'bg-blue-500',
  comedy: 'bg-green-500',
  action: 'bg-gray-700',
  romance: 'bg-teal-500',
  war: 'bg-orange-500',
  music: 'bg-pink-600',
  thriller: 'bg-yellow-600',
  fantasy: 'bg-blue-600',
  default: 'bg-pink-500',
};

export {
  activeButtonClassName,
  inactiveButtonClassName,
  oramaSearchButtonClassName,
  TAG_COLORS,
  FESTIVAL_NAMES,
};
