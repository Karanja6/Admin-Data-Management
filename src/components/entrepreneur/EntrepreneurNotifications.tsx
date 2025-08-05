import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Calendar,
  Settings,
  Mail,
  Smartphone
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { 
  generateMockNotifications, 
  filterNotifications, 
  getNotificationColor, 
  getCategoryIcon,
  NOTIFICATION_SETTINGS_DEFAULT
} from './helpers';

interface EntrepreneurNotificationsProps {
  user: User;
}

export function EntrepreneurNotifications({ user }: EntrepreneurNotificationsProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const [notifications, setNotifications] = useState(generateMockNotifications());
  const [notificationSettings, setNotificationSettings] = useState(NOTIFICATION_SETTINGS_DEFAULT);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const filteredNotifications = filterNotifications(notifications, { tab: selectedTab });
  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.actionRequired).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <Bell className="w-6 h-6" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Stay updated with your application status and important reminders
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-semibold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-xl font-semibold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Action Required</p>
                <p className="text-xl font-semibold">{urgentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="payment">Reports</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No notifications found</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border-l-4 cursor-pointer hover:bg-accent/50 transition-colors ${getNotificationColor(notification.type)}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(notification.timestamp).toLocaleDateString()}</span>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">Action Required</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Delivery Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, email: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <Label>Push Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, push: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Application Updates</Label>
                  <Switch
                    checked={notificationSettings.applicationUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, applicationUpdates: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Payment Reminders</Label>
                  <Switch
                    checked={notificationSettings.paymentReminders}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, paymentReminders: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Training Opportunities</Label>
                  <Switch
                    checked={notificationSettings.trainingOpportunities}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, trainingOpportunities: checked})
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}