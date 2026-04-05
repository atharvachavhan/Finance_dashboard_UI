import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { calculateSummary } from '../../utils/helpers';

export function SummaryCards() {
  const { state } = useApp();
  const summary = calculateSummary(state.transactions);

  // Calculate month-over-month change (simplified)
  const lastMonthBalance = summary.totalIncome - summary.totalExpense - 1000; // Rough estimate
  const balanceChange = ((summary.totalBalance - lastMonthBalance) / Math.abs(lastMonthBalance)) * 100 || 0;

  const cards = [
    {
      id: 'balance',
      title: 'Total Balance',
      value: formatCurrency(summary.totalBalance),
      icon: Wallet,
      color: 'text-primary-600',
      bgIcon: 'bg-primary-100 dark:bg-primary-900/30',
      bgCard: 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20',
      trend: balanceChange,
      trendIcon: balanceChange >= 0 ? ArrowUpRight : ArrowDownLeft,
      trendColor: balanceChange >= 0 ? 'text-success-600' : 'text-danger-600',
    },
    {
      id: 'income',
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      icon: TrendingUp,
      color: 'text-success-600',
      bgIcon: 'bg-success-100 dark:bg-success-900/30',
      bgCard: 'bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20',
      trend: null,
      trendIcon: null,
      trendColor: 'text-success-600',
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpense),
      icon: TrendingDown,
      color: 'text-danger-600',
      bgIcon: 'bg-danger-100 dark:bg-danger-900/30',
      bgCard: 'bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20',
      trend: null,
      trendIcon: null,
      trendColor: 'text-danger-600',
    },
    {
      id: 'savings',
      title: 'Savings Rate',
      value: `${summary.savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: summary.savingsRate >= 30 ? 'text-success-600' : summary.savingsRate >= 15 ? 'text-warning-600' : 'text-danger-600',
      bgIcon: summary.savingsRate >= 30 ? 'bg-success-100 dark:bg-success-900/30' : summary.savingsRate >= 15 ? 'bg-warning-100 dark:bg-warning-900/30' : 'bg-danger-100 dark:bg-danger-900/30',
      bgCard: summary.savingsRate >= 30 ? 'bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20' : summary.savingsRate >= 15 ? 'bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20' : 'bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20',
      trend: null,
      trendIcon: null,
      trendColor: 'text-neutral-600',
      subtitle: summary.savingsRate >= 30 ? 'Excellent' : summary.savingsRate >= 15 ? 'Good' : 'Below target',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trendIcon;
        
        return (
          <Card
            key={card.id}
            variant="elevated"
            className={`!p-6 md:!p-8 animate-slide-up overflow-hidden relative ${card.bgCard}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8">
              <Icon className="h-32 w-32 text-neutral-400" />
            </div>

            <div className="relative z-10">
              {/* Icon and Title Row */}
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-lg p-3 ${card.bgIcon} backdrop-blur-sm`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                
                {/* Trend Badge */}
                {card.trend !== null && typeof card.trend === 'number' && (
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${TrendIcon === ArrowUpRight ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300' : 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300'}`}>
                    {TrendIcon && <TrendIcon className="h-3 w-3" />}
                    {Math.abs(card.trend).toFixed(1)}%
                  </div>
                )}
              </div>

              {/* Title */}
              <p className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                {card.title}
              </p>

              {/* Main Value */}
              <p className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {card.value}
              </p>

              {/* Subtitle */}
              {card.subtitle && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {card.subtitle}
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
