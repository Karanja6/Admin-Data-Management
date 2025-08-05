import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  TrendingUp, 
  Bell, 
  GraduationCap,
  User,
  LogOut,
  Menu,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { User as UserType } from '../App';

interface EntrepreneurSidebarProps {
  user: UserType;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  isMobile: boolean;
}

export function EntrepreneurSidebar({ 
  user, 
  activeView, 
  onViewChange, 
  onLogout,
  isMobile 
}: EntrepreneurSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Under Review': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Pending': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      description: 'Overview & quick access'
    },
    { 
      id: 'my-application', 
      label: 'My Application', 
      icon: FileText, 
      description: 'View & manage application',
      badge: user.applicationStatus?.currentStage
    },
    { 
      id: 'upload-center', 
      label: 'Upload Center', 
      icon: Upload, 
      description: 'Manage documents'
    },
    { 
      id: 'track-reports', 
      label: 'Track Reports', 
      icon: TrendingUp, 
      description: 'Submit M&E reports'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      description: 'Updates & alerts',
      badge: '3' // Example notification count
    },
    { 
      id: 'education', 
      label: 'Loan Education', 
      icon: GraduationCap, 
      description: 'FAQs, guides & videos'
    },
    { 
      id: 'profile', 
      label: 'My Profile', 
      icon: User, 
      description: 'Account settings'
    }
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">H</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">HEVA CreativeHub</h2>
            <p className="text-xs text-sidebar-foreground/60">Entrepreneur Portal</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-secondary-foreground font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-sm text-sidebar-foreground/60">{user.businessInfo?.businessName}</p>
            <div className="flex items-center space-x-1 mt-1">
              {getStatusIcon(user.applicationStatus?.currentStage)}
              <span className="text-xs text-sidebar-foreground/60">
                {user.applicationStatus?.currentStage || 'No Application'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sidebar-accent rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-sidebar-accent-foreground">
              {user.businessInfo?.valueChain || 'N/A'}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Sector</p>
          </div>
          <div className="bg-sidebar-accent rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-sidebar-accent-foreground">
              {user.businessInfo?.employees || 0}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Employees</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              onClick={() => {
                onViewChange(item.id);
                if (isMobile) setIsOpen(false);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </div>
                {item.badge && (
                  <Badge 
                    variant={item.id === 'notifications' ? 'destructive' : 'secondary'} 
                    className="ml-2 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </nav>

      {/* Application CTA */}
      {!user.applicationStatus?.hasActiveApplication && (
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => {
              onViewChange('my-application');
              if (isMobile) setIsOpen(false);
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Start Application
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-80">
      <SidebarContent />
    </div>
  );
}