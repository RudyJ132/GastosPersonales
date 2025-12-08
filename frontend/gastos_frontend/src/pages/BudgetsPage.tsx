import React, { useEffect, useState } from 'react';
import { getAllBudgets, createBudget, updateBudget, deleteBudget, getBudgetById } from '../services/budgetService';
import { getAllCategories } from '../services/categoryService';
import type { Budget, Category, CreateBudgetRequest, UpdateBudgetRequest } from '../types/Types';
import { useUIStore } from '../store/uiStore';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import { format } from 'date-fns';

const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const { showMessage, setLoading, isLoading } = useUIStore(); // Import isLoading

  const fetchDependencies = async () => {
    try {
      setLoading(true);
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      if (categoriesData.length > 0) setCategoryId(categoriesData[0].id.toString());
    } catch (error: any) {
      showMessage('error', error.message || 'Error al obtener categorías.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const data = await getAllBudgets();
      const enrichedBudgets = await Promise.all(
        data.map(async (budget) => {
          const categoryName = categories.find((cat) => cat.id.toString() === budget.categoriaId.toString())?.name || 'N/A';
          // Since backend now returns MontoActual and PorcentajeConsumido
          const fullBudget = await getBudgetById(budget.id.toString());
          return {
            ...budget,
            categoryName,
            montoActual: fullBudget.montoActual,
            porcentajeConsumido: fullBudget.porcentajeConsumido
          };
        })
      );
      setBudgets(enrichedBudgets);
    } catch (error: any) {
      showMessage('error', error.message || 'Error al obtener presupuestos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchBudgets();
    }
  }, [categories]); // Re-fetch budgets when categories are loaded

  const handleCreateOrUpdateBudget = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedMonth || !categoryId || amount <= 0) {
      showMessage('error', 'Por favor complete todos los campos correctamente.');
      return;
    }

    const [year, month] = selectedMonth.split('-').map(Number);

    try {
      setLoading(true);
      if (editingBudget) {
        const updateData: UpdateBudgetRequest = {
          montoLimite: amount,
        };
        await updateBudget(editingBudget.id.toString(), updateData);
        showMessage('success', '¡Presupuesto actualizado exitosamente!');
      } else {
        const createData: CreateBudgetRequest = {
          categoriaId: parseInt(categoryId),
          mes: month,
          anio: year,
          montoLimite: amount,
        };
        await createBudget(createData);
        showMessage('success', '¡Presupuesto creado exitosamente!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchBudgets(); // Re-fetch budgets to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Error al guardar el presupuesto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) {
      try {
        setLoading(true);
        await deleteBudget(id);
        showMessage('success', '¡Presupuesto eliminado exitosamente!');
        fetchBudgets(); // Re-fetch budgets
      } catch (error: any) {
        showMessage('error', error.message || 'Error al eliminar el presupuesto.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setSelectedMonth(`${budget.anio}-${String(budget.mes).padStart(2, '0')}`);
    setCategoryId(budget.categoriaId.toString());
    setAmount(budget.montoLimite);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingBudget(null);
    setSelectedMonth(format(new Date(), 'yyyy-MM'));
    if (categories.length > 0) setCategoryId(categories[0].id.toString());
    setAmount(0);
  };

  const categoryOptions = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }));

  const columns: any[] = [
    { key: 'mes', header: 'Mes', render: (budget: Budget) => `${budget.mes}/${budget.anio}` },
    { key: 'categoryName', header: 'Categoría' },
    { key: 'montoLimite', header: 'Monto Límite', render: (budget: Budget) => `$${budget.montoLimite.toFixed(2)}` },
    { key: 'montoActual', header: 'Gastado', render: (budget: Budget) => `$${(budget.montoActual || 0).toFixed(2)}` },
    {
      key: 'porcentajeConsumido',
      header: 'Consumido (%)',
      render: (budget: Budget) => {
        const percentage = budget.porcentajeConsumido || 0;
        let colorClass = 'text-green-600';
        if (percentage >= 100) colorClass = 'text-red-600';
        else if (percentage >= 80) colorClass = 'text-orange-500';
        return <span className={colorClass}>{percentage.toFixed(2)}%</span>;
      },
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (budget: Budget) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditBudget(budget)} disabled={isLoading}>
            Editar
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteBudget(budget.id.toString())} className="ml-2" disabled={isLoading}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Presupuestos</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => { setIsModalOpen(true); resetForm(); }} loading={isLoading}>Nuevo Presupuesto</Button>
      </div>

      <Table data={budgets} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingBudget ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
      >
        <form onSubmit={handleCreateOrUpdateBudget}>
          <Input
            label="Mes"
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
          />
          <Select
            label="Categoría"
            options={categoryOptions}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            placeholder="Selecciona una categoría"
          />
          <Input
            label="Monto Límite"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}> {/* Pass loading prop */}
              {editingBudget ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BudgetsPage;
