import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  FileText, 
  Upload, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Pencil,
  Eye,
  Download,
  MessageSquare
} from 'lucide-react';
import { User, UserRole, Application } from '../../types';

interface MyApplicationProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
  type: 'submission' | 'review' | 'decision' | 'disbursement';
}

export function MyApplication({ user, onUserUpdate }: MyApplicationProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Mock application timeline
  const timeline: TimelineEvent[] = [
    {
      id: '1',
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted and is in the queue for initial review.',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      type: 'submission'
    },
    {
      id: '2',
      title: 'Document Verification',
      description: 'All required documents have been verified and accepted.',
      date: '2024-01-18T14:20:00Z',
      status: 'completed',
      type: 'review'
    },
    {
      id: '3',
      title: 'Financial Assessment',
      description: 'Your business financial information is currently being evaluated by our analysts.',
      date: '2024-01-22T09:15:00Z',
      status: 'current',
      type: 'review'
    },
    {
      id: '4',
      title: 'Committee Review',
      description: 'Application will be presented to the loan approval committee.',
      date: '2024-01-28T00:00:00Z',
      status: 'pending',
      type: 'decision'
    },
    {
      id: '5',
      title: 'Final Decision',
      description: 'You will receive notification of the final loan decision.',
      date: '2024-02-02T00:00:00Z',
      status: 'pending',
      type: 'decision'
    },
    {
      id: '6',
      title: 'Loan Disbursement',
      description: 'If approved, funds will be disbursed to your registered account.',
      date: '2024-02-05T00:00:00Z',
      status: 'pending',
      type: 'disbursement'
    }
  ];

  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200 dark:bg-green-900/20';
      case 'current': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20';
      case 'pending': return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20';
    }
  };

  const applicationData = {
    id: user.applicationStatus?.applicationId || 'APP-2024-001',
    submissionDate: user.applicationStatus?.lastUpdate || new Date().toISOString(),
    requestedAmount: 25000,
    loanType: 'Working Capital',
    purpose: 'Expanding inventory and hiring additional staff for the upcoming fashion season',
    businessLocation: user.location || 'Nairobi, Kenya',
    completionPercentage: 85
  };

  const documents = [
    { name: 'Business Registration (CR12)', status: 'verified', uploadDate: '2024-01-15' },
    { name: 'Financial Statements (2023)', status: 'verified', uploadDate: '2024-01-15' },
    { name: 'Business Plan', status: 'verified', uploadDate: '2024-01-15' },
    { name: 'Bank Statements (6 months)', status: 'pending', uploadDate: '2024-01-15' },
    { name: 'Collateral Documentation', status: 'missing', uploadDate: null }
  ];

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'missing': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const currentStep = timeline.findIndex(event => event.status === 'current') + 1;
  const progressPercentage = (currentStep / timeline.length) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Application</h1>
          <Badge className={getStatusColor('current')} variant="outline">
            {user.applicationStatus?.currentStage || 'Under Review'}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Track your funding application progress and manage required documents
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Application ID</p>
                <p className="font-semibold">{applicationData.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Requested Amount</p>
                <p className="font-semibold">${applicationData.requestedAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="font-semibold">
                  {new Date(applicationData.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Processing Days</p>
                <p className="font-semibold">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Status Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="details">Application Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {timeline.length}: {timeline[currentStep - 1]?.title}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Current Status</h4>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon('current')}
                      <span className="font-medium">{timeline[currentStep - 1]?.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {timeline[currentStep - 1]?.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Next Steps</h4>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon('pending')}
                      <span className="font-medium">{timeline[currentStep]?.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expected: {timeline[currentStep] ? new Date(timeline[currentStep].date).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Upload className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-medium">Upload Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Add missing documents to complete your application
                </p>
                <Button className="w-full" onClick={() => setSelectedTab('documents')}>
                  View Documents
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <MessageSquare className="w-8 h-8 text-green-600 mx-auto" />
                <h3 className="font-medium">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help with your application process
                </p>
                <Button variant="outline" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Eye className="w-8 h-8 text-blue-600 mx-auto" />
                <h3 className="font-medium">View Details</h3>
                <p className="text-sm text-muted-foreground">
                  Review your complete application information
                </p>
                <Button variant="outline" className="w-full" onClick={() => setSelectedTab('details')}>
                  View Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(event.status)}
                      {index < timeline.length - 1 && (
                        <div className={`w-0.5 h-12 mt-2 ${
                          event.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className={`flex-1 p-4 rounded-lg border ${getStatusColor(event.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          {event.status === 'pending' 
                            ? `Expected: ${new Date(event.date).toLocaleDateString()}`
                            : new Date(event.date).toLocaleDateString()
                          }
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      {event.status === 'current' && (
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            Current Step
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Required Documents</CardTitle>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        {doc.uploadDate && (
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getDocumentStatusColor(doc.status)} variant="outline">
                        {doc.status}
                      </Badge>
                      {doc.status !== 'missing' && (
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      {doc.status === 'missing' && (
                        <Button size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Details</CardTitle>
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Application
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Application</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Some fields may not be editable while your application is under review.
                        Contact support if you need to make significant changes.
                      </p>
                      <Button className="w-full">Contact Support</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Business Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-muted-foreground">Business Name</label>
                      <p className="font-medium">{user.businessInfo?.businessName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Value Chain</label>
                      <p className="font-medium">{user.businessInfo?.valueChain}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Registration Number</label>
                      <p className="font-medium">{user.businessInfo?.registrationNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Employees</label>
                      <p className="font-medium">{user.businessInfo?.employees}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Loan Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-muted-foreground">Loan Type</label>
                      <p className="font-medium">{applicationData.loanType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requested Amount</label>
                      <p className="font-medium">${applicationData.requestedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Purpose</label>
                      <p className="font-medium">{applicationData.purpose}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Business Location</label>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{applicationData.businessLocation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}