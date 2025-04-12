import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserUrls } from '../store/slices/urlSlice';
import CreateUrl from '../components/CreateUrl';
import UrlList from '../components/UrlList';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.urls);

  useEffect(() => {
    dispatch(getUserUrls());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Short URL</h2>
        <CreateUrl />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your URLs</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <UrlList />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 