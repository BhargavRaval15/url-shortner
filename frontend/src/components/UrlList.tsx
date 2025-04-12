import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserUrls } from '../store/slices/urlSlice';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { Url } from '../store/slices/urlSlice';
import { BACKEND_URL } from '../config';

const UrlList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { urls, isFetching: loading, error } = useAppSelector((state) => state.urls);
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  // Only fetch once when component mounts
  useEffect(() => {
    if (!hasInitiallyFetched) {
      setHasInitiallyFetched(true);
      dispatch(getUserUrls());
    }
  }, [dispatch, hasInitiallyFetched]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleRefresh = () => {
    dispatch(getUserUrls());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your URLs</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading && urls.length === 0 && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">Error loading URLs</p>
          <p className="text-gray-400 text-sm mt-2">Please try again later</p>
        </div>
      )}

      {!loading && !error && urls.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No URLs found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first short URL using the form on the left</p>
        </div>
      )}

      {urls.map((url: Url) => (
        <div key={url._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Original URL</p>
                <p className="text-blue-600 break-all hover:text-blue-800 transition-colors duration-200">
                  {url.originalUrl}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Short URL</p>
                <div className="flex items-center gap-2">
                  <p 
                    className="text-green-600 break-all cursor-pointer hover:text-green-800 hover:underline transition-colors duration-200"
                    onClick={() => openUrl(`${BACKEND_URL}/${url.shortCode}`)}
                  >
                    {BACKEND_URL}/{url.shortCode}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`${BACKEND_URL}/${url.shortCode}`)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-gray-500">
                <p className="bg-gray-100 px-2 py-1 rounded">Clicks: {url.clicks}</p>
                <p className="bg-gray-100 px-2 py-1 rounded">Created: {formatDate(url.createdAt)}</p>
                {url.expiresAt && (
                  <p className="bg-gray-100 px-2 py-1 rounded">Expires: {formatDate(url.expiresAt)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UrlList; 