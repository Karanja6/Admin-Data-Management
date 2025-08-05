import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { NotificationDemo } from './NotificationDemo';
import { 
  Send, 
  Bell, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

export function NotificationManager() {
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    recipients: 'all',
    priority: 'medium',
    type: 'general'
  });

  const [sentNotifications] = useState([
    {
      id: 1,
      title: 'Monthly Report Reminder',
      message: 'Your February business report is due in 3 days. Please submit your update.',
      recipients: 'pending_reports',
      recipientCount: 15,
      sentDate: '2024-02-27',
      status: 'sent',
      type: 'reminder'
    },
    {
      id: 2,
      title: 'New Funding Opportunity',
      message: 'We have launched a new funding program for technology startups. Apply now!',
      recipients: 'tech_entrepreneurs',
      recipientCount: 45,
      sentDate: '2024-02-25',
      status: 'sent',
      type: 'opportunity'
    },
    {
      id: 3,
      title: 'Platform Maintenance',
      message: 'The platform will undergo scheduled maintenance on March 1st from 2-4 AM.',
      recipients: 'all',
      recipientCount: 247,
      sentDate: '2024-02-24',
      status: 'sent',
      type: 'announcement'
    }
  ]);

  const templates = [
    {
      id: 'report_reminder',
      title: 'Monthly Report Reminder',
      message: 'Your monthly business report is due soon. Please submit your update to maintain your funding status.',
      type: 'reminder'
    },
    {
      id: 'funding_approved',
      title: 'Funding Approved',
      message: 'Congratulations! Your funding request has been approved. The funds will be disbursed within 2-3 business days.',
      type: 'approval'
    },
    {
      id: 'document_required',
      title: 'Additional Documents Required',
      message: 'To complete your verification, please upload the requested documents in your profile.',
      type: 'verification'
    }
  ];

  const handleSendNotification = () => {
    // Simulate sending notification
    console.log('Sending notification:', notificationForm);
    // Reset form
    setNotificationForm({
      title: '',
      message: '',
      recipients: 'all',
      priority: 'medium',
      type: 'general'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="h-4 w-4" />;
      case 'approval':
        return <CheckCircle className="h-4 w-4" />;
      case 'announcement':
        return <Bell className="h-4 w-4" />;
      case 'opportunity':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      reminder: 'bg-orange-100 text-orange-800',
      approval: 'bg-green-100 text-green-800',
      announcement: 'bg-blue-100 text-blue-800',
      opportunity: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || colors.general}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Notification Manager</h1>
        <p className="text-muted-foreground">Send notifications and manage communications with entrepreneurs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Send className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-muted-foreground">Sent Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-muted-foreground">Read Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">247</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Create and send notifications to entrepreneurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <Select 
                    value={notificationForm.recipients}
                    onValueChange={(value) => setNotificationForm({...notificationForm, recipients: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entrepreneurs (247)</SelectItem>
                      <SelectItem value="pending_reports">Pending Reports (15)</SelectItem>
                      <SelectItem value="pending_verification">Pending Verification (13)</SelectItem>
                      <SelectItem value="approved">Approved Entrepreneurs (189)</SelectItem>
                      <SelectItem value="tech_entrepreneurs">Technology Sector (45)</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing Sector (67)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={notificationForm.priority}
                    onValueChange={(value) => setNotificationForm({...notificationForm, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select 
                    value={notificationForm.type}
                    onValueChange={(value) => setNotificationForm({...notificationForm, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="verification">Verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Notification title..."
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Write your notification message here..."
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSendNotification}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    {getTypeBadge(template.type)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.message}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setNotificationForm({
                      ...notificationForm,
                      title: template.title,
                      message: template.message,
                      type: template.type
                    })}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {sentNotifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {getTypeBadge(notification.type)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Sent to {notification.recipientCount} recipients</span>
                          <span>•</span>
                          <span>{notification.sentDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="mt-6">
          <NotificationDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}