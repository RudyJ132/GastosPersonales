import apiClient from './apiClient';
import type { UserProfile } from '../types/Types';

export const getUserProfile = async (): Promise<UserProfile> => {
  return apiClient<UserProfile>('/user/profile', { isProtected: true });
};

export const updateUserName = async (name: string): Promise<UserProfile> => {
  return apiClient<UserProfile>('/user/profile/name', {
    method: 'PUT',
    body: JSON.stringify({ name }),
    isProtected: true,
  });
};

export const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  return apiClient<void>('/user/profile/password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
    isProtected: true,
  });
};
