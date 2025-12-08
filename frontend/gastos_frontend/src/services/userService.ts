import { api } from './http';
import type { UserProfile } from '../types/Types';

export const getUserProfile = async (): Promise<UserProfile> => {
  return api<UserProfile>('/usuarios/perfil', { isProtected: true });
};

export const updateUserName = async (name: string): Promise<UserProfile> => {
  return api<UserProfile>('/usuarios/perfil/nombre', {
    method: 'PUT',
    body: JSON.stringify({ name }),
    isProtected: true,
  });
};

export const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  return api<void>('/usuarios/perfil/password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
    isProtected: true,
  });
};
