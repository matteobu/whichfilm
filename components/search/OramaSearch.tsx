'use client';
import { OramaChatBox } from '@orama/react-components';
import { useState } from 'react';

const OramaSearch = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query) return;

    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('/api/orama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      console.log(res);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      console.log(data.answer);
      setResponse(data.answer);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-dark-gray-blue text-white p-6 flex flex-col items-center justify-center rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {error && (
        <p className="text-red-500 mt-3 text-sm italic font-semibold">
          {error}
        </p>
      )}

      {/* Input and Ask button on the same line with proper width distribution */}
      <div className="flex w-full mb-4">
        <input
          type="text"
          placeholder="You can hit up our giant search engine..or cruise through Films | Film Festivals. Your call!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-5/6 p-4 bg-gray-700 text-white rounded-l-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-1/6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-4 rounded-r-lg hover:scale-105 hover:opacity-90 transition transform disabled:bg-gray-600"
        >
          {loading ? 'Searching...' : 'Ask'}
        </button>
      </div>

      {response && (
        <div className="mt-6 p-4 w-full h-32 max-w-8xl border border-gray-600 rounded-md text-lg bg-gray-800 shadow-lg overflow-y-auto">
          {response}
        </div>
      )}
    </div>
  );
};

export default OramaSearch;
