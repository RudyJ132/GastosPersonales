import { api } from './http';
import type { PaymentMethod, CreatePaymentMethodRequest, UpdatePaymentMethodRequest } from '../types/Types';

export const getAllPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return api<PaymentMethod[]>('/metodospago', { isProtected: true });
};

export const getPaymentMethodById = async (id: string): Promise<PaymentMethod> => {
  return api<PaymentMethod>(`/metodospago/${id}`, { isProtected: true });
};

export const createPaymentMethod = async (data: CreatePaymentMethodRequest): Promise<PaymentMethod> => {
  return api<PaymentMethod>('/metodospago', {
    method: 'POST',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const updatePaymentMethod = async (id: string, data: UpdatePaymentMethodRequest): Promise<PaymentMethod> => {
  return api<PaymentMethod>(`/metodospago/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    isProtected: true,
  });
};

export const deletePaymentMethod = async (id: string): Promise<void> => {
  return api<void>(`/metodospago/${id}`, {
    method: 'DELETE',
    isProtected: true,
  });
};
