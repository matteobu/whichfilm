export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center  bg-opacity-75 backdrop-blur-sm z-50">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
        Hold your horses, we're digging through the chaos... or maybe we're just
        slow, who knows?
      </h1>
    </div>
  );
}
