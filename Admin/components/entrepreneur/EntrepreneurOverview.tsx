import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Upload, 
  TrendingUp, 
  GraduationCap,
  CheckCircle,
  Clock,
  AlertCircle,
  
  DollarSign,
  Users,
  Calendar,
  Bell,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { User } from '../../App';

interface EntrepreneurOverviewProps {
  user: User;
}

export function EntrepreneurOverview({ user }: EntrepreneurOverviewProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Under Review': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Pending': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'Rejected': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getProgressPercentage = (stage?: string) => {
    switch (stage) {
      case 'Submitted': return 25;
      case 'Under Review': return 50;
      case 'Shortlisted': return 75;
      case 'Approved': return 100;
      default: return 0;
    }
  };

  // Mock recent notifications
  const recentNotifications = [
    {
      id: '1',
      title: 'Document Review Complete',
      message: 'Your business plan has been reviewed and approved.',
      timestamp: '2 hours ago',
      type: 'success'
    },
    {
      id: '2',
      title: 'Monthly Report Due',
      message: 'Please submit your Q4 progress report by Dec 31st.',
      timestamp: '1 day ago',
      type: 'warning'
    },
    {
      id: '3',
      title: 'Training Opportunity',
      message: 'New digital marketing workshop available.',
      timestamp: '3 days ago',
      type: 'info'
    }
  ];

  // Mock upcoming tasks
  const upcomingTasks = [
    {
      id: '1',
      title: 'Submit Financial Statements',
      dueDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Complete Business Training Module',
      dueDate: '2024-01-20',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Update Business Photos',
      dueDate: '2024-01-25',
      priority: 'low'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your application and business growth.
        </p>
      </div>

      {/* Application Status Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Application Status</span>
            </CardTitle>
            <Badge className={getStatusColor(user.applicationStatus?.currentStage)} variant="outline">
              {user.applicationStatus?.currentStage || 'Not Started'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{getProgressPercentage(user.applicationStatus?.currentStage)}%</span>
            </div>
            <Progress value={getProgressPercentage(user.applicationStatus?.currentStage)} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {user.applicationStatus?.applicationId || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">Application ID</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">
                {user.applicationStatus?.lastUpdate ? 
                  new Date(user.applicationStatus.lastUpdate).toLocaleDateString() : 'N/A'
                }
              </p>
              <p className="text-sm text-muted-foreground">Last Update</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">12 days</p>
              <p className="text-sm text-muted-foreground">Processing Time</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              View Application
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Requested Amount</p>
                <p className="text-xl font-semibold">$25,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-xl font-semibold">{user.businessInfo?.employees || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-xl font-semibold">
                  ${user.businessInfo?.currentRevenue?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Est. Since</p>
                <p className="text-xl font-semibold">{user.businessInfo?.establishedYear || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Recent Notifications</span>
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium">Upload Documents</h3>
            <p className="text-sm text-muted-foreground">
              Submit required documents and reports quickly
            </p>
            <Button className="w-full">
              Access Upload Center
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium">Learn & Grow</h3>
            <p className="text-sm text-muted-foreground">
              Access training materials and business resources
            </p>
            <Button variant="outline" className="w-full">
              <PlayCircle className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your business growth and milestones
            </p>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support & Resources */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-medium">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is here to guide you through the process
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button size="sm">
                <GraduationCap className="w-4 h-4 mr-2" />
                View FAQs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}