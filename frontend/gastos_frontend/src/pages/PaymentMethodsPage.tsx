import React, { useEffect, useState } from 'react';
import { getAllPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '../services/paymentMethodService';
import type { PaymentMethod, CreatePaymentMethodRequest, UpdatePaymentMethodRequest } from '../types/Types';
import { useUIStore } from '../store/uiStore';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Switch } from '@headlessui/react';

const PaymentMethodsPage: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [methodName, setMethodName] = useState('');
  const [methodIcon, setMethodIcon] = useState('');
  const [methodIsActive, setMethodIsActive] = useState(true);
  const { showMessage, setLoading, isLoading } = useUIStore();

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const data = await getAllPaymentMethods();
      setPaymentMethods(data);
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to fetch payment methods.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleCreateOrUpdatePaymentMethod = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!methodName.trim()) {
      showMessage('error', 'Payment method name cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      if (editingPaymentMethod) {
        const updateData: UpdatePaymentMethodRequest = {
          nombre: methodName,
          icono: methodIcon,
        };
        await updatePaymentMethod(editingPaymentMethod.id, updateData);
        showMessage('success', 'Payment method updated successfully!');
      } else {
        const createData: CreatePaymentMethodRequest = {
          nombre: methodName,
          icono: methodIcon,
        };
        await createPaymentMethod(createData);
        showMessage('success', 'Payment method created successfully!');
      }
      setIsModalOpen(false);
      setMethodName('');
      setMethodIcon('');
      setEditingPaymentMethod(null);
      setMethodIsActive(true);
      fetchPaymentMethods(); // Re-fetch payment methods to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to save payment method.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        setLoading(true);
        await deletePaymentMethod(id);
        showMessage('success', 'Payment method deleted successfully!');
        fetchPaymentMethods(); // Re-fetch payment methods
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to delete payment method.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    setEditingPaymentMethod(method);
    setMethodName(method.name);
    setMethodIcon(method.icon || '');
    setMethodIsActive(method.isActive);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'name', header: 'Method Name' },
    { key: 'icon', header: 'Icon', render: (method: PaymentMethod) => method.icon || '-' },
    { key: 'isActive', header: 'Active', render: (method: PaymentMethod) => (method.isActive ? 'Yes' : 'No') },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (method: PaymentMethod) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditPaymentMethod(method)} disabled={isLoading}>
            Edit
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeletePaymentMethod(method.id)} className="ml-2" disabled={isLoading}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Methods</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => {
          setEditingPaymentMethod(null);
          setMethodName('');
          setMethodIcon('');
          setMethodIsActive(true);
          setIsModalOpen(true);
        }} loading={isLoading}>Add New Method</Button>
      </div>

      <Table data={paymentMethods} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPaymentMethod(null);
          setMethodName('');
          setMethodIcon('');
          setMethodIsActive(true);
        }}
        title={editingPaymentMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
      >
        <form onSubmit={handleCreateOrUpdatePaymentMethod}>
          <Input
            label="Method Name"
            type="text"
            placeholder="e.g., Cash, Credit Card"
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
            required
          />
          <Input
            label="Icon (Optional)"
            type="text"
            placeholder="e.g., 💳"
            value={methodIcon}
            onChange={(e) => setMethodIcon(e.target.value)}
          />
          {editingPaymentMethod && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-700">Active</span>
              <Switch
                checked={methodIsActive}
                onChange={setMethodIsActive}
                className={`${
                  methodIsActive ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    methodIsActive ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}>
              {editingPaymentMethod ? 'Update Method' : 'Create Method'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentMethodsPage;
