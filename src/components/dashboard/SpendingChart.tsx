import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { getCategoryBreakdown, formatCurrency, filterTransactions } from '../../utils/helpers';
import { EmptyState } from '../common/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';
import { useState } from 'react';

const EXPENSE_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#0ea5e9',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#6366f1',
  '#14b8a6',
  '#84cc16',
  '#a855f7',
];

export function SpendingChart() {
  const { state } = useApp();

  const expenseFilters = {
    ...state.filters,
    type: 'expense' as const,
  };
  const filteredExpenses = filterTransactions(state.transactions, expenseFilters);
  const data = getCategoryBreakdown(filteredExpenses).filter((item) => item.amount > 0);

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const chartData = data;

  const isDark = state.isDarkMode;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (chartData.length === 0) {
    return (
      <Card variant="elevated">
        <div className="flex flex-col items-center justify-center h-80">
          <EmptyState
            icon={PieIcon}
            title="No Spending Data"
            description="No matching expense transactions for current filters."
            variant="compact"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '250ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Spending Breakdown
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Expenses by category for current filters
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={116}
                paddingAngle={2}
                dataKey="amount"
                nameKey="category"
                label={false}
                labelLine={false}
                onClick={(e) => {
                  const cat = (e as any)?.payload?.category as string | undefined;
                  if (!cat) return;
                  setSelectedCategory((prev) => (prev === cat ? null : cat));
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.category}`}
                    fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
                formatter={(value, _name, item) => {
                  if (typeof value !== 'number') return ['', ''];
                  const percentage = (item?.payload as { percentage?: number } | undefined)?.percentage ?? 0;
                  const category = (item?.payload as { category?: string } | undefined)?.category ?? String(_name);
                  return [`${formatCurrency(value)} (${percentage.toFixed(1)}%)`, category];
                }}
                labelFormatter={(label) => String(label)}
                labelStyle={{ color: isDark ? '#f3f4f6' : '#1f2937', fontWeight: '600' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 w-full px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {chartData.map((item, index) => (
              <button
                key={item.category}
                onClick={() => setSelectedCategory((prev) => (prev === item.category ? null : item.category))}
                className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none"
                aria-pressed={selectedCategory === item.category}
              >
                <span
                  className="h-3 w-3 rounded-sm inline-block"
                  style={{ backgroundColor: EXPENSE_COLORS[index % EXPENSE_COLORS.length] }}
                />
                <span className="truncate">{item.category}</span>
                {selectedCategory === item.category ? (
                  <span className="ml-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{formatCurrency(item.amount)}</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full px-4">
          <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Actual Spending Data</p>
            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
