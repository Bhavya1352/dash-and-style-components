import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, Check, Loader2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = "No data available",
  rowKey = 'id'
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });

  // Get row key for a record
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index;
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prevState => {
      if (prevState.column === column.key) {
        // Same column: cycle through asc -> desc -> null
        const newDirection: SortDirection = 
          prevState.direction === 'asc' ? 'desc' :
          prevState.direction === 'desc' ? null : 'asc';
        return { column: newDirection ? column.key : null, direction: newDirection };
      } else {
        // Different column: start with asc
        return { column: column.key, direction: 'asc' };
      }
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, index: number) => {
    if (!selectable) return;

    const key = getRowKey(record, index);
    const newSelectedRows = new Set(selectedRows);
    
    if (newSelectedRows.has(key)) {
      newSelectedRows.delete(key);
    } else {
      newSelectedRows.add(key);
    }
    
    setSelectedRows(newSelectedRows);
    
    // Call onRowSelect with the actual row data
    const selectedData = sortedData.filter((row, idx) => 
      newSelectedRows.has(getRowKey(row, idx))
    );
    onRowSelect?.(selectedData);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable) return;

    const allKeys = sortedData.map((record, index) => getRowKey(record, index));
    const isAllSelected = allKeys.every(key => selectedRows.has(key));
    
    if (isAllSelected) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const newSelectedRows = new Set(allKeys);
      setSelectedRows(newSelectedRows);
      onRowSelect?.(sortedData);
    }
  };

  // Check if all rows are selected
  const isAllSelected = sortedData.length > 0 && 
    sortedData.every((record, index) => selectedRows.has(getRowKey(record, index)));
  
  // Check if some rows are selected
  const isSomeSelected = selectedRows.size > 0 && !isAllSelected;

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    
    const isActive = sortState.column === column.key;
    
    if (!isActive) {
      return (
        <div className="flex flex-col ml-1">
          <ChevronUp className="h-3 w-3 text-muted-foreground/50" />
          <ChevronDown className="h-3 w-3 text-muted-foreground/50 -mt-1" />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col ml-1">
        <ChevronUp className={cn(
          "h-3 w-3 -mb-1",
          sortState.direction === 'asc' ? 'text-primary' : 'text-muted-foreground/50'
        )} />
        <ChevronDown className={cn(
          "h-3 w-3",
          sortState.direction === 'desc' ? 'text-primary' : 'text-muted-foreground/50'
        )} />
      </div>
    );
  };

  return (
    <div className={cn('rounded-md border shadow-sm bg-card', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {selectable && (
                <th className="w-12 p-4 text-left">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSelectAll}
                      disabled={loading || data.length === 0}
                      className={cn(
                        "w-4 h-4 rounded border border-input flex items-center justify-center transition-colors",
                        "hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        isAllSelected && "bg-primary border-primary",
                        isSomeSelected && "bg-primary border-primary",
                        loading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isAllSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                      {isSomeSelected && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
                      )}
                    </button>
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    "p-4 text-left font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer hover:text-foreground transition-colors"
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center">
                  <div className="text-muted-foreground">{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRows.has(key);
                
                return (
                  <tr
                    key={key}
                    className={cn(
                      "border-b hover:bg-muted/50 transition-colors",
                      isSelected && "bg-muted/30",
                      selectable && "cursor-pointer"
                    )}
                    onClick={() => selectable && handleRowSelect(record, index)}
                  >
                    {selectable && (
                      <td className="w-12 p-4">
                        <div className="flex items-center justify-center">
                          <div
                            className={cn(
                              "w-4 h-4 rounded border border-input flex items-center justify-center transition-colors",
                              isSelected && "bg-primary border-primary"
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                        </div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="p-4 text-foreground">
                        {column.render
                          ? column.render(record[column.dataIndex], record, index)
                          : String(record[column.dataIndex] ?? '')
                        }
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;