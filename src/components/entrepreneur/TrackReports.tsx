import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  Upload, 
  Eye, 
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  Target,
  BarChart3,
  FileText,
  Download
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface TrackReportsProps {
  user: User;
}

interface Report {
  id: string;
  type: 'monthly' | 'quarterly' | 'annual';
  period: string;
  submissionDate: string;
  dueDate: string;
  status: 'submitted' | 'pending' | 'overdue' | 'approved' | 'rejected';
  revenue: number;
  expenses: number;
  employees: number;
  maleEmployees: number;
  femaleEmployees: number;
  milestones: string[];
  challenges: string;
  nextSteps: string;
  attachments: string[];
}

export function TrackReports({ user }: TrackReportsProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);
  const [newReportData, setNewReportData] = useState({
    type: 'monthly',
    period: '',
    revenue: '',
    expenses: '',
    employees: '',
    maleEmployees: '',
    femaleEmployees: '',
    milestones: '',
    challenges: '',
    nextSteps: ''
  });

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      type: 'quarterly',
      period: 'Q4 2023',
      submissionDate: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-15T23:59:59Z',
      status: 'approved',
      revenue: 45000,
      expenses: 32000,
      employees: 8,
      maleEmployees: 3,
      femaleEmployees: 5,
      milestones: [
        'Launched new product line',
        'Hired 2 additional seamstresses',
        'Opened second workshop location'
      ],
      challenges: 'Supply chain delays affecting production timelines. Raw material costs increased by 15%.',
      nextSteps: 'Diversify supplier base and negotiate better rates for bulk purchases.',
      attachments: ['Q4_Financial_Report.pdf', 'Product_Photos.zip']
    },
    {
      id: '2',
      type: 'monthly',
      period: 'January 2024',
      submissionDate: '2024-02-01T14:20:00Z',
      dueDate: '2024-02-05T23:59:59Z',
      status: 'submitted',
      revenue: 12000,
      expenses: 8500,
      employees: 8,
      maleEmployees: 3,
      femaleEmployees: 5,
      milestones: [
        'Completed staff training program',
        'Launched online sales platform'
      ],
      challenges: 'Seasonal decrease in demand typical for January.',
      nextSteps: 'Focus on online marketing and Valentine\'s Day collection.',
      attachments: ['January_Sales_Report.pdf']
    },
    {
      id: '3',
      type: 'monthly',
      period: 'February 2024',
      submissionDate: '',
      dueDate: '2024-03-05T23:59:59Z',
      status: 'pending',
      revenue: 0,
      expenses: 0,
      employees: 8,
      maleEmployees: 3,
      femaleEmployees: 5,
      milestones: [],
      challenges: '',
      nextSteps: '',
      attachments: []
    },
    {
      id: '4',
      type: 'quarterly',
      period: 'Q1 2024',
      submissionDate: '',
      dueDate: '2024-04-15T23:59:59Z',
      status: 'pending',
      revenue: 0,
      expenses: 0,
      employees: 8,
      maleEmployees: 3,
      femaleEmployees: 5,
      milestones: [],
      challenges: '',
      nextSteps: '',
      attachments: []
    }
  ];

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'submitted': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'overdue': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'rejected': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'submitted': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const reportStats = {
    total: reports.length,
    submitted: reports.filter(r => r.status === 'submitted' || r.status === 'approved').length,
    pending: reports.filter(r => r.status === 'pending').length,
    overdue: reports.filter(r => r.status === 'overdue').length
  };

  const latestApprovedReport = reports.find(r => r.status === 'approved');
  const currentBusinessMetrics = latestApprovedReport ? {
    revenue: latestApprovedReport.revenue,
    profit: latestApprovedReport.revenue - latestApprovedReport.expenses,
    employees: latestApprovedReport.employees,
    profitMargin: ((latestApprovedReport.revenue - latestApprovedReport.expenses) / latestApprovedReport.revenue) * 100
  } : null;

  const handleNewReportSubmit = () => {
    console.log('Submitting new report:', newReportData);
    setShowNewReportDialog(false);
    // Reset form
    setNewReportData({
      type: 'monthly',
      period: '',
      revenue: '',
      expenses: '',
      employees: '',
      maleEmployees: '',
      femaleEmployees: '',
      milestones: '',
      challenges: '',
      nextSteps: ''
    });
  };

  const upcomingDeadlines = reports
    .filter(r => r.status === 'pending')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Track Reports</h1>
          <p className="text-muted-foreground">
            Submit and monitor your business progress reports
          </p>
        </div>
        <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Submit New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Select value={newReportData.type} onValueChange={(value) => 
                    setNewReportData({...newReportData, type: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="quarterly">Quarterly Report</SelectItem>
                      <SelectItem value="annual">Annual Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Period</Label>
                  <Input
                    placeholder="e.g., March 2024 or Q1 2024"
                    value={newReportData.period}
                    onChange={(e) => setNewReportData({...newReportData, period: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Revenue ($)</Label>
                  <Input
                    type="number"
                    placeholder="Total revenue"
                    value={newReportData.revenue}
                    onChange={(e) => setNewReportData({...newReportData, revenue: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Expenses ($)</Label>
                  <Input
                    type="number"
                    placeholder="Total expenses"
                    value={newReportData.expenses}
                    onChange={(e) => setNewReportData({...newReportData, expenses: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Total Employees</Label>
                  <Input
                    type="number"
                    placeholder="Total staff"
                    value={newReportData.employees}
                    onChange={(e) => setNewReportData({...newReportData, employees: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Male Employees</Label>
                  <Input
                    type="number"
                    placeholder="Male staff"
                    value={newReportData.maleEmployees}
                    onChange={(e) => setNewReportData({...newReportData, maleEmployees: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Female Employees</Label>
                  <Input
                    type="number"
                    placeholder="Female staff"
                    value={newReportData.femaleEmployees}
                    onChange={(e) => setNewReportData({...newReportData, femaleEmployees: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label>Key Milestones</Label>
                <Textarea
                  placeholder="List key achievements and milestones (one per line)"
                  value={newReportData.milestones}
                  onChange={(e) => setNewReportData({...newReportData, milestones: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label>Challenges Faced</Label>
                <Textarea
                  placeholder="Describe main challenges and how you addressed them"
                  value={newReportData.challenges}
                  onChange={(e) => setNewReportData({...newReportData, challenges: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label>Next Steps</Label>
                <Textarea
                  placeholder="Outline plans for the next reporting period"
                  value={newReportData.nextSteps}
                  onChange={(e) => setNewReportData({...newReportData, nextSteps: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleNewReportSubmit} className="flex-1">
                  Submit Report
                </Button>
                <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-xl font-semibold">{reportStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-xl font-semibold">{reportStats.submitted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-semibold">{reportStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-xl font-semibold">{reportStats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
          <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Business Metrics */}
            {currentBusinessMetrics && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Current Business Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <p className="text-lg font-semibold text-green-600">
                        ${currentBusinessMetrics.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <p className="text-lg font-semibold text-blue-600">
                        ${currentBusinessMetrics.profit.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Profit</p>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <p className="text-lg font-semibold text-purple-600">
                        {currentBusinessMetrics.employees}
                      </p>
                      <p className="text-sm text-muted-foreground">Employees</p>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <p className="text-lg font-semibold text-orange-600">
                        {currentBusinessMetrics.profitMargin.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{report.period}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {report.type} report
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)} variant="outline">
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status}</span>
                      </Badge>
                      {report.status !== 'pending' && (
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{report.period}</p>
                        <p className="text-sm text-muted-foreground capitalize">{report.type}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-4 text-sm">
                          {report.status !== 'pending' && (
                            <>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-3 h-3 text-muted-foreground" />
                                <span>Revenue: ${report.revenue.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <span>Staff: {report.employees}</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {new Date(report.dueDate).toLocaleDateString()}</span>
                          {report.submissionDate && (
                            <>
                              <span>•</span>
                              <span>Submitted: {new Date(report.submissionDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)} variant="outline">
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status}</span>
                      </Badge>
                      
                      <div className="flex space-x-1">
                        {report.status === 'pending' ? (
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Submit
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Deadlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming deadlines</p>
                  <p className="text-sm text-muted-foreground">All reports are up to date!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingDeadlines.map((report) => {
                    const daysUntilDue = Math.ceil(
                      (new Date(report.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const isUrgent = daysUntilDue <= 7;

                    return (
                      <div 
                        key={report.id} 
                        className={`p-4 rounded-lg border-l-4 ${
                          isUrgent ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' : 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{report.period} {report.type} Report</h4>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(report.dueDate).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              {isUrgent ? (
                                <Badge variant="destructive">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Due in {daysUntilDue} days
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Submit Now
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.filter(r => r.revenue > 0).map((report, index) => (
                    <div key={report.id} className="flex items-center justify-between">
                      <span className="text-sm">{report.period}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-accent rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(report.revenue / 50000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">${report.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Employment Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Employment Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.filter(r => r.employees > 0).map((report) => (
                    <div key={report.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{report.period}</span>
                        <span className="font-medium">{report.employees} total</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-blue-100 rounded-full h-4 flex items-center">
                          <div 
                            className="bg-blue-500 h-4 rounded-l-full flex items-center justify-center text-xs text-white" 
                            style={{ width: `${(report.maleEmployees / report.employees) * 100}%` }}
                          >
                            {report.maleEmployees}M
                          </div>
                        </div>
                        <div className="flex-1 bg-pink-100 rounded-full h-4 flex items-center">
                          <div 
                            className="bg-pink-500 h-4 rounded-l-full flex items-center justify-center text-xs text-white" 
                            style={{ width: `${(report.femaleEmployees / report.employees) * 100}%` }}
                          >
                            {report.femaleEmployees}F
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}