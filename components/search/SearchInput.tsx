import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (q: string) => void;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  filterIconToDisplay: boolean;
}

const SearchInput = ({
  query,
  setQuery,
  handleClick,
  setIsModalOpen,
  filterIconToDisplay,
}: SearchInputProps) => {
  console.log(filterIconToDisplay);
  return (
    <div className="flex justify-center items-center w-full space-x-4 mb-4">
      {filterIconToDisplay && (
        <button
          className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-900 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <IoFilterSharp size={24} />
        </button>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pick a film, grab a snack..."
        className="sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-2 bg-amber-50 text-gray-600 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
      />
      <button
        className="px-4 py-2 text-white bg-pink-500 z-1 rounded-lg hover:bg-pink-900 transition"
        onClick={() => handleClick(query)}
      >
        <FaSearch size={24} />
      </button>
    </div>
  );
};

export default SearchInput;
