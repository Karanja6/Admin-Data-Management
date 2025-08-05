import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  User as UserIcon,
  Building,
  Info,
  Shield
} from 'lucide-react';
import { User, UserRole } from '../App';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  isAnalyticalPlatform?: boolean;
}

export function AuthScreen({ onLogin, isAnalyticalPlatform = false }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const validateEmailDomain = (email: string): { isValid: boolean; userType: UserRole | null; message: string } => {
    const emailLower = email.toLowerCase();
    
    if (emailLower.endsWith('@gmail.com')) {
      return {
        isValid: true,
        userType: 'entrepreneur',
        message: 'Gmail accounts are granted Entrepreneur access'
      };
    } else if (emailLower.endsWith('@heva.analyst.org')) {
      return {
        isValid: true,
        userType: 'analyst',
        message: 'HEVA analyst accounts are granted Analyst access'
      };
    } else if (emailLower.endsWith('@heva.org')) {
      return {
        isValid: true,
        userType: 'admin',
        message: 'HEVA organization accounts are granted Admin access'
      };
    } else {
      return {
        isValid: false,
        userType: null,
        message: 'Email domain not recognized. Please use @gmail.com for entrepreneurs or @heva.org for staff.'
      };
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate domain and determine user type
    const validation = validateEmailDomain(email);
    if (!validation.isValid) {
      setError(validation.message);
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      // Mock user data based on email domain - FIXED: Updated analyst email to match App.tsx validation
      const mockUsers: Record<string, Partial<User>> = {
        'admin@heva.org': {
          id: 'admin-001',
          name: 'John Kamau',
          role: 'admin',
          email: 'admin@heva.org',
          department: 'Administration',
          location: 'Nairobi, Kenya'
        },
        'analyst@heva.analyst.org': {
          id: 'analyst-001',
          name: 'Sarah Njeri',
          role: 'analyst',
          email: 'analyst@heva.analyst.org',
          department: 'Data Analytics',
          location: 'Nairobi, Kenya'
        },
        'entrepreneur@gmail.com': {
          id: 'ent-001',
          name: 'Grace Wanjiku',
          role: 'entrepreneur',
          email: 'entrepreneur@gmail.com',
          businessInfo: {
            businessName: 'Wanjiku Fashion House',
            valueChain: 'Fashion',
            registrationNumber: 'BN-2023-001',
            employees: 8,
            currentRevenue: 15000,
            establishedYear: 2020
          },
          applicationStatus: {
            hasActiveApplication: true,
            currentStage: 'Under Review',
            lastUpdate: new Date().toISOString(),
            applicationId: 'APP-2024-001'
          }
        }
      };

      // Check if user exists, otherwise create new user with role based on domain
      const existingUser = mockUsers[email.toLowerCase()];
      const userData: User = existingUser ? {
        ...existingUser as User
      } : {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: validation.userType!,
        email: email,
        ...(validation.userType === 'entrepreneur' && {
          businessInfo: {
            businessName: 'My Creative Business',
            valueChain: 'Fashion',
            employees: 1,
            establishedYear: new Date().getFullYear()
          },
          applicationStatus: {
            hasActiveApplication: false,
            currentStage: 'Not Started',
            lastUpdate: new Date().toISOString(),
            applicationId: null
          }
        })
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const emailValidation = email ? validateEmailDomain(email) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-teal-400-foreground text-white font-bold text-xl">H</span>
          </div>
          <h1 className="text-2xl font-semibold">HEVA CreativeHub</h1>
          <p className="text-muted-foreground">
            {isAnalyticalPlatform ? 'Analytical Platform Login' : 'Creative Entrepreneur Platform'}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="info">Access Info</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Welcome Back</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className="pl-10"
                        required
                      />
                    </div>
                    {emailValidation && (
                      <div className="flex items-center space-x-2">
                        {emailValidation.isValid ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${
                          emailValidation.isValid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {emailValidation.message}
                        </span>
                      </div>
                    )}
                    {emailValidation?.isValid && (
                      <Badge variant={emailValidation.userType === 'entrepreneur' ? 'secondary' : 'default'}>
                        {emailValidation.userType === 'entrepreneur' ? (
                          <>
                            <UserIcon className="w-3 h-3 mr-1" />
                            Entrepreneur Access
                          </>
                        ) : (
                          <>
                            <Building className="w-3 h-3 mr-1" />
                            {emailValidation.userType === 'admin' ? 'Admin' : 'Analyst'} Access
                          </>
                        )}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-teal-400"
                    disabled={isLoading || !emailValidation?.isValid}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                {/* Demo Accounts - FIXED: Updated analyst demo email */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <p className="text-sm text-muted-foreground text-center">Demo Accounts:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmail('admin@heva.org');
                        setPassword('demo123');
                      }}
                      className="text-xs"
                    >
                      <Building className="w-3 h-3 mr-2" />
                      Admin Demo (admin@heva.org)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmail('analyst@heva.analyst.org');
                        setPassword('demo123');
                      }}
                      className="text-xs"
                    >
                      <Building className="w-3 h-3 mr-2" />
                      Analyst Demo (analyst@heva.analyst.org)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmail('entrepreneur@gmail.com');
                        setPassword('demo123');
                      }}
                      className="text-xs"
                    >
                      <UserIcon className="w-3 h-3 mr-2" />
                      Entrepreneur Demo (entrepreneur@gmail.com)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Access Control Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h3 className="font-medium flex items-center space-x-2 mb-2">
                      <UserIcon className="w-4 h-4 text-secondary" />
                      <span>Entrepreneur Access</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Email addresses ending with <code className="bg-background px-1 rounded">@gmail.com</code>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Submit and track funding applications</li>
                      <li>• Upload documents and reports</li>
                      <li>• Access learning resources</li>
                      <li>• View application status and timeline</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-medium flex items-center space-x-2 mb-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span>Admin/Staff Access</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Email addresses ending with <code className="bg-background px-1 rounded">@heva.org</code>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Review and manage applications</li>
                      <li>• Access analytics and reporting</li>
                      <li>• Manage users and partners</li>
                      <li>• Configure system settings</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium flex items-center space-x-2 mb-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span>Analyst Access</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Email addresses ending with <code className="bg-background px-1 rounded">@heva.analyst.org</code>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Advanced data analytics and insights</li>
                      <li>• Generate comprehensive reports</li>
                      <li>• Monitor trends and performance</li>
                      <li>• Export data for analysis</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span>Security Note</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access is automatically determined by your email domain. Cross-dashboard access is 
                      not permitted to ensure data security and role-appropriate functionality.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveTab('login')}
                >
                  Back to Login
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Secure access to HEVA's creative economy platform</p>
        </div>
      </div>
    </div>
  );
}
