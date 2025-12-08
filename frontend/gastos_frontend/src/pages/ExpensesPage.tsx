import React, { useEffect, useState } from 'react';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../services/expenseService';
import { getAllCategories, createCategory } from '../services/categoryService';
import { getAllPaymentMethods, createPaymentMethod } from '../services/paymentMethodService';
import type { Expense, Category, PaymentMethod, CreateExpenseRequest, UpdateExpenseRequest } from '../types/Types';
import { useUIStore } from '../store/uiStore';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import { format } from 'date-fns';

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [categoryId, setCategoryId] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');

  // Quick Add States
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newPaymentMethodName, setNewPaymentMethodName] = useState('');

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [filterMinAmount, setFilterMinAmount] = useState<string>('');
  const [filterMaxAmount, setFilterMaxAmount] = useState<string>('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>('');

  const { showMessage, setLoading, isLoading } = useUIStore();

  const fetchDependencies = async () => {
    try {
      setLoading(true);
      const [categoriesData, paymentMethodsData] = await Promise.all([
        getAllCategories(),
        getAllPaymentMethods(),
      ]);
      setCategories(categoriesData);
      setPaymentMethods(paymentMethodsData);
      // Set default selected values if available
      if (categoriesData.length > 0) setCategoryId(categoriesData[0].id.toString());
      if (paymentMethodsData.length > 0) setPaymentMethodId(paymentMethodsData[0].id.toString());
    } catch (error: any) {
      showMessage('error', error.message || 'Error al obtener categorías o métodos de pago.');
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getAllExpenses();
      // Enrich expenses with category and payment method names for display
      const enrichedData = data.map((exp) => ({
        ...exp,
        categoryName: categories.find((cat) => cat.id.toString() === exp.categoryId.toString())?.name || 'N/A',
        paymentMethodName: paymentMethods.find((pm) => pm.id.toString() === exp.paymentMethodId.toString())?.name || 'N/A',
      }));
      setExpenses(enrichedData);
      setFilteredExpenses(enrichedData);
    } catch (error: any) {
      showMessage('error', error.message || 'Error al obtener gastos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && paymentMethods.length > 0) {
      fetchExpenses();
    }
  }, [categories, paymentMethods, isLoading]);

  // Filtering Logic
  useEffect(() => {
    let result = expenses;

    if (filterMinAmount) {
      result = result.filter(e => e.amount >= parseFloat(filterMinAmount));
    }
    if (filterMaxAmount) {
      result = result.filter(e => e.amount <= parseFloat(filterMaxAmount));
    }
    if (filterPaymentMethod) {
      result = result.filter(e => e.paymentMethodId.toString() === filterPaymentMethod);
    }

    setFilteredExpenses(result);
  }, [expenses, filterMinAmount, filterMaxAmount, filterPaymentMethod]);

  const handleQuickAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setLoading(true);
      const newCat = await createCategory({ nombre: newCategoryName, presupuestoLimite: 0, descripcion: 'Creada desde Gastos' });
      setCategories([...categories, newCat]);
      setCategoryId(newCat.id.toString());
      setIsCategoryModalOpen(false);
      setNewCategoryName('');
      showMessage('success', 'Categoría creada!');
    } catch (error: any) {
      showMessage('error', error.message || 'Error al crear categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAddPaymentMethod = async () => {
    if (!newPaymentMethodName.trim()) return;
    try {
      setLoading(true);
      const newPm = await createPaymentMethod({ nombre: newPaymentMethodName, icono: '💰' });
      setPaymentMethods([...paymentMethods, newPm]);
      setPaymentMethodId(newPm.id.toString());
      setIsPaymentModalOpen(false);
      setNewPaymentMethodName('');
      showMessage('success', 'Método de pago creado!');
    } catch (error: any) {
      showMessage('error', error.message || 'Error al crear método de pago');
    } finally {
      setLoading(false);
    }
  };


  const handleCreateOrUpdateExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!description.trim() || amount <= 0 || !categoryId || !paymentMethodId) {
      showMessage('error', 'Por favor complete todos los campos correctamente.');
      return;
    }

    const expenseData = {
      monto: amount,
      fecha: date,
      descripcion: description,
      categoriaId: parseInt(categoryId),
      metodoPagoId: parseInt(paymentMethodId),
    };

    try {
      setLoading(true);
      if (editingExpense) {
        await updateExpense(editingExpense.id.toString(), expenseData as UpdateExpenseRequest);
        showMessage('success', '¡Gasto actualizado exitosamente!');
      } else {
        await createExpense(expenseData as CreateExpenseRequest);
        showMessage('success', '¡Gasto creado exitosamente!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchExpenses(); // Re-fetch expenses to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Error al guardar el gasto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      try {
        setLoading(true);
        await deleteExpense(id);
        showMessage('success', '¡Gasto eliminado exitosamente!');
        fetchExpenses(); // Re-fetch expenses
      } catch (error: any) {
        showMessage('error', error.message || 'Error al eliminar el gasto.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setDate(format(new Date(expense.date), 'yyyy-MM-dd'));
    setCategoryId(expense.categoryId.toString());
    setPaymentMethodId(expense.paymentMethodId.toString());
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingExpense(null);
    setDescription('');
    setAmount(0);
    setDate(format(new Date(), 'yyyy-MM-dd'));
    if (categories.length > 0) setCategoryId(categories[0].id.toString());
    if (paymentMethods.length > 0) setPaymentMethodId(paymentMethods[0].id.toString());
  };

  const categoryOptions = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }));
  const paymentMethodOptions = paymentMethods.map((pm) => ({ value: pm.id.toString(), label: pm.name }));
  const filterPaymentOptions = [{ value: '', label: 'Todos' }, ...paymentMethodOptions];

  const columns: any[] = [
    { key: 'date', header: 'Fecha', render: (expense: Expense) => format(new Date(expense.date), 'dd/MM/yyyy') },
    { key: 'description', header: 'Descripción' },
    { key: 'amount', header: 'Monto', render: (expense: Expense) => `$${expense.amount.toFixed(2)}` },
    { key: 'categoryName', header: 'Categoría' },
    { key: 'paymentMethodName', header: 'Método de Pago' },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (expense: Expense) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditExpense(expense)} disabled={isLoading}>
            Editar
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteExpense(expense.id.toString())} className="ml-2" disabled={isLoading}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gastos</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Ocultar Filtros' : 'Filtrar'}
          </Button>
          <Button onClick={() => { setIsModalOpen(true); resetForm(); }} loading={isLoading}>
            Nuevo Gasto
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Monto Mínimo"
            type="number"
            value={filterMinAmount}
            onChange={(e) => setFilterMinAmount(e.target.value)}
            placeholder="0.00"
          />
          <Input
            label="Monto Máximo"
            type="number"
            value={filterMaxAmount}
            onChange={(e) => setFilterMaxAmount(e.target.value)}
            placeholder="10000.00"
          />
          <Select
            label="Método de Pago"
            options={filterPaymentOptions}
            value={filterPaymentMethod}
            onChange={(e) => setFilterPaymentMethod(e.target.value)}
            placeholder="Todos"
          />
        </div>
      )}

      <Table data={filteredExpenses} columns={columns} />

      {/* Main Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingExpense ? 'Editar Gasto' : 'Nuevo Gasto'}
      >
        <form onSubmit={handleCreateOrUpdateExpense}>
          <Input
            label="Descripción"
            type="text"
            placeholder="Ej: Supermercado, Cena"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            label="Monto"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
          />
          <Input
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Category Select with Quick Add Button */}
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-grow">
              <Select
                label="Categoría"
                options={categoryOptions}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                placeholder="Selecciona una categoría"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCategoryModalOpen(true)}
              className="mb-[2px]" // Align with input
            >
              +
            </Button>
          </div>

          {/* Payment Method Select with Quick Add Button */}
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-grow">
              <Select
                label="Método de Pago"
                options={paymentMethodOptions}
                value={paymentMethodId}
                onChange={(e) => setPaymentMethodId(e.target.value)}
                required
                placeholder="Selecciona un método de pago"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPaymentModalOpen(true)}
              className="mb-[2px]"
            >
              +
            </Button>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}>
              {editingExpense ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Quick Add Category Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Nueva Categoría"
      >
        <div className="space-y-4">
          <Input
            label="Nombre"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Ej: Comida, Transporte"
          />
          <div className="flex justify-end">
            <Button onClick={handleQuickAddCategory} loading={isLoading}>Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Quick Add Payment Method Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Nuevo Método de Pago"
      >
        <div className="space-y-4">
          <Input
            label="Nombre"
            value={newPaymentMethodName}
            onChange={(e) => setNewPaymentMethodName(e.target.value)}
            placeholder="Ej: Tarjeta, Efectivo"
          />
          <div className="flex justify-end">
            <Button onClick={handleQuickAddPaymentMethod} loading={isLoading}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExpensesPage;
