import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Home,
  FileText,
  Upload,
  BarChart3,
  User,
  Settings,
  Plus,
  Brain,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

import { User as UserType, Application } from '../../App';
import { EntrepreneurSidebar } from '../EntrepreneurSidebar';
import { EntrepreneurOverview } from './EntrepreneurOverview';
import { MyApplication } from './MyApplication';
import { UploadCenter } from './UploadCenter';
import { TrackReports } from './TrackReports';
import { EntrepreneurProfile } from './EntrepreneurProfile';
import { MLApplicationReview } from './MLApplicationReview';
import { ApplicationWizard } from './ApplicationWizard';
import { UserSettings } from '../settings/UserSettings';

interface EntrepreneurDashboardProps {
  user: UserType;
  onLogout: () => void;
  onUserUpdate: (user: UserType) => void;
}

export function EntrepreneurDashboard({ user, onLogout, onUserUpdate }: EntrepreneurDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationWizard, setShowApplicationWizard] = useState(false);
  const [showMLReview, setShowMLReview] = useState(false);
  const [applicationData, setApplicationData] = useState<Partial<Application>>({});

  const hasActiveApplication = user.applicationStatus?.hasActiveApplication || false;
  const applicationStage = user.applicationStatus?.currentStage || 'Not Started';

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      description: 'Dashboard and quick stats',
      badge: null
    },
    {
      id: 'application',
      label: 'My Application',
      icon: FileText,
      description: 'Application status and details',
      badge: hasActiveApplication ? (
        <Badge variant={applicationStage === 'Under Review' ? 'default' : 'secondary'} className="ml-2">
          {applicationStage}
        </Badge>
      ) : null
    },
    {
      id: 'upload',
      label: 'Upload Center',
      icon: Upload,
      description: 'Document management',
      badge: null
    },
    {
      id: 'reports',
      label: 'Track Progress',
      icon: BarChart3,
      description: 'M&E reports and metrics',
      badge: null
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      description: 'Business information',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Account preferences',
      badge: null
    }
  ];

  const handleNewApplication = () => {
    setShowApplicationWizard(true);
  };

  const handleApplicationSubmit = (application: Partial<Application>) => {
    setApplicationData(application);
    setShowApplicationWizard(false);
    setShowMLReview(true);
  };

  const handleMLReviewSubmit = (applicationType: 'loan' | 'grant') => {
    const updatedUser = {
      ...user,
      applicationStatus: {
        hasActiveApplication: true,
        currentStage: 'Under Review',
        lastUpdate: new Date().toISOString(),
        applicationId: `APP-${Date.now()}`
      }
    };

    onUserUpdate(updatedUser);
    setShowMLReview(false);
    setActiveTab('application');
  };

  const getStatusIcon = (stage: string) => {
    switch (stage) {
      case 'Under Review': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (showApplicationWizard) {
    return (
      <div className="h-full bg-background p-6">
        <ApplicationWizard
          user={user}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationWizard(false)}
        />
      </div>
    );
  }

  if (showMLReview) {
    return (
      <div className="h-full bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <MLApplicationReview
            user={user}
            application={applicationData}
            onSubmit={handleMLReviewSubmit}
          />
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => setShowMLReview(false)}>
              Back to Edit Application
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Welcome back</h2>
              <p className="text-sm text-sidebar-accent-foreground">{user.name}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-sidebar-border">
          {!hasActiveApplication ? (
            <Button onClick={handleNewApplication} className="w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          ) : (
            <Card className="bg-accent/50">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(applicationStage)}
                  <div>
                    <p className="text-sm font-medium">Application Status</p>
                    <p className="text-xs text-muted-foreground">{applicationStage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/20'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{item.label}</p>
                    {item.badge}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI Insights</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Get personalized recommendations for your next application
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setShowMLReview(true)}>
                <Brain className="w-3 h-3 mr-2" />
                AI Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && (
          <EntrepreneurOverview user={user} onNewApplication={handleNewApplication} />
        )}

       {activeTab === 'application' && (
        <MyApplication user={user} onUserUpdate={onUserUpdate} />
        )}
        {activeTab === 'upload' && (
          <UploadCenter user={user} />
        )}

        {activeTab === 'reports' && (
          <TrackReports user={user} />
        )}

        {activeTab === 'profile' && (
          <EntrepreneurProfile user={user} onUserUpdate={onUserUpdate} />
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <UserSettings user={user} onUserUpdate={onUserUpdate} />
          </div>
        )}
      </div>
    </div>
  );
}
