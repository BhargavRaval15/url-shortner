import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import urlReducer, { UrlState } from './slices/urlSlice';
import authReducer, { AuthState } from './slices/authSlice';

export interface RootState {
  auth: AuthState;
  urls: UrlState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 