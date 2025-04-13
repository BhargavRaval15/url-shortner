import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserUrls } from '../store/slices/urlSlice';
import CreateUrl from '../components/CreateUrl';
import UrlList from '../components/UrlList';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.urls);

  useEffect(() => {
    dispatch(getUserUrls({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Short URL</h2>
        <CreateUrl />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your URLs</h2>
        {isFetching ? (
          <div className="text-center">Loading...</div>
        ) : (
          <UrlList />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 