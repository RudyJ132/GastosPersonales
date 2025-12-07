import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import ExpensesPage from './pages/ExpensesPage';
import ImportPage from './pages/ImportPage';
import BudgetsPage from './pages/BudgetsPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<div>Home Page (Placeholder)</div>} />

      {/* Protected routes wrapped with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categorias"
        element={
          <ProtectedRoute>
            <Layout>
              <CategoriesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/metodos"
        element={
          <ProtectedRoute>
            <Layout>
              <PaymentMethodsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/gastos"
        element={
          <ProtectedRoute>
            <Layout>
              <ExpensesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/importar"
        element={
          <ProtectedRoute>
            <Layout>
              <ImportPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/presupuestos"
        element={
          <ProtectedRoute>
            <Layout>
              <BudgetsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <ProtectedRoute>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* Add other protected routes here and wrap them with Layout */}
    </Routes>
  );
};

export default AppRoutes;