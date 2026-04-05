import { cn } from '../../utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'default' | 'warning' | 'success' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Badge Component - Small label to categorize content
 * 
 * Variants:
 * - `income`: Green for positive transactions
 * - `expense`: Red for negative transactions
 * - `default`: Gray for neutral content
 * - `success`: Green for success states
 * - `warning`: Amber for alerts
 * - `info`: Blue for information
 */
export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: Readonly<BadgeProps>) {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full font-medium text-xs tracking-tight';
  
  const variantClasses = {
    income: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
    expense: 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300',
    success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
    info: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
