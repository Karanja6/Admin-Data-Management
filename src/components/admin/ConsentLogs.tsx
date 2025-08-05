import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  User,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface ConsentRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: 'admin' | 'analyst' | 'entrepreneur';
  consentType: 'data_processing' | 'marketing' | 'cookies' | 'analytics' | 'communications';
  status: 'granted' | 'denied' | 'withdrawn' | 'expired';
  timestamp: string;
  version: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  expirationDate?: string;
  withdrawalReason?: string;
  legalBasis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
}

export function ConsentLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<ConsentRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock consent data
  const consentRecords: ConsentRecord[] = [
    {
      id: '1',
      userId: 'USR001',
      userName: 'Sarah Wanjiku',
      userEmail: 'sarah.wanjiku@example.com',
      userType: 'entrepreneur',
      consentType: 'data_processing',
      status: 'granted',
      timestamp: '2024-01-15T10:30:00Z',
      version: '2.1',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      location: 'Nairobi, Kenya',
      expirationDate: '2025-01-15T10:30:00Z',
      legalBasis: 'consent'
    },
    {
      id: '2',
      userId: 'USR002',
      userName: 'James Mwangi',
      userEmail: 'james.mwangi@example.com',
      userType: 'entrepreneur',
      consentType: 'marketing',
      status: 'withdrawn',
      timestamp: '2024-01-10T14:20:00Z',
      version: '2.0',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: 'Kampala, Uganda',
      withdrawalReason: 'No longer interested in marketing communications',
      legalBasis: 'consent'
    },
    {
      id: '3',
      userId: 'USR003',
      userName: 'Admin User',
      userEmail: 'admin@heva.com',
      userType: 'admin',
      consentType: 'analytics',
      status: 'granted',
      timestamp: '2024-01-12T09:15:00Z',
      version: '2.1',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'Nairobi, Kenya',
      legalBasis: 'legitimate_interests'
    },
    {
      id: '4',
      userId: 'USR004',
      userName: 'Grace Akinyi',
      userEmail: 'grace.akinyi@example.com',
      userType: 'entrepreneur',
      consentType: 'data_processing',
      status: 'expired',
      timestamp: '2023-01-15T08:45:00Z',
      version: '1.5',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Android 13; Mobile; rv:109.0)',
      location: 'Kigali, Rwanda',
      expirationDate: '2024-01-15T08:45:00Z',
      legalBasis: 'consent'
    },
    {
      id: '5',
      userId: 'USR005',
      userName: 'Michael Tembe',
      userEmail: 'michael.tembe@example.com',
      userType: 'entrepreneur',
      consentType: 'communications',
      status: 'denied',
      timestamp: '2024-01-08T16:30:00Z',
      version: '2.1',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      location: 'Dar es Salaam, Tanzania',
      legalBasis: 'consent'
    }
  ];

  const filteredRecords = consentRecords.filter(record => {
    const matchesSearch = record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.consentType === typeFilter;
    const matchesUserType = userTypeFilter === 'all' || record.userType === userTypeFilter;
    return matchesSearch && matchesStatus && matchesType && matchesUserType;
  });

  const getStatusColor = (status: ConsentRecord['status']) => {
    switch (status) {
      case 'granted': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'denied': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'withdrawn': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'expired': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: ConsentRecord['status']) => {
    switch (status) {
      case 'granted': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'withdrawn': return <XCircle className="w-4 h-4 text-orange-600" />;
      case 'expired': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const consentTypeCounts = {
    total: consentRecords.length,
    granted: consentRecords.filter(r => r.status === 'granted').length,
    denied: consentRecords.filter(r => r.status === 'denied').length,
    withdrawn: consentRecords.filter(r => r.status === 'withdrawn').length,
    expired: consentRecords.filter(r => r.status === 'expired').length,
  };

  const recentActivity = consentRecords
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span>Consent Logs</span>
          </h1>
          <p className="text-muted-foreground">
            Track and manage GDPR compliance and data consent across the platform
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Compliance Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-xl font-semibold">{consentTypeCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Granted</p>
                <p className="text-xl font-semibold">{consentTypeCounts.granted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Denied</p>
                <p className="text-xl font-semibold">{consentTypeCounts.denied}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Withdrawn</p>
                <p className="text-xl font-semibold">{consentTypeCounts.withdrawn}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-xl font-semibold">{consentTypeCounts.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((record) => (
              <div key={record.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                {getStatusIcon(record.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{record.userName}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {record.consentType.replace('_', ' ')} • {record.status}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Consent Records</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="granted">Granted</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="data_processing">Data Processing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="cookies">Cookies</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="communications">Communications</SelectItem>
                </SelectContent>
              </Select>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All User Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All User Types</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneurs</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="analyst">Analysts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Consent Records</CardTitle>
            <Badge variant="outline">{filteredRecords.length} records</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Consent Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Legal Basis</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{record.userName}</p>
                      <p className="text-sm text-muted-foreground">{record.userEmail}</p>
                      <Badge variant="outline" className="text-xs">
                        {record.userType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium capitalize">
                        {record.consentType.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">v{record.version}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)} variant="outline">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(record.status)}
                        <span className="capitalize">{record.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">
                      {record.legalBasis.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{record.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog open={showDetails && selectedRecord?.id === record.id} onOpenChange={(open) => {
                      setShowDetails(open);
                      if (!open) setSelectedRecord(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Consent Record Details</DialogTitle>
                        </DialogHeader>
                        
                        {selectedRecord && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">User Information</label>
                                  <div className="mt-1">
                                    <p className="font-medium">{selectedRecord.userName}</p>
                                    <p className="text-sm text-muted-foreground">{selectedRecord.userEmail}</p>
                                    <p className="text-sm text-muted-foreground">ID: {selectedRecord.userId}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Consent Details</label>
                                  <div className="mt-1">
                                    <p className="font-medium capitalize">
                                      {selectedRecord.consentType.replace('_', ' ')}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Version: {selectedRecord.version}</p>
                                    <Badge className={getStatusColor(selectedRecord.status)} variant="outline">
                                      {selectedRecord.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Technical Details</label>
                                  <div className="mt-1 space-y-1">
                                    <p className="text-sm">IP: {selectedRecord.ipAddress}</p>
                                    <p className="text-sm">Location: {selectedRecord.location}</p>
                                    <p className="text-sm">Legal Basis: {selectedRecord.legalBasis}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Timestamps</label>
                                  <div className="mt-1 space-y-1">
                                    <p className="text-sm">
                                      Granted: {new Date(selectedRecord.timestamp).toLocaleString()}
                                    </p>
                                    {selectedRecord.expirationDate && (
                                      <p className="text-sm">
                                        Expires: {new Date(selectedRecord.expirationDate).toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {selectedRecord.withdrawalReason && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Withdrawal Reason</label>
                                <p className="mt-1 text-sm">{selectedRecord.withdrawalReason}</p>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium text-muted-foreground">User Agent</label>
                              <p className="mt-1 text-sm font-mono text-muted-foreground break-all">
                                {selectedRecord.userAgent}
                              </p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}