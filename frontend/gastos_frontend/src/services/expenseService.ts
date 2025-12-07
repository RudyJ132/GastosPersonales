import apiClient from './apiClient';
import type { Expense, CreateExpenseRequest, UpdateExpenseRequest, FilterExpensesRequest } from '../types/Types';

export const getAllExpenses = async (): Promise<Expense[]> => {
  return apiClient<Expense[]>('/gastos', { isProtected: true });
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  return apiClient<Expense>(`/gastos/${id}`, { isProtected: true });
};

export const createExpense = async (data: CreateExpenseRequest): Promise<Expense> => {
  return apiClient<Expense>('/gastos', {
    method: 'POST',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const updateExpense = async (id: string, data: UpdateExpenseRequest): Promise<Expense> => {
  return apiClient<Expense>(`/gastos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const deleteExpense = async (id: string): Promise<void> => {
  return apiClient<void>(`/gastos/${id}`, {
    method: 'DELETE',
    isProtected: true,
  });
};

export const filterExpenses = async (filters: FilterExpensesRequest): Promise<Expense[]> => {
  return apiClient<Expense[]>('/gastos/filtrar', {
    method: 'POST',
    body: JSON.stringify(filters),
    isProtected: true,
  });
};
