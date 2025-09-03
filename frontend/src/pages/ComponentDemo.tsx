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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Mixed color animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-2xl animate-bounce-subtle" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <nav className="glass sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 hover-lift">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center animate-gradient">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ComponentLib
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  Professional Edition
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">LIVE</span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 animate-pulse-glow">
                <Sparkles className="w-3 h-3 mr-1" />
                v2.0 Pro
              </Badge>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Theme:</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-8 space-y-16">
          {/* Enhanced Hero Section */}
          <div className={`text-center space-y-12 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold animate-float hover-lift">
                <Rocket className="w-4 h-4" />
                <span>Next-Gen Component Library</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="relative">
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Beautiful
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                    Components
                  </span>
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur opacity-30 animate-pulse -z-10"></div>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Crafted with <span className="text-blue-600 dark:text-blue-400 font-semibold">precision</span> using TypeScript, Tailwind CSS, and modern React patterns.
                <br />
                Experience the perfect blend of <span className="text-purple-600 dark:text-purple-400 font-semibold">functionality</span> and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">aesthetics</span>.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {[
                { icon: Shield, text: 'Type Safe', color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300', delay: '0s' },
                { icon: Zap, text: 'Lightning Fast', color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-300', delay: '0.2s' },
                { icon: Palette, text: 'Customizable', color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300', delay: '0.4s' },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 px-5 py-3 rounded-2xl ${feature.color} hover-lift font-semibold border border-white/50 dark:border-gray-700/50 animate-slide-in`}
                  style={{animationDelay: feature.delay}}
                >
                  <feature.icon className="w-5 h-5" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="flex justify-center space-x-12 pt-6">
              {[
                { label: 'Components', value: '2+' },
                { label: 'Variants', value: '10+' },
                { label: 'Tests', value: '25+' },
              ].map((stat, index) => (
                <div key={index} className="text-center hover-lift">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* InputField Demo */}
          <section className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">InputField Component</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Versatile input components with multiple variants, sizes, and interactive states
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Basic Examples */}
              <Card className="hover-lift glass border border-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-700/50 dark:to-purple-700/50 group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3 text-gray-900 dark:text-white">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                      Basic Variants
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Different visual styles for various use cases</CardDescription>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform"></div>
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
              <Card className="hover-lift glass border border-gradient-to-r from-indigo-200/50 to-blue-200/50 dark:from-indigo-700/50 dark:to-blue-700/50 group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3 text-gray-900 dark:text-white">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent font-bold">
                      Size Variants
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Flexible sizing options for different contexts</CardDescription>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full group-hover:scale-110 transition-transform"></div>
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
              <Card className="hover-lift glass border border-gradient-to-r from-green-200/50 to-emerald-200/50 dark:from-green-700/50 dark:to-emerald-700/50 group">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center space-x-3 text-gray-900 dark:text-white">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
                      Interactive States
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Advanced features and state management</CardDescription>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full group-hover:scale-110 transition-transform"></div>
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
                  
                  <button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover-lift animate-gradient"
                  >
                    <Zap className="w-4 h-4 mr-2 inline" />
                    Trigger Loading Effect
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
                </CardContent>
              </Card>
            </div>
          </section>

          {/* DataTable Demo */}
          <section className={`space-y-8 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">DataTable Component</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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

            <Card className="hover-lift glass border border-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-700/50 dark:to-purple-700/50 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all"></div>
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
              <Card className="glass border border-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-700/50 dark:to-purple-700/50 animate-slide-in hover-lift group">
                <CardHeader className="relative">
                  <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    Selected Users ({selectedUsers.length})
                  </CardTitle>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full group-hover:scale-110 transition-transform"></div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {selectedUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-800/50 dark:to-blue-900/20 hover-lift border border-blue-200/30 dark:border-blue-700/30 animate-slide-in"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 border-blue-300 dark:border-blue-600 font-medium">
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
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Empty State Demo</h3>
              <p className="text-gray-600 dark:text-gray-400">Graceful handling of empty data sets</p>
            </div>
            <Card className="hover-lift glass border border-gray-200/50 dark:border-gray-700/50">
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
          <footer className="text-center py-16 space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/20 rounded-t-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center items-center space-x-3 text-lg font-medium">
                <span className="text-gray-600 dark:text-gray-400">Crafted with</span>
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  passion & precision
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                Showcasing modern React development practices
              </p>
              <div className="flex justify-center space-x-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
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