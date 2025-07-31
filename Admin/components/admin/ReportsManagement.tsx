import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare, 
  Download,
  Eye
} from 'lucide-react';

export function ReportsManagement() {
  const [reports] = useState([
    {
      id: 1,
      entrepreneurName: 'Sarah Wanjiku',
      businessName: 'Eco Crafts Kenya',
      month: 'February 2024',
      submittedDate: '2024-03-01',
      status: 'pending',
      fundingUsed: 30000,
      totalFunding: 45000,
      revenue: 18000,
      expenses: 25000,
      summary: 'Great progress this month. Completed first batch of eco-friendly bags and secured 3 new corporate clients.',
      receipts: 8,
      feedback: ''
    },
    {
      id: 2,
      entrepreneurName: 'John Muturi',
      businessName: 'TechSolutions KE',
      month: 'February 2024',
      submittedDate: '2024-02-28',
      status: 'reviewed',
      fundingUsed: 42000,
      totalFunding: 75000,
      revenue: 25000,
      expenses: 35000,
      summary: 'Launched mobile app successfully. 50+ farmers signed up in first week. Planning expansion to neighboring counties.',
      receipts: 12,
      feedback: 'Excellent progress! Consider partnering with agricultural cooperatives for faster growth.'
    },
    {
      id: 3,
      entrepreneurName: 'Grace Mwangi',
      businessName: 'Mama Grace Catering',
      month: 'January 2024',
      submittedDate: '2024-02-05',
      status: 'overdue',
      fundingUsed: 0,
      totalFunding: 50000,
      revenue: 0,
      expenses: 0,
      summary: '',
      receipts: 0,
      feedback: 'Report overdue. Please submit update immediately.'
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [adminFeedback, setAdminFeedback] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'reviewed':
        return <Badge className="bg-green-100 text-green-800">Reviewed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'reviewed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  const overdueReports = reports.filter(r => r.status === 'overdue');
  const reviewedReports = reports.filter(r => r.status === 'reviewed');

  return (
    <div className="space-y-6">
      <div>
        <h1>Reports & Feedback</h1>
        <p className="text-muted-foreground">Review monthly reports and provide feedback to entrepreneurs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{pendingReports.length}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{overdueReports.length}</p>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{reviewedReports.length}</p>
            <p className="text-sm text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">94%</p>
            <p className="text-sm text-muted-foreground">On-time Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingReports.length})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({overdueReports.length})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed ({reviewedReports.length})</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {report.entrepreneurName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{report.entrepreneurName}</h3>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.businessName}</p>
                        <p className="text-sm mb-3">{report.month}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">Funding Used:</span>
                            <p className="font-medium">KSh {report.fundingUsed.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Revenue:</span>
                            <p className="font-medium text-green-600">KSh {report.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expenses:</span>
                            <p className="font-medium">KSh {report.expenses.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Receipts:</span>
                            <p className="font-medium">{report.receipts} uploaded</p>
                          </div>
                        </div>
                        
                        <p className="text-sm">{report.summary}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Review Report - {selectedReport?.entrepreneurName}</DialogTitle>
                            <DialogDescription>
                              {selectedReport?.businessName} • {selectedReport?.month}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedReport && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Financial Summary</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span>Funding Used:</span>
                                        <span>KSh {selectedReport.fundingUsed.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Revenue Generated:</span>
                                        <span className="text-green-600">KSh {selectedReport.revenue.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Total Expenses:</span>
                                        <span>KSh {selectedReport.expenses.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Documentation</h4>
                                    <div className="flex items-center space-x-2 text-sm">
                                      <FileText className="h-4 w-4" />
                                      <span>{selectedReport.receipts} receipts uploaded</span>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Business Update</h4>
                                  <p className="text-sm bg-muted p-3 rounded">{selectedReport.summary}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">Admin Feedback</label>
                                <Textarea
                                  placeholder="Provide feedback on their progress, suggestions for improvement, or praise for achievements..."
                                  value={adminFeedback}
                                  onChange={(e) => setAdminFeedback(e.target.value)}
                                  rows={4}
                                />
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button variant="outline">Send Reminder</Button>
                                <Button>Save & Send Feedback</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="overdue" className="mt-6">
          <div className="space-y-4">
            {overdueReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {report.entrepreneurName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{report.entrepreneurName}</h3>
                        <p className="text-sm text-muted-foreground">{report.businessName}</p>
                        <p className="text-sm text-red-600">Report overdue for {report.month}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(report.status)}
                      <Button size="sm" variant="outline">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviewed" className="mt-6">
          <div className="space-y-4">
            {reviewedReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {report.entrepreneurName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{report.entrepreneurName}</h3>
                        <p className="text-sm text-muted-foreground">{report.businessName}</p>
                        <p className="text-sm">{report.month} • KSh {report.fundingUsed.toLocaleString()} used</p>
                      </div>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(report.status)}
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                          {report.entrepreneurName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{report.entrepreneurName}</h3>
                        <p className="text-sm text-muted-foreground">{report.businessName}</p>
                        <p className="text-sm">{report.month}</p>
                      </div>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}