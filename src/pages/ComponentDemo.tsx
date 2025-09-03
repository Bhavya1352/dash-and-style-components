import React, { useState } from 'react';
import { InputField, DataTable } from '@/components';
import type { Column } from '@/components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const ComponentDemo = () => {
  // InputField demo state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [inputLoading, setInputLoading] = useState(false);

  // DataTable demo state
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const sampleUsers: User[] = [
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
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-13'
    }
  ];

  const userColumns: Column<User>[] = [
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

  const handleSearch = () => {
    setInputLoading(true);
    setTimeout(() => setInputLoading(false), 2000);
  };

  const handleRefreshTable = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Component Library Demo</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern React components built with TypeScript, Tailwind CSS, and best practices.
          </p>
        </div>

        {/* InputField Demo */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-foreground">InputField Component</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Basic Examples */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-foreground">Basic Variants</h3>
              
              <InputField
                label="Outlined (Default)"
                placeholder="Enter your text..."
                helperText="This is helper text"
                variant="outlined"
              />
              
              <InputField
                label="Filled Variant"
                placeholder="Enter your text..."
                helperText="This is helper text"
                variant="filled"
              />
              
              <InputField
                label="Ghost Variant"
                placeholder="Enter your text..."
                helperText="This is helper text"
                variant="ghost"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-foreground">Sizes</h3>
              
              <InputField
                label="Small Size"
                placeholder="Small input..."
                size="sm"
              />
              
              <InputField
                label="Medium Size (Default)"
                placeholder="Medium input..."
                size="md"
              />
              
              <InputField
                label="Large Size"
                placeholder="Large input..."
                size="lg"
              />
            </div>

            {/* States and Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-foreground">States & Features</h3>
              
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                clearable
                onClear={() => setEmail('')}
              />
              
              <InputField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                showPasswordToggle
              />
              
              <InputField
                label="Search with Loading"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                loading={inputLoading}
                clearable
                onClear={() => setSearch('')}
              />
              
              <button 
                onClick={handleSearch}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-md transition-colors"
              >
                Trigger Loading
              </button>
              
              <InputField
                label="Disabled Input"
                placeholder="This is disabled"
                disabled
                helperText="This input is disabled"
              />
              
              <InputField
                label="Error State"
                placeholder="Enter valid data"
                invalid
                errorMessage="This field is required"
              />
            </div>
          </div>
        </section>

        {/* DataTable Demo */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-foreground">DataTable Component</h2>
            <button
              onClick={handleRefreshTable}
              className="px-4 py-2 bg-secondary hover:bg-secondary-hover text-secondary-foreground rounded-md transition-colors"
            >
              Refresh Table
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Interactive data table with sorting, selection, and custom rendering.
              </p>
              {selectedUsers.length > 0 && (
                <p className="text-sm text-primary">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
            
            <DataTable
              data={sampleUsers}
              columns={userColumns}
              loading={tableLoading}
              selectable
              onRowSelect={setSelectedUsers}
              className="w-full"
            />
          </div>

          {/* Selected Users Display */}
          {selectedUsers.length > 0 && (
            <div className="p-4 rounded-md bg-muted space-y-2">
              <h4 className="font-medium text-foreground">Selected Users:</h4>
              <div className="space-y-1">
                {selectedUsers.map((user) => (
                  <div key={user.id} className="text-sm text-muted-foreground">
                    {user.name} ({user.email}) - {user.role}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Empty Table Demo */}
        <section className="space-y-8">
          <h3 className="text-2xl font-semibold text-foreground">Empty State Demo</h3>
          <DataTable
            data={[]}
            columns={userColumns}
            loading={false}
            selectable
            emptyMessage="No users found. Try adding some data!"
            className="w-full"
          />
        </section>
      </div>
    </div>
  );
};

export default ComponentDemo;