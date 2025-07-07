'use client';

import { useState, useEffect } from 'react';
import {
  RadioInputComponent,
  SelectInputComponent,
  TextAreaComponent,
} from './FeedbackBoxInputs';

export default function FeedbackBox() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [likeApp, setLikeApp] = useState('');
  const [usage, setUsage] = useState('');
  const [watchedFilm, setWatchedFilm] = useState('');
  const [extendDb, setExtendDb] = useState('');
  const [extraMessage, setExtraMessage] = useState('');
  const [appPurpose, setAppPurpose] = useState('');
  const [accuracy, setAccuracy] = useState('5');
  const [easeOfUse, setEaseOfUse] = useState('');
  const [futureFeature, setFutureFeature] = useState('');
  const FEEDBACK_KEY = 'whichfilm_feedback_sent';

  useEffect(() => {
    const hasSent = localStorage.getItem(FEEDBACK_KEY);
    if (hasSent !== 'true') {
      setIsVisible(true);
    }
    setShouldRender(true);
  }, []);

  if (!shouldRender || !isVisible) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus('sending');

    const entries = {
      likeApp,
      usage,
      watchedFilm,
      extendDb,
      appPurpose,
      accuracy,
      easeOfUse,
      futureFeature,
      extraMessage,
    };

    const formData = new FormData();
    Object.entries(entries).forEach(([key, value]) =>
      formData.append(key, value)
    );
    try {
      const res = await fetch('/api/share-feedback', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('sent');
        setSuccess(true);
        setLikeApp('');
        setUsage('');
        setWatchedFilm('');
        setExtendDb('');
        setAppPurpose('');
        setAccuracy('5');
        setEaseOfUse('');
        setFutureFeature('');
        setExtraMessage('');
        localStorage.setItem(FEEDBACK_KEY, 'true');
      } else {
        setStatus('error');
        setSuccess(false);
        localStorage.setItem(FEEDBACK_KEY, 'false');
      }
    } catch (error) {
      setStatus('error');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-gradient-dark-gray-blue text-white p-6 rounded-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-xl relative border-2 border-pink-500 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
        {' '}
        <button
          className="absolute top-2 right-3 text-pink-500 font-bold"
          onClick={() => {
            setIsVisible(false);
            localStorage.setItem(FEEDBACK_KEY, 'false');
          }}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">🎬 Calling for Feedback!</h2>
        {success ? (
          <p className="text-green-600 font-semibold text-center">
            Thanks a ton! Your voice makes this app better ❤️
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <RadioInputComponent
                value={likeApp}
                setValue={setLikeApp}
                name="likeApp"
                text={'Do you like WhichFilm?*'}
                inputOptions={['Yes', 'No']}
              />
              <RadioInputComponent
                value={usage}
                setValue={setUsage}
                name="usage"
                text={'How often do you use it?*'}
                inputOptions={['First time', 'Occasionally', 'Weekly', 'Daily']}
              />
              <RadioInputComponent
                value={watchedFilm}
                setValue={setWatchedFilm}
                name="watchedFilm"
                text={'Did you watch a film recommended here?*'}
                inputOptions={['Yes', 'No']}
              />
              <RadioInputComponent
                value={extendDb}
                setValue={setExtendDb}
                name="extendDb"
                text={'Would you like me to expand the database?*'}
                inputOptions={['Yes', 'No']}
              />
              <RadioInputComponent
                value={accuracy}
                setValue={setAccuracy}
                name="accuracy"
                text={'How accurate do you find the recommendations?*'}
                inputOptions={['1', '2', '3', '4', '5']}
              />
              <SelectInputComponent
                value={appPurpose}
                setValue={setAppPurpose}
                text={'What do you usually use WhichFilm for?*'}
                inputOptions={[
                  'Discover new films',
                  'Avoid bad suggestions',
                  'Find something quick to watch',
                  'Just browsing',
                ]}
              />
              <SelectInputComponent
                value={easeOfUse}
                setValue={setEaseOfUse}
                text={'How easy was it to use the app?*'}
                inputOptions={[
                  'Very easy',
                  'Fairly easy',
                  'Neutral',
                  'A bit confusing',
                  'Hard to use',
                ]}
              />
              <TextAreaComponent
                value={futureFeature}
                setValue={setFutureFeature}
                text={'What would you like to see next?'}
                placeholder={"Tell us which feature you'd like"}
                loading={loading}
              />
              <TextAreaComponent
                value={extraMessage}
                setValue={setExtraMessage}
                text={'Anything else?'}
                placeholder={'Let us know anything!'}
                loading={loading}
              />

              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
            <p className="text-pink-500 mt-2 font-semibold text-center">
              the form is anonymous
            </p>
          </>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-2 font-semibold text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
