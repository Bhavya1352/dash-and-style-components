import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../components/DataTable';
import type { Column } from '../components/DataTable';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ChevronUp: () => <div data-testid="chevron-up">ChevronUp</div>,
  ChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  Loader2: () => <div data-testid="loader-icon">Loader</div>,
}));

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const testColumns: Column<TestData>[] = [
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
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sortable: false,
  },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(
      <DataTable data={testData} columns={testColumns} />
    );
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    
    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataTable data={testData} columns={testColumns} loading />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(
      <DataTable 
        data={[]} 
        columns={testColumns} 
        emptyMessage="No data available" 
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders selection checkboxes when selectable', () => {
    render(
      <DataTable data={testData} columns={testColumns} selectable />
    );
    
    const checkboxes = screen.getAllByRole('button');
    // Should have header checkbox + one per row
    expect(checkboxes).toHaveLength(testData.length + 1);
  });

  it('calls onRowSelect when row is selected', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    // Click on first row
    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('sorts data when sortable column header is clicked', () => {
    render(
      <DataTable data={testData} columns={testColumns} />
    );
    
    const nameHeader = screen.getByText('Name').closest('th');
    fireEvent.click(nameHeader!);
    
    // Check if data is sorted - Bob Johnson should come first alphabetically
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });

  it('does not sort when non-sortable column header is clicked', () => {
    render(
      <DataTable data={testData} columns={testColumns} />
    );
    
    const ageHeader = screen.getByText('Age').closest('th');
    fireEvent.click(ageHeader!);
    
    // Data should remain in original order
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe');
  });

  it('selects all rows when header checkbox is clicked', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    const headerCheckbox = screen.getAllByRole('button')[0];
    fireEvent.click(headerCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  it('renders custom cell content', () => {
    const customColumns: Column<TestData>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value) => <strong data-testid="custom-name">{value}</strong>,
      },
    ];
    
    render(
      <DataTable data={testData} columns={customColumns} />
    );
    
    expect(screen.getByTestId('custom-name')).toBeInTheDocument();
    expect(screen.getByTestId('custom-name')).toHaveTextContent('John Doe');
  });

  it('applies correct row key', () => {
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        rowKey={(record) => `user-${record.id}`}
      />
    );
    
    const rows = screen.getAllByRole('row');
    // Should have header + data rows
    expect(rows).toHaveLength(testData.length + 1);
  });
});