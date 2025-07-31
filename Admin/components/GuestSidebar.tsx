import React from 'react';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { 
  Users, 
  BookOpen,
  Settings,
  TrendingUp,
  MapPin,
  Building2
} from 'lucide-react';

type GuestView = 'community' | 'directory' | 'settings';

interface GuestSidebarProps {
  activeView: GuestView;
  onViewChange: (view: GuestView) => void;
}

export function GuestSidebar({ activeView, onViewChange }: GuestSidebarProps) {
  const menuItems = [
    {
      title: 'Community Showcase',
      icon: Users,
      view: 'community' as GuestView,
      badge: null
    },
    {
      title: 'Entrepreneur Directory',
      icon: BookOpen,
      view: 'directory' as GuestView,
      badge: null
    },
    {
      title: 'Settings',
      icon: Settings,
      view: 'settings' as GuestView,
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

      {/* Community Stats */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-muted-foreground">Community Stats</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Entrepreneurs:</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Building2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Businesses:</span>
              <span className="font-medium">189</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Counties:</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-muted-foreground">Jobs:</span>
              <span className="font-medium">1,247</span>
            </div>
          </div>
        </div>
      </SidebarGroup>

      {/* Join CTA */}
      <SidebarGroup>
        <div className="px-3 py-2">
          <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <h4 className="text-sm font-medium mb-2">Join HEVA</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Ready to turn your business idea into reality? Apply for funding and join our community.
            </p>
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-white text-xs py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
              Apply Now
            </button>
          </div>
        </div>
      </SidebarGroup>
    </SidebarContent>
  );
}