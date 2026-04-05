// Transaction Types
export type TransactionType = 'income' | 'expense';

export type UserRole = 'viewer' | 'admin';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Bonus'
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Travel'
  | 'Other';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  notes?: string;
}

// Filter Types
export interface FilterState {
  search: string;
  category: Category | null;
  type: TransactionType | 'all';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

// Application State
export interface AppState {
  transactions: Transaction[];
  filters: FilterState;
  role: UserRole;
  isDarkMode: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  editingTransaction: Transaction | null;
}

// Derived Data Types
export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
}

export interface InsightData {
  highestSpendingCategory: {
    category: Category;
    amount: number;
    percentage: number;
  } | null;
  monthlyComparison: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down';
  } | null;
  topExpense: Transaction | null;
  averageDailyExpense: number;
}

export type SortField = 'date' | 'amount' | 'description' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

// Action Types for Reducer
export type AppAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload?: Transaction }
  | { type: 'CLOSE_MODAL' };

// Export Types
export type ExportFormat = 'csv' | 'json';
