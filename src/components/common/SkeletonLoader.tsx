import { useMemo } from 'react';
import { cn } from '../../utils/helpers';

interface SkeletonProps {
  className?: string;
  count?: number;
  variant?: 'card' | 'text' | 'circle' | 'line';
}

/**
 * SkeletonLoader Component - Premium loading state
 * 
 * Shows animated skeleton placeholders while content loads.
 * Provides better UX than blank screens.
 */
export function SkeletonLoader({
  className,
  count = 1,
  variant = 'card',
}: Readonly<SkeletonProps>) {
  const baseClasses =
    'animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg';

  const itemKeys = useMemo(
    () => Array.from({ length: count }, (_, idx) => `skeleton-${variant}-${count}-${idx}`),
    [count, variant]
  );

  const variantClasses = {
    card: 'h-24 w-full mb-4 rounded-lg',
    text: 'h-4 w-3/4 mb-2 rounded',
    circle: 'h-12 w-12 rounded-full',
    line: 'h-3 w-full mb-3 rounded',
  };

  return (
    <div className="space-y-4">
      {itemKeys.map((itemKey) => (
        <div
          key={itemKey}
          className={cn(
            baseClasses,
            variantClasses[variant],
            className
          )}
        />
      ))}
    </div>
  );
}

/**
 * CardSkeleton - Simulates loading card content
 */
export function CardSkeleton({ count = 3 }: { count?: number }) {
  const itemKeys = useMemo(
    () => Array.from({ length: count }, (_, idx) => `card-skeleton-${count}-${idx}`),
    [count]
  );

  return (
    <div className="space-y-4">
      {itemKeys.map((itemKey) => (
        <div
          key={itemKey}
          className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse space-y-3"
        >
          <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}

/**
 * SummaryCardsSkeleton - Simulates loading summary cards
 */
export function SummaryCardsSkeleton() {
  const itemKeys = useMemo(
    () => Array.from({ length: 4 }, (_, idx) => `summary-skeleton-${idx}`),
    []
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {itemKeys.map((itemKey) => (
        <div
          key={itemKey}
          className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
            <div className="flex-1 ml-4 space-y-2">
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
              <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
