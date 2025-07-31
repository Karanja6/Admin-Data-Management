import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useData } from '../../contexts/DataContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Upload,
  FolderOpen,
  ExternalLink,
  Calendar,
  User
} from 'lucide-react';

export function DocumentManager() {
  const { getFilteredApplications } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = getFilteredApplications();

  // Extract documents from applications
  const documents = applications.flatMap(app => {
    const docs = [];
    if (app.documents.registrationCertificate) {
      docs.push({
        id: `${app.id}-reg`,
        name: 'Registration Certificate',
        type: 'registration',
        url: app.documents.registrationCertificate,
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status,
        country: app.country,
        sector: app.valueChain
      });
    }
    if (app.documents.financialStatements) {
      docs.push({
        id: `${app.id}-fin`,
        name: 'Financial Statements',
        type: 'financial',
        url: app.documents.financialStatements,
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status,
        country: app.country,
        sector: app.valueChain
      });
    }
    if (app.documents.businessPlan) {
      docs.push({
        id: `${app.id}-plan`,
        name: 'Business Plan',
        type: 'business_plan',
        url: app.documents.businessPlan,
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status,
        country: app.country,
        sector: app.valueChain
      });
    }
    if (app.documents.collateralDocuments) {
      docs.push({
        id: `${app.id}-collateral`,
        name: 'Collateral Documents',
        type: 'collateral',
        url: app.documents.collateralDocuments,
        applicantName: app.applicantName,
        businessName: app.businessName,
        uploadDate: app.submissionDate,
        status: app.status,
        country: app.country,
        sector: app.valueChain
      });
    }
    return docs;
  });

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = documentType === 'all' || doc.type === documentType;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'registration': return '📋';
      case 'financial': return '💰';
      case 'business_plan': return '📈';
      case 'collateral': return '🏠';
      default: return '📄';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': 'default',
      'under_review': 'secondary',
      'approved': 'default',
      'rejected': 'destructive'
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Document Manager</h1>
          <p className="text-muted-foreground">
            Manage and view all application documents with cloud storage integration
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-xl font-bold">
                  {documents.filter(d => d.status === 'pending' || d.status === 'under_review').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-xl font-bold">
                  {documents.filter(d => d.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Cloud Storage</p>
                <p className="text-xl font-bold">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={documentType} onValueChange={setDocumentType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="registration">Registration</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="business_plan">Business Plan</SelectItem>
            <SelectItem value="collateral">Collateral</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Library</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.slice(0, 15).map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getDocumentIcon(doc.type)}</span>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.businessName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.applicantName}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {doc.country} • {doc.sector.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {doc.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(doc.status)}>
                        {doc.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Storage Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <h4 className="font-medium">Google Drive</h4>
                <p className="text-sm text-muted-foreground">Connected • 2.4 GB used</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">☁️</span>
              </div>
              <div>
                <h4 className="font-medium">OneDrive</h4>
                <p className="text-sm text-muted-foreground">Connected • 1.8 GB used</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}