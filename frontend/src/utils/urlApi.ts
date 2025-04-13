import axiosInstance from './axios';
import { toast } from 'react-hot-toast';

export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
}

export interface UrlsResponse {
  urls: Url[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateUrlPayload {
  originalUrl: string;
  customAlias?: string;
  expiresAt?: string;
}

// Fetch user URLs
export const fetchUserUrls = async (
  page: number = 1,
  search: string = '',
  limit: number = 5
): Promise<UrlsResponse> => {
  try {
    const response = await axiosInstance.get<UrlsResponse>(
      `/urls/user?page=${page}&limit=${limit}&search=${search}`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch URLs';
    toast.error(errorMessage);
    throw error;
  }
};

// Create short URL
export const createUrl = async (data: CreateUrlPayload): Promise<Url> => {
  try {
    const response = await axiosInstance.post<Url>('/urls', data);
    toast.success('URL shortened successfully!');
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to create short URL';
    toast.error(errorMessage);
    throw error;
  }
};

// Get analytics for a URL
export const getUrlAnalytics = async (urlId: string): Promise<Url> => {
  try {
    const response = await axiosInstance.get<Url>(`/urls/analytics/${urlId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch analytics';
    toast.error(errorMessage);
    throw error;
  }
}; 