import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { AnalystDashboard } from './components/AnalystDashboard';
import { EntrepreneurDashboard } from './components/EntrepreneurDashboard';
import { ThemeProvider } from './components/ThemeProvider';
import { DataProvider } from './contexts/DataContext';
import { RealtimeProvider } from './contexts/RealtimeContext';
import {
  NotificationProvider,
  MobileNotificationToast
} from './services/NotificationService';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import './index.css';

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

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Restore user on page load unless logout flag is set
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedOut = localStorage.getItem('loggedOut');

    if (storedUser && !isLoggedOut) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
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
        theme: 'system',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        language: 'en',
        defaultCountry: 'kenya',
        defaultView: userData.role === 'entrepreneur' ? 'my-application' : 'dashboard'
      },
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
    localStorage.setItem('user', JSON.stringify(enhancedUser));
    localStorage.removeItem('loggedOut'); // ✅ Clear logout flag
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.setItem('loggedOut', 'true'); // ✅ Set logout flag
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
