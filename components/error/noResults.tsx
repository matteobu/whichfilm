// components/Loading.tsx
const Loading = () => (
  <div className="flex flex-col justify-center items-center space-y-4">
    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
      Hold your horses, we're digging through the chaos... or maybe we're just
      slow, who knows?
    </h1>

    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
      Or maybe your search query is too specific, try broadening it a bit.
    </h1>
  </div>
);

export default Loading;
