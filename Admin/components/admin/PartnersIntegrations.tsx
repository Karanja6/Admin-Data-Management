import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { 
  Handshake, 
  Plus, 
  Search, 
  Filter, 
  Globe, 
  Building2, 
  MapPin, 
  Link, 
  Check, 
  X,
  Edit,
  Trash2,
  Upload,
  ExternalLink,
  DollarSign,
  Users,
  TrendingUp,
  Settings
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: 'bank' | 'microfinance' | 'lender' | 'aggregator' | 'fintech' | 'ngo';
  logo?: string;
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  status: 'active' | 'inactive' | 'pending';
  loanTypes: string[];
  sectors: string[];
  regions: string[];
  integrationUrl?: string;
  apiKey?: string;
  totalApplications: number;
  totalFunded: number;
  averageTicketSize: number;
  establishedDate: string;
  partnership: {
    startDate: string;
    renewalDate?: string;
    commissionRate: number;
    minimumLoanAmount: number;
    maximumLoanAmount: number;
  };
}

export function PartnersIntegrations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Mock data for demonstration
  const partners: Partner[] = [
    {
      id: '1',
      name: 'Equity Bank Kenya',
      type: 'bank',
      description: 'Leading commercial bank offering SME and youth entrepreneurship loans across East Africa.',
      website: 'https://equitybank.co.ke',
      contactEmail: 'partnerships@equitybank.co.ke',
      contactPhone: '+254-20-2870000',
      status: 'active',
      loanTypes: ['Working Capital', 'Equipment Finance', 'Asset Finance'],
      sectors: ['Fashion', 'Manufacturing', 'Technology', 'Agriculture'],
      regions: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
      integrationUrl: 'https://api.equitybank.co.ke/v1/loans',
      totalApplications: 145,
      totalFunded: 89,
      averageTicketSize: 45000,
      establishedDate: '1984-01-01',
      partnership: {
        startDate: '2023-01-15',
        renewalDate: '2024-01-15',
        commissionRate: 2.5,
        minimumLoanAmount: 10000,
        maximumLoanAmount: 500000
      }
    },
    {
      id: '2',
      name: 'Kiva Microfunds',
      type: 'microfinance',
      description: 'International nonprofit expanding financial access through crowdfunded microloans.',
      website: 'https://kiva.org',
      contactEmail: 'africa@kiva.org',
      contactPhone: '+1-415-277-0660',
      status: 'active',
      loanTypes: ['Microloans', 'Group Lending', 'Working Capital'],
      sectors: ['Crafts', 'Agriculture', 'Retail', 'Services'],
      regions: ['Kenya', 'Uganda', 'Rwanda'],
      totalApplications: 89,
      totalFunded: 78,
      averageTicketSize: 2500,
      establishedDate: '2005-01-01',
      partnership: {
        startDate: '2023-03-01',
        commissionRate: 0,
        minimumLoanAmount: 500,
        maximumLoanAmount: 10000
      }
    },
    {
      id: '3',
      name: 'Tala Kenya',
      type: 'fintech',
      description: 'Digital lending platform providing instant loans through mobile technology.',
      website: 'https://tala.co.ke',
      contactEmail: 'partnerships@tala.co',
      contactPhone: '+254-709-986000',
      status: 'active',
      loanTypes: ['Mobile Loans', 'Digital Credit', 'Working Capital'],
      sectors: ['Technology', 'E-commerce', 'Digital Services'],
      regions: ['Kenya', 'Tanzania'],
      integrationUrl: 'https://api.tala.co/v2/applications',
      totalApplications: 67,
      totalFunded: 45,
      averageTicketSize: 15000,
      establishedDate: '2014-01-01',
      partnership: {
        startDate: '2023-06-01',
        commissionRate: 3.0,
        minimumLoanAmount: 1000,
        maximumLoanAmount: 50000
      }
    },
    {
      id: '4',
      name: 'African Development Bank',
      type: 'bank',
      description: 'Multilateral development finance institution supporting creative economy development.',
      website: 'https://afdb.org',
      contactEmail: 'creativeeconomy@afdb.org',
      contactPhone: '+225-20-26-39-00',
      status: 'pending',
      loanTypes: ['Development Finance', 'SME Loans', 'Sector-Specific Funding'],
      sectors: ['All Creative Sectors'],
      regions: ['Kenya', 'Uganda', 'Rwanda', 'Ethiopia', 'Tanzania'],
      totalApplications: 0,
      totalFunded: 0,
      averageTicketSize: 0,
      establishedDate: '1964-01-01',
      partnership: {
        startDate: '2024-01-01',
        commissionRate: 1.5,
        minimumLoanAmount: 25000,
        maximumLoanAmount: 1000000
      }
    }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || partner.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Partner['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'inactive': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getTypeColor = (type: Partner['type']) => {
    switch (type) {
      case 'bank': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20';
      case 'microfinance': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'fintech': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20';
      case 'lender': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20';
      case 'aggregator': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20';
      case 'ngo': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.status === 'active').length;
  const totalApplications = partners.reduce((sum, p) => sum + p.totalApplications, 0);
  const totalFunded = partners.reduce((sum, p) => sum + p.totalFunded, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Handshake className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Partners</p>
                <p className="text-xl font-semibold">{totalPartners}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Partners</p>
                <p className="text-xl font-semibold">{activePartners}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-xl font-semibold">{totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Funded Applications</p>
                <p className="text-xl font-semibold">{totalFunded}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Handshake className="w-5 h-5" />
              <span>Partner Organizations</span>
            </CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Partner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Partner Name</label>
                      <Input placeholder="Enter partner name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Partner Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank</SelectItem>
                          <SelectItem value="microfinance">Microfinance</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="lender">Lender</SelectItem>
                          <SelectItem value="aggregator">Aggregator</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Partner description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Website</label>
                      <Input placeholder="https://example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact Email</label>
                      <Input placeholder="contact@partner.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Upload Logo</label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <div className="flex space-x-3">
                    <Button>Save Partner</Button>
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bank">Banks</SelectItem>
                <SelectItem value="microfinance">Microfinance</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="lender">Lenders</SelectItem>
                <SelectItem value="aggregator">Aggregators</SelectItem>
                <SelectItem value="ngo">NGOs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10">
                      {partner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{partner.name}</h3>
                    <Badge className={getTypeColor(partner.type)} variant="outline">
                      {partner.type}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(partner.status)} variant="outline">
                  {partner.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {partner.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {partner.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{partner.regions.slice(0, 2).join(', ')}{partner.regions.length > 2 && ` +${partner.regions.length - 2}`}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Applications</p>
                  <p className="font-semibold">{partner.totalApplications}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Funded</p>
                  <p className="font-semibold text-green-600">{partner.totalFunded}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Size</p>
                  <p className="font-semibold">${(partner.averageTicketSize / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {partner.sectors.slice(0, 3).map((sector) => (
                  <Badge key={sector} variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                ))}
                {partner.sectors.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{partner.sectors.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedPartner(partner)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{partner.name} - Partner Details</DialogTitle>
                    </DialogHeader>
                    
                    {selectedPartner && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Partner Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Type:</span>
                                  <Badge className={getTypeColor(selectedPartner.type)} variant="outline">
                                    {selectedPartner.type}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <Badge className={getStatusColor(selectedPartner.status)} variant="outline">
                                    {selectedPartner.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Established:</span>
                                  <span>{new Date(selectedPartner.establishedDate).getFullYear()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Partnership Since:</span>
                                  <span>{new Date(selectedPartner.partnership.startDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Contact Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Email:</span>
                                  <span>{selectedPartner.contactEmail}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Phone:</span>
                                  <span>{selectedPartner.contactPhone}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Financial Terms</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Commission Rate:</span>
                                  <span>{selectedPartner.partnership.commissionRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Min Loan:</span>
                                  <span>${selectedPartner.partnership.minimumLoanAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Max Loan:</span>
                                  <span>${selectedPartner.partnership.maximumLoanAmount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Performance</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Applications:</span>
                                  <span>{selectedPartner.totalApplications}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Funded:</span>
                                  <span className="text-green-600">{selectedPartner.totalFunded}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Success Rate:</span>
                                  <span>{selectedPartner.totalApplications > 0 ? ((selectedPartner.totalFunded / selectedPartner.totalApplications) * 100).toFixed(1) + '%' : '0%'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Supported Sectors & Loan Types</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Sectors:</p>
                              <div className="flex flex-wrap gap-1">
                                {selectedPartner.sectors.map((sector) => (
                                  <Badge key={sector} variant="secondary" className="text-xs">
                                    {sector}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Loan Types:</p>
                              <div className="flex flex-wrap gap-1">
                                {selectedPartner.loanTypes.map((type) => (
                                  <Badge key={type} variant="outline" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Regional Coverage</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedPartner.regions.map((region) => (
                              <Badge key={region} variant="outline" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {selectedPartner.integrationUrl && (
                          <div>
                            <h4 className="font-medium mb-3">Integration Details</h4>
                            <div className="bg-muted rounded-lg p-4 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Link className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">API Endpoint:</span>
                                <code className="text-xs bg-background px-2 py-1 rounded">
                                  {selectedPartner.integrationUrl}
                                </code>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Settings className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Status:</span>
                                <Badge variant={selectedPartner.status === 'active' ? 'default' : 'secondary'}>
                                  {selectedPartner.status === 'active' ? 'Connected' : 'Disconnected'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <Button onClick={() => setShowEditDialog(true)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Partner
                          </Button>
                          <Button variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </Button>
                          <Button variant="outline">
                            Assign to Application
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}