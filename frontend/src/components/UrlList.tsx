import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserUrls, setSearchQuery, setPage, getUrlAnalytics } from '../store/slices/urlSlice';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { Url } from '../store/slices/urlSlice';
import { BACKEND_URL } from '../config';
import { QRCodeSVG } from 'qrcode.react';
import UrlAnalytics from './UrlAnalytics';

const UrlList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    urls, 
    isFetching: loading, 
    error,
    pagination,
    searchQuery
  } = useAppSelector((state) => state.urls);
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [expandedUrlId, setExpandedUrlId] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (!hasInitiallyFetched) {
      setHasInitiallyFetched(true);
      dispatch(getUserUrls({ page: 1, limit: 5 }));
    }
  }, [dispatch, hasInitiallyFetched]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput !== searchQuery) {
        dispatch(setSearchQuery(searchInput));
        dispatch(getUserUrls({ page: 1, search: searchInput, limit: 5 }));
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, dispatch]);

  useEffect(() => {
    dispatch(getUserUrls({ page: pagination.currentPage, search: searchQuery, limit: 5 }));
  }, [pagination.currentPage, searchQuery, dispatch]);

  const handleAnalyticsClick = async (urlId: string) => {
    if (expandedUrlId === urlId) {
      setExpandedUrlId(null);
      return;
    }

    try {
      const response = await dispatch(getUrlAnalytics(urlId)).unwrap();
      setAnalyticsData(prev => ({
        ...prev,
        [urlId]: response
      }));
      setExpandedUrlId(urlId);
    } catch (error) {
      toast.error('Failed to load analytics');
    }
  };

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

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch(getUserUrls({ page: pagination.currentPage, search: searchQuery, limit: 5 }))}
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

      <div className="space-y-4">
        {urls.map((url) => (
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

                <button
                  onClick={() => handleAnalyticsClick(url._id)}
                  className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedUrlId === url._id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {expandedUrlId === url._id ? 'Hide Analytics' : 'Show Analytics'}
                </button>
              </div>
              <div className="ml-4">
                <QRCodeSVG 
                  value={`${BACKEND_URL}/${url.shortCode}`}
                  size={100}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            {expandedUrlId === url._id && analyticsData[url._id] && (
              <div className="mt-6 pt-6 border-t">
                <UrlAnalytics analytics={analyticsData[url._id]} />
              </div>
            )}
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(page => {
                return page === 1 || 
                       page === pagination.totalPages || 
                       (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1);
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="px-2">...</span>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${
                          page === pagination.currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      page === pagination.currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UrlList; 