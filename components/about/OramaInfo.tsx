import React from 'react';

const OramaInfo = () => {
  return (
    <>
      <h2 className="text-2xl font-extrabold text-start text-pink-500 mb-4">
        How is the search done?
      </h2>

      <p className="text-lg text-white mb-6">
        At <span className="font-bold text-pink-500">whichfilm?</span>, we've
        integrated the powerful Orama Search Engine to provide you with
        lightning-fast, relevant search results. Whether you're looking for
        films, genres, or reviews, Orama ensures that you get the most accurate
        and contextually relevant answers in the blink of an eye.
      </p>

      <div className="text-lg text-white">
        <h3 className="text-2xl font-semibold text-pink-300 mb-2">
          Here’s how it works:
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Indexing:</strong> Orama indexes all the relevant data—film
            titles, genres, descriptions, and more—ensuring that the search
            results are comprehensive and organized.
          </li>
          <li>
            <strong>Search Queries:</strong> Once you enter a query, Orama’s
            search engine kicks in, scanning the indexed data for the most
            relevant matches based on your search terms.
          </li>
          <li>
            <strong>Contextual Relevance:</strong> Orama not only looks for
            exact matches but also considers context to provide results that are
            tailored to your needs. No more irrelevant search results!
          </li>
        </ul>
      </div>

      <p className="text-lg text-white mt-4">
        With Orama on board, we’ve taken the guesswork out of searching for
        films. Your search experience is faster, smarter, and more fun than ever
        before!
      </p>

      <div className="text-white">
        <h3 className="text-2xl font-semibold  text-pink-300">
          Orama Search Engine: what is it?
        </h3>
        <p>
          Orama is an open-source search engine and Retrieval-Augmented
          Generation (RAG) pipeline designed to seamlessly operate across
          browsers, servers, or edge networks.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-pink-300">Key features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Comprehensive Search Support:</strong> Orama supports
            full-text, vector, and hybrid searches. Whether you're searching
            through documents or exploring more complex datasets, it's got you
            covered!
          </li>
          <li>
            <strong>Retrieval-Augmented Generation (RAG):</strong> It enhances
            your search results by integrating RAG capabilities, meaning more
            accurate and contextually relevant results!
          </li>
          <li>
            <strong>Lightweight Design:</strong> Orama is super compact—less
            than 2KB! It’s a lightweight solution that works across browsers,
            servers, and even edge networks.
          </li>
          <li>
            <strong>Quality Assurance:</strong> Orama ensures top-quality
            results by measuring answers across five dimensions, including
            precision, recall, and correctness.
          </li>
          <li>
            <strong>Developer-Friendly:</strong> With zero dependencies and easy
            setup, Orama makes it simple to add powerful search capabilities to
            your app.
          </li>
        </ul>
      </div>

      <div className="text-white">
        <h3 className="text-2xl font-semibold  text-pink-300">How it works</h3>
        <p>
          Orama works by indexing documents (like articles or records) and
          allowing you to perform search operations on them. You can define
          which fields in the documents are searchable (like "title" or
          "content") and let Orama do the heavy lifting.
        </p>
        <p>
          After setting up the search engine, you can query your indexed
          documents, and Orama will return results based on relevance, context,
          and accuracy.
        </p>
      </div>

      <div className="text-center text-gray-300">
        <p>
          <strong>Learn more:</strong> You can find Orama’s full documentation
          on{' '}
          <a href="https://orama.com" className="text-blue-400 hover:underline">
            their website
          </a>{' '}
          or explore their GitHub repository for the latest updates and
          examples.
        </p>
      </div>
    </>
  );
};

export default OramaInfo;
