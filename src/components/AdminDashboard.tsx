import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './admin/AdminOverview';
import { ApplicationsManager } from './data/ApplicationManager';
import { MapView } from './admin/MapView';
import { RepaymentTracker } from './admin/RepaymentTracker';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { NotificationManager } from './admin/NotificationManager';
import { UserManagement } from './admin/UserManagement';
import { SystemSettings } from './admin/SystemSettings';
import { DocumentManager } from './documents/DocumentManager';
import { ExportReporting } from './reports/ExportReporting';
import { PartnersIntegrations } from './admin/PartnersIntergrations';
import { MLInsights } from './admin/MLInsights';
import { ConsentLogs } from './admin/ConsentLogs';
import { User } from '../App';
import { useData } from '../contexts/DataContext';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

// Mock components for new sections
function MEReports() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Monitoring & Evaluation Reports</h2>
      <p className="text-muted-foreground">M&E reporting interface coming soon...</p>
    </div>
  );
}

function BlacklistManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Defaulter Blacklist Management</h2>
      <p className="text-muted-foreground">Blacklist management interface coming soon...</p>
    </div>
  );
}

export function AdminDashboard({ user, onLogout, onUserUpdate }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const { applications } = useData();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminOverview user={user} />;
      case 'applications':
        return <ApplicationsManager />;
      case 'map-view':
        return <MapView applications={applications} />;
      case 'repayments':
        return <RepaymentTracker />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'me-reports':
        return <MEReports />;
      case 'blacklist':
        return <BlacklistManager />;
      case 'consent-logs':
        return <ConsentLogs />;
      case 'user-management':
        return <UserManagement user={user} onUserUpdate={onUserUpdate} />;
      case 'partners':
        return <PartnersIntegrations />;
      case 'notifications':
        return <NotificationManager />;
      case 'export-tools':
        return <ExportReporting />;
      case 'ml-insights':
        return <MLInsights applications={applications} />;
      case 'settings':
        return <SystemSettings user={user} onUserUpdate={onUserUpdate} />;
      default:
        return <AdminOverview user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        user={user}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
        notificationCount={5} // Example notification count
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}