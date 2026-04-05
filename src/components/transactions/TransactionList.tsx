import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Edit2, Trash2, SortAsc, SortDesc } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/helpers';
import type { SortField, SortOrder } from '../../types';

export function TransactionList() {
  const { state, actions } = useApp();
  const [sort, setSort] = useState<{ field: SortField; order: SortOrder }>({
    field: 'date',
    order: 'desc',
  });
  // number of transactions to show initially and increment by
  const [visibleCount, setVisibleCount] = useState(30);

  // reset visible count when filters, sort or transactions list changes
  useEffect(() => {
    setVisibleCount(30);
  }, [state.filters, sort.field, sort.order, state.transactions.length]);

  // Filter transactions
  const filteredTransactions = state.transactions.filter((t) => {
    if (
      state.filters.search &&
      !t.description
        .toLowerCase()
        .includes(state.filters.search.toLowerCase())
    ) {
      return false;
    }
    if (state.filters.category && t.category !== state.filters.category) {
      return false;
    }
    if (state.filters.type !== 'all' && t.type !== state.filters.type) {
      return false;
    }
    if (state.filters.dateRange.start && t.date < state.filters.dateRange.start) {
      return false;
    }
    if (state.filters.dateRange.end && t.date > state.filters.dateRange.end) {
      return false;
    }
    return true;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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

  const handleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = sort.order === 'asc' ? SortAsc : SortDesc;

  // Slice transactions for incremental "See more"
  const visibleTransactions = sortedTransactions.slice(0, visibleCount);

  if (sortedTransactions.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Try adjusting your filters or add a new transaction
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Transactions
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-3">
        {visibleTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </h3>
                  <Badge variant={transaction.type}>
                    {transaction.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {transaction.category}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-semibold ${
                    transaction.type === 'income'
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-danger-600 dark:text-danger-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                {state.role === 'admin' && (
                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={() => actions.openModal(transaction)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => actions.deleteTransaction(transaction.id)}
                      className="p-1 text-gray-400 hover:text-danger-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        {visibleCount < sortedTransactions.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + 30, sortedTransactions.length))}
              className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              See more
            </button>
          </div>
        )}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[
                  { field: 'date' as SortField, label: 'Date' },
                  { field: 'description' as SortField, label: 'Description' },
                  { field: 'category' as SortField, label: 'Category' },
                  { field: 'type' as SortField, label: 'Type' },
                  { field: 'amount' as SortField, label: 'Amount' },
                ].map((column) => (
                  <th
                    key={column.field}
                    onClick={() => handleSort(column.field)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors select-none"
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {sort.field === column.field && (
                        <SortIcon className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                ))}
                {state.role === 'admin' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visibleTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={transaction.type}>{transaction.type}</Badge>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      transaction.type === 'income'
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  {state.role === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => actions.openModal(transaction)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => actions.deleteTransaction(transaction.id)}
                          className="p-2 text-gray-400 hover:text-danger-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visibleCount < sortedTransactions.length && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + 30, sortedTransactions.length))}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
