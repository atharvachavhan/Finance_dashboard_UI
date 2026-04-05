import { cn } from '../../utils/helpers';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button Component - Premium fintech button styles
 * 
 * Variants:
 * - `primary`: Main CTA (blue)
 * - `secondary`: Alternative action (gray)
 * - `danger`: Destructive action (red)
 * - `success`: Positive action (green)
 * - `ghost`: Minimal style for tertiary actions
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled,
  className,
  fullWidth = false,
  ...props
}: Readonly<ButtonProps>) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs font-medium gap-1.5',
    md: 'px-4 py-2.5 text-sm font-medium gap-2',
    lg: 'px-6 py-3 text-base font-semibold gap-2',
  };

  // Variant base classes
  const baseClasses = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md disabled:bg-primary-400',
    secondary:
      'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 border border-neutral-200 dark:border-neutral-700',
    danger:
      'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-sm hover:shadow-md disabled:bg-danger-400',
    success:
      'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm hover:shadow-md disabled:bg-success-400',
    ghost:
      'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700',
  };

  return (
    <button
      className={cn(
        // Base button styles
        'inline-flex items-center justify-center',
        'rounded-lg transition-all duration-150',
        'font-medium tracking-tight',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Size
        sizeClasses[size],
        
        // Variant
        baseClasses[variant],
        
        // Full width
        fullWidth && 'w-full',
        
        // Loading and disabled states
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {Icon && !loading && <Icon className="h-4 w-4" />}
      {children && <span>{children}</span>}
    </button>
  );
}
