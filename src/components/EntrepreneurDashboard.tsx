import React, { useState } from 'react';
import { EntrepreneurSidebar } from './EntrepreneurSidebar';
import { EntrepreneurOverview } from './entrepreneur/EntrepreneurOverview';
import { MyApplication } from './entrepreneur/MyApplication';
import { UploadCenter } from './entrepreneur/UploadCenter';
import { TrackReports } from './entrepreneur/TrackReports';
import { LoanEducation } from './entrepreneur/LoanEducation';
import { EntrepreneurNotifications } from './entrepreneur/EntrepreneurNotifications';
import { EntrepreneurProfile } from './entrepreneur/EntrepreneurProfile';
import { User } from '../App';

interface EntrepreneurDashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

export function EntrepreneurDashboard({ user, onLogout, onUserUpdate }: EntrepreneurDashboardProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <EntrepreneurOverview user={user} />;
      case 'my-application':
        return <MyApplication user={user} onUserUpdate={onUserUpdate} />;
      case 'upload-center':
        return <UploadCenter user={user} />;
      case 'track-reports':
        return <TrackReports user={user} />;
      case 'notifications':
        return <EntrepreneurNotifications user={user} />;
      case 'education':
        return <LoanEducation user={user} />;
      case 'profile':
        return <EntrepreneurProfile user={user} onUserUpdate={onUserUpdate} />;
      default:
        return <EntrepreneurOverview user={user} />;
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">H</span>
            </div>
            <div>
              <h1 className="font-semibold">HEVA CreativeHub</h1>
              <p className="text-xs text-muted-foreground">Entrepreneur Portal</p>
            </div>
          </div>
          <EntrepreneurSidebar
            user={user}
            activeView={activeView}
            onViewChange={setActiveView}
            onLogout={onLogout}
            isMobile={true}
          />
        </div>

        {/* Mobile Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="border-t bg-card p-2">
          <div className="flex justify-around">
            {[
              { id: 'dashboard', label: 'Home', icon: '🏠' },
              { id: 'my-application', label: 'Application', icon: '📝' },
              { id: 'upload-center', label: 'Upload', icon: '📁' },
              { id: 'notifications', label: 'Alerts', icon: '🔔' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  activeView === item.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <EntrepreneurSidebar
        user={user}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
        isMobile={false}
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}