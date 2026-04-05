import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns';
import type { Transaction, Category, SummaryData, InsightData, FilterState, SortField, SortOrder } from '../types';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  const absoluteAmount = Math.abs(amount);
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteAmount);

  const prefix = amount < 0 ? '-Rs. ' : 'Rs. ';
  return `${prefix}${formattedAmount}`;
}

// Format date
export function formatDate(date: Date | string, formatStr: string = 'MMM dd, yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, formatStr);
}

// Calculate summary data
export function calculateSummary(transactions: Transaction[]): SummaryData {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && isWithinInterval(t.date, { start: currentMonthStart, end: currentMonthEnd }))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter(t => t.type === 'expense' && isWithinInterval(t.date, { start: currentMonthStart, end: currentMonthEnd }))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100 : 0;

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    monthlyIncome,
    monthlyExpense,
    savingsRate,
  };
}

// Calculate insights
export function calculateInsights(transactions: Transaction[]): InsightData {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const previousMonthStart = startOfMonth(subMonths(now, 1));
  const previousMonthEnd = endOfMonth(subMonths(now, 1));

  // Current month expenses by category
  const currentMonthExpenses = transactions.filter(
    t => t.type === 'expense' && isWithinInterval(t.date, { start: currentMonthStart, end: currentMonthEnd })
  );

  // Previous month expenses
  const previousMonthExpenses = transactions.filter(
    t => t.type === 'expense' && isWithinInterval(t.date, { start: previousMonthStart, end: previousMonthEnd })
  );

  // Highest spending category
  const categoryTotals = currentMonthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<Category, number>);

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const totalCurrentExpenses = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  const highestSpendingCategory = highestCategory
    ? {
        category: highestCategory[0] as Category,
        amount: highestCategory[1],
        percentage: totalCurrentExpenses > 0 ? (highestCategory[1] / totalCurrentExpenses) * 100 : 0,
      }
    : null;

  // Monthly comparison
  const currentMonthTotal = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
  const previousMonthTotal = previousMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
  const change = currentMonthTotal - previousMonthTotal;
  const changePercent = previousMonthTotal > 0 ? (change / previousMonthTotal) * 100 : 0;
  const trend: 'up' | 'down' = change > 0 ? 'up' : change < 0 ? 'down' : 'up';

  const monthlyComparison = currentMonthExpenses.length > 0 || previousMonthExpenses.length > 0
    ? {
        current: currentMonthTotal,
        previous: previousMonthTotal,
        change,
        changePercent,
        trend,
      }
    : null;

  // Top expense
  const allExpenses = transactions.filter(t => t.type === 'expense');
  const topExpense = allExpenses.length > 0 ? allExpenses.sort((a, b) => b.amount - a.amount)[0] : null;

  // Average daily expense (last 30 days)
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentExpenses = transactions.filter(
    t => t.type === 'expense' && t.date >= thirtyDaysAgo
  );
  const averageDailyExpense = recentExpenses.length > 0
    ? recentExpenses.reduce((sum, t) => sum + t.amount, 0) / 30
    : 0;

  return {
    highestSpendingCategory,
    monthlyComparison,
    topExpense,
    averageDailyExpense,
  };
}

// Get monthly balance data for charts
export function getMonthlyBalanceData(transactions: Transaction[]) {
  const monthlyData: Record<string, { income: number; expense: number; balance: number }> = {};

  const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());

  sortedTransactions.forEach(t => {
    const monthKey = format(t.date, 'yyyy-MM');
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0, balance: 0 };
    }
    if (t.type === 'income') {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expense += t.amount;
    }
  });

  // Calculate running balance
  let runningBalance = 0;
  const result = Object.entries(monthlyData).map(([month, data]) => {
    runningBalance += data.income - data.expense;
    return {
      month: format(new Date(month + '-01'), 'MMM yyyy'),
      income: data.income,
      expense: data.expense,
      balance: runningBalance,
    };
  });

  return result;
}

// Get category breakdown for charts
export function getCategoryBreakdown(transactions: Transaction[]) {
  const categoryData: Record<Category, number> = {
    'Salary': 0,
    'Freelance': 0,
    'Investment': 0,
    'Bonus': 0,
    'Food & Dining': 0,
    'Transportation': 0,
    'Shopping': 0,
    'Entertainment': 0,
    'Bills & Utilities': 0,
    'Healthcare': 0,
    'Education': 0,
    'Travel': 0,
    'Other': 0,
  };

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });

  const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

  return Object.entries(categoryData).map(([category, amount]) => ({
    category: category as Category,
    amount,
    percentage: total > 0 ? (amount / total) * 100 : 0,
  })).sort((a, b) => b.amount - a.amount);
}

// Filter transactions
export function filterTransactions(transactions: Transaction[], filters: FilterState): Transaction[] {
  return transactions.filter(t => {
    // Search filter
    if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category && t.category !== filters.category) {
      return false;
    }

    // Type filter
    if (filters.type !== 'all' && t.type !== filters.type) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && t.date < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && t.date > filters.dateRange.end) {
      return false;
    }

    return true;
  });
}

// Sort transactions
export function sortTransactions(transactions: Transaction[], sort: { field: SortField; order: SortOrder }): Transaction[] {
  return [...transactions].sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case 'date':
        comparison = a.date.getTime() - b.date.getTime();
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }

    return sort.order === 'asc' ? comparison : -comparison;
  });
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Export to CSV
export function exportToCSV(transactions: Transaction[]): string {
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Type', 'Notes'];
  const rows = transactions.map(t => [
    formatDate(t.date),
    t.description,
    t.amount.toFixed(2),
    t.category,
    t.type,
    t.notes || '',
  ]);

  const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  return csvContent;
}

// Export to JSON
export function exportToJSON(transactions: Transaction[]): string {
  return JSON.stringify(transactions, null, 2);
}

// Download file helper
export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get category icon (placeholder - could be extended with actual icons)
export function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    'Salary': '💼',
    'Freelance': '🎨',
    'Investment': '📈',
    'Bonus': '🎉',
    'Food & Dining': '🍽️',
    'Transportation': '🚗',
    'Shopping': '🛍️',
    'Entertainment': '🎬',
    'Bills & Utilities': '💡',
    'Healthcare': '🏥',
    'Education': '📚',
    'Travel': '✈️',
    'Other': '📌',
  };
  return icons[category] || '💰';
}
