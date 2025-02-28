'use client';
import { useEffect } from 'react';
import { FESTIVAL_NAMES } from '../utils-components/constants';
import { OramaSearchResponse } from '../utils-components/types';

interface SearchFilterModalProps {
  results: OramaSearchResponse;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFestival: string | null;
  selectedGenre: string | null;
  setSelectedFestival: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchFilterModal = ({
  results,
  setIsModalOpen,
  selectedFestival,
  selectedGenre,
  setSelectedFestival,
  setSelectedGenre,
}: SearchFilterModalProps) => {
  const uniqueGenres = Array.from(
    new Set(results.hits.flatMap((film) => film.document.genres || []))
  );
  useEffect(() => {
    const handleClose = (e: any) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleClose);

    return () => window.removeEventListener('keydown', handleClose);
  }, [setIsModalOpen]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-gradient-dark-gray-blue p-6 rounded-xl shadow-2xl w-[90vw] max-w-lg h-[70vh] flex flex-col justify-between items-center text-white relative overflow-auto  border-2 border-pink-500">
        <div className="w-full flex flex-col items-center space-y-2 overflow-auto">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Festival</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`px-3 py-2 text-xs rounded-md font-semibold transition ${
                  !selectedFestival
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedFestival(null)}
              >
                All Festivals
              </button>
              {Object.keys(FESTIVAL_NAMES).map((festival) => (
                <button
                  key={festival}
                  className={`px-3 py-2 text-xs rounded-md font-semibold transition ${
                    selectedFestival === festival
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() =>
                    setSelectedFestival(
                      festival === selectedFestival ? null : festival
                    )
                  }
                >
                  {FESTIVAL_NAMES[festival]}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Genres</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`px-3 py-2 text-xs rounded-md font-semibold transition ${
                  !selectedGenre
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedGenre(null)}
              >
                All Genres
              </button>

              {uniqueGenres.map((genre) => (
                <button
                  key={genre}
                  className={`px-3 py-2 text-xs rounded-md font-semibold transition ${
                    selectedGenre === genre
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() =>
                    setSelectedGenre(genre === selectedGenre ? null : genre)
                  }
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterModal;
