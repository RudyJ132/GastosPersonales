import apiClient from './apiClient';
import type { Budget, CreateBudgetRequest, UpdateBudgetRequest, BudgetAlert } from '../types/Types';

export const getAllBudgets = async (): Promise<Budget[]> => {
  return apiClient<Budget[]>('/presupuestos', { isProtected: true });
};

export const getBudgetById = async (id: string): Promise<Budget> => {
  return apiClient<Budget>(`/presupuestos/${id}`, { isProtected: true });
};

export const createBudget = async (data: CreateBudgetRequest): Promise<Budget> => {
  return apiClient<Budget>('/presupuestos', {
    method: 'POST',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const updateBudget = async (id: string, data: UpdateBudgetRequest): Promise<Budget> => {
  return apiClient<Budget>(`/presupuestos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const deleteBudget = async (id: string): Promise<void> => {
  return apiClient<void>(`/presupuestos/${id}`, {
    method: 'DELETE',
    isProtected: true,
  });
};

export const getBudgetAlerts = async (year: number, month: number): Promise<BudgetAlert[]> => {
  return apiClient<Budget[]>(`/presupuestos/alertas/${year}/${month}`, { isProtected: true });
};

export const getConsumedPercentage = async (id: string): Promise<number> => {
  return apiClient<number>(`/presupuestos/porcentaje-consumido/${id}`, { isProtected: true });
};
