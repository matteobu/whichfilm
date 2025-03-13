'use client';
import Link from 'next/link';
import defaultImage from '../../assets/logo.png';
import { SmallFilmCardProps } from '../../utils/types';
import Image from 'next/image';

const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const { title, poster_path, infoIndieAndAwards, vote_average, tagline } =
    film.document;
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultImage.src;

  const isNotIndie = infoIndieAndAwards.notStrictIndie;

  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block m-2 text-xl font-semibold text-pink-300 hover:text-pink-500"
    >
      <div className="w-[150px] h-auto z-9 relative overflow-visible border-2 rounded-xl border-pink-500 group hover:opacity-60">
        <span
          className="w-[140px] h-[190px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          flex flex-col items-center justify-center text-center px-4 py-3 gap-2
          bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl shadow-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {' '}
          <span
            className={`text-xs font-semibold px-2 py-[2px] rounded-md 
            ${isNotIndie ? 'bg-red-600' : 'bg-green-600'} text-white`}
          >
            {isNotIndie ? 'ain’t that indie' : 'certified indie'}
          </span>
          <div className="w-10 h-[2px] bg-gray-500 opacity-50"></div>
          <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500  leading-tight">
            {title}
          </span>
          <div className="w-10 h-[2px] bg-gray-500 opacity-50"></div>
          <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500  leading-tight">
            click for more juice
          </span>
        </span>
        <div
          className="w-10 h-10 flex items-center justify-center 
                absolute bottom-[-12px] right-[-5px] 
                text-white text-sm font-bold rounded-full 
                z-10 p-1 border-2 border-pink-500 shadow-md 
                bg-[linear-gradient(to_right,#2c2c2c,#1e3a5f)]"
        >
          {vote_average ? vote_average.toFixed(1) : 'N.P'}
        </div>

        <Image
          src={imageSrc}
          alt={title || 'Film Image'}
          className="object-cover rounded-lg"
          width={150}
          height={250}
        />
      </div>
    </Link>
  );
};

export default SmallFilmCard;
// 'use client';
// import Link from 'next/link';
// import defaultImage from '../../assets/logo.png';
// import { SmallFilmCardProps } from '../../utils/types';
// import Image from 'next/image';

// const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
//   if (!film) {
//     return null;
//   }

//   const { title, poster_path, infoIndieAndAwards } = film.document;
//   const imageSrc = poster_path
//     ? `https://image.tmdb.org/t/p/w500${poster_path}`
//     : defaultImage.src;

//   const isNotIndie = infoIndieAndAwards.notStrictIndie;
//   return (
//     <Link
//       href={`/film-search/${film.id}`}
//       className="block m-2 text-xl font-semibold text-pink-300 hover:text-pink-500"
//     >
//       <div className="w-[150px] h-[250px] relative overflow-hidden border-2 rounded-xl border-pink-500 transition-opacity duration-300 opacity-40 hover:opacity-100">
//         <Image
//           src={imageSrc}
//           alt={title || 'Film Image'}
//           className="object-cover"
//           width={150}
//           height={250}
//         />
//         {isNotIndie ? (
//           <div className="relative bottom-0 left-0 w-full bg-red-800 opacity-80 text-white text-center text-sm py-1 z-20">
//             this ain’t that indie
//           </div>
//         ) : (
//           <div className="absolute bottom-0 left-0 w-full bg-green-800 opacity-80 text-white text-center text-sm py-1 z-20">
//             whichfilm approved
//           </div>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default SmallFilmCard;
