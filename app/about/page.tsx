import React from 'react';
import SmallCardInfo from '../../components/about/SmallFilmCardInfo';
import FilmPageInfo from '../../components/about/FilmPageInfo';
import ContactSection from '../../components/about/ContactInfo';
import Link from 'next/link';
import OramaInfo from '../../components/about/OramaInfo';
import WhoWeAreInfo from '../../components/about/WhoWeAreInfo';

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-dark-gray-blue text-white flex flex-col items-center py-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-4">
          About this cool place on the internet
        </h1>
      </header>
      <section
        id="who-we-are"
        className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6  mt-8"
      >
        <WhoWeAreInfo />
      </section>
      <section
        id="orama-info"
        className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8"
      >
        <OramaInfo />
      </section>
      <section
        id="film-page"
        className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8"
      >
        <FilmPageInfo />
      </section>
      <section
        id="small-card"
        className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8"
      >
        <SmallCardInfo />
      </section>
      <section
        id="contact-info"
        className="w-full max-w-3xl mx-auto px-6 py-8 bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8"
      >
        <ContactSection />
      </section>
      <div className="relative z-10 text-center m-4 flex flex-col border-t-2 border-t-pink-500">
        <h1 className="text-sm text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
          This is an independent, open-source web app developed by{' '}
          <Link
            href="https://matteo.codes"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            matteo.codes
          </Link>
          . Content is for informational purposes only. The developers do not
          guarantee accuracy or reliability. Use at your own risk and in
          compliance with applicable laws. <br></br>This project is intended to
          be open-source, and any help is truly appreciated. The repository can
          be found at this{' '}
          <Link
            href="https://github.com/matteobu/whichfilm"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            GitHub Repo
          </Link>
          . For inquiries, suggestions, or corrections, you can contact the
          developers at{' '}
          <Link
            href="mailto:your-email@example.com"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            whichfilm@pm.me
          </Link>
          .
        </h1>
      </div>
    </div>
  );
};

export default About;
