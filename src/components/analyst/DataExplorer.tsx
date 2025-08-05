import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Database, 
  Upload, 
  Download, 
  Eye, 
  FileText, 
  Image,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { User as UserType } from '../../App';

interface DataExplorerProps {
  user: UserType;
  filters: {
    country: string;
    valueChain: string;
    timeRange: string;
  };
  searchQuery: string;
}

interface Document {
  id: string;
  name: string;
  type: 'application' | 'report' | 'financial' | 'legal' | 'photo' | 'other';
  category: string;
  country: string;
  valueChain: string;
  uploadedBy: string;
  uploadDate: string;
  size: number;
  status: 'verified' | 'pending' | 'rejected' | 'processing';
  partnerId: string;
  partnerName: string;
  lastModified: string;
  downloadCount: number;
}

interface UploadLog {
  id: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'success' | 'failed' | 'processing';
  fileSize: number;
  processingTime: number;
  errorMessage?: string;
  ipAddress: string;
}

export function DataExplorer({ user, filters, searchQuery }: DataExplorerProps) {
  const [selectedTab, setSelectedTab] = useState('documents');
  const [documentFilters, setDocumentFilters] = useState({
    type: 'all',
    status: 'all',
    uploadedBy: 'all'
  });
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: 'uploadDate', direction: 'desc' });

  // Mock documents data
  const documents: Document[] = [
    {
      id: 'DOC-001',
      name: 'Business_Registration_Certificate.pdf',
      type: 'legal',
      category: 'Registration Documents',
      country: 'Kenya',
      valueChain: 'Fashion',
      uploadedBy: 'Grace Wanjiku',
      uploadDate: '2024-01-15T10:30:00Z',
      size: 2048576,
      status: 'verified',
      partnerId: 'PTR-001',
      partnerName: 'Wanjiku Fashion House',
      lastModified: '2024-01-15T10:30:00Z',
      downloadCount: 12
    },
    {
      id: 'DOC-002',
      name: 'Q1_2024_Financial_Report.xlsx',
      type: 'financial',
      category: 'Financial Statements',
      country: 'Kenya',
      valueChain: 'Music',
      uploadedBy: 'Samuel Kiprotich',
      uploadDate: '2024-04-10T14:20:00Z',
      size: 1536000,
      status: 'verified',
      partnerId: 'PTR-002',
      partnerName: 'Rift Valley Beats',
      lastModified: '2024-04-12T16:45:00Z',
      downloadCount: 8
    },
    {
      id: 'DOC-003',
      name: 'Business_Plan_v2.docx',
      type: 'application',
      category: 'Business Plans',
      country: 'Uganda',
      valueChain: 'Visual Arts',
      uploadedBy: 'Amara Nsubuga',
      uploadDate: '2024-02-03T09:15:00Z',
      size: 3145728,
      status: 'pending',
      partnerId: 'PTR-003',
      partnerName: 'Kampala Canvas',
      lastModified: '2024-02-03T09:15:00Z',
      downloadCount: 3
    },
    {
      id: 'DOC-004',
      name: 'Workshop_Photos.zip',
      type: 'photo',
      category: 'Supporting Documents',
      country: 'Rwanda',
      valueChain: 'Crafts',
      uploadedBy: 'Fatima Uwimana',
      uploadDate: '2024-01-28T16:30:00Z',
      size: 5242880,
      status: 'verified',
      partnerId: 'PTR-004',
      partnerName: 'Kigali Crafts Collective',
      lastModified: '2024-01-28T16:30:00Z',
      downloadCount: 15
    },
    {
      id: 'DOC-005',
      name: 'Game_Development_Proposal.pdf',
      type: 'application',
      category: 'Project Proposals',
      country: 'Ethiopia',
      valueChain: 'Gaming',
      uploadedBy: 'Dawit Teshome',
      uploadDate: '2024-03-12T11:45:00Z',
      size: 4096000,
      status: 'processing',
      partnerId: 'PTR-005',
      partnerName: 'Addis Game Studio',
      lastModified: '2024-03-12T11:45:00Z',
      downloadCount: 5
    }
  ];

  // Mock upload logs
  const uploadLogs: UploadLog[] = [
    {
      id: 'LOG-001',
      fileName: 'Financial_Report_Q1.pdf',
      uploadedBy: 'Grace Wanjiku',
      uploadDate: '2024-06-15T14:30:00Z',
      status: 'success',
      fileSize: 2048576,
      processingTime: 1200,
      ipAddress: '196.201.214.45'
    },
    {
      id: 'LOG-002',
      fileName: 'Business_Photos.zip',
      uploadedBy: 'Samuel Kiprotich',
      uploadDate: '2024-06-15T13:45:00Z',
      status: 'failed',
      fileSize: 8388608,
      processingTime: 5400,
      errorMessage: 'File size exceeds maximum limit (5MB)',
      ipAddress: '196.201.214.67'
    },
    {
      id: 'LOG-003',
      fileName: 'Updated_Business_Plan.docx',
      uploadedBy: 'Amara Nsubuga',
      uploadDate: '2024-06-15T12:20:00Z',
      status: 'processing',
      fileSize: 1572864,
      processingTime: 2800,
      ipAddress: '196.88.52.91'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'application': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'report': return <FileText className="w-4 h-4 text-green-600" />;
      case 'financial': return <FileText className="w-4 h-4 text-yellow-600" />;
      case 'legal': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'photo': return <Image className="w-4 h-4 text-pink-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSort = (key: keyof Document) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort documents
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = !searchQuery || 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = filters.country === 'all' || doc.country.toLowerCase() === filters.country;
      const matchesValueChain = filters.valueChain === 'all' || doc.valueChain.toLowerCase() === filters.valueChain.replace('-', ' ');
      const matchesType = documentFilters.type === 'all' || doc.type === documentFilters.type;
      const matchesStatus = documentFilters.status === 'all' || doc.status === documentFilters.status;
      
      return matchesSearch && matchesCountry && matchesValueChain && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Document];
      const bVal = b[sortConfig.key as keyof Document];
      
      if (sortConfig.direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const documentStats = {
    total: filteredDocuments.length,
    verified: filteredDocuments.filter(d => d.status === 'verified').length,
    pending: filteredDocuments.filter(d => d.status === 'pending').length,
    processing: filteredDocuments.filter(d => d.status === 'processing').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Data Explorer</h1>
          <p className="text-muted-foreground">
            Explore, manage, and analyze document uploads and data logs
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents Library</TabsTrigger>
          <TabsTrigger value="uploads">Upload Logs</TabsTrigger>
          <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Document Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Documents</p>
                    <p className="text-2xl font-semibold">{documentStats.total}</p>
                  </div>
                  <Database className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Verified</p>
                    <p className="text-2xl font-semibold text-green-600">{documentStats.verified}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-semibold text-yellow-600">{documentStats.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Processing</p>
                    <p className="text-2xl font-semibold text-blue-600">{documentStats.processing}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search documents, partners, or categories..."
                    className="pl-10"
                  />
                </div>
                <Select 
                  value={documentFilters.type} 
                  onValueChange={(value) => setDocumentFilters({...documentFilters, type: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="application">Applications</SelectItem>
                    <SelectItem value="report">Reports</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="photo">Photos</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select 
                  value={documentFilters.status} 
                  onValueChange={(value) => setDocumentFilters({...documentFilters, status: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(document.type)}
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <p className="text-sm text-muted-foreground">{document.category}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{document.partnerName}</p>
                            <p className="text-sm text-muted-foreground">by {document.uploadedBy}</p>
                          </div>
                        </TableCell>
                        <TableCell>{document.country}</TableCell>
                        <TableCell>{document.valueChain}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatFileSize(document.size)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(document.status)}
                            <Badge className={getStatusColor(document.status)}>
                              {document.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{document.downloadCount}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedDocument(document)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Document Details</DialogTitle>
                                </DialogHeader>
                                {selectedDocument && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <h4 className="font-medium">File Information</h4>
                                        <div className="space-y-2">
                                          <div>
                                            <p className="text-sm text-muted-foreground">File Name</p>
                                            <p className="font-medium">{selectedDocument.name}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Type</p>
                                            <Badge variant="outline">{selectedDocument.type}</Badge>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Size</p>
                                            <p className="font-medium">{formatFileSize(selectedDocument.size)}</p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <h4 className="font-medium">Upload Information</h4>
                                        <div className="space-y-2">
                                          <div>
                                            <p className="text-sm text-muted-foreground">Uploaded By</p>
                                            <p className="font-medium">{selectedDocument.uploadedBy}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Upload Date</p>
                                            <p className="font-medium">{new Date(selectedDocument.uploadDate).toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Partner</p>
                                            <p className="font-medium">{selectedDocument.partnerName}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="uploads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Upload Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Processing Time</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.fileName}</TableCell>
                        <TableCell>{log.uploadedBy}</TableCell>
                        <TableCell>{new Date(log.uploadDate).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatFileSize(log.fileSize)}</TableCell>
                        <TableCell>{(log.processingTime / 1000).toFixed(1)}s</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Upload analytics and trends visualization will be displayed here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Document type and status distribution charts will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}