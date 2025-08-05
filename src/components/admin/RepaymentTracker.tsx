import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload, 
  Download,
  Search,
  Filter,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';

interface RepaymentRecord {
  id: string;
  applicantId: string;
  applicantName: string;
  loanAmount: number;
  monthlyPayment: number;
  totalPaid: number;
  remainingBalance: number;
  status: 'current' | 'overdue' | 'paid' | 'defaulted';
  startDate: string;
  dueDate: string;
  paymentHistory: PaymentHistory[];
  riskLevel: 'low' | 'medium' | 'high';
  contactInfo: {
    email: string;
    phone: string;
  };
}

interface PaymentHistory {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'late' | 'missed' | 'upcoming';
  receipt?: string;
  notes?: string;
}

export function RepaymentTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<RepaymentRecord | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [uploadReceipt, setUploadReceipt] = useState<File | null>(null);

  // Mock data for demonstration
  const repaymentRecords: RepaymentRecord[] = [
    {
      id: '1',
      applicantId: 'APP001',
      applicantName: 'Sarah Wanjiku',
      loanAmount: 50000,
      monthlyPayment: 1250,
      totalPaid: 15000,
      remainingBalance: 35000,
      status: 'current',
      startDate: '2023-06-01',
      dueDate: '2024-07-15',
      riskLevel: 'low',
      contactInfo: {
        email: 'sarah@example.com',
        phone: '+254700123456'
      },
      paymentHistory: Array.from({ length: 12 }, (_, i) => ({
        id: `payment-${i}`,
        amount: 1250,
        dueDate: new Date(2023, 5 + i, 15).toISOString(),
        paidDate: i < 10 ? new Date(2023, 5 + i, 14).toISOString() : undefined,
        status: i < 10 ? 'paid' : i === 10 ? 'late' : 'upcoming' as const,
        receipt: i < 10 ? `receipt-${i}.pdf` : undefined
      }))
    },
    {
      id: '2',
      applicantId: 'APP002',
      applicantName: 'James Mwangi',
      loanAmount: 75000,
      monthlyPayment: 1875,
      totalPaid: 5625,
      remainingBalance: 69375,
      status: 'overdue',
      startDate: '2023-09-01',
      dueDate: '2024-10-15',
      riskLevel: 'high',
      contactInfo: {
        email: 'james@example.com',
        phone: '+254700234567'
      },
      paymentHistory: Array.from({ length: 6 }, (_, i) => ({
        id: `payment-${i}`,
        amount: 1875,
        dueDate: new Date(2023, 8 + i, 15).toISOString(),
        paidDate: i < 3 ? new Date(2023, 8 + i, 14).toISOString() : undefined,
        status: i < 3 ? 'paid' : 'missed' as const,
        receipt: i < 3 ? `receipt-${i}.pdf` : undefined
      }))
    },
    {
      id: '3',
      applicantId: 'APP003',
      applicantName: 'Grace Akinyi',
      loanAmount: 30000,
      monthlyPayment: 750,
      totalPaid: 30000,
      remainingBalance: 0,
      status: 'paid',
      startDate: '2022-01-01',
      dueDate: '2023-12-15',
      riskLevel: 'low',
      contactInfo: {
        email: 'grace@example.com',
        phone: '+254700345678'
      },
      paymentHistory: Array.from({ length: 40 }, (_, i) => ({
        id: `payment-${i}`,
        amount: 750,
        dueDate: new Date(2022, i, 15).toISOString(),
        paidDate: new Date(2022, i, 14).toISOString(),
        status: 'paid' as const,
        receipt: `receipt-${i}.pdf`
      }))
    }
  ];

  const filteredRecords = repaymentRecords.filter(record => {
    const matchesSearch = record.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: RepaymentRecord['status']) => {
    switch (status) {
      case 'current': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'overdue': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'paid': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'defaulted': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPaymentStatusIcon = (status: PaymentHistory['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'late': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'missed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const totalLoaned = repaymentRecords.reduce((sum, record) => sum + record.loanAmount, 0);
  const totalPaid = repaymentRecords.reduce((sum, record) => sum + record.totalPaid, 0);
  const totalOutstanding = repaymentRecords.reduce((sum, record) => sum + record.remainingBalance, 0);
  const overdueCount = repaymentRecords.filter(record => record.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Loaned</p>
                <p className="text-xl font-semibold">${totalLoaned.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Repaid</p>
                <p className="text-xl font-semibold">${totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-xl font-semibold">${totalOutstanding.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-xl font-semibold">{overdueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Repayment Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by borrower name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="defaulted">Defaulted</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Repayment Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Monthly Payment</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const progressPercentage = (record.totalPaid / record.loanAmount) * 100;
                
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {record.applicantName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{record.applicantName}</p>
                          <p className="text-sm text-muted-foreground">{record.applicantId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${record.loanAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Start: {new Date(record.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">${record.monthlyPayment.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(record.dueDate).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Paid: ${record.totalPaid.toLocaleString()}</span>
                          <span>{progressPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Remaining: ${record.remainingBalance.toLocaleString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)} variant="outline">
                        {record.status === 'current' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {record.status === 'overdue' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {record.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={record.riskLevel === 'high' ? 'destructive' : record.riskLevel === 'medium' ? 'secondary' : 'outline'}
                      >
                        {record.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedRecord(record)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Payment History - {record.applicantName}</DialogTitle>
                            </DialogHeader>
                            
                            {selectedRecord && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                                        <p className="text-xl font-semibold">${selectedRecord.loanAmount.toLocaleString()}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Total Paid</p>
                                        <p className="text-xl font-semibold text-green-600">${selectedRecord.totalPaid.toLocaleString()}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Remaining</p>
                                        <p className="text-xl font-semibold text-blue-600">${selectedRecord.remainingBalance.toLocaleString()}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* 48-Month Timeline */}
                                <div>
                                  <h4 className="font-medium mb-4">Payment Timeline (48 Months)</h4>
                                  <div className="max-h-64 overflow-y-auto">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Month</TableHead>
                                          <TableHead>Due Date</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Paid Date</TableHead>
                                          <TableHead>Receipt</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedRecord.paymentHistory.map((payment, index) => (
                                          <TableRow key={payment.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                                            <TableCell>${payment.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center space-x-2">
                                                {getPaymentStatusIcon(payment.status)}
                                                <span className="capitalize">{payment.status}</span>
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-'}
                                            </TableCell>
                                            <TableCell>
                                              {payment.receipt ? (
                                                <Button size="sm" variant="outline">
                                                  <Download className="w-3 h-3 mr-1" />
                                                  View
                                                </Button>
                                              ) : (
                                                <span className="text-muted-foreground">-</span>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>

                                <div className="flex space-x-3">
                                  <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                                    <DialogTrigger asChild>
                                      <Button>Record Payment</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Record Payment</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <label className="text-sm font-medium">Payment Amount</label>
                                          <Input placeholder="Enter amount" />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Payment Date</label>
                                          <Input type="date" />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Upload Receipt</label>
                                          <Input type="file" />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Notes</label>
                                          <Textarea placeholder="Payment notes..." />
                                        </div>
                                        <div className="flex space-x-3">
                                          <Button>Save Payment</Button>
                                          <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  <Button variant="outline">Contact Borrower</Button>
                                  <Button variant="outline">Add to Blacklist</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Defaulter Blacklist Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Defaulter Blacklist</span>
            <Badge variant="destructive">3 Entries</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Original Loan</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael Tembe</p>
                      <p className="text-sm text-muted-foreground">APP004</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$25,000</TableCell>
                <TableCell>$18,750</TableCell>
                <TableCell>2023-08-15</TableCell>
                <TableCell>
                  <Badge variant="destructive">120 days</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Contact</Button>
                    <Button size="sm" variant="outline">Remove</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}