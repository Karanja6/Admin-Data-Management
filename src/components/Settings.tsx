import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from './ThemeProvider';
import { User } from '../App';
import { 
  Camera, 
  User as UserIcon, 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  LogOut,
  Save,
  Edit,
  MapPin,
  Calendar,
  Clock,
  Link,
  Twitter,
  Linkedin,
  Briefcase,
  Phone,
  Mail,
  Check,
  X
} from 'lucide-react';

interface SettingsProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

export function Settings({ user, onUserUpdate, onLogout }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [profilePictureUpload, setProfilePictureUpload] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-defined avatar options
  const avatarOptions = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b74fe7b3?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  ];

  const handleProfilePictureSelect = (pictureUrl: string) => {
    setEditedUser({ ...editedUser, profilePicture: pictureUrl });
    setProfilePictureUpload(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePictureUpload(result);
        setEditedUser({ ...editedUser, profilePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    onUserUpdate(editedUser);
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setEditedUser(user);
    setProfilePictureUpload(null);
    setIsEditing(false);
  };

  const handleNotificationChange = (type: 'email' | 'push' | 'sms', value: boolean) => {
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        notifications: {
          ...editedUser.preferences?.notifications,
          [type]: value
        }
      }
    });
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      client: 'bg-primary/10 text-primary',
      admin: 'bg-destructive/10 text-destructive',
      guest: 'bg-muted text-muted-foreground'
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {role === 'client' ? 'Entrepreneur' : role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Profile Picture</span>
              </CardTitle>
              <CardDescription>Choose your profile picture from our selection or upload your own</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={editedUser.profilePicture || profilePictureUpload || ''} 
                      alt={editedUser.name} 
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-secondary text-white">
                      {editedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Upload Photo</span>
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex-1">
                    <h4 className="font-medium mb-3">Choose from selection:</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {avatarOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer rounded-full transition-all ${
                            editedUser.profilePicture === option ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-105'
                          }`}
                          onClick={() => handleProfilePictureSelect(option)}
                        >
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={option} alt={`Avatar option ${index + 1}`} />
                          </Avatar>
                          {editedUser.profilePicture === option && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <Check className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="px-3 py-2 bg-muted rounded-md">{user.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedUser.email || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <Input
                      value={editedUser.phone || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  {isEditing ? (
                    <Input
                      value={editedUser.location || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                      placeholder="Enter your location"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{user.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                {isEditing ? (
                  <Textarea
                    value={editedUser.bio || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md min-h-[60px]">
                    {user.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Business Information (for clients) */}
          {user.role === 'client' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    {isEditing ? (
                      <Input
                        value={editedUser.businessName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, businessName: e.target.value })}
                        placeholder="Enter your business name"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">{user.businessName || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Type</label>
                    {isEditing ? (
                      <Select
                        value={editedUser.businessType || ''}
                        onValueChange={(value) => setEditedUser({ ...editedUser, businessType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Agriculture">Agriculture</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">{user.businessType || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    {isEditing ? (
                      <Input
                        value={editedUser.website || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md">
                        <Link className="h-4 w-4 text-muted-foreground" />
                        <span>{user.website || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    {isEditing ? (
                      <Input
                        value={editedUser.linkedIn || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, linkedIn: e.target.value })}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.linkedIn || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Edit Actions */}
          {isEditing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={handleCancelChanges}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveChanges}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Language & Region</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
                <Select value="en">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={editedUser.preferences?.notifications?.email || false}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={editedUser.preferences?.notifications?.push || false}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={editedUser.preferences?.notifications?.sms || false}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>

              <Button onClick={() => onUserUpdate(editedUser)}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Role:</span>
                    {getRoleBadge(user.role)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Member Since:</span>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Active:</span>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Account Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Sign Out</h4>
                    <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                  </div>
                  <Button variant="destructive" onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}