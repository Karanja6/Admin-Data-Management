import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { User } from '../App';
import { BarChart3, Shield, Users, Database, TrendingUp, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  isAnalyticalPlatform?: boolean;
}

export function AuthScreen({ onLogin, isAnalyticalPlatform = false }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo authentication logic
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo users for the analytical platform
    const demoUsers = {
      'admin@heva.org': {
        id: 'admin-1',
        name: 'Sarah Mwangi',
        role: 'admin' as const,
        email: 'admin@heva.org',
        department: 'Administration',
        location: 'Nairobi, Kenya'
      },
      'analyst@heva.org': {
        id: 'analyst-1',
        name: 'James Kiprotich',
        role: 'analyst' as const,
        email: 'analyst@heva.org',
        department: 'Data Analytics',
        location: 'Kampala, Uganda'
      },
      'program@heva.org': {
        id: 'program-1',
        name: 'Grace Njeri',
        role: 'program_officer' as const,
        email: 'program@heva.org',
        department: 'Program Management',
        location: 'Kigali, Rwanda'
      }
    };

    const user = demoUsers[email as keyof typeof demoUsers];
    
    if (user && password === 'demo123') {
      onLogin(user);
    } else {
      setError('Invalid credentials. Try admin@heva.org, analyst@heva.org, or program@heva.org with password: demo123');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HEVA Analytics
            </h1>
            <p className="text-sm text-muted-foreground">Data Platform</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Welcome to HEVA Analytics Platform</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive data collection, analysis, and visualization for funding programs across East Africa
          </p>
        </div>
      </div>

      {/* Platform Features */}
      <div className="w-full max-w-4xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card border">
            <Database className="w-8 h-8 text-primary" />
            <h3 className="font-medium text-sm">Data Collection</h3>
            <p className="text-xs text-muted-foreground">Comprehensive intake forms</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card border">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h3 className="font-medium text-sm">Analytics</h3>
            <p className="text-xs text-muted-foreground">Real-time insights & trends</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card border">
            <Shield className="w-8 h-8 text-primary" />
            <h3 className="font-medium text-sm">Document Management</h3>
            <p className="text-xs text-muted-foreground">Cloud storage integration</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card border">
            <Users className="w-8 h-8 text-primary" />
            <h3 className="font-medium text-sm">Multi-Country</h3>
            <p className="text-xs text-muted-foreground">Kenya, Uganda, Rwanda +</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the analytics platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Demo Credentials
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Admin:</span>
                <Badge variant="outline">admin@heva.org</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Analyst:</span>
                <Badge variant="outline">analyst@heva.org</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Program Officer:</span>
                <Badge variant="outline">program@heva.org</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Password:</span>
                <Badge variant="outline">demo123</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>HEVA CreativeHub Analytics Platform</p>
        <p>Supporting entrepreneurship across East Africa</p>
      </div>
    </div>
  );
}