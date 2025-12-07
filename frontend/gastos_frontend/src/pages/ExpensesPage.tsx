import React, { useEffect, useState } from 'react';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../services/expenseService';
import { getAllCategories } from '../services/categoryService';
import { getAllPaymentMethods } from '../services/paymentMethodService';
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [categoryId, setCategoryId] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
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
      showMessage('error', error.message || 'Failed to fetch categories or payment methods.');
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
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to fetch expenses.');
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

  const handleCreateOrUpdateExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!description.trim() || amount <= 0 || !categoryId || !paymentMethodId) {
      showMessage('error', 'Please fill all required fields correctly.');
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
        showMessage('success', 'Expense updated successfully!');
      } else {
        await createExpense(expenseData as CreateExpenseRequest);
        showMessage('success', 'Expense created successfully!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchExpenses(); // Re-fetch expenses to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to save expense.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        setLoading(true);
        await deleteExpense(id);
        showMessage('success', 'Expense deleted successfully!');
        fetchExpenses(); // Re-fetch expenses
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to delete expense.');
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

  const columns = [
    { key: 'date', header: 'Date', render: (expense: Expense) => format(new Date(expense.date), 'yyyy-MM-dd') },
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount', render: (expense: Expense) => `$${expense.amount.toFixed(2)}` },
    { key: 'categoryName', header: 'Category' },
    { key: 'paymentMethodName', header: 'Payment Method' },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (expense: Expense) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditExpense(expense)} disabled={isLoading}>
            Edit
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteExpense(expense.id.toString())} className="ml-2" disabled={isLoading}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Expenses</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => { setIsModalOpen(true); resetForm(); }} loading={isLoading}>Add New Expense</Button>
      </div>

      <Table data={expenses} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <form onSubmit={handleCreateOrUpdateExpense}>
          <Input
            label="Description"
            type="text"
            placeholder="e.g., Groceries, Dinner"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
          />
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <Select
            label="Payment Method"
            options={paymentMethodOptions}
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
            required
            placeholder="Select a payment method"
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}>
              {editingExpense ? 'Update Expense' : 'Create Expense'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpensesPage;
