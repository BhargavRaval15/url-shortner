import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { createShortUrl } from '../store/slices/urlSlice';
import { RootState } from '../store';
import { BACKEND_URL } from '../config';

const CreateUrl: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCreating } = useSelector((state: RootState) => state.urls);
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) return;

    try {
      // Convert the date string to ISO format with time
      const formattedExpiresAt = expiresAt ? new Date(expiresAt).toISOString() : undefined;

      await dispatch(createShortUrl({
        originalUrl,
        customAlias: customAlias || undefined,
        expiresAt: formattedExpiresAt,
      })).unwrap();

      // Only clear form if successful
      setOriginalUrl('');
      setCustomAlias('');
      setExpiresAt('');
    } catch (error) {
      // Error handling is done in the slice
      console.error('Failed to create URL:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Short URL</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original URL
          </label>
          <input
            type="url"
            name="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            disabled={isCreating}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Alias (optional)
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              {BACKEND_URL}/
            </span>
            <input
              type="text"
              name="customAlias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              disabled={isCreating}
              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="custom-alias"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Date (optional)
          </label>
          <input
            type="datetime-local"
            name="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            disabled={isCreating}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create Short URL'}
        </button>
      </form>
    </div>
  );
};

export default CreateUrl; 