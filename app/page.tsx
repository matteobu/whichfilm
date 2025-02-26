import Image from 'next/image';

export default function Home() {
  const randomIndex = Math.floor(Math.random() * h2Array.length);
  const randomH2 = h2Array[randomIndex];

  return (
    <main className="flex flex-col bg-gradient-dark-violet text-white h-full p-1">
      <div className="w-full h-[30vh] sm:h-[35vh] relative">
        <Image
          src="/whichfilmbanner.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
          Welcome to the Best Independent Film Database
        </h1>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
          Mostly winners from indie film festivals, because participation
          trophies still count, right?
        </h3>
        <div className="mt-4 space-y-4">{randomH2}</div>
      </div>
    </main>
  );
}

const h2Array = [
  <h2
    key="1"
    className="text-2xl text-gray-300 max-w-3xl mx-auto relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl"
  >
    Yeah, you heard that right. We're the "best".
    <br />
    But don't get too excited, it's not like you have any better options.
  </h2>,
  <h2
    key="2"
    className="text-2xl text-gray-300 max-w-3xl mx-auto relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl"
  >
    If you're looking for indie gems that’ll change your life, good luck.
    <br />
    Most of them will just remind you of how much you’ve wasted your time.
  </h2>,
  <h2
    key="3"
    className="text-2xl text-gray-300 max-w-3xl mx-auto relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl"
  >
    We've got a ton of movies, but don’t even think about asking us for some
    <br />
    stupid thing like "find me a movie where aliens teach a dog how to dance."
  </h2>,
  <h2
    key="4"
    className="text-2xl text-gray-300 max-w-3xl mx-auto relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl"
  >
    We’re not here to cater to your bad taste. But we might find something
    <br />
    slightly better than whatever half-assed recommendation you got last time.
  </h2>,
  <h2
    key="5"
    className="text-2xl text-gray-300 max-w-3xl mx-auto relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl"
  >
    Indie doesn't always mean "good," but who are we to judge your awful
    choices?
    <br />
    Enjoy feeling disappointed. It's basically the indie experience.
  </h2>,
];
