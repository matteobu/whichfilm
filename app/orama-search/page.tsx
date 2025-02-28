'use client';
import { useState } from 'react';

const OramaChat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles the query submission
  const handleAsk = async () => {
    if (!query) return; // If no query, don't proceed

    setLoading(true); // Show loading spinner
    setResponse(''); // Clear previous response
    setError(''); // Clear previous error

    try {
      const res = await fetch('/api/orama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setResponse(data.answer); // Set the response from API
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch answer. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-gradient-dark-violet min-h-screen text-white p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
        Orama Answer Engine
      </h2>

      {/* Input field for user query */}
      <input
        type="text"
        placeholder="Ask about independent films..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md p-3 border border-gray-700 rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Ask button */}
      <button
        onClick={handleAsk}
        disabled={loading}
        className="w-full max-w-md bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition disabled:bg-gray-500"
      >
        {loading ? 'Searching...' : 'Ask'}
      </button>

      {/* Error message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Response from Orama */}
      {response && (
        <p className="mt-6 p-4 w-full max-w-md border border-gray-700 rounded-md text-lg bg-gray-800">
          {response}
        </p>
      )}
    </div>
  );
};

export default OramaChat;
