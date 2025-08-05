import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Download, 
  Eye, 
  Filter,
  ArrowUpDown,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { User, UserRole  } from '../../types';
interface PartnerInvestmentsProps {
  user: User;
  filters: {
    country: string;
    valueChain: string;
    timeRange: string;
  };
  searchQuery: string;
}

interface Investment {
  id: string;
  partnerName: string;
  businessName: string;
  country: string;
  sector: string;
  investmentAmount: number;
  dateFunded: string;
  status: 'active' | 'completed' | 'pending' | 'defaulted';
  repaymentProgress: number;
  riskLevel: 'low' | 'medium' | 'high';
  jobsCreated: number;
  revenueGrowth: number;
  contact: {
    email: string;
    phone: string;
  };
}

export function PartnerInvestments({ user, filters, searchQuery }: PartnerInvestmentsProps) {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: 'dateFunded', direction: 'desc' });
  const [tableFilters, setTableFilters] = useState({
    status: 'all',
    riskLevel: 'all',
    fundingYear: 'all'
  });

  // Mock investment data
  const investments: Investment[] = [
    {
      id: 'INV-001',
      partnerName: 'Grace Wanjiku',
      businessName: 'Wanjiku Fashion House',
      country: 'Kenya',
      sector: 'Fashion',
      investmentAmount: 25000,
      dateFunded: '2024-01-15',
      status: 'active',
      repaymentProgress: 65,
      riskLevel: 'low',
      jobsCreated: 12,
      revenueGrowth: 145,
      contact: {
        email: 'grace@wanjikufashion.co.ke',
        phone: '+254 712 345 678'
      }
    },
    {
      id: 'INV-002',
      partnerName: 'Samuel Kiprotich',
      businessName: 'Rift Valley Beats',
      country: 'Kenya',
      sector: 'Music',
      investmentAmount: 18000,
      dateFunded: '2024-02-03',
      status: 'active',
      repaymentProgress: 42,
      riskLevel: 'medium',
      jobsCreated: 8,
      revenueGrowth: 89,
      contact: {
        email: 'samuel@riftvalleybeats.com',
        phone: '+254 701 234 567'
      }
    },
    {
      id: 'INV-003',
      partnerName: 'Amara Nsubuga',
      businessName: 'Kampala Canvas',
      country: 'Uganda',
      sector: 'Visual Arts',
      investmentAmount: 12000,
      dateFunded: '2023-11-20',
      status: 'completed',
      repaymentProgress: 100,
      riskLevel: 'low',
      jobsCreated: 5,
      revenueGrowth: 200,
      contact: {
        email: 'amara@kampalacanvas.ug',
        phone: '+256 772 123 456'
      }
    },
    {
      id: 'INV-004',
      partnerName: 'Fatima Uwimana',
      businessName: 'Kigali Crafts Collective',
      country: 'Rwanda',
      sector: 'Crafts',
      investmentAmount: 15000,
      dateFunded: '2024-01-28',
      status: 'active',
      repaymentProgress: 28,
      riskLevel: 'low',
      jobsCreated: 15,
      revenueGrowth: 67,
      contact: {
        email: 'fatima@kigalicrafts.rw',
        phone: '+250 788 123 456'
      }
    },
    {
      id: 'INV-005',
      partnerName: 'Dawit Teshome',
      businessName: 'Addis Game Studio',
      country: 'Ethiopia',
      sector: 'Gaming',
      investmentAmount: 30000,
      dateFunded: '2023-09-10',
      status: 'active',
      repaymentProgress: 75,
      riskLevel: 'medium',
      jobsCreated: 18,
      revenueGrowth: 312,
      contact: {
        email: 'dawit@addisgames.et',
        phone: '+251 911 123 456'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'defaulted': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSort = (key: keyof Investment) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting partner investments as ${format}`);
    // Export logic would go here
  };

  // Filter and sort investments
  const filteredInvestments = investments
    .filter(investment => {
      const matchesSearch = !searchQuery || 
        investment.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investment.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investment.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investment.sector.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = filters.country === 'all' || investment.country.toLowerCase() === filters.country;
      const matchesValueChain = filters.valueChain === 'all' || investment.sector.toLowerCase() === filters.valueChain.replace('-', ' ');
      const matchesStatus = tableFilters.status === 'all' || investment.status === tableFilters.status;
      const matchesRisk = tableFilters.riskLevel === 'all' || investment.riskLevel === tableFilters.riskLevel;
      
      return matchesSearch && matchesCountry && matchesValueChain && matchesStatus && matchesRisk;
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.key as keyof Investment];
      const bVal = b[sortConfig.key as keyof Investment];
      
      if (sortConfig.direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const totalInvestmentAmount = filteredInvestments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const averageRepayment = filteredInvestments.reduce((sum, inv) => sum + inv.repaymentProgress, 0) / filteredInvestments.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Partner Investments</h1>
          <p className="text-muted-foreground">
            Track and analyze investment performance across all partners
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investments</p>
                <p className="text-2xl font-semibold">{filteredInvestments.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalInvestmentAmount)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Repayment</p>
                <p className="text-2xl font-semibold">{averageRepayment.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-semibold">
                  {filteredInvestments.filter(i => i.status === 'active').length}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Advanced Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select 
              value={tableFilters.status} 
              onValueChange={(value) => setTableFilters({...tableFilters, status: value})}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="defaulted">Defaulted</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={tableFilters.riskLevel} 
              onValueChange={(value) => setTableFilters({...tableFilters, riskLevel: value})}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={tableFilters.fundingYear} 
              onValueChange={(value) => setTableFilters({...tableFilters, fundingYear: value})}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Investments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSort('partnerName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Partner Name</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSort('country')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Country</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSort('investmentAmount')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSort('dateFunded')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date Funded</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium">{investment.partnerName}</TableCell>
                    <TableCell>{investment.businessName}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{investment.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{investment.sector}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(investment.investmentAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(investment.dateFunded).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(investment.status)}>
                        {investment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${investment.repaymentProgress}%` }}
                          />
                        </div>
                        <span className="text-sm">{investment.repaymentProgress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(investment.riskLevel)}>
                        {investment.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedInvestment(investment)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Investment Details</DialogTitle>
                          </DialogHeader>
                          {selectedInvestment && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-medium">Partner Information</h4>
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Name</p>
                                      <p className="font-medium">{selectedInvestment.partnerName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Business</p>
                                      <p className="font-medium">{selectedInvestment.businessName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Contact</p>
                                      <p className="text-sm">{selectedInvestment.contact.email}</p>
                                      <p className="text-sm">{selectedInvestment.contact.phone}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="font-medium">Investment Details</h4>
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Amount</p>
                                      <p className="font-medium">{formatCurrency(selectedInvestment.investmentAmount)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Date Funded</p>
                                      <p className="font-medium">{new Date(selectedInvestment.dateFunded).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Jobs Created</p>
                                      <p className="font-medium">{selectedInvestment.jobsCreated}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Revenue Growth</p>
                                      <p className="font-medium text-green-600">+{selectedInvestment.revenueGrowth}%</p>
                                    </div>
                                  </div>
                                </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}