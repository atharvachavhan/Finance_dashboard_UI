import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, Transaction, FilterState } from '../types';
import { mockTransactions, initialFilters } from '../data/mockData';

// Load from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Save to localStorage
const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Parse dates from stored data
const parseDates = (transactions: Transaction[]): Transaction[] => {
  return transactions.map(t => ({
    ...t,
    date: new Date(t.date),
  }));
};

// Initial state
const getInitialState = (): AppState => {
  const storedTransactions = loadFromStorage<Transaction[]>('transactions', []);
  const storedRole = loadFromStorage<'viewer' | 'admin'>('role', 'viewer');
  const storedDarkMode = loadFromStorage<boolean>('darkMode', false);

  return {
    transactions: storedTransactions.length > 0 ? parseDates(storedTransactions) : mockTransactions,
    filters: loadFromStorage<FilterState>('filters', initialFilters),
    role: storedRole,
    isDarkMode: storedDarkMode,
    isLoading: false,
    isModalOpen: false,
    editingTransaction: null,
  };
};

const initialState = getInitialState();

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        isModalOpen: false,
        editingTransaction: null,
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
        isModalOpen: false,
        editingTransaction: null,
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialFilters,
      };

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };

    case 'SET_DARK_MODE':
      return { ...state, isDarkMode: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingTransaction: action.payload || null,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        editingTransaction: null,
      };

    default:
      return state;
  }
}

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    clearFilters: () => void;
    setRole: (role: 'viewer' | 'admin') => void;
    toggleDarkMode: () => void;
    setDarkMode: (enabled: boolean) => void;
    openModal: (transaction?: Transaction) => void;
    closeModal: () => void;
    resetData: () => void;
  };
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    saveToStorage('transactions', state.transactions);
  }, [state.transactions]);

  useEffect(() => {
    saveToStorage('role', state.role);
  }, [state.role]);

  useEffect(() => {
    saveToStorage('darkMode', state.isDarkMode);
  }, [state.isDarkMode]);

  useEffect(() => {
    saveToStorage('filters', state.filters);
  }, [state.filters]);

  // Apply dark mode to document
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  // Actions
  const actions = {
    addTransaction: (transaction: Omit<Transaction, 'id'>) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    },

    updateTransaction: (transaction: Transaction) => {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
    },

    deleteTransaction: (id: string) => {
      if (confirm('Are you sure you want to delete this transaction?')) {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      }
    },

    setFilters: (filters: Partial<FilterState>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    clearFilters: () => {
      dispatch({ type: 'CLEAR_FILTERS' });
    },

    setRole: (role: 'viewer' | 'admin') => {
      dispatch({ type: 'SET_ROLE', payload: role });
    },

    toggleDarkMode: () => {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    },

    setDarkMode: (enabled: boolean) => {
      dispatch({ type: 'SET_DARK_MODE', payload: enabled });
    },

    openModal: (transaction?: Transaction) => {
      dispatch({ type: 'OPEN_MODAL', payload: transaction });
    },

    closeModal: () => {
      dispatch({ type: 'CLOSE_MODAL' });
    },

    resetData: () => {
      if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions });
        dispatch({ type: 'CLEAR_FILTERS' });
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
