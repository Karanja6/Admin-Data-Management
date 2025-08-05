import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Phone, MapPin, Mail, FileText, Camera, Eye, CheckCircle, XCircle } from 'lucide-react';
import { getStatusIcon, getStatusBadge, getPriorityColor } from './verification-helpers';

interface Application {
  id: number;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  businessType: string;
  status: string;
  priority: string;
  fundingRequest: number;
  businessDescription: string;
  documents: {
    nationalId: { status: string; url?: string };
    businessDocs: { status: string; url?: string | null };
    businessPhoto: { status: string; url?: string };
    location: { status: string; coordinates?: string | null };
  };
}

interface ApplicationCardProps {
  application: Application;
  onReview: (application: Application) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  showActions?: boolean;
}

export function ApplicationCard({ 
  application, 
  onReview, 
  onApprove, 
  onReject, 
  showActions = true 
}: ApplicationCardProps) {
  return (
    <Card className={`border-l-4 ${getPriorityColor(application.priority)}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                {application.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{application.name}</h3>
                <Badge variant="outline" className="text-xs">{application.businessType}</Badge>
                {getStatusBadge(application.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{application.businessName}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{application.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{application.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Funding:</span>
                  <span>KSh {application.fundingRequest.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm">{application.businessDescription}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4" />
                  <span>National ID</span>
                  {getStatusIcon(application.documents.nationalId.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4" />
                  <span>Business Docs</span>
                  {getStatusIcon(application.documents.businessDocs.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Camera className="h-4 w-4" />
                  <span>Business Photo</span>
                  {getStatusIcon(application.documents.businessPhoto.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                  {getStatusIcon(application.documents.location.status)}
                </div>
              </div>
            </div>
          </div>

          {showActions && (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" onClick={() => onReview(application)}>
                <Eye className="h-4 w-4 mr-2" />
                Review
              </Button>
              
              {application.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onApprove(application.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onReject(application.id)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}