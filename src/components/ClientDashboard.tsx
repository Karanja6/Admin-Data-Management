import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { ClientSidebar } from './ClientSidebar';
import { ProfileSection } from './client/ProfileSection';
import { FundTracker } from './client/FundTracker';
import { CommunityShowcase } from './client/CommunityShowcase';
import { NotificationsPanel } from './client/NotificationPanel';
import { Settings } from './Settings';
import { useRealtime } from '../contexts/RealtimeContext';
import { useNotifications } from '../services/NotificationService';
import { User } from '../App';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (updatedUser: User) => void;
}

type ClientView = 'dashboard' | 'profile' | 'reports' | 'community' | 'notifications' | 'settings';

export function ClientDashboard({ user, onLogout, onUserUpdate }: ClientDashboardProps) {
  const [activeView, setActiveView] = useState<ClientView>('dashboard');
  const { subscribe, updateData } = useRealtime();
  const { sendNotification } = useNotifications();

  // Setup real-time listeners for client-specific events
  useEffect(() => {
    const unsubscribeFunding = subscribe('funding', (data) => {
      if (data.type === 'status_update') {
        sendNotification({
          title: 'Funding Status Update',
          body: data.status === 'approved' 
            ? 'Congratulations! Your funding has been approved.'
            : 'Your funding application needs additional information.',
          type: data.status === 'approved' ? 'success' : 'warning',
          data: { fundingId: data.id }
        });
      }
    });

    const unsubscribeReports = subscribe('reports', (data) => {
      if (data.type === 'report_due') {
        sendNotification({
          title: 'Monthly Report Due',
          body: 'Your monthly business report is due in 3 days.',
          type: 'warning',
          data: { dueDate: data.dueDate }
        });
      } else if (data.type === 'feedback_received') {
        sendNotification({
          title: 'Feedback Received',
          body: 'You have received feedback on your latest report.',
          type: 'info',
          data: { reportId: data.reportId }
        });
      }
    });

    const unsubscribeCommunity = subscribe('community', (data) => {
      if (data.type === 'post_liked') {
        sendNotification({
          title: 'Post Engagement',
          body: `Someone liked your post: "${data.postTitle.substring(0, 50)}..."`,
          type: 'info',
          data: { postId: data.postId }
        });
      }
    });

    return () => {
      unsubscribeFunding();
      unsubscribeReports();
      unsubscribeCommunity();
    };
  }, [subscribe, sendNotification]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h1>Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Here's an overview of your business progress</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FundTracker />
              <div className="space-y-6">
                <ProfileSection isOverview />
                <CommunityShowcase isOverview />
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <ProfileSection />
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <FundTracker detailed />
          </div>
        );
      case 'community':
        return (
          <div className="p-6">
            <CommunityShowcase />
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <NotificationsPanel />
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <Settings 
              user={user} 
              onUserUpdate={onUserUpdate} 
              onLogout={onLogout} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      sidebar={<ClientSidebar activeView={activeView} onViewChange={setActiveView} />}
    >
      {renderContent()}
    </DashboardLayout>
  );
}