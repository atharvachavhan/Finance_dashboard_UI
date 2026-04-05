# Finance Dashboard

[Live demo](https://fin-dash-ui.netlify.app) • [Source on GitHub](https://github.com/atharvachavhan/Finance_dashboard_UI)

A clean, interactive finance dashboard built with React, TypeScript, and Tailwind CSS for tracking and understanding financial activity.

## Features

### Core Requirements Met
- **Dashboard Overview**: Summary cards showing Total Balance, Income, Expenses, and Savings Rate
- **Time-based Visualization**: Interactive line chart displaying balance trends over time
- **Categorical Visualization**: Pie/doughnut chart showing spending breakdown by category
- **Transactions Section**: Full transaction list with date, amount, category, and type
- **Filtering & Sorting**: Search by description, filter by category/type, and date range filtering
- **Role-Based UI**: Viewer (read-only) and Admin (add/edit/delete) roles with easy switching
- **Insights Panel**: Shows highest spending category, monthly comparison, top expense, and average daily spending
- **State Management**: Centralized application state using React Context with useReducer

### Optional Enhancements Included
- **Dark Mode**: Full dark mode support with system preference detection and manual toggle
- **Data Persistence**: All data persisted to localStorage
- **Animations**: Smooth fade, slide, and scale animations throughout the UI
- **Export Functionality**: Export transactions to CSV or JSON formats
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop screens
- **Empty States**: Graceful handling of empty data scenarios with helpful messages
- **Form Validation**: Client-side validation for transaction inputs

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 8.0
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **State Management**: React Context API + useReducer

## Project Structure

```
finance-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Card, Button, Badge, EmptyState)
│   │   ├── dashboard/       # Dashboard overview components
│   │   ├── transactions/    # Transaction list, filters, and form components
│   │   └── layout/          # Header and layout components
│   ├── context/             # Application context and state management
│   ├── types/               # TypeScript type definitions
│   ├── data/                # Mock data and constants
│   ├── utils/               # Helper functions (formatting, calculations, exports)
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind directives
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## Usage

### Dashboard Overview
The dashboard provides an at-a-glance view of your financial health:
- **Total Balance**: Shows current net balance (income minus expenses)
- **Total Income**: Cumulative income across all transactions
- **Total Expenses**: Cumulative expenses across all transactions
- **Savings Rate**: Percentage of income saved this month

### Visualizations
- **Balance Trend Chart**: Shows how your balance changes over time with hover tooltips
- **Spending Breakdown Chart**: Displays expenses by category with percentage breakdown

### Transactions
- View all transactions in a responsive table (desktop) or card list (mobile) format
- Sort by date, amount, description, or category
- Filter by transaction type (income/expense)
- Filter by category
- Search transactions by description
- Filter by date range
- Add, edit, or delete transactions (Admin role only)

### Role Management
Switch between two roles:
- **Viewer**: Can only view data - no editing capabilities
- **Admin**: Full access to add, edit, and delete transactions

Click the role button in the header to switch between roles.

### Data Management
- **Export**: Click the Export button to download transactions as CSV or JSON
- **Reset**: Click the reset button to restore default mock data
- **Dark Mode**: Toggle dark/light mode in the header

All changes are automatically saved to localStorage, so your data persists across browser sessions.

## Design & UX Highlights

### Responsive Design
- **Mobile (< 640px)**: Card-based transaction list, stacked layout, hamburger menu
- **Tablet (640px - 1024px)**: Condensed table view, two-column grid for insights
- **Desktop (> 1024px)**: Full table view, three-column grid for summary cards

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- High contrast color support in dark mode

### Micro-interactions
- Hover effects on cards and buttons
- Smooth transitions between states
- Loading states for async operations
- Animated modal for add/edit transactions
- Role switcher with clear visual feedback

### Empty State Handling
- Helpful messages when no transactions match filters
- Guidance to add first transaction
- Graceful degradation when no data is available

## State Management Approach

The application uses React Context with useReducer for centralized state management:

### State Structure
```typescript
interface AppState {
  transactions: Transaction[];      // All transactions
  filters: FilterState;              // Current filter settings
  role: UserRole;                    // Current user role (viewer/admin)
  isDarkMode: boolean;              // Dark mode toggle state
  isLoading: boolean;                 // Loading state
  isModalOpen: boolean;              // Modal visibility
  editingTransaction: Transaction | null; // Transaction being edited
}
```

### Actions Available
- `addTransaction` - Add a new transaction
- `updateTransaction` - Update an existing transaction
- `deleteTransaction` - Delete a transaction
- `setFilters` - Update filter settings
- `clearFilters` - Reset all filters
- `setRole` - Switch user role
- `toggleDarkMode` - Toggle dark mode
- `openModal` - Open add/edit modal
- `closeModal` - Close modal
- `resetData` - Reset to default mock data

### Persistence Strategy
- All state is persisted to localStorage
- Automatic save on state changes
- Automatic restore on page load
- Separate storage for transactions, filters, role, and dark mode

## Mock Data

The dashboard includes realistic mock data spanning 4 months (January - April 2026) with:
- ~50 transactions
- Mix of income (Salary, Freelance, Investment, Bonus)
- Mix of expenses (Food, Transportation, Shopping, Entertainment, Bills, Healthcare, Education)
- Realistic patterns (monthly rent on 1st, salary mid-month, etc.)

## Customization

### Adding Categories
Edit `src/data/mockData.ts` to add or modify expense categories:
```typescript
export const CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Investment',
  // ... add your categories
];
```

### Modifying Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      danger: { /* your colors */ },
    },
  },
}
```

## Future Enhancements (Out of Scope)

While this is an evaluation project, potential production enhancements could include:
- Real API integration for transaction data
- User authentication
- Multiple currency support
- Transaction categorization with ML
- Budget planning features
- Recurring transactions automation
- Bank account integration
- Transaction split/receipt upload
- Advanced analytics and reporting

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Virtual scrolling for large transaction lists (could be added)
- Code splitting for smaller bundles
- Lazy loading for chart components (could be added)
- Optimized images and assets

## License

MIT License - Feel free to use this project for learning or as a starting point.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
