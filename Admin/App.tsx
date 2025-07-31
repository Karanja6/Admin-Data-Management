import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalystDashboard } from './components/AnalystDashboard';
import { EntrepreneurDashboard } from './components/EntrepreneurDashboard';
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

  // Additional fields accessed in your app
  bio?: string;
  website?: string;
  linkedIn?: string;
  businessType?: string;
  businessName?: string;

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

  const handleLogin = (userData: User) => {
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
        theme: 'system' as const,
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        language: 'en',
        defaultCountry: 'kenya',
        defaultView: userData.role === 'entrepreneur' ? 'my-application' : 'dashboard'
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
    
    setUser(enhancedUser);
    setIsAuthenticated(true);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

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
            <MobileNotificationToast />
            <PWAInstallPrompt />
          </DataProvider>
        </RealtimeProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}