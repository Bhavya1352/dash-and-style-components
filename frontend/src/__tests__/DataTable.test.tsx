import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../components/DataTable';
import type { Column } from '../components/DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
];

const testColumns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={testData} columns={testColumns} loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(
      <DataTable 
        data={[]} 
        columns={testColumns} 
        emptyMessage="No data found"
      />
    );
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('handles row selection', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // 3 rows + 1 select all
    
    fireEvent.click(checkboxes[1]); // Click first row checkbox
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('handles select all functionality', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  it('sorts data when column header is clicked', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    const rows = screen.getAllByRole('row');
    // After sorting by name ascending, Bob should be first
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });

  it('renders custom cell content', () => {
    const customColumns: Column<TestData>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value: string) => <strong>{value}</strong>
      }
    ];
    
    render(<DataTable data={testData} columns={customColumns} />);
    
    const strongElement = screen.getByText('John Doe').closest('strong');
    expect(strongElement).toBeInTheDocument();
  });

  it('applies hover styles to rows', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const firstDataRow = screen.getAllByRole('row')[1];
    expect(firstDataRow).toHaveClass('hover:bg-gray-50');
  });

  it('highlights selected rows', () => {
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable
      />
    );
    
    const firstRowCheckbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(firstRowCheckbox);
    
    const firstDataRow = screen.getAllByRole('row')[1];
    expect(firstDataRow).toHaveClass('bg-blue-50');
  });

  it('handles sorting in both directions', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name');
    
    // First click - ascending
    fireEvent.click(nameHeader);
    let rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson');
    
    // Second click - descending
    fireEvent.click(nameHeader);
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe');
    
    // Third click - no sorting
    fireEvent.click(nameHeader);
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe'); // Back to original order
  });
});