import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useNotifications } from '../../services/NotificationService';
import { useRealtime } from '../../contexts/RealtimeContext';
import { 
  Bell, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle,
  Zap
} from 'lucide-react';

export function NotificationDemo() {
  const { sendNotification, permission, requestPermission } = useNotifications();
  const { updateData } = useRealtime();
  const [isSending, setIsSending] = useState(false);

  const demoNotifications = [
    {
      title: 'Funding Approved!',
      body: 'Your funding request of KSh 45,000 has been approved.',
      type: 'success' as const,
      icon: '💰'
    },
    {
      title: 'Document Required',
      body: 'Please upload additional business documents for verification.',
      type: 'warning' as const,
      icon: '📄'
    },
    {
      title: 'New Message',
      body: 'You have received feedback from the HEVA team.',
      type: 'info' as const,
      icon: '💬'
    },
    {
      title: 'Payment Failed',
      body: 'Unable to process your latest transaction. Please check your details.',
      type: 'error' as const,
      icon: '❌'
    }
  ];

  const handleSendDemo = async (demo: typeof demoNotifications[0]) => {
    setIsSending(true);
    
    // Simulate real-time data update
    updateData('notification_sent', {
      type: demo.type,
      title: demo.title,
      timestamp: new Date().toISOString()
    });

    // Send the notification
    sendNotification({
      title: demo.title,
      body: demo.body,
      type: demo.type,
      icon: demo.icon
    });

    // Reset sending state
    setTimeout(() => setIsSending(false), 1000);
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (result === 'granted') {
      sendNotification({
        title: 'Notifications Enabled!',
        body: 'You will now receive real-time updates from HEVA CreativeHub.',
        type: 'success',
        icon: '🔔'
      });
    }
  };

  const getPermissionBadge = () => {
    switch (permission) {
      case 'granted':
        return <Badge className="bg-green-100 text-green-800">Enabled</Badge>;
      case 'denied':
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="secondary">Not Set</Badge>;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Push Notification Demo</span>
            </CardTitle>
            <CardDescription>
              Test real-time push notifications to users
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            {getPermissionBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {permission !== 'granted' && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800 dark:text-orange-200">
                  Notifications Disabled
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  Enable browser notifications to receive real-time updates about funding, reports, and community activity.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleRequestPermission}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Notifications
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoNotifications.map((demo, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(demo.type)}
                <div className="flex-1">
                  <h4 className="font-medium">{demo.title}</h4>
                  <p className="text-sm text-muted-foreground">{demo.body}</p>
                </div>
                <span className="text-lg">{demo.icon}</span>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleSendDemo(demo)}
                disabled={isSending || permission !== 'granted'}
              >
                {isSending ? (
                  <Zap className="h-3 w-3 mr-2 animate-pulse" />
                ) : (
                  <Send className="h-3 w-3 mr-2" />
                )}
                Test Notification
              </Button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                Real-time Features
              </h4>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Instant notifications for funding status changes</li>
                <li>• Real-time updates when reports are submitted</li>
                <li>• Live chat and community engagement alerts</li>
                <li>• Automatic reminders for important deadlines</li>
                <li>• Mobile-responsive push notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}