import React, { useState, useEffect } from 'react';
import { InputField, DataTable } from '@/components';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Shield, Palette, Code, Rocket, MessageCircle } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
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
    <div className="min-h-screen bg-mesh relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-primary rounded-full blur-3xl animate-morph opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl animate-float opacity-25" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-success rounded-full blur-2xl animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-cosmic rounded-full blur-3xl animate-gradient opacity-15" style={{animationDelay: '3s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-bounce-subtle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-bounce-subtle" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-secondary rounded-full animate-bounce-subtle" style={{animationDelay: '2.1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <nav className="glass sticky top-0 z-50 border-b custom-shadow">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 hover-glow">
              <div className="w-10 h-10 bg-gradient-cosmic rounded-xl flex items-center justify-center animate-gradient hover-tilt">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer">
                  ComponentLib
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wider">
                  PROFESSIONAL EDITION
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground font-medium">LIVE</span>
              </div>
              <Badge variant="secondary" className="animate-pulse-glow bg-gradient-primary text-white border-0 hover-lift">
                <Sparkles className="w-3 h-3 mr-1" />
                v2.0 PRO
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-8 space-y-16">
          {/* Enhanced Hero Section */}
          <div className={`text-center space-y-12 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full text-sm font-semibold animate-float hover-glow">
                <Rocket className="w-5 h-5 text-primary" />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Next-Gen Component Library
                </span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              <div className="relative">
                <h1 className="text-7xl md:text-8xl font-black bg-gradient-cosmic bg-clip-text text-transparent leading-tight animate-gradient">
                  Beautiful
                  <br />
                  <span className="relative">
                    Components
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur opacity-30 animate-pulse"></div>
                  </span>
                </h1>
              </div>
              
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                Handcrafted with <span className="text-primary font-semibold">precision</span> using TypeScript, Tailwind CSS, and modern React patterns.
                <br />
                Experience the perfect blend of <span className="text-accent font-semibold">functionality</span> and <span className="text-secondary font-semibold">aesthetics</span>.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {[
                { icon: Shield, text: 'Type Safe', color: 'bg-gradient-success', delay: '0s' },
                { icon: Zap, text: 'Lightning Fast', color: 'bg-gradient-secondary', delay: '0.2s' },
                { icon: Palette, text: 'Fully Customizable', color: 'bg-gradient-primary', delay: '0.4s' },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl ${feature.color} text-white font-semibold hover-lift hover-tilt glass animate-slide-in`}
                  style={{animationDelay: feature.delay}}
                >
                  <feature.icon className="w-6 h-6" />
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="flex justify-center space-x-12 pt-8">
              {[
                { label: 'Components', value: '2+' },
                { label: 'Variants', value: '10+' },
                { label: 'Tests', value: '25+' },
              ].map((stat, index) => (
                <div key={index} className="text-center hover-lift">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
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
              <Card className="hover-lift hover-tilt glass border-0 custom-shadow group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-primary rounded-full animate-pulse"></div>
                    <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent font-bold">
                      Basic Variants
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base">Different visual styles for various use cases</CardDescription>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-primary rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
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
              <Card className="hover-lift hover-tilt glass border-0 custom-shadow group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent font-bold">
                      Size Variants
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base">Flexible sizing options for different contexts</CardDescription>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-secondary rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
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
              <Card className="hover-lift hover-tilt glass border-0 custom-shadow group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-success rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent font-bold">
                      Interactive States
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base">Advanced features and state management</CardDescription>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-success rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
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
                    className="w-full bg-gradient-cosmic hover:opacity-90 transition-all duration-300 hover-lift hover-glow text-white font-semibold py-3 rounded-xl"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Trigger Loading Effect
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

            <Card className="hover-lift hover-tilt glass border-0 custom-shadow group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <CardContent className="p-0 relative z-10">
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
              <Card className="glass border-0 custom-shadow animate-slide-in hover-lift group">
                <CardHeader className="relative">
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    Selected Users ({selectedUsers.length})
                  </CardTitle>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-primary rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {selectedUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover-lift hover-glow border border-muted/20 animate-slide-in"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 font-medium">
                          {user.role}
                        </Badge>
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

          {/* Enhanced Footer */}
          <footer className="text-center py-16 space-y-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent rounded-t-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center items-center space-x-3 text-lg font-medium">
                <span className="text-muted-foreground">Crafted with</span>
                <div className="w-6 h-6 bg-gradient-cosmic rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                  passion & precision
                </span>
              </div>
              <p className="text-muted-foreground mt-4 text-lg">
                Showcasing modern React development practices
              </p>
              <div className="flex justify-center space-x-8 mt-8 text-sm text-muted-foreground">
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>React 18</span>
                <span>•</span>
                <span>Storybook</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      {/* ChatBot */}
      <ChatBot 
        botName="ComponentLib Assistant"
        welcomeMessage="Hi! I'm here to help you explore our component library. Ask me anything about our InputField and DataTable components!"
        position="bottom-right"
      />
    </div>
  );
};

export default ComponentDemo;