import apiClient from './apiClient';
import type { ReporteMensualDto, GastoPorCategoriaDto, ComparacionMensualDto, CategoryDto } from '../types/Types';

export const generateMonthlyReport = async (year: number, month: number): Promise<ReporteMensualDto> => {
  return apiClient<ReporteMensualDto>(`/reportes/mensual/${year}/${month}`, { isProtected: true });
};

export const getExpensesByCategory = async (year: number, month: number): Promise<GastoPorCategoriaDto[]> => {
  return apiClient<GastoPorCategoriaDto[]>(`/reportes/gastos-por-categoria/${year}/${month}`, { isProtected: true });
};

export const compareMonthlyExpenses = async (year: number, month: number): Promise<ComparacionMensualDto> => {
  return apiClient<ComparacionMensualDto>(`/reportes/comparacion-mensual/${year}/${month}`, { isProtected: true });
};

export const getTopCategories = async (year: number, month: number, top: number = 3): Promise<CategoryDto[]> => {
  return apiClient<CategoryDto[]>(`/reportes/top-categorias/${year}/${month}/${top}`, { isProtected: true });
};
