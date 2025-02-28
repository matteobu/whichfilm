'use client';
import React from 'react';

const FESTIVAL_NAMES: Record<string, string> = {
  sundance: 'Sundance',
  vff: 'Venice',
};

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-dark-gray-blue text-white flex flex-col items-center py-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-4">
          About Us
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Welcome to the indie film haven! We’re all about hidden gems, raw
          storytelling, and films that make you feel something deep. Let’s
          explore the world of indie film festivals together.
        </p>
      </header>

      {/* Main Content Section */}
      <section className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-pink-500">Who We Are</h2>
          <p className="text-lg mt-2">
            We’re indie film lovers, festival junkies, and cinephiles. Our goal
            is to bring you closer to the films that matter, that make you think
            and feel.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-pink-500">What We Do</h2>
          <p className="text-lg mt-2">
            We dig deep into indie film festivals to unearth the best
            under-the-radar films. It’s all about the stories that pack the
            biggest punch, no matter the budget.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-pink-500">
            Join the Indie Tribe
          </h2>
          <p className="text-lg mt-2">
            If you're passionate about indie films, you’re one of us. Join us in
            celebrating indie cinema and exploring stories that break the norm.
          </p>
        </div>

        {/* Film Festivals Section */}
        <div>
          <h2 className="text-2xl font-semibold text-pink-500">
            Film Festivals
          </h2>
          <p className="text-lg mt-2">
            We’ve databased indie films from these prestigious festivals:
          </p>
          <ul className="list-disc list-inside mt-2 text-lg">
            {Object.keys(FESTIVAL_NAMES).map((festival) => (
              <li key={festival} className="mt-1">
                {FESTIVAL_NAMES[festival]}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-pink-500">
            Help Us Improve
          </h2>
          <p className="text-lg mt-2">
            We’re always working to improve. If you spot any bugs, errors, or
            issues with the films or anything else, feel free to let us know.
            Your help makes this platform better!
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mt-12 text-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-4">
          Ready to explore the indie world?
        </h3>
        <p className="text-lg mb-6">
          Let’s get started on your indie film journey—no fluff, just real
          cinema.
        </p>
        <a
          href="/film-search"
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition"
        >
          Go to Films
        </a>
      </section>
    </div>
  );
};

export default About;
