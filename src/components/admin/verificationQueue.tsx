import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { ApplicationCard } from './ApplicationCard';
import { ApplicationReviewDialog } from './ApplicationReviewDialog';
import { mockApplications } from './constants';

export function VerificationQueue() {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = (id: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' } : app
    ));
    setIsDialogOpen(false);
  };

  const handleReject = (id: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
    setIsDialogOpen(false);
  };

  const handleRequestInfo = (id: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'info-requested' } : app
    ));
    setIsDialogOpen(false);
  };

  const handleReview = (application: any) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h1>Verification Queue</h1>
        <p className="text-muted-foreground">Review and approve entrepreneur applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{pendingApplications.length}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{approvedApplications.length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{rejectedApplications.length}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">87%</p>
            <p className="text-sm text-muted-foreground">Approval Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          <TabsTrigger value="all">All Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onReview={handleReview}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {approvedApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onReview={handleReview}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {rejectedApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onReview={handleReview}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onReview={handleReview}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={application.status === 'pending'}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ApplicationReviewDialog
        application={selectedApplication}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestInfo={handleRequestInfo}
      />
    </div>
  );
}