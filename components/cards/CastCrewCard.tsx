import Image from 'next/image';
import React from 'react';

const CastCrewCard = ({ name, profilePath, role }) => {
  const imageSrc = profilePath
    ? `https://image.tmdb.org/t/p/w200${profilePath}`
    : '/nopic.jpg';

  return (
    <div className="relative items-center justify-center w-full h-full rounded-lg overflow-hidden bg-dark-gray-blue border-2 border-pink-500 group">
      <div className="relative w-full h-32">
        <Image
          src={imageSrc}
          alt={name}
          width={200}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg opacity-50 cover fill"
        />
      </div>
      <div className="text-s text-white absolute bottom-0 left-0 w-full p-4 text-center z-10">
        <h3 className="mb-1 font-extrabold">{name}</h3>
        <p className="castCrew-card">{role}</p>
      </div>
    </div>
  );
};

export default CastCrewCard;
