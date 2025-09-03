import React, { useState, useEffect } from 'react';
import { InputField, DataTable } from '@/components';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Shield, Palette, Code, Rocket } from 'lucide-react';
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
  // Component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="glass sticky top-0 z-50 border-b">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ComponentLib
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="animate-pulse-glow">
                <Sparkles className="w-3 h-3 mr-1" />
                v2.0
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-8 space-y-16">
          {/* Hero Section */}
          <div className={`text-center space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-float">
                <Rocket className="w-4 h-4" />
                <span>Modern Component Library</span>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight">
                Beautiful Components
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Crafted with precision using TypeScript, Tailwind CSS, and modern React patterns.
                Experience the perfect blend of functionality and aesthetics.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {[
                { icon: Shield, text: 'Type Safe', color: 'bg-green-500/10 text-green-600' },
                { icon: Zap, text: 'Fast', color: 'bg-yellow-500/10 text-yellow-600' },
                { icon: Palette, text: 'Customizable', color: 'bg-purple-500/10 text-purple-600' },
              ].map((feature, index) => (
                <div key={index} className={`flex items-center space-x-2 px-4 py-2 rounded-full ${feature.color} hover-lift`}>
                  <feature.icon className="w-4 h-4" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* InputField Demo */}
          <section className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">InputField Component</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Versatile input components with multiple variants, sizes, and interactive states
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Basic Examples */}
              <Card className="hover-lift glass border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Basic Variants</span>
                  </CardTitle>
                  <CardDescription>Different visual styles for various use cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
              </Card>

              {/* Sizes */}
              <Card className="hover-lift glass border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span>Size Variants</span>
                  </CardTitle>
                  <CardDescription>Flexible sizing options for different contexts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
              </Card>

              {/* States and Features */}
              <Card className="hover-lift glass border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span>Interactive States</span>
                  </CardTitle>
                  <CardDescription>Advanced features and state management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover-lift"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Trigger Loading
                  </Button>
                  
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
                </CardContent>
              </Card>
            </div>
          </section>

          {/* DataTable Demo */}
          <section className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">DataTable Component</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced data table with sorting, selection, and beautiful rendering
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {selectedUsers.length > 0 && (
                  <Badge variant="secondary" className="animate-pulse-glow">
                    {selectedUsers.length} selected
                  </Badge>
                )}
              </div>
              <Button
                onClick={handleRefreshTable}
                variant="outline"
                className="hover-lift"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Refresh Table
              </Button>
            </div>

            <Card className="hover-lift glass border-0 shadow-xl">
              <CardContent className="p-0">
                <DataTable
                  data={sampleUsers}
                  columns={userColumns}
                  loading={tableLoading}
                  selectable
                  onRowSelect={setSelectedUsers}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Selected Users Display */}
            {selectedUsers.length > 0 && (
              <Card className="glass border-0 shadow-lg animate-slide-in">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {selectedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-lift">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Empty Table Demo */}
          <section className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Empty State Demo</h3>
              <p className="text-muted-foreground">Graceful handling of empty data sets</p>
            </div>
            <Card className="hover-lift glass border-0 shadow-xl">
              <CardContent className="p-0">
                <DataTable
                  data={[]}
                  columns={userColumns}
                  loading={false}
                  selectable
                  emptyMessage="No users found. Try adding some data!"
                  className="w-full"
                />
              </CardContent>
            </Card>
          </section>

          {/* Footer */}
          <footer className="text-center py-12 space-y-4">
            <div className="flex justify-center items-center space-x-2 text-muted-foreground">
              <span>Built with</span>
              <div className="w-4 h-4 bg-gradient-secondary rounded animate-pulse"></div>
              <span>by a passionate developer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Showcasing modern React development practices
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ComponentDemo;