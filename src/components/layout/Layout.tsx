interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout Component - Premium app shell
 * 
 * Provides base layout wrapper with responsive container,
 * proper color scheme, and structured hierarchy.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200">
      {/* Main content area with flex to push footer down */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
