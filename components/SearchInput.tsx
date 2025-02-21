// components/SearchInput.tsx
const SearchInput = () => {
  return (
    <div className="w-full max-w-3xl mb-12 px-4">
      <input
        type="text"
        placeholder="Search for a film, director or actor.."
        className="w-full px-4 py-2 bg-amber-50 text-gray-600 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
      />
    </div>
  );
};

export default SearchInput;
