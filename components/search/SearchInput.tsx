interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Pick a film, grab a snack..."
      className="sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-4 py-2 bg-amber-50 text-gray-600 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
    />
  );
};

export default SearchInput;
