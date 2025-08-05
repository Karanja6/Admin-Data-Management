import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Download, 
  Trash2, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Cloud,
  FolderOpen,
  Filter,
  Search
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface UploadCenterProps {
  user: User;
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'application' | 'report' | 'photo' | 'invoice' | 'other';
  category: 'registration' | 'financial' | 'business_plan' | 'monthly_report' | 'quarterly_report' | 'annual_report' | 'misc';
  uploadDate: string;
  size: number;
  status: 'verified' | 'pending' | 'rejected';
  url: string;
  description?: string;
}

export function UploadCenter({ user }: UploadCenterProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dragActive, setDragActive] = useState(false);

  // Mock uploaded files
  const uploadedFiles: UploadedFile[] = [
    {
      id: '1',
      name: 'Business_Registration_Certificate.pdf',
      type: 'application',
      category: 'registration',
      uploadDate: '2024-01-15T10:30:00Z',
      size: 2048576,
      status: 'verified',
      url: '/files/business-reg.pdf',
      description: 'CR12 Business Registration Certificate'
    },
    {
      id: '2',
      name: 'Financial_Statements_2023.pdf',
      type: 'application',
      category: 'financial',
      uploadDate: '2024-01-15T10:35:00Z',
      size: 1536000,
      status: 'verified',
      url: '/files/financial-statements.pdf',
      description: '2023 Annual Financial Statements'
    },
    {
      id: '3',
      name: 'Business_Plan_v2.docx',
      type: 'application',
      category: 'business_plan',
      uploadDate: '2024-01-15T10:40:00Z',
      size: 3145728,
      status: 'pending',
      url: '/files/business-plan.docx',
      description: 'Comprehensive Business Plan Document'
    },
    {
      id: '4',
      name: 'Q4_2023_Report.pdf',
      type: 'report',
      category: 'quarterly_report',
      uploadDate: '2024-01-20T14:20:00Z',
      size: 1024000,
      status: 'verified',
      url: '/files/q4-report.pdf',
      description: 'Q4 2023 Quarterly Business Report'
    },
    {
      id: '5',
      name: 'Workshop_Photos.zip',
      type: 'photo',
      category: 'misc',
      uploadDate: '2024-01-18T16:15:00Z',
      size: 5242880,
      status: 'verified',
      url: '/files/workshop-photos.zip',
      description: 'Photos of business workshop and facilities'
    },
    {
      id: '6',
      name: 'January_Sales_Invoice.pdf',
      type: 'invoice',
      category: 'monthly_report',
      uploadDate: '2024-02-01T09:10:00Z',
      size: 512000,
      status: 'pending',
      url: '/files/jan-invoice.pdf',
      description: 'January 2024 Sales Summary'
    }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string, name: string) => {
    if (type === 'photo' || name.toLowerCase().includes('photo') || name.toLowerCase().includes('image')) {
      return <Image className="w-5 h-5 text-green-600" />;
    }
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'rejected': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    const matchesTab = selectedTab === 'all' || file.type === selectedTab;
    return matchesSearch && matchesType && matchesStatus && matchesTab;
  });

  const fileStats = {
    total: uploadedFiles.length,
    verified: uploadedFiles.filter(f => f.status === 'verified').length,
    pending: uploadedFiles.filter(f => f.status === 'pending').length,
    rejected: uploadedFiles.filter(f => f.status === 'rejected').length
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file upload logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Upload Center</h1>
        <p className="text-muted-foreground">
          Manage your application documents, reports, and supporting files
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <File className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-xl font-semibold">{fileStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-xl font-semibold">{fileStats.verified}</p>
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
                <p className="text-xl font-semibold">{fileStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-xl font-semibold">{fileStats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse and select files
            </p>
            <div className="flex justify-center space-x-3">
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <Button variant="outline">
                <Cloud className="w-4 h-4 mr-2" />
                From Google Drive
              </Button>
              <Button variant="outline">
                <Cloud className="w-4 h-4 mr-2" />
                From OneDrive
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB per file)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="application">Application Docs</SelectItem>
                <SelectItem value="report">Reports</SelectItem>
                <SelectItem value="photo">Photos</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="report">Reports</TabsTrigger>
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="invoice">Invoices</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Files ({filteredFiles.length})</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Create Folder
                  </Button>
                  <Button size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No files found matching your criteria</p>
                  </div>
                ) : (
                  filteredFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type, file.name)}
                        <div className="space-y-1">
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="capitalize">{file.category.replace('_', ' ')}</span>
                          </div>
                          {file.description && (
                            <p className="text-sm text-muted-foreground">{file.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(file.status)} variant="outline">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(file.status)}
                            <span className="capitalize">{file.status}</span>
                          </div>
                        </Badge>
                        
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cloud Storage Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-5 h-5" />
            <span>Cloud Storage Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect your cloud storage accounts to easily import documents and automatically sync your files.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Google Drive</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.053c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.007 24 18.042 24 12.053z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">OneDrive</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}