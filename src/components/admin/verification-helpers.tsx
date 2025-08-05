import React from 'react';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified':
    case 'submitted':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-orange-500" />;
    case 'missing':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary">Pending Review</Badge>;
    case 'approved':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    case 'info-requested':
      return <Badge variant="outline">Info Requested</Badge>;
    default:
      return null;
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500';
    case 'medium':
      return 'border-l-orange-500';
    case 'low':
      return 'border-l-green-500';
    default:
      return '';
  }
};