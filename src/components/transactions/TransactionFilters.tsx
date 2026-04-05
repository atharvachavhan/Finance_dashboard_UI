import { useApp } from '../../context/AppContext';
import { Search, X, Filter } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { cn } from '../../utils/helpers';
import type { Category } from '../../types';
import { useState, useMemo } from 'react';

export function TransactionFilters() {
  const { state, actions } = useApp();
  const { filters } = state;

  type DateMode = 'all' | 'year' | 'month' | 'date';
  const [dateMode, setDateMode] = useState<DateMode>(() => {
    if (!filters.dateRange.start && !filters.dateRange.end) return 'all';
    return 'date';
  });

  const years = useMemo(() => {
    const s = new Set<number>();
    state.transactions.forEach((t) => s.add(t.date.getFullYear()));
    return Array.from(s).sort((a, b) => b - a);
  }, [state.transactions]);

  const [yearValue, setYearValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  // Handlers that compute start/end and update filters
  const applyYear = (yStr: string) => {
    if (!yStr) {
      actions.setFilters({ dateRange: { start: null, end: null } });
      return;
    }
    const y = Number(yStr);
    const start = new Date(y, 0, 1);
    const end = new Date(y, 11, 31, 23, 59, 59, 999);
    actions.setFilters({ dateRange: { start, end } });
  };

  const applyMonth = (ym: string) => {
    if (!ym) {
      actions.setFilters({ dateRange: { start: null, end: null } });
      return;
    }
    const [y, m] = ym.split('-').map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0, 23, 59, 59, 999);
    actions.setFilters({ dateRange: { start, end } });
  };

  const applyDate = (dStr: string) => {
    if (!dStr) {
      actions.setFilters({ dateRange: { start: null, end: null } });
      return;
    }
    const d = new Date(dStr);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    actions.setFilters({ dateRange: { start, end } });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.type !== 'all' ||
    filters.dateRange.start ||
    filters.dateRange.end;

  return (
    <div className="card p-4 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => actions.setFilters({ search: e.target.value })}
            className="input pl-10"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          {(['all', 'income', 'expense'] as const).map((type) => (
            <button
              key={type}
              onClick={() => actions.setFilters({ type })}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                filters.type === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={filters.category || ''}
            onChange={(e) =>
              actions.setFilters({ category: (e.target.value || null) as Category | null })
            }
            className="input appearance-none pr-10"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Date Range Mode */}
        <div className="flex items-center gap-2">
          <select
            value={dateMode}
            onChange={(e) => {
              const m = e.target.value as DateMode;
              setDateMode(m);
              // reset local values when changing mode
              setYearValue('');
              setMonthValue('');
              setDateValue('');
              if (m === 'all') actions.setFilters({ dateRange: { start: null, end: null } });
            }}
            className="input"
          >
            <option value="all">All</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="date">Date</option>
          </select>

          {dateMode === 'year' && (
            <select
              value={yearValue}
              onChange={(e) => { setYearValue(e.target.value); applyYear(e.target.value); }}
              className="input"
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          )}

          {dateMode === 'month' && (
            <input
              type="month"
              value={monthValue}
              onChange={(e) => { setMonthValue(e.target.value); applyMonth(e.target.value); }}
              className="input"
            />
          )}

          {dateMode === 'date' && (
            <input
              type="date"
              value={dateValue}
              onChange={(e) => { setDateValue(e.target.value); applyDate(e.target.value); }}
              className="input"
            />
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={actions.clearFilters}
            className="btn btn-secondary flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
