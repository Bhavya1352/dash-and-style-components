import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import DataTable from '../components/DataTable';
import type { Column } from '../components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '2024-01-10'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16'
  },
];

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
    width: '200px'
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
    width: '250px'
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
    width: '150px',
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Admin' ? 'bg-destructive/10 text-destructive' :
        value === 'Moderator' ? 'bg-warning/10 text-warning' :
        'bg-primary/10 text-primary'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    width: '120px',
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString()
  }
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, selection, loading states, and custom cell rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when no data is available',
    },
  },
  args: {
    // onRowSelect: action('onRowSelect'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: sampleData,
    columns: columns,
    loading: true,
    selectable: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    selectable: true,
    emptyMessage: 'No users found. Try adding some data!',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: 'Your custom empty state message here',
  },
};

export const SimpleColumns: Story = {
  args: {
    data: sampleData,
    columns: [
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
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
        sortable: false,
      },
    ],
    selectable: true,
  },
};

export const NonSortable: Story = {
  args: {
    data: sampleData,
    columns: columns.map(col => ({ ...col, sortable: false })),
  },
};