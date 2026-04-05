import { cn } from '../../utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'filled';
  interactive?: boolean;
}

/**
 * Card Component - Premium fintech card styles
 * 
 * - `default`: Subtle border and shadow (default)
 * - `elevated`: Prominent shadow for key metrics
 * - `filled`: Background fill for secondary content
 * - `interactive`: Hover scale effect for clickable cards
 */
export function Card({
  children,
  className,
  style,
  hover = false,
  onClick,
  variant = 'default',
  interactive = false,
}: Readonly<CardProps>) {
  const cardClassName = cn(
    'rounded-lg transition-all duration-200',
    'bg-white dark:bg-neutral-900',
    variant === 'default' && 'border border-neutral-200 dark:border-neutral-700 shadow-xs hover:shadow-sm',
    variant === 'elevated' && 'shadow-elevation-1 hover:shadow-elevation-2',
    variant === 'filled' && 'bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    (hover || interactive) && 'hover:shadow-md cursor-pointer',
    interactive && 'hover:scale-[1.01]',
    onClick && 'cursor-pointer',
    'p-6 md:p-8',
    className
  );

  if (onClick) {
    return (
      <button type="button" className={cardClassName} style={style} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <div className={cardClassName} style={style}>
      {children}
    </div>
  );
}
