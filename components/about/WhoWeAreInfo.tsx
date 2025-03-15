import React from 'react';
import { FESTIVAL_NAMES } from '../../utils/constants';

const WhoWeAreInfo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-pink-500">
        Who we are & what’s cookin’
      </h2>
      <p className="text-lg mt-2">
        We’re indie film lovers, festival junkies, and champions of movies made
        on dreams and maxed-out credit cards. We dig through festivals to find
        hidden gems, bizarre masterpieces, and the occasional two-hour close-up
        of a potato. If you love cinema that breaks rules and budgets, welcome
        to the tribe.
      </p>
      <div>
        <h2 className="text-2xl font-semibold text-pink-300">Film Festivals</h2>
        <p className="text-lg mt-4 text-white leading-relaxed">
          We’ve databased indie films from these following prestigious festival:
          <br></br>
          <ul className="list-disc list-inside mt-2 text-lg mb-2">
            {Object.keys(FESTIVAL_NAMES).map((festival) => (
              <li key={festival} className="mt-1">
                {FESTIVAL_NAMES[festival]}
              </li>
            ))}
          </ul>
          <span className="font-bold text-pink-300">To clarify: </span>
          when we say "prestigious," we’re talking about the smaller,
          lesser-known gems that have won awards at niche film festivals. We
          don’t count big-time awards like the Oscars or the Palme d'Or here,
          because that’s not the vibe we’re going for. If you’ve got any
          questions or you’re feeling confused about how we’ve set the rules,
          hit us up on our{' '}
          <a
            href="https://discord.gg/BEHSKHP8"
            className="text-pink-200 hover:underline"
          >
            Discord channel
          </a>{' '}
          to chat about it. We’re all about keeping it real and transparent.
        </p>
      </div>
    </>
  );
};

export default WhoWeAreInfo;
