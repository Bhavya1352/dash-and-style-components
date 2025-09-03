# React Component Library

A modern React component library built with TypeScript, Tailwind CSS, and Storybook. Features two main components: InputField and DataTable.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test
```

## 📦 Components

### InputField

A flexible input component with multiple variants, sizes, and interactive features.

#### Features
- **Variants**: outlined, filled, ghost
- **Sizes**: small, medium, large
- **States**: disabled, invalid, loading
- **Interactive**: clearable, password toggle
- **Validation**: error messages, helper text
- **Accessibility**: ARIA labels, keyboard navigation

#### Usage

```tsx
import { InputField } from './components';

// Basic usage
<InputField
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With validation
<InputField
  label="Password"
  type="password"
  invalid={hasError}
  errorMessage="Password is required"
  showPasswordToggle
/>

// Different variants and sizes
<InputField variant="filled" size="lg" />
<InputField variant="ghost" size="sm" />
```

#### Props

```tsx
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  className?: string;
}
```

### DataTable

An advanced data table component with sorting, selection, and custom rendering.

#### Features
- **Sorting**: Click column headers to sort data
- **Selection**: Single or multiple row selection
- **Custom Rendering**: Custom cell content with render functions
- **States**: loading, empty state
- **Responsive**: Horizontal scroll on small screens
- **Accessibility**: Keyboard navigation, screen reader support

#### Usage

```tsx
import { DataTable } from './components';
import type { Column } from './components';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
        {value}
      </span>
    ),
  },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  // ... more data
];

// Basic usage
<DataTable data={data} columns={columns} />

// With selection
<DataTable
  data={data}
  columns={columns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>

// With loading state
<DataTable data={data} columns={columns} loading />
```

#### Props

```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

## 🎨 Theme Support

Both components support light and dark themes through CSS custom properties.

```tsx
import { ThemeProvider, ThemeToggle } from './components';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="app">
        <ThemeToggle />
        {/* Your components */}
      </div>
    </ThemeProvider>
  );
}
```

## 🧪 Testing

Components are thoroughly tested with Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📚 Storybook

Interactive component documentation and playground:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # Component implementations
│   ├── InputField.tsx   # Input component
│   ├── DataTable.tsx    # Table component
│   ├── ThemeProvider.tsx # Theme context
│   └── index.ts         # Exports
├── stories/             # Storybook stories
├── __tests__/           # Component tests
└── pages/               # Demo pages
```

### Design Principles
- **TypeScript First**: Full type safety with proper interfaces
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive**: Mobile-first design with Tailwind CSS
- **Customizable**: Flexible props and styling options
- **Testable**: Comprehensive test coverage
- **Documented**: Storybook stories with examples

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use in your projects!