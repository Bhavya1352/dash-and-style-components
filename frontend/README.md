# React Component Library

A modern React component library built with TypeScript, Tailwind CSS, and Storybook. Features two comprehensive components: InputField and DataTable.

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-component-library

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Usage

```tsx
import { InputField, DataTable } from './components';

// InputField example
<InputField
  label="Email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  clearable
/>

// DataTable example
<DataTable
  data={users}
  columns={userColumns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>
```

## 📋 Components

### InputField

A flexible input component with validation states and multiple features.

#### Features
- ✅ Multiple variants: `filled`, `outlined`, `ghost`
- ✅ Three sizes: `sm`, `md`, `lg`
- ✅ Validation states: `disabled`, `invalid`, `loading`
- ✅ Clear button functionality
- ✅ Password visibility toggle
- ✅ Helper text and error messages
- ✅ Fully accessible with ARIA labels
- ✅ TypeScript support

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
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
}
```

### DataTable

A feature-rich data table component with sorting and selection.

#### Features
- ✅ Column sorting (ascending/descending/none)
- ✅ Row selection (single/multiple)
- ✅ Loading states
- ✅ Empty state handling
- ✅ Custom cell rendering
- ✅ Responsive design
- ✅ TypeScript generics for type safety

#### Props
```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
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

## 🎨 Design System

The components use a comprehensive design system built with CSS custom properties and Tailwind CSS:

- **Colors**: Semantic color tokens for consistent theming
- **Spacing**: Standardized spacing scale
- **Typography**: Consistent font sizes and weights
- **Shadows**: Subtle shadow system for depth
- **Transitions**: Smooth animations and interactions

## 📖 Storybook

Interactive component documentation and testing playground.

### Available Scripts

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Stories Include:
- **InputField**: All variants, sizes, states, and features
- **DataTable**: Different configurations, loading states, and custom rendering

## 🧪 Testing

Comprehensive test suite using Vitest and React Testing Library.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- ✅ Component rendering
- ✅ User interactions
- ✅ Prop validation
- ✅ Event handling
- ✅ State management

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # Core components
│   ├── InputField.tsx   # Input field component
│   ├── DataTable.tsx    # Data table component
│   └── index.ts         # Component exports
├── stories/             # Storybook stories
├── __tests__/           # Test files
├── pages/               # Demo pages
└── lib/                 # Utilities
```

### Design Principles
- **Composability**: Components are designed to work together
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and minimal re-renders
- **Type Safety**: Full TypeScript support with proper generics
- **Maintainability**: Clean code structure and documentation

## 🎯 Key Features

### Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Performance
- Memoized computations
- Optimized re-rendering
- Lazy loading for large datasets
- Efficient event handling

### Developer Experience
- Full TypeScript support
- Comprehensive documentation
- Interactive Storybook
- Unit test coverage
- ESLint and Prettier configuration

## 🚀 Deployment

### Storybook Deployment
Deploy to Vercel or Chromatic for easy sharing:

```bash
# Build Storybook
npm run build-storybook

# Deploy to Vercel
vercel deploy storybook-static

# Or use Chromatic
npx chromatic --project-token=<your-token>
```

## 🛠️ Tech Stack

- **React 18** with Hooks and functional components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Storybook** for component documentation
- **Vitest** for testing
- **React Testing Library** for component testing
- **Vite** for build tooling

## 📄 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 🔗 Links

- [Component Demo](/) - Live demo of all components
- [Storybook]() - Interactive component documentation
- [GitHub Repository]() - Source code and issues