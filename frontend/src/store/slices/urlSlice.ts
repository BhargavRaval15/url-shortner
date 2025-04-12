import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-hot-toast';
import { logout } from './authSlice';

export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
}

export interface UrlState {
  urls: Url[];
  isCreating: boolean;
  isFetching: boolean;
  error: string | null;
}

const initialState: UrlState = {
  urls: [],
  isCreating: false,
  isFetching: false,
  error: null,
};

interface CreateUrlPayload {
  originalUrl: string;
  customAlias?: string;
  expiresAt?: string;
}

export const createShortUrl = createAsyncThunk<Url, CreateUrlPayload>(
  'urls/create',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post<Url>('/urls', data);
      toast.success('URL shortened successfully!');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(logout());
        return rejectWithValue('Please login to create short URLs');
      }
      const errorMessage = error.response?.data?.message || 'Failed to create short URL';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserUrls = createAsyncThunk<Url[]>(
  'urls/getAll',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get<Url[]>('/urls/user');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(logout());
        return rejectWithValue('Please login to view your URLs');
      }
      const errorMessage = error.response?.data?.message || 'Failed to fetch URLs';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUrlAnalytics = createAsyncThunk<Url, string>(
  'urls/getAnalytics',
  async (urlId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Url>(`/urls/analytics/${urlId}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch analytics';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUrls: (state) => {
      state.urls = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create URL
      .addCase(createShortUrl.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createShortUrl.fulfilled, (state, action: PayloadAction<Url>) => {
        state.isCreating = false;
        state.urls.unshift(action.payload);
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      // Get User URLs
      .addCase(getUserUrls.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getUserUrls.fulfilled, (state, action: PayloadAction<Url[]>) => {
        state.isFetching = false;
        state.urls = action.payload;
      })
      .addCase(getUserUrls.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { clearError, clearUrls } = urlSlice.actions;
export default urlSlice.reducer; 