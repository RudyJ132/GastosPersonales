export interface Category {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
}

export interface CreateCategoryRequest {
  nombre: string;
  descripcion: string;
}

export interface UpdateCategoryRequest {
  nombre: string;
  descripcion: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon?: string; // Optional icon for the payment method
  isActive: boolean; // Added isActive to match backend entity
}

export interface CreatePaymentMethodRequest {
  nombre: string; // Matches backend DTO property name
  icono?: string; // Matches backend DTO property name
}

export interface UpdatePaymentMethodRequest {
  nombre: string; // Matches backend DTO property name
  icono?: string; // Matches backend DTO property name
}

export interface ImportResult {
  status: 'success' | 'error';
  message: string;
  errors?: { row: number; message: string; data: any }[];
  importedCount?: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO date string
  categoryId: string;
  paymentMethodId: string;
  categoryName?: string; // For display purposes
  paymentMethodName?: string; // For display purposes
}

export interface CreateExpenseRequest {
  monto: number;
  fecha: string; // ISO date string
  descripcion: string;
  categoriaId: number;
  metodoPagoId: number;
}

export interface UpdateExpenseRequest {
  monto: number;
  fecha: string; // ISO date string;
  descripcion: string;
  categoriaId: number;
  metodoPagoId: number;
}

export interface FilterExpensesRequest {
  fechaInicio?: string; // ISO date string
  fechaFin?: string; // ISO date string
  categoriaId?: number;
  metodoPagoId?: number;
}

export interface ReporteMensualDto {
  mes: number;
  anio: number;
  totalIngresos: number;
  totalGastos: number;
  balance: number;
}

export interface GastoPorCategoriaDto {
  categoria: string;
  total: number;
  porcentaje: number;
}

export interface ComparacionMensualDto {
  mesActual: number;
  anioActual: number;
  totalMesActual: number;
  mesAnterior: number;
  anioAnterior: number;
  totalMesAnterior: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface Budget {
  id: string;
  categoriaId: number;
  mes: number;
  anio: number;
  montoLimite: number;
  montoActual?: number;
  porcentajeConsumido?: number;
  categoryName?: string;
}

export interface CreateBudgetRequest {
  categoriaId: number;
  mes: number;
  anio: number;
  montoLimite: number;
}

export interface UpdateBudgetRequest {
  montoLimite: number;
}

export interface BudgetAlert {
  presupuestoId: number;
  categoriaNombre: string;
  montoLimite: number;
  montoActual: number;
  porcentajeConsumido: number;
  nivelAlerta: string;
}

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: User;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
}