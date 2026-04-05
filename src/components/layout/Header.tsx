import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, Moon, Sun, Download, RotateCcw, Plus, Menu, X } from 'lucide-react';
import { Button } from '../common/Button';
import { exportToCSV, exportToJSON, downloadFile } from '../../utils/helpers';

export function Header() {
  const { state, actions } = useApp();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleExportCSV = () => {
    downloadFile(exportToCSV(state.transactions), 'transactions.csv', 'text/csv');
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    downloadFile(exportToJSON(state.transactions), 'transactions.json', 'application/json');
    setShowExportMenu(false);
  };

  const handleToggleRole = () => {
    actions.setRole(state.role === 'admin' ? 'viewer' : 'admin');
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo - Always visible */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0 rounded-lg bg-primary-600 p-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 hidden sm:block truncate">
              Finance Dashboard
            </h1>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Add Transaction (Admin only) */}
            {state.role === 'admin' && (
              <Button onClick={() => actions.openModal()} icon={Plus} size="sm" variant="primary">
                Add Transaction
              </Button>
            )}

            {/* Export Dropdown */}
            <div className="relative">
              <Button
                variant="secondary"
                icon={Download}
                size="sm"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                Export
              </Button>
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white dark:bg-neutral-800 shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden">
                  <button
                    onClick={handleExportCSV}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors border-t border-neutral-200 dark:border-neutral-700"
                  >
                    Export as JSON
                  </button>
                </div>
              )}
            </div>

            {/* Reset Data */}
            <Button
              variant="ghost"
              icon={RotateCcw}
              size="sm"
              onClick={actions.resetData}
              title="Reset to default data"
            />

            {/* Dark Mode Toggle */}
            <button
              onClick={actions.toggleDarkMode}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={state.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {state.isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <Button
                variant={state.role === 'admin' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
              >
                {state.role === 'admin' ? 'Admin' : 'Viewer'}
              </Button>
              {showRoleMenu && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-lg bg-white dark:bg-neutral-800 shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 z-50">
                  <button
                    onClick={handleToggleRole}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Switch to {state.role === 'admin' ? 'Viewer' : 'Admin'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-2 border-t border-neutral-200 dark:border-neutral-700">
            {state.role === 'admin' && (
              <Button
                onClick={() => {
                  actions.openModal();
                  setShowMobileMenu(false);
                }}
                icon={Plus}
                fullWidth
                variant="primary"
                size="sm"
              >
                Add Transaction
              </Button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                icon={Download}
                size="sm"
                fullWidth
                onClick={() => {
                  setShowExportMenu(!showExportMenu);
                }}
              >
                Export
              </Button>
              <Button
                variant="ghost"
                icon={RotateCcw}
                size="sm"
                fullWidth
                onClick={() => {
                  actions.resetData();
                  setShowMobileMenu(false);
                }}
              />
            </div>

            {showExportMenu && (
              <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-700 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={handleExportCSV}
                >
                  CSV
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={handleExportJSON}
                >
                  JSON
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 border-t border-neutral-200 dark:border-neutral-700 pt-2">
              <button
                onClick={() => {
                  actions.toggleDarkMode();
                  setShowMobileMenu(false);
                }}
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title={state.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {state.isDarkMode ? (
                  <Sun className="h-5 w-5 mx-auto" />
                ) : (
                  <Moon className="h-5 w-5 mx-auto" />
                )}
              </button>
              <Button
                variant={state.role === 'admin' ? 'primary' : 'secondary'}
                size="sm"
                fullWidth
                onClick={() => {
                  handleToggleRole();
                  setShowMobileMenu(false);
                }}
              >
                {state.role === 'admin' ? 'Admin' : 'Viewer'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
