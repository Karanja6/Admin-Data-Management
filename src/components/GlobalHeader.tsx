import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Moon, 
  Sun, 
  Monitor,
  Building,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { User as UserType } from '../App';

interface GlobalHeaderProps {
  user: UserType;
  onLogout: () => void;
  onUserUpdate: (user: UserType) => void;
}

export function GlobalHeader({ user, onLogout, onUserUpdate }: GlobalHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState(user.preferences?.theme || 'system');
  const [notificationCount] = useState(3); // Mock notification count

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Update user preferences
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        theme: newTheme
      }
    };
    onUserUpdate(updatedUser);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'analyst': return 'bg-blue-500 text-white';
      case 'program_officer': return 'bg-green-500 text-white';
      case 'entrepreneur': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
      case 'analyst':
      case 'program_officer':
        return <Building className="w-3 h-3" />;
      case 'entrepreneur':
        return <User className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">H</span>
          </div>
          <div>
            <h1 className="font-semibold">HEVA CreativeHub</h1>
            <p className="text-xs text-muted-foreground">
              {user.role === 'entrepreneur' ? 'Entrepreneur Portal' : 'Analytics Platform'}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 h-auto py-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge className={getRoleColor(user.role)} variant="outline">
                      {getRoleIcon(user.role)}
                      <span className="ml-1 capitalize">
                        {user.role.replace('_', ' ')}
                      </span>
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />

              {/* User Details */}
              <div className="px-2 py-2 space-y-2">
                {user.department && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{user.department}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.businessInfo?.businessName && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{user.businessInfo.businessName}</span>
                  </div>
                )}
                {user.dateJoined && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {new Date(user.dateJoined).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <DropdownMenuSeparator />

              {/* Theme Settings */}
              <div className="px-2 py-2 space-y-3">
                <Label className="text-sm font-medium">Theme Preference</Label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">Light</span>
                  </div>
                  <Switch
                    checked={theme === 'light'}
                    onCheckedChange={() => handleThemeChange('light')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Dark</span>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => handleThemeChange('dark')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm">System</span>
                  </div>
                  <Switch
                    checked={theme === 'system'}
                    onCheckedChange={() => handleThemeChange('system')}
                  />
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Profile Menu Item - Fixed to prevent ref forwarding issue */}
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.preventDefault();
                  setShowProfile(true);
                }}
              >
                <User className="w-4 h-4 mr-2" />
                View Full Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile Dialog - Now outside the dropdown */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className={getRoleColor(user.role)} variant="outline">
                  {getRoleIcon(user.role)}
                  <span className="ml-1 capitalize">
                    {user.role.replace('_', ' ')}
                  </span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">
                  {user.role === 'entrepreneur' ? 'Business Information' : 'Organization Details'}
                </h4>
                <div className="space-y-2">
                  {user.department && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{user.department}</span>
                    </div>
                  )}
                  {user.businessInfo?.businessName && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{user.businessInfo.businessName}</span>
                    </div>
                  )}
                  {user.businessInfo?.valueChain && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Sector: </span>
                      <Badge variant="outline">{user.businessInfo.valueChain}</Badge>
                    </div>
                  )}
                  {user.dateJoined && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined {new Date(user.dateJoined).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Permissions */}
            {user.permissions && (
              <div className="space-y-3">
                <h4 className="font-medium">Access Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(user.permissions).map(([key, value]) => (
                    <Badge key={key} variant={value ? 'default' : 'secondary'}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}