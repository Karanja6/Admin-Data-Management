import React from 'react';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Users, 
  Bell,
  Settings,
  TrendingUp,
  DollarSign,
  CheckCircle
} from 'lucide-react';

type ClientView = 'dashboard' | 'profile' | 'reports' | 'community' | 'notifications' | 'settings';

interface ClientSidebarProps {
  activeView: ClientView;
  onViewChange: (view: ClientView) => void;
}

export function ClientSidebar({ activeView, onViewChange }: ClientSidebarProps) {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      view: 'dashboard' as ClientView,
      badge: null
    },
    {
      title: 'Profile & Business',
      icon: User,
      view: 'profile' as ClientView,
      badge: null
    },
    {
      title: 'Reports & Funding',
      icon: FileText,
      view: 'reports' as ClientView,
      badge: 1
    },
    {
      title: 'Community',
      icon: Users,
      view: 'community' as ClientView,
      badge: null
    },
    {
      title: 'Notifications',
      icon: Bell,
      view: 'notifications' as ClientView,
      badge: 3
    },
    {
      title: 'Settings',
      icon: Settings,
      view: 'settings' as ClientView,
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

      {/* Quick Stats */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-muted-foreground">Quick Stats</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Funding:</span>
              <span className="font-medium">KSh 45,000</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Growth:</span>
              <span className="font-medium">+12%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">Active</span>
            </div>
          </div>
        </div>
      </SidebarGroup>

      {/* Achievement Badge */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Verified Entrepreneur</p>
                <p className="text-xs text-muted-foreground">Profile 100% complete</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarGroup>
    </SidebarContent>
  );
}