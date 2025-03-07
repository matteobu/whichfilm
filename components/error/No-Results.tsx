type NoResultsProps = {
  onClose: () => void;
};

export default function NoResults({ onClose }: NoResultsProps) {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-opacity-75 backdrop-blur-sm z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
          Your search query is too specific, try broadening it a bit.
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-700 transition"
          >
            Close
          </button>
        </h1>
      </div>
    </div>
  );
}
