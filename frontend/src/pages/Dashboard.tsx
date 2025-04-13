import { useEffect, useState } from 'react';
import { fetchUserUrls, Url } from '../utils/urlApi';
import CreateUrl from '../components/CreateUrl';
import UrlList from '../components/UrlList';

const Dashboard = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5
  });

  const loadUrls = async (page: number = 1, search: string = '', limit: number = 5) => {
    setLoading(true);
    try {
      const response = await fetchUserUrls(page, search, limit);
      setUrls(response.urls);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.total,
        itemsPerPage: limit
      });
      setError(null);
    } catch (err) {
      setError('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls(1, '', 5);
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Short URL</h2>
        <CreateUrl onUrlCreated={() => loadUrls(pagination.currentPage)} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your URLs</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <UrlList 
            urls={urls} 
            pagination={pagination}
            loading={loading}
            error={error}
            onPageChange={(page) => loadUrls(page, '', pagination.itemsPerPage)}
            onSearchChange={(search) => loadUrls(1, search, pagination.itemsPerPage)}
            onRefresh={() => loadUrls(pagination.currentPage, '', pagination.itemsPerPage)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 