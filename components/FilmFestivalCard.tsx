import React from 'react';

interface Festival {
  name: string;
  location: string;
  overview: string;
  image?: string; // Optional image for the festival
}

interface FilmFestivalCardProps {
  festival: Festival;
}

const FilmFestivalCard: React.FC<FilmFestivalCardProps> = ({ festival }) => {
  return (
    <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 p-4 hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      {/* Festival Image as Background */}
      <div
        className="w-full h-32 bg-cover bg-center rounded-lg mb-4"
        style={{ backgroundImage: `url(${festival.image})` }}
      >
        {!festival.image && (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <p className="text-white">No Image</p>
          </div>
        )}
      </div>

      {/* Festival Name */}
      <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-1 text-center">
        {festival.name}
      </h1>

      {/* Festival Location */}
      <p className="text-sm text-white mb-2 text-center">{festival.location}</p>

      {/* Festival Overview */}
      <p className="text-sm text-white line-clamp-3 text-center">
        {festival.overview}
      </p>
    </div>
  );
};

export default FilmFestivalCard;
