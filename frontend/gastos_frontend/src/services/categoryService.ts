import { api } from './http';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types/Types';

export const getAllCategories = async (): Promise<Category[]> => {
  return api<Category[]>('/categorias', { isProtected: true });
};

export const getCategoryById = async (id: string): Promise<Category> => {
  return api<Category>(`/categorias/${id}`, { isProtected: true });
};

export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
  return api<Category>('/categorias', {
    method: 'POST',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const updateCategory = async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
  return api<Category>(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  return api<void>(`/categorias/${id}`, {
    method: 'DELETE',
    isProtected: true,
  });
};

// Assuming the backend has these endpoints
export const getActiveCategories = async (): Promise<Category[]> => {
  return api<Category[]>('/categorias/activas', { isProtected: true });
};

export const getInactiveCategories = async (): Promise<Category[]> => {
  return api<Category[]>('/categorias/inactivas', { isProtected: true });
};

// Note: Backend has ExisteNombreAsync, but typically frontend handles validation before calling the API
// If a direct API call is needed for unique name validation, an endpoint /categorias/exists?name=... would be needed.
// For now, we'll rely on the backend to return a BusinessException on creation/update if name exists.

