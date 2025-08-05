import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Application {
  id: number;
  name: string;
  businessName: string;
  fundingRequest: number;
  documents: {
    nationalId: { status: string; url?: string };
    businessDocs: { status: string; url?: string | null };
    businessPhoto: { status: string; url?: string };
  };
}

interface ApplicationReviewDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onRequestInfo: (id: number) => void;
}

export function ApplicationReviewDialog({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestInfo
}: ApplicationReviewDialogProps) {
  const [feedback, setFeedback] = useState('');

  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Application - {application.name}</DialogTitle>
          <DialogDescription>
            {application.businessName} • Funding Request: KSh {application.fundingRequest.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {application.documents.nationalId.url && (
              <div>
                <h4 className="font-medium mb-2">National ID</h4>
                <ImageWithFallback
                  src={application.documents.nationalId.url}
                  alt="National ID"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
            
            {application.documents.businessDocs.url && (
              <div>
                <h4 className="font-medium mb-2">Business Documents</h4>
                <ImageWithFallback
                  src={application.documents.businessDocs.url}
                  alt="Business Documents"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
            
            {application.documents.businessPhoto.url && (
              <div>
                <h4 className="font-medium mb-2">Business Photo</h4>
                <ImageWithFallback
                  src={application.documents.businessPhoto.url}
                  alt="Business Photo"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Admin Feedback (Optional)</label>
            <Textarea
              placeholder="Add feedback or notes about this application..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button 
              variant="destructive"
              onClick={() => onReject(application.id)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              variant="outline"
              onClick={() => onRequestInfo(application.id)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Request More Info
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onApprove(application.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}