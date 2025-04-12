import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import urlReducer from './slices/urlSlice';
import authReducer from './slices/authSlice';
import { UrlState } from './slices/urlSlice';
import { AuthState } from './slices/authSlice';

export interface RootState {
  urls: UrlState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    urls: urlReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 