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
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
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
      showMessage('error', error.message || 'Failed to fetch categories.');
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
      showMessage('error', error.message || 'Failed to fetch budgets.');
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
      showMessage('error', 'Please fill all required fields correctly.');
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
        showMessage('success', 'Budget updated successfully!');
      } else {
        const createData: CreateBudgetRequest = {
          categoriaId: parseInt(categoryId),
          mes: month,
          anio: year,
          montoLimite: amount,
        };
        await createBudget(createData);
        showMessage('success', 'Budget created successfully!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchBudgets(); // Re-fetch budgets to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to save budget.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        setLoading(true);
        await deleteBudget(id);
        showMessage('success', 'Budget deleted successfully!');
        fetchBudgets(); // Re-fetch budgets
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to delete budget.');
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

  const columns = [
    { key: 'mes', header: 'Month', render: (budget: Budget) => `${budget.mes}/${budget.anio}` },
    { key: 'categoryName', header: 'Category' },
    { key: 'montoLimite', header: 'Budget Amount', render: (budget: Budget) => `$${budget.montoLimite.toFixed(2)}` },
    { key: 'montoActual', header: 'Spent', render: (budget: Budget) => `$${(budget.montoActual || 0).toFixed(2)}` },
    {
      key: 'porcentajeConsumido',
      header: 'Spent (%)',
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
      header: 'Actions',
      align: 'right',
      render: (budget: Budget) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditBudget(budget)} disabled={isLoading}>
            Edit
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteBudget(budget.id.toString())} className="ml-2" disabled={isLoading}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Budgets</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => { setIsModalOpen(true); resetForm(); }} loading={isLoading}>Add New Budget</Button>
      </div>

      <Table data={budgets} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingBudget ? 'Edit Budget' : 'Add New Budget'}
      >
        <form onSubmit={handleCreateOrUpdateBudget}>
          <Input
            label="Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            placeholder="Select a category"
          />
          <Input
            label="Budget Amount"
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
              {editingBudget ? 'Update Budget' : 'Create Budget'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BudgetsPage;
