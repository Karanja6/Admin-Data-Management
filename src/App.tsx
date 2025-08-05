import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalystDashboard } from './components/AnalystDashboard';
import { EntrepreneurDashboard } from './components/EntrepreneurDashboard';
import { GlobalHeader } from './components/GlobalHeader';
import { ThemeProvider } from './components/ThemeProvider';
import { DataProvider } from './contexts/DataContext';
import { RealtimeProvider } from './contexts/RealtimeContext';
import { NotificationProvider, MobileNotificationToast } from './services/NotificationService';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export type UserRole = 'admin' | 'analyst' | 'program_officer' | 'entrepreneur';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  profilePicture?: string;
  department?: string;
  location?: string;
  dateJoined?: string;
  lastActive?: string;
  permissions?: {
    dataEntry: boolean;
    dataView: boolean;
    dataExport: boolean;
    userManagement: boolean;
    systemConfig: boolean;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language?: string;
    defaultCountry?: string;
    defaultView?: string;
  };
  // Entrepreneur-specific fields
  businessInfo?: {
    businessName?: string;
    valueChain?: string;
    registrationNumber?: string;
    employees?: number;
    currentRevenue?: number;
    establishedYear?: number;
  };
  applicationStatus?: {
    hasActiveApplication?: boolean;
    currentStage?: string;
    lastUpdate?: string;
    applicationId?: string;
  };
  consentInfo?: {
    dataProcessingConsent: boolean;
    marketingConsent: boolean;
    consentDate: string;
    consentVersion: string;
  };
}

