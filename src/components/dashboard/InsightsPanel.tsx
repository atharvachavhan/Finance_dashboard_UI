import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { TrendingUp, TrendingDown, AlertTriangle, Wallet, Calendar } from 'lucide-react';
import { calculateInsights, formatCurrency } from '../../utils/helpers';

export function InsightsPanel() {
  const { state } = useApp();
  const insights = calculateInsights(state.transactions);

  const renderMonthlyComparisonContent = () => {
    if (!insights.monthlyComparison) {
      return <p className="mt-1 text-sm text-gray-500">No comparison data</p>;
    }

    let trendNode: React.ReactNode;
    if (insights.monthlyComparison.trend === 'up') {
      trendNode = (
        <>
          <TrendingUp className="h-4 w-4 text-danger-500" />
          <span className="text-danger-600 dark:text-danger-400">
            +{insights.monthlyComparison.changePercent.toFixed(1)}%
          </span>
        </>
      );
    } else if (insights.monthlyComparison.trend === 'down') {
      trendNode = (
        <>
          <TrendingDown className="h-4 w-4 text-primary-500" />
          <span className="text-primary-600 dark:text-primary-400">
            {insights.monthlyComparison.changePercent.toFixed(1)}%
          </span>
        </>
      );
    } else {
      trendNode = <span>No change</span>;
    }

    return (
      <>
        <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {formatCurrency(insights.monthlyComparison.current)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          {trendNode}
          <span className="text-xs">vs last month</span>
        </p>
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
      {/* Highest Spending Category */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-danger-50 dark:bg-danger-900/20 p-2">
            <AlertTriangle className="h-5 w-5 text-danger-600 dark:text-danger-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Highest Spending Category
            </p>
            {insights.highestSpendingCategory ? (
              <>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {insights.highestSpendingCategory.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatCurrency(insights.highestSpendingCategory.amount)}{' '}
                  <span className="text-xs">
                    ({insights.highestSpendingCategory.percentage.toFixed(1)}%)
                  </span>
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-gray-500">No expense data</p>
            )}
          </div>
        </div>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-2">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Monthly Comparison
            </p>
            {renderMonthlyComparisonContent()}
          </div>
        </div>
      </Card>

      {/* Top Expense */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary-50 dark:bg-primary-900/20 p-2">
            <Wallet className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Top Expense
            </p>
            {insights.topExpense ? (
              <>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(insights.topExpense.amount)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insights.topExpense.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(insights.topExpense.date).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-gray-500">No expense data</p>
            )}
          </div>
        </div>
      </Card>

      {/* Average Daily Expense */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-2">
            <TrendingDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Daily Expense (30d)
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(insights.averageDailyExpense)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on recent transactions
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
