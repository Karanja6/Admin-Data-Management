import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Mail, 
  Cloud,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'HEVA Analytics Platform',
    systemDescription: 'Data analytics platform for funding programs',
    defaultLanguage: 'en',
    defaultTimezone: 'Africa/Nairobi',
    
    // Security Settings
    passwordPolicy: 'strong',
    sessionTimeout: 30,
    twoFactorAuth: true,
    loginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    notificationFrequency: 'daily',
    
    // Data Settings
    dataRetentionDays: 365,
    backupFrequency: 'daily',
    autoExport: true,
    
    // Cloud Integration
    googleDriveEnabled: true,
    oneDriveEnabled: true,
    dropboxEnabled: false,
    
    // API Settings
    apiRateLimit: 1000,
    apiTimeout: 30,
    webhooksEnabled: true
  });

  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>System Settings</h1>
          <p className="text-muted-foreground">
            Configure platform settings and preferences
          </p>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {saved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => handleSettingChange('systemName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="systemDescription">Description</Label>
              <Textarea
                id="systemDescription"
                value={settings.systemDescription}
                onChange={(e) => handleSettingChange('systemDescription', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select value={settings.defaultLanguage} onValueChange={(value) => handleSettingChange('defaultLanguage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                  <SelectItem value="am">Amharic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="defaultTimezone">Default Timezone</Label>
              <Select value={settings.defaultTimezone} onValueChange={(value) => handleSettingChange('defaultTimezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Nairobi">Africa/Nairobi</SelectItem>
                  <SelectItem value="Africa/Kampala">Africa/Kampala</SelectItem>
                  <SelectItem value="Africa/Kigali">Africa/Kigali</SelectItem>
                  <SelectItem value="Africa/Addis_Ababa">Africa/Addis_Ababa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select value={settings.passwordPolicy} onValueChange={(value) => handleSettingChange('passwordPolicy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (6+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (8+ chars, mixed)</SelectItem>
                  <SelectItem value="complex">Complex (12+ chars, symbols)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={settings.loginAttempts}
                onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Push Notifications</Label>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="notificationFrequency">Notification Frequency</Label>
              <Select value={settings.notificationFrequency} onValueChange={(value) => handleSettingChange('notificationFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dataRetentionDays">Data Retention (days)</Label>
              <Input
                id="dataRetentionDays"
                type="number"
                value={settings.dataRetentionDays}
                onChange={(e) => handleSettingChange('dataRetentionDays', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoExport">Auto Export Reports</Label>
              <Switch
                id="autoExport"
                checked={settings.autoExport}
                onCheckedChange={(checked) => handleSettingChange('autoExport', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cloud Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Cloud Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="googleDriveEnabled">Google Drive</Label>
                <Badge variant="outline" className="text-xs">Connected</Badge>
              </div>
              <Switch
                id="googleDriveEnabled"
                checked={settings.googleDriveEnabled}
                onCheckedChange={(checked) => handleSettingChange('googleDriveEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="oneDriveEnabled">OneDrive</Label>
                <Badge variant="outline" className="text-xs">Connected</Badge>
              </div>
              <Switch
                id="oneDriveEnabled"
                checked={settings.oneDriveEnabled}
                onCheckedChange={(checked) => handleSettingChange('oneDriveEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="dropboxEnabled">Dropbox</Label>
                <Badge variant="secondary" className="text-xs">Disconnected</Badge>
              </div>
              <Switch
                id="dropboxEnabled"
                checked={settings.dropboxEnabled}
                onCheckedChange={(checked) => handleSettingChange('dropboxEnabled', checked)}
              />
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Connections
            </Button>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center text-white text-xs">
                API
              </div>
              <span>API Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiRateLimit">Rate Limit (requests/hour)</Label>
              <Input
                id="apiRateLimit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
              <Input
                id="apiTimeout"
                type="number"
                value={settings.apiTimeout}
                onChange={(e) => handleSettingChange('apiTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="webhooksEnabled">Webhooks</Label>
              <Switch
                id="webhooksEnabled"
                checked={settings.webhooksEnabled}
                onCheckedChange={(checked) => handleSettingChange('webhooksEnabled', checked)}
              />
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Changes to API settings require system restart
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}