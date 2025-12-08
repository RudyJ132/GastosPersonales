import { api } from './http';
import type { ReporteMensualDto, GastoPorCategoriaDto, ComparacionMensualDto, Category } from '../types/Types';

export const generateMonthlyReport = async (year: number, month: number): Promise<ReporteMensualDto> => {
  return api<ReporteMensualDto>(`/reportes/mensual/${year}/${month}`, { isProtected: true });
};

export const getExpensesByCategory = async (year: number, month: number): Promise<GastoPorCategoriaDto[]> => {
  return api<GastoPorCategoriaDto[]>(`/reportes/gastos-por-categoria/${year}/${month}`, { isProtected: true });
};

export const compareMonthlyExpenses = async (year: number, month: number): Promise<ComparacionMensualDto> => {
  return api<ComparacionMensualDto>(`/reportes/comparacion-mensual/${year}/${month}`, { isProtected: true });
};

export const getTopCategories = async (year: number, month: number, top: number = 3): Promise<Category[]> => {
  return api<Category[]>(`/reportes/top-categorias/${year}/${month}/${top}`, { isProtected: true });
};
