import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Map,
  CreditCard,
  TrendingUp,
  Shield,
  ScrollText,
  Handshake,
  Bell,
  Download,
  UserCheck,
  Brain
} from 'lucide-react';
import { User } from '../App';

interface AdminSidebarProps {
  user: User;
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  notificationCount?: number;
}

export function AdminSidebar({ 
  user, 
  activeView, 
  onViewChange, 
  onLogout,
  notificationCount = 0 
}: AdminSidebarProps) {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      description: 'Overview & key metrics'
    },
    { 
      id: 'applications', 
      label: 'Applications', 
      icon: FileText, 
      description: 'Manage funding applications',
      badge: '47' // Example count
    },
    { 
      id: 'map-view', 
      label: 'Map View', 
      icon: Map, 
      description: 'Geographic application view'
    },
    { 
      id: 'repayments', 
      label: 'Repayments', 
      icon: CreditCard, 
      description: 'Track loan repayments',
      badge: '12' // Overdue count
    },
    { 
      id: 'analytics', 
      label: 'Reports', 
      icon: BarChart3, 
      description: 'Data analytics & insights'
    },
    { 
      id: 'me-reports', 
      label: 'M&E Reports', 
      icon: TrendingUp, 
      description: 'Monitoring & evaluation'
    },
    { 
      id: 'ml-insights', 
      label: 'ML Insights', 
      icon: Brain, 
      description: 'AI-powered analytics',
      badge: 'NEW'
    },
    { 
      id: 'blacklist', 
      label: 'Blacklist', 
      icon: Shield, 
      description: 'Defaulter management',
      badge: '3' // Blacklisted count
    },
    { 
      id: 'consent-logs', 
      label: 'Consent Logs', 
      icon: ScrollText, 
      description: 'Data consent tracking'
    },
    { 
      id: 'user-management', 
      label: 'User Management', 
      icon: UserCheck, 
      description: 'Manage system users'
    },
    { 
      id: 'partners', 
      label: 'Partners & Integrations', 
      icon: Handshake, 
      description: 'Manage partner organizations'
    },
    { 
      id: 'notifications', 
      label: 'Notification Center', 
      icon: Bell, 
      description: 'System notifications',
      badge: notificationCount > 0 ? notificationCount.toString() : undefined
    },
    { 
      id: 'export-tools', 
      label: 'Export & Data Tools', 
      icon: Download, 
      description: 'Data export utilities'
    },
    { 
      id: 'settings', 
      label: 'System Settings', 
      icon: Settings, 
      description: 'Platform configuration'
    }
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">H</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">HEVA CreativeHub</h2>
            <p className="text-xs text-sidebar-foreground/60">Analytical Platform</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-secondary-foreground text-sm font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role.replace('_', ' ')}</p>
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
              onClick={() => onViewChange(item.id)}
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
                    variant={
                      item.id === 'repayments' || item.id === 'blacklist' ? 'destructive' : 
                      item.badge === 'NEW' ? 'default' : 'secondary'
                    } 
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
}