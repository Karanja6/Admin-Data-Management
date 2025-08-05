import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Bell, 
  Shield, 
  Eye, 
  Palette,
  Globe,
  Save,
  Camera,
  AlertTriangle,
  CheckCircle,
  Key
} from 'lucide-react';
import { User as UserType } from '../../App';

interface UserSettingsProps {
  user: UserType;
  onUserUpdate: (updatedUser: UserType) => void;
}

export function UserSettings({ user, onUserUpdate }: UserSettingsProps) {
  const [formData, setFormData] = useState<UserType>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserType],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUserUpdate(formData);
      setSaveStatus('saved');
      setIsEditing(false);
      
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate password change
    alert('Password changed successfully');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      case 'analyst': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20';
      case 'program_officer': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'entrepreneur': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'analyst': return 'Data Analyst';
      case 'program_officer': return 'Program Officer';
      case 'entrepreneur': return 'Entrepreneur';
      default: return role;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Account Settings</CardTitle>
              <p className="text-muted-foreground">
                Manage your profile, preferences, and account security
              </p>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          
          {saveStatus === 'saved' && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your profile has been updated successfully.
              </AlertDescription>
            </Alert>
          )}
          
          {saveStatus === 'error' && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to update profile. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture and Basic Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={formData.profilePicture} />
                    <AvatarFallback className="text-lg">
                      {formData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold">{formData.name}</h3>
                    <Badge className={getRoleColor(formData.role)}>
                      {getRoleDisplayName(formData.role)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{formData.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(formData.dateJoined || '2023-01-01').toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={true} // Email shouldn't be editable as it determines role
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed as it determines your access level
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {user.role !== 'entrepreneur' && (
                    <>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department || ''}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </>
                  )}
                  
                  {user.role === 'entrepreneur' && (
                    <>
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={formData.businessInfo?.businessName || ''}
                          onChange={(e) => handleNestedChange('businessInfo', 'businessName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="valueChain">Value Chain</Label>
                        <Select 
                          value={formData.businessInfo?.valueChain || ''} 
                          onValueChange={(value) => handleNestedChange('businessInfo', 'valueChain', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select value chain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fashion">Fashion</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Visual Arts">Visual Arts</SelectItem>
                            <SelectItem value="Gaming">Gaming</SelectItem>
                            <SelectItem value="AudioVisual">AudioVisual</SelectItem>
                            <SelectItem value="Performing Arts">Performing Arts</SelectItem>
                            <SelectItem value="Crafts">Crafts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Input
                          id="employees"
                          type="number"
                          value={formData.businessInfo?.employees || ''}
                          onChange={(e) => handleNestedChange('businessInfo', 'employees', parseInt(e.target.value))}
                          disabled={!isEditing}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Display & Interface</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                </div>
                <Select 
                  value={formData.preferences?.theme || 'system'} 
                  onValueChange={(value) => handleNestedChange('preferences', 'theme', value)}
                >
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

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred language</p>
                </div>
                <Select 
                  value={formData.preferences?.language || 'en'} 
                  onValueChange={(value) => handleNestedChange('preferences', 'language', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Default Country</Label>
                  <p className="text-sm text-muted-foreground">Primary country for data filtering</p>
                </div>
                <Select 
                  value={formData.preferences?.defaultCountry || 'kenya'} 
                  onValueChange={(value) => handleNestedChange('preferences', 'defaultCountry', value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="rwanda">Rwanda</SelectItem>
                    <SelectItem value="ethiopia">Ethiopia</SelectItem>
                    <SelectItem value="tanzania">Tanzania</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  checked={formData.preferences?.notifications?.email ?? true}
                  onCheckedChange={(checked) => 
                    handleNestedChange('preferences', 'notifications', {
                      ...formData.preferences?.notifications,
                      email: checked
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch 
                  checked={formData.preferences?.notifications?.push ?? true}
                  onCheckedChange={(checked) => 
                    handleNestedChange('preferences', 'notifications', {
                      ...formData.preferences?.notifications,
                      push: checked
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Text message alerts</p>
                </div>
                <Switch 
                  checked={formData.preferences?.notifications?.sms ?? false}
                  onCheckedChange={(checked) => 
                    handleNestedChange('preferences', 'notifications', {
                      ...formData.preferences?.notifications,
                      sms: checked
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Password & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Last changed {new Date().toLocaleDateString()}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  Change Password
                </Button>
              </div>

              {showPasswordForm && (
                <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        currentPassword: e.target.value
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        newPassword: e.target.value
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        confirmPassword: e.target.value
                      }))}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handlePasswordChange}>
                      Update Password
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Account Information</Label>
                <div className="text-sm space-y-1">
                  <p>Account ID: {user.id}</p>
                  <p>Last login: {new Date(user.lastActive || '').toLocaleString()}</p>
                  <p>Role: {getRoleDisplayName(user.role)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Access Permissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Entry</Label>
                    <p className="text-sm text-muted-foreground">Create and edit data</p>
                  </div>
                  <Badge variant={user.permissions?.dataEntry ? 'default' : 'secondary'}>
                    {user.permissions?.dataEntry ? 'Granted' : 'Denied'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data View</Label>
                    <p className="text-sm text-muted-foreground">View analytics data</p>
                  </div>
                  <Badge variant={user.permissions?.dataView ? 'default' : 'secondary'}>
                    {user.permissions?.dataView ? 'Granted' : 'Denied'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Export</Label>
                    <p className="text-sm text-muted-foreground">Export reports and data</p>
                  </div>
                  <Badge variant={user.permissions?.dataExport ? 'default' : 'secondary'}>
                    {user.permissions?.dataExport ? 'Granted' : 'Denied'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Management</Label>
                    <p className="text-sm text-muted-foreground">Manage other users</p>
                  </div>
                  <Badge variant={user.permissions?.userManagement ? 'default' : 'secondary'}>
                    {user.permissions?.userManagement ? 'Granted' : 'Denied'}
                  </Badge>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Permissions are automatically assigned based on your role and cannot be changed by users. 
                  Contact your administrator if you need different access levels.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}