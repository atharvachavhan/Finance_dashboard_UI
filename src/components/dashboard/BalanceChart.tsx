import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatCurrency, getMonthlyBalanceData } from '../../utils/helpers';
import { EmptyState } from '../common/EmptyState';
import { TrendingUp } from 'lucide-react';

export function BalanceChart() {
  const { state } = useApp();
  const data = getMonthlyBalanceData(state.transactions);

  if (data.length === 0) {
    return (
      <Card variant="elevated">
        <div className="flex flex-col items-center justify-center h-80">
          <EmptyState
            icon={TrendingUp}
            title="No Balance Data"
            description="Add transactions to see your balance trend over time."
            variant="compact"
          />
        </div>
      </Card>
    );
  }

  const isDark = state.isDarkMode;
  const latestMonth = data[data.length - 1];
  const previousMonth = data.length > 1 ? data[data.length - 2] : null;
  const monthlyDelta = previousMonth ? latestMonth.balance - previousMonth.balance : latestMonth.balance;

  const kFormatter = (value: number) => {
    if (Math.abs(value) < 1000) {
      return `Rs. ${Math.round(value)}`;
    }

    return `Rs. ${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Balance Trend
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Your balance evolution over time
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#374151' : '#e5e7eb'}
            verticalPoints={[]}
          />
          
          <XAxis
            dataKey="month"
            stroke={isDark ? '#9ca3af' : '#d1d5db'}
            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
            tickLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
          />
          
          <YAxis
            stroke={isDark ? '#9ca3af' : '#d1d5db'}
            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
            tickLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
            tickFormatter={(value) => kFormatter(value)}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px',
            }}
            formatter={(value) =>
              typeof value === 'number' ? formatCurrency(value) : ''
            }
            labelStyle={{ color: isDark ? '#f3f4f6' : '#1f2937', fontWeight: '600' }}
            cursor={{ stroke: '#0ea5e9', strokeWidth: 1, strokeOpacity: 0.5 }}
          />
          
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#0ea5e9"
            fill="url(#balanceGradient)"
            strokeWidth={3}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2.5">
            <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Current Balance</p>
            <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {formatCurrency(latestMonth.balance)}
            </p>
          </div>

          <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2.5">
            <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Monthly Income</p>
            <p className="mt-1 text-sm font-bold text-success-600 dark:text-success-400">
              {formatCurrency(latestMonth.income)}
            </p>
          </div>

          <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2.5">
            <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Monthly Delta</p>
            <p className={`mt-1 text-sm font-bold ${monthlyDelta >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'}`}>
              {formatCurrency(monthlyDelta)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
