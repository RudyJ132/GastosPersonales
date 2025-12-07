import React, { useEffect, useState } from 'react';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types/Types';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { useUIStore } from '../store/uiStore';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { Switch } from '@headlessui/react'; // Assuming headlessui switch for active toggle

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryIsActive, setCategoryIsActive] = useState(true);
  const { showMessage, setLoading, isLoading } = useUIStore();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdateCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!categoryName.trim()) {
      showMessage('error', 'Category name cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      if (editingCategory) {
        const updateData: UpdateCategoryRequest = {
          nombre: categoryName,
          descripcion: categoryDescription,
          // isActive is handled by a separate endpoint or will be included in update later
        };
        await updateCategory(editingCategory.id, updateData);
        showMessage('success', 'Category updated successfully!');
      } else {
        const createData: CreateCategoryRequest = {
          nombre: categoryName,
          descripcion: categoryDescription,
        };
        await createCategory(createData);
        showMessage('success', 'Category created successfully!');
      }
      setIsModalOpen(false);
      setCategoryName('');
      setCategoryDescription('');
      setEditingCategory(null);
      setCategoryIsActive(true);
      fetchCategories(); // Re-fetch categories to update the list
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setLoading(true);
        await deleteCategory(id);
        showMessage('success', 'Category deleted successfully!');
        fetchCategories(); // Re-fetch categories
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to delete category.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    setCategoryIsActive(category.isActive);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'name', header: 'Category Name' },
    { key: 'description', header: 'Description' },
    { key: 'isActive', header: 'Active', render: (category: Category) => (category.isActive ? 'Yes' : 'No') },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (category: Category) => (
        <>
          <Button size="small" variant="info" onClick={() => handleEditCategory(category)} disabled={isLoading}>
            Edit
          </Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteCategory(category.id)} className="ml-2" disabled={isLoading}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => {
          setEditingCategory(null);
          setCategoryName('');
          setCategoryDescription('');
          setCategoryIsActive(true);
          setIsModalOpen(true);
        }} loading={isLoading}>Add New Category</Button>
      </div>

      <Table data={categories} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
          setCategoryName('');
          setCategoryDescription('');
          setCategoryIsActive(true);
        }}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleCreateOrUpdateCategory}>
          <Input
            label="Category Name"
            type="text"
            placeholder="e.g., Food, Transport"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <Input
            label="Description"
            type="text"
            placeholder="e.g., Monthly food expenses"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          {editingCategory && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-700">Active</span>
              <Switch
                checked={categoryIsActive}
                onChange={setCategoryIsActive}
                className={`${
                  categoryIsActive ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    categoryIsActive ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}>
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
