import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useData } from '../../contexts/DataContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  ExternalLink
} from 'lucide-react';

export function DocumentViewer() {
  const { getFilteredApplications } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const applications = getFilteredApplications();

  // Extract documents from applications
  const documents = applications.flatMap(app => {
    const docs = [];
    if (app.documents.registrationCertificate) {
      docs.push({
        id: `${app.id}-reg`,
        name: 'Registration Certificate',
        type: 'registration',
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status
      });
    }
    if (app.documents.financialStatements) {
      docs.push({
        id: `${app.id}-fin`,
        name: 'Financial Statements',
        type: 'financial',
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status
      });
    }
    return docs;
  });

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Document Viewer</h1>
          <p className="text-muted-foreground">
            View and access application documents
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.slice(0, 12).map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm">{doc.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{doc.businessName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applicant</span>
                  <span className="text-sm font-medium">{doc.applicantName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="text-xs">
                    {doc.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Upload Date</span>
                  <span className="text-sm">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}