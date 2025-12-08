import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';
import { uploadAndImportExcel } from '../services/importService';
import type { ImportResult } from '../types/Types';
import { useUIStore } from '../store/uiStore';

const ImportPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const { showMessage, setLoading, isLoading } = useUIStore(); // Import isLoading

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setImportResult(null); // Clear previous results
  };

  const handleImport = async () => {
    if (!selectedFile) {
      showMessage('error', 'Por favor selecciona un archivo para importar.');
      return;
    }

    try {
      setLoading(true);
      const result = await uploadAndImportExcel(selectedFile);
      setImportResult(result);
      if (result.status === 'success') {
        showMessage('success', result.message);
      } else {
        showMessage('error', result.message);
      }
    } catch (error: any) {
      showMessage('error', error.message || 'Error al importar datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Importar Datos desde Excel</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <FileUploader
          onFileSelect={handleFileSelect}
          acceptedFileTypes=".xlsx, .xls"
          label="Sube un archivo Excel con tus gastos"
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleImport} disabled={!selectedFile} loading={isLoading}> {/* Pass loading prop */}
            Importar Excel
          </Button>
        </div>
      </div>

      {importResult && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Resultados de Importación</h2>
          <p className={`font-semibold ${importResult.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {importResult.message}
          </p>
          {importResult.importedCount !== undefined && (
            <p className="mt-2">Registros importados exitosamente: {importResult.importedCount}.</p>
          )}
          {importResult.errors && importResult.errors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium text-red-700 mb-2">Errores durante la importación:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {importResult.errors.map((err, index) => (
                  <li key={index}>
                    Fila {err.row}: {err.message} - Datos: {JSON.stringify(err.data)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportPage;
