import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading, error } = useAuthStore();
  const { showMessage } = useUIStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }

    try {
      await register({ nombre: name, email, password });
      showMessage('success', 'Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      // Error is already handled in the store, but you can add component-specific logic here if needed
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        {error && <p className="text-red-500 text-center">Failed to edit, 0 occurrences found for old_string (import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import apiClient from '../services/apiClient';
import { useUIStore } from '../store/uiStore';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showMessage, isLoading } = useUIStore(); // Import isLoading
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }

    try {
      await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      showMessage('success', 'Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      showMessage('error', error.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.targe
      </div>
    </div>
  );
};

export default RegisterPage;). Original old_string was (import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import apiClient from '../services/apiClient';
import { useUIStore } from '../store/uiStore';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showMessage, isLoading } = useUIStore(); // Import isLoading
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }

    try {
      await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      showMessage('success', 'Registration successful! Please login.');
      navigate('/login');
    }
    catch (error: any) {
      showMessage('error', error.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.targe
      </div>
    </div>
  );
};

export default RegisterPage;) in C:\Users\Administrator\Desktop\Projects\.NET\gastos\GastosPersonales\frontend\gastos_frontend\src\pages\RegisterPage.tsx. No edits made. The exact text in old_string was not found. Ensure you're not escaping content incorrectly and check whitespace, indentation, and context.</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex items-baseline justify-between">
            <Button type="submit" variant="primary" loading={isLoading}> {/* Pass loading prop */}
              Register
            </Button>
            <a href="/login" className="text-sm text-indigo-600 hover:underline">
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;