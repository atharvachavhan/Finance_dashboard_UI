import { cn } from '../../utils/helpers';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * EmptyState Component - Premium empty state UI
 * 
 * Shows when no data is available with helpful context
 * and optional CTA button.
 * 
 * - `default`: Full featured with icon, title, description, action
 * - `compact`: Minimal inline style for smaller containers
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = 'default',
}: Readonly<EmptyStateProps>) {
  if (variant === 'compact') {
    return (
      <div className={cn('text-center py-8 px-4', className)}>
        {Icon && (
          <Icon className="h-10 w-10 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
        )}
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg',
        'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700',
        className
      )}
    >
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-neutral-100 dark:bg-neutral-700">
          <Icon className="h-8 w-8 text-neutral-500 dark:text-neutral-400" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      
      {description && (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
          size="md"
          className="mt-6"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
