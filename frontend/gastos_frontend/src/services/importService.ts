import { api } from './http';
import type { ImportResult } from '../types/Types';

export const uploadAndImportExcel = async (file: File): Promise<ImportResult> => {
  const formData = new FormData();
  formData.append('file', file);

  return api<ImportResult>('/import/excel', {
    method: 'POST',
    body: formData,
    isProtected: true,
    // Do not set Content-Type header manually for FormData
    headers: {},
  });
};
