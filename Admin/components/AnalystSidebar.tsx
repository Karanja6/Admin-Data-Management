import React from 'react';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { useData } from '../contexts/DataContext';
import { User } from '../App';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3,
  FolderOpen,
  Download,
  Settings as SettingsIcon,
  TrendingUp,
  PieChart,
  Activity,
  Filter
} from 'lucide-react';

type AnalystView = 'dashboard' | 'applications' | 'analytics' | 'documents' | 'reports' | 'settings';

interface AnalystSidebarProps {
  activeView: AnalystView;
  onViewChange: (view: AnalystView) => void;
  user: User;
}

export function AnalystSidebar({ activeView, onViewChange, user }: AnalystSidebarProps) {
  const { analytics } = useData();

  const menuItems = [
    {
      title: 'Analytics Overview',
      icon: LayoutDashboard,
      view: 'dashboard' as AnalystView,
      badge: null
    },
    {
      title: 'View Applications',
      icon: FileText,
      view: 'applications' as AnalystView,
      badge: null
    },
    {
      title: 'Advanced Analytics',
      icon: BarChart3,
      view: 'analytics' as AnalystView,
      badge: null
    },
    {
      title: 'Document Viewer',
      icon: FolderOpen,
      view: 'documents' as AnalystView,
      badge: null
    },
    {
      title: 'Reports & Export',
      icon: Download,
      view: 'reports' as AnalystView,
      badge: null
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      view: 'settings' as AnalystView,
      badge: null
    }
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.view}>
                <SidebarMenuButton
                  onClick={() => onViewChange(item.view)}
                  isActive={activeView === item.view}
                  className="w-full"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Role-Specific Insights */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-muted-foreground">{user.department}</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <PieChart className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="font-medium text-green-600">
                {((analytics.approved / analytics.totalApplications) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Avg Amount:</span>
              <span className="font-medium">KSh {(analytics.averageLoanAmount / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-muted-foreground">Active:</span>
              <span className="font-medium">{analytics.pendingReview + analytics.approved}</span>
            </div>
          </div>
        </div>
      </SidebarGroup>

      {/* Top Value Chains */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Sectors</h4>
          <div className="space-y-2">
            {Object.entries(analytics.valueChainDistribution)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 4)
              .map(([sector, count]) => (
                <div key={sector} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground capitalize">{sector.replace('_', ' ')}</span>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </SidebarGroup>

      {/* Quick Filters */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quick Access</span>
            </div>
            <div className="mt-2 space-y-1">
              <button 
                onClick={() => onViewChange('applications')}
                className="text-xs text-primary hover:underline block"
              >
                View Pending Applications
              </button>
              <button 
                onClick={() => onViewChange('analytics')}
                className="text-xs text-primary hover:underline block"
              >
                Generate Monthly Report
              </button>
            </div>
          </div>
        </div>
      </SidebarGroup>

      {/* User Role Badge */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <div className="text-xs text-muted-foreground mb-1">Role</div>
            <div className="text-sm font-medium capitalize">
              {user.role.replace('_', ' ')}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{user.location}</div>
          </div>
        </div>
      </SidebarGroup>
    </SidebarContent>
  );
}