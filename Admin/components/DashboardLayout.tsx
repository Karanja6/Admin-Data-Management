import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { useTheme } from './ThemeProvider';
import { useNotifications } from '../services/NotificationService';
import { useRealtime } from '../contexts/RealtimeContext';
import { User } from '../App';
import { 
  LogOut, 
  Moon, 
  Sun, 
  Users, 
  Menu,
  Bell,
  Wifi,
  WifiOff
} from 'lucide-react';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayout({ user, onLogout, sidebar, children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, requestPermission, permission } = useNotifications();
  const { isConnected } = useRealtime();

  const handleNotificationSetup = async () => {
    if (permission === 'default') {
      await requestPermission();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-background">
        <Sidebar>
          {sidebar}
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    HEVA CreativeHub
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Real-time Connection Status */}
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-muted">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Live</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-red-600">Offline</span>
                    </>
                  )}
                </div>

                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={handleNotificationSetup}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 bg-destructive"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email || user.phone}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {user.role}
                          </Badge>
                          {isConnected && (
                            <Badge variant="outline" className="text-xs text-green-600">
                              Online
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}