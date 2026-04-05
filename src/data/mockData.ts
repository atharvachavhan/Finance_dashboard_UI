import type { Transaction, Category } from '../types';

// Helper to create a date
const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

// Generate realistic transactions over 4 months
export const mockTransactions: Transaction[] = [
  // January 2026 (Starting balance)
  { id: '1', date: createDate(2026, 1, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income', notes: 'Regular salary' },
  { id: '2', date: createDate(2026, 1, 1), description: 'Rent Payment', amount: 1800, category: 'Bills & Utilities', type: 'expense', notes: 'Monthly rent' },
  { id: '3', date: createDate(2026, 1, 3), description: 'Electricity Bill', amount: 145, category: 'Bills & Utilities', type: 'expense' },
  { id: '4', date: createDate(2026, 1, 5), description: 'Grocery Shopping', amount: 85, category: 'Food & Dining', type: 'expense' },
  { id: '5', date: createDate(2026, 1, 7), description: 'Gas Station', amount: 45, category: 'Transportation', type: 'expense' },
  { id: '6', date: createDate(2026, 1, 10), description: 'Freelance Project', amount: 800, category: 'Freelance', type: 'income', notes: 'Website design' },
  { id: '7', date: createDate(2026, 1, 12), description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: '8', date: createDate(2026, 1, 15), description: 'Restaurant Dinner', amount: 65, category: 'Food & Dining', type: 'expense', notes: 'Date night' },
  { id: '9', date: createDate(2026, 1, 18), description: 'New Winter Jacket', amount: 120, category: 'Shopping', type: 'expense' },
  { id: '10', date: createDate(2026, 1, 20), description: 'Internet Bill', amount: 79, category: 'Bills & Utilities', type: 'expense' },
  { id: '11', date: createDate(2026, 1, 22), description: 'Uber Rides', amount: 28, category: 'Transportation', type: 'expense' },
  { id: '12', date: createDate(2026, 1, 25), description: 'Gym Membership', amount: 50, category: 'Healthcare', type: 'expense' },
  { id: '13', date: createDate(2026, 1, 28), description: 'Online Course', amount: 199, category: 'Education', type: 'expense', notes: 'React course' },
  { id: '14', date: createDate(2026, 1, 30), description: 'Coffee Shop', amount: 18, category: 'Food & Dining', type: 'expense' },

  // February 2026
  { id: '15', date: createDate(2026, 2, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income', notes: 'Regular salary' },
  { id: '16', date: createDate(2026, 2, 1), description: 'Rent Payment', amount: 1800, category: 'Bills & Utilities', type: 'expense', notes: 'Monthly rent' },
  { id: '17', date: createDate(2026, 2, 3), description: 'Electricity Bill', amount: 132, category: 'Bills & Utilities', type: 'expense' },
  { id: '18', date: createDate(2026, 2, 5), description: 'Grocery Shopping', amount: 92, category: 'Food & Dining', type: 'expense' },
  { id: '19', date: createDate(2026, 2, 8), description: 'Stock Investment', amount: 500, category: 'Investment', type: 'income', notes: 'Dividend payment' },
  { id: '20', date: createDate(2026, 2, 10), description: 'Gas Station', amount: 52, category: 'Transportation', type: 'expense' },
  { id: '21', date: createDate(2026, 2, 12), description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: '22', date: createDate(2026, 2, 14), description: 'Valentine\'s Day Dinner', amount: 150, category: 'Food & Dining', type: 'expense', notes: 'Special occasion' },
  { id: '23', date: createDate(2026, 2, 16), description: 'Freelance Project', amount: 1200, category: 'Freelance', type: 'income', notes: 'Mobile app design' },
  { id: '24', date: createDate(2026, 2, 18), description: 'New Running Shoes', amount: 95, category: 'Shopping', type: 'expense' },
  { id: '25', date: createDate(2026, 2, 20), description: 'Internet Bill', amount: 79, category: 'Bills & Utilities', type: 'expense' },
  { id: '26', date: createDate(2026, 2, 22), description: 'Public Transport', amount: 45, category: 'Transportation', type: 'expense' },
  { id: '27', date: createDate(2026, 2, 25), description: 'Dentist Visit', amount: 200, category: 'Healthcare', type: 'expense', notes: 'Checkup' },
  { id: '28', date: createDate(2026, 2, 27), description: 'Tech Conference Ticket', amount: 350, category: 'Education', type: 'expense' },
  { id: '29', date: createDate(2026, 2, 28), description: 'Coffee Shop', amount: 22, category: 'Food & Dining', type: 'expense' },

  // March 2026
  { id: '30', date: createDate(2026, 3, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income', notes: 'Regular salary' },
  { id: '31', date: createDate(2026, 3, 1), description: 'Rent Payment', amount: 1800, category: 'Bills & Utilities', type: 'expense', notes: 'Monthly rent' },
  { id: '32', date: createDate(2026, 3, 3), description: 'Electricity Bill', amount: 118, category: 'Bills & Utilities', type: 'expense' },
  { id: '33', date: createDate(2026, 3, 5), description: 'Grocery Shopping', amount: 78, category: 'Food & Dining', type: 'expense' },
  { id: '34', date: createDate(2026, 3, 7), description: 'Bonus Payment', amount: 2000, category: 'Bonus', type: 'income', notes: 'Quarterly bonus' },
  { id: '35', date: createDate(2026, 3, 8), description: 'Gas Station', amount: 48, category: 'Transportation', type: 'expense' },
  { id: '36', date: createDate(2026, 3, 10), description: 'Freelance Project', amount: 600, category: 'Freelance', type: 'income', notes: 'Logo design' },
  { id: '37', date: createDate(2026, 3, 12), description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: '38', date: createDate(2026, 3, 14), description: 'Brunch with Friends', amount: 85, category: 'Food & Dining', type: 'expense' },
  { id: '39', date: createDate(2026, 3, 16), description: 'New Monitor', amount: 350, category: 'Shopping', type: 'expense', notes: 'Work upgrade' },
  { id: '40', date: createDate(2026, 3, 18), description: 'Internet Bill', amount: 79, category: 'Bills & Utilities', type: 'expense' },
  { id: '41', date: createDate(2026, 3, 20), description: 'Uber Rides', amount: 35, category: 'Transportation', type: 'expense' },
  { id: '42', date: createDate(2026, 3, 22), description: 'Gym Membership', amount: 50, category: 'Healthcare', type: 'expense' },
  { id: '43', date: createDate(2026, 3, 24), description: 'Book Purchase', amount: 45, category: 'Education', type: 'expense' },
  { id: '44', date: createDate(2026, 3, 26), description: 'Car Service', amount: 250, category: 'Transportation', type: 'expense', notes: 'Oil change + inspection' },
  { id: '45', date: createDate(2026, 3, 28), description: 'Restaurant Lunch', amount: 42, category: 'Food & Dining', type: 'expense' },
  { id: '46', date: createDate(2026, 3, 30), description: 'Investment Returns', amount: 320, category: 'Investment', type: 'income', notes: 'Stock gains' },

  // April 2026 (Current month)
  { id: '47', date: createDate(2026, 4, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income', notes: 'Regular salary' },
  { id: '48', date: createDate(2026, 4, 1), description: 'Rent Payment', amount: 1800, category: 'Bills & Utilities', type: 'expense', notes: 'Monthly rent' },
  { id: '49', date: createDate(2026, 4, 2), description: 'Grocery Shopping', amount: 105, category: 'Food & Dining', type: 'expense' },
  { id: '50', date: createDate(2026, 4, 3), description: 'Freelance Project', amount: 950, category: 'Freelance', type: 'income', notes: 'UI design work' },

  // Additional transactions between Jan 1 and Apr 6, 2026
  { id: '51', date: createDate(2026, 1, 2), description: 'Morning Coffee', amount: 4.5, category: 'Food & Dining', type: 'expense' },
  { id: '52', date: createDate(2026, 1, 4), description: 'Mobile Recharge', amount: 20, category: 'Bills & Utilities', type: 'expense' },
  { id: '53', date: createDate(2026, 1, 9), description: 'City Taxi', amount: 30, category: 'Transportation', type: 'expense' },
  { id: '54', date: createDate(2026, 1, 11), description: 'Used Book Purchase', amount: 25, category: 'Education', type: 'expense' },
  { id: '55', date: createDate(2026, 2, 6), description: 'Cinema Night', amount: 12, category: 'Entertainment', type: 'expense' },
  { id: '56', date: createDate(2026, 2, 11), description: 'Pharmacy Medicines', amount: 40, category: 'Healthcare', type: 'expense' },
  { id: '57', date: createDate(2026, 2, 20), description: 'Birthday Gift', amount: 60, category: 'Shopping', type: 'expense' },
  { id: '58', date: createDate(2026, 3, 2), description: 'Freelance Milestone', amount: 400, category: 'Freelance', type: 'income' },
  { id: '59', date: createDate(2026, 3, 18), description: 'Clothing', amount: 90, category: 'Shopping', type: 'expense' },
  { id: '60', date: createDate(2026, 3, 29), description: 'App Subscription', amount: 10, category: 'Entertainment', type: 'expense' },
  { id: '61', date: createDate(2026, 4, 4), description: 'Parking Fee', amount: 8, category: 'Transportation', type: 'expense' },
  { id: '62', date: createDate(2026, 4, 5), description: 'Supermarket', amount: 95, category: 'Food & Dining', type: 'expense' },
  { id: '63', date: createDate(2026, 4, 6), description: 'Utility Payment', amount: 200, category: 'Bills & Utilities', type: 'expense' },

  // No transactions after April 6, 2026 by request.
];

// Categories for filtering
export const CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Investment',
  'Bonus',
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

// Initial app state
export const initialFilters = {
  search: '',
  category: null as Category | null,
  type: 'all' as 'all' | 'income' | 'expense',
  dateRange: { start: null as Date | null, end: null as Date | null },
};