export interface Application {
  id: string;
  applicantId: string;
  status: 'pending' | 'under_review' | 'shortlisted' | 'approved' | 'rejected' | 'flagged';
  submissionDate: string;
  country: string;
  valueChain: string;
  loanType: string;
  requestedAmount: number;
  // Bio Data
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  age: number;
  region: string;
  education: string;
  experience: number;
  // Business Data
  businessName: string;
  businessType: string;
  registrationNumber?: string;
  yearsInOperation: number;
  employees: number;
  currentRevenue?: number;
  // Location Data
  latitude?: number;
  longitude?: number;
  locationDescription?: string;
  // Social Links
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  // Proposal & Financial
  loanPurpose: string;
  businessPlan?: string;
  financialProjections?: string;
  collateral?: string;
  objective?: string;
  justification?: string;
  marketAnalysis?: string;
  // Non-Financial Needs
  nonFinancialNeeds?: {
    mentorship?: string[];
    training?: string[];
    networking?: string[];
    marketing?: string[];
    technical?: string[];
  };
  // Documents
  documents: {
    registrationCertificate?: string;
    financialStatements?: string;
    businessPlan?: string;
    collateralDocuments?: string;
    photos?: string[];
    invoices?: string[];
  };
  // Review Data
  reviewedBy?: string;
  reviewDate?: string;
  reviewNotes?: string;
  riskAssessment?: 'low' | 'medium' | 'high';
  // M&E Data
  lastUpdate?: string;
  revenueGrowth?: number;
  employmentGrowth?: number;
  milestones?: string[];
  // ML Insights
  mlInsights?: {
    riskScore?: number;
    eligibilityScore?: number;
    recommendedLoanType?: string;
    missingDocuments?: string[];
    improvementSuggestions?: string[];
  };
  // Consent & Compliance
  consentLogs?: Array<{
    type: string;
    granted: boolean;
    timestamp: string;
    version: string;
    ipAddress?: string;
  }>;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('heva_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Validate that the user data is still valid and the email domain is correct
        if (validateUserAccess(userData)) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('heva_user');
        }
      } catch (error) {
        localStorage.removeItem('heva_user');
      }
    }
  }, []);

  const validateUserAccess = (userData: User): boolean => {
    const email = userData.email.toLowerCase();
    const expectedRole = getUserRoleFromEmail(email);
    
    // Validate that the user's role matches their email domain
    return userData.role === expectedRole;
  };

  const getUserRoleFromEmail = (email: string): UserRole => {
    if (email.endsWith('@gmail.com')) {
      return 'entrepreneur';
    } else if (email.endsWith('@heva.org')) {
      return 'admin';
    } else if (email.endsWith('@heva.analyst.org')) {
      return 'analyst';
    } else {
      // Default fallback - should not happen with proper validation
      return 'entrepreneur';
    }
  };

  const handleLogin = (userData: User) => {
    // Ensure the user role matches their email domain
    const expectedRole = getUserRoleFromEmail(userData.email.toLowerCase());
    if (userData.role !== expectedRole) {
      console.error('User role does not match email domain');
      return;
    }

    // Add default preferences and permissions based on role
    const enhancedUser: User = {
      ...userData,
      dateJoined: userData.dateJoined || '2023-08-15',
      lastActive: new Date().toISOString(),
      permissions: {
        dataEntry: userData.role === 'admin' || userData.role === 'program_officer',
        dataView: userData.role !== 'entrepreneur',
        dataExport: userData.role === 'admin' || userData.role === 'analyst',
        userManagement: userData.role === 'admin',
        systemConfig: userData.role === 'admin'
      },
      preferences: {
        theme: (userData.preferences?.theme as 'light' | 'dark' | 'system') || 'system',
        notifications: {
          email: userData.preferences?.notifications?.email ?? true,
          push: userData.preferences?.notifications?.push ?? true,
          sms: userData.preferences?.notifications?.sms ?? false
        },
        language: userData.preferences?.language || 'en',
        defaultCountry: userData.preferences?.defaultCountry || 'kenya',
        defaultView: userData.preferences?.defaultView || (userData.role === 'entrepreneur' ? 'my-application' : 'dashboard')
      },
      // Add role-specific data
      ...(userData.role === 'admin' && {
        department: userData.department || 'Administration',
        location: userData.location || 'Nairobi, Kenya'
      }),
      ...(userData.role === 'analyst' && {
        department: userData.department || 'Data Analytics',
        location: userData.location || 'Nairobi, Kenya'
      }),
      ...(userData.role === 'program_officer' && {
        department: userData.department || 'Program Management',
        location: userData.location || 'Nairobi, Kenya'
      }),
      ...(userData.role === 'entrepreneur' && {
        businessInfo: userData.businessInfo || {
          businessName: 'My Creative Business',
          valueChain: 'Fashion',
          employees: 3,
          establishedYear: 2023
        },
        applicationStatus: userData.applicationStatus || {
          hasActiveApplication: true,
          currentStage: 'Under Review',
          lastUpdate: new Date().toISOString(),
          applicationId: 'APP-001'
        },
        consentInfo: userData.consentInfo || {
          dataProcessingConsent: true,
          marketingConsent: true,
          consentDate: new Date().toISOString(),
          consentVersion: '1.0'
        }
      })
    };
    
    // Store user data in localStorage for persistence
    localStorage.setItem('heva_user', JSON.stringify(enhancedUser));
    
    setUser(enhancedUser);
    setIsAuthenticated(true);
  };

  const handleUserUpdate = (updatedUser: User) => {
    // Validate that the update maintains proper access control
    if (!validateUserAccess(updatedUser)) {
      console.error('Invalid user update - access control violation');
      return;
    }

    // Update localStorage
    localStorage.setItem('heva_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('heva_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Apply theme on user change
  useEffect(() => {
    if (user?.preferences?.theme) {
      const theme = user.preferences.theme;
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.remove('dark');
      } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  }, [user?.preferences?.theme]);

  if (!isAuthenticated || !user) {
    return (
      <ThemeProvider>
        <NotificationProvider>
          <AuthScreen 
            onLogin={handleLogin}
            isAnalyticalPlatform={true}
          />
          <MobileNotificationToast />
          <PWAInstallPrompt />
        </NotificationProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <RealtimeProvider>
          <DataProvider>
            <div className="min-h-screen bg-background">
              {/* Global Header */}
              <GlobalHeader 
                user={user} 
                onLogout={handleLogout}
                onUserUpdate={handleUserUpdate}
              />
              
              {/* Main Content */}
              <div style={{ height: 'calc(100vh - 64px)' }}>
                {user.role === 'admin' && (
                  <AdminDashboard 
                    user={user} 
                    onLogout={handleLogout}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
                {(user.role === 'analyst' || user.role === 'program_officer') && (
                  <AnalystDashboard 
                    user={user} 
                    onLogout={handleLogout}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
                {user.role === 'entrepreneur' && (
                  <EntrepreneurDashboard 
                    user={user} 
                    onLogout={handleLogout}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
              </div>
            </div>
            <MobileNotificationToast />
            <PWAInstallPrompt />
          </DataProvider>
        </RealtimeProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}