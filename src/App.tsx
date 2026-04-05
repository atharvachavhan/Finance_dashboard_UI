import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceChart } from './components/dashboard/BalanceChart';
import { SpendingChart } from './components/dashboard/SpendingChart';
import { InsightsPanel } from './components/dashboard/InsightsPanel';
import { TransactionFilters } from './components/transactions/TransactionFilters';
import { TransactionList } from './components/transactions/TransactionList';
import { TransactionForm } from './components/transactions/TransactionForm';
import { BarChart3, TrendingUp, Lightbulb } from 'lucide-react';

function DashboardContent() {
   return (
     <>
       <Header />
 
       <main className="flex-1">
         {/* Hero/Welcome section */}
         <div className="border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
             <div className="mb-8">
               <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Welcome back!</h2>
               <p className="text-neutral-600 dark:text-neutral-400">Here's an overview of your financial activity.</p>
             </div>
 
             {/* Summary Cards */}
             <SummaryCards />
           </div>
         </div>
 
         {/* Charts and Insights Section */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
           {/* Charts Grid */}
           <section className="mb-12">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                 <BarChart3 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
               </div>
               <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                 Analytics
               </h3>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
               <BalanceChart />
               <SpendingChart />
             </div>
           </section>
 
           {/* Insights Section */}
           <section className="mb-12">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                 <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
               </div>
               <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                 Insights
               </h3>
             </div>
             <InsightsPanel />
           </section>
         </div>
 
         {/* Transactions Section */}
         <section className="border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                 <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
               </div>
               <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                 Transactions
               </h3>
             </div>
 
             <div className="space-y-6">
               <TransactionFilters />
               <TransactionList />
             </div>
           </div>
         </section>
 
         {/* Footer */}
         <footer className="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-8">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
             <p className="text-sm text-neutral-600 dark:text-neutral-400">
               Finance Dashboard &copy; 2026 | Built with React, TypeScript & Tailwind CSS
             </p>
             <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
               📱 Optimized for mobile, tablet, and desktop
             </p>
           </div>
         </footer>
       </main>
 
       {/* Transaction Form Modal */}
       <TransactionForm />
     </>
   );
 }
 
 function App() {
   return (
     <AppProvider>
       <Layout>
         <DashboardContent />
       </Layout>
     </AppProvider>
   );
 }
 
 export default App;
