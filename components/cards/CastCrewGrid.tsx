'use client';
import { Key, useState } from 'react';
import CastCrewCard from './CastCrewCard';
import { CastInfo, CrewInfo } from '../utils-components/types';

const CastGrid = ({ cast }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <div className="w-full pl-2 text-start text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
        <p>The showmakers</p>
      </div>
      <div className="w-full flex flex-row">
        {cast &&
          cast.map((c: CrewInfo | CastInfo, index: Key) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {
                <img
                  src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                  alt={c.original_name}
                  className={`w-14 h-14 m-2 border-2 border-pink-500 rounded-full transition-opacity duration-500 ${
                    hovered === index ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              }
              {hovered === index && (
                <div className="rounded-lg absolute -inset-7 flex items-center justify-center z-99 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-dark-gray-blue border-pink-500 border-2 w-32 h-32">
                  <CastCrewCard
                    name={c.original_name}
                    profilePath={c.profile_path}
                    role={'character' in c ? c.character : c.job}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CastGrid;
