import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { 
  Download, 
  Eye, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface QuarterlyReportsProps {
  user: User;
  filters: {
    country: string;
    valueChain: string;
    timeRange: string;
  };
  searchQuery: string;
}

interface MEReport {
  id: string;
  partnerName: string;
  businessName: string;
  country: string;
  sector: string;
  quarter: string;
  year: number;
  submissionStatus: 'submitted' | 'missing' | 'late' | 'draft';
  submissionDate: string | null;
  dueDate: string;
  reportData: {
    revenue: number;
    revenueGrowth: number;
    employees: number;
    employmentGrowth: number;
    maleEmployees: number;
    femaleEmployees: number;
    milestones: string[];
    challenges: string;
    nextSteps: string;
  };
  compliance: {
    dataCompleteness: number;
    timeliness: 'on-time' | 'late' | 'overdue';
    qualityScore: number;
  };
}

export function QuarterlyReports({ user, filters, searchQuery }: QuarterlyReportsProps) {
  const [selectedReport, setSelectedReport] = useState<MEReport | null>(null);
  const [reportFilters, setReportFilters] = useState({
    status: 'all',
    quarter: 'all',
    year: '2024'
  });

  // Mock M&E reports data
  const reports: MEReport[] = [
    {
      id: 'RPT-001',
      partnerName: 'Grace Wanjiku',
      businessName: 'Wanjiku Fashion House',
      country: 'Kenya',
      sector: 'Fashion',
      quarter: 'Q1',
      year: 2024,
      submissionStatus: 'submitted',
      submissionDate: '2024-04-10',
      dueDate: '2024-04-15',
      reportData: {
        revenue: 35000,
        revenueGrowth: 18.5,
        employees: 12,
        employmentGrowth: 20,
        maleEmployees: 4,
        femaleEmployees: 8,
        milestones: [
          'Launched online store',
          'Hired 2 additional seamstresses',
          'Established partnership with local boutiques'
        ],
        challenges: 'Supply chain disruptions affecting raw material costs',
        nextSteps: 'Diversify supplier base and launch summer collection'
      },
      compliance: {
        dataCompleteness: 95,
        timeliness: 'on-time',
        qualityScore: 92
      }
    },
    {
      id: 'RPT-002',
      partnerName: 'Samuel Kiprotich',
      businessName: 'Rift Valley Beats',
      country: 'Kenya',
      sector: 'Music',
      quarter: 'Q1',
      year: 2024,
      submissionStatus: 'late',
      submissionDate: '2024-04-18',
      dueDate: '2024-04-15',
      reportData: {
        revenue: 22000,
        revenueGrowth: 12.3,
        employees: 8,
        employmentGrowth: 14,
        maleEmployees: 5,
        femaleEmployees: 3,
        milestones: [
          'Released new album',
          'Performed at 3 major festivals',
          'Signed distribution deal'
        ],
        challenges: 'Limited studio equipment affecting production quality',
        nextSteps: 'Upgrade recording equipment and expand marketing reach'
      },
      compliance: {
        dataCompleteness: 88,
        timeliness: 'late',
        qualityScore: 85
      }
    },
    {
      id: 'RPT-003',
      partnerName: 'Amara Nsubuga',
      businessName: 'Kampala Canvas',
      country: 'Uganda',
      sector: 'Visual Arts',
      quarter: 'Q1',
      year: 2024,
      submissionStatus: 'submitted',
      submissionDate: '2024-04-12',
      dueDate: '2024-04-15',
      reportData: {
        revenue: 18000,
        revenueGrowth: 25.7,
        employees: 5,
        employmentGrowth: 25,
        maleEmployees: 2,
        femaleEmployees: 3,
        milestones: [
          'Exhibited at East Africa Art Fair',
          'Launched art education program',
          'Secured gallery representation'
        ],
        challenges: 'Limited workspace restricting large-scale projects',
        nextSteps: 'Secure larger studio space and hire assistant'
      },
      compliance: {
        dataCompleteness: 100,
        timeliness: 'on-time',
        qualityScore: 98
      }
    },
    {
      id: 'RPT-004',
      partnerName: 'Fatima Uwimana',
      businessName: 'Kigali Crafts Collective',
      country: 'Rwanda',
      sector: 'Crafts',
      quarter: 'Q1',
      year: 2024,
      submissionStatus: 'missing',
      submissionDate: null,
      dueDate: '2024-04-15',
      reportData: {
        revenue: 0,
        revenueGrowth: 0,
        employees: 0,
        employmentGrowth: 0,
        maleEmployees: 0,
        femaleEmployees: 0,
        milestones: [],
        challenges: '',
        nextSteps: ''
      },
      compliance: {
        dataCompleteness: 0,
        timeliness: 'overdue',
        qualityScore: 0
      }
    },
    {
      id: 'RPT-005',
      partnerName: 'Dawit Teshome',
      businessName: 'Addis Game Studio',
      country: 'Ethiopia',
      sector: 'Gaming',
      quarter: 'Q1',
      year: 2024,
      submissionStatus: 'submitted',
      submissionDate: '2024-04-08',
      dueDate: '2024-04-15',
      reportData: {
        revenue: 45000,
        revenueGrowth: 35.2,
        employees: 18,
        employmentGrowth: 28,
        maleEmployees: 12,
        femaleEmployees: 6,
        milestones: [
          'Released mobile game update',
          'Expanded to iOS platform',
          'Secured publishing deal'
        ],
        challenges: 'Finding experienced developers in local market',
        nextSteps: 'Launch remote work program and develop second game'
      },
      compliance: {
        dataCompleteness: 92,
        timeliness: 'on-time',
        qualityScore: 89
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'missing': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'missing': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'draft': return <FileText className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = !searchQuery || 
      report.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = filters.country === 'all' || report.country.toLowerCase() === filters.country;
    const matchesValueChain = filters.valueChain === 'all' || report.sector.toLowerCase() === filters.valueChain.replace('-', ' ');
    const matchesStatus = reportFilters.status === 'all' || report.submissionStatus === reportFilters.status;
    const matchesQuarter = reportFilters.quarter === 'all' || report.quarter === reportFilters.quarter;
    const matchesYear = reportFilters.year === 'all' || report.year.toString() === reportFilters.year;
    
    return matchesSearch && matchesCountry && matchesValueChain && matchesStatus && matchesQuarter && matchesYear;
  });

  const reportStats = {
    total: filteredReports.length,
    submitted: filteredReports.filter(r => r.submissionStatus === 'submitted').length,
    missing: filteredReports.filter(r => r.submissionStatus === 'missing').length,
    late: filteredReports.filter(r => r.submissionStatus === 'late').length,
    averageCompliance: filteredReports.reduce((sum, r) => sum + r.compliance.dataCompleteness, 0) / filteredReports.length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Quarterly Reports (M&E)</h1>
          <p className="text-muted-foreground">
            Monitor and evaluate partner performance through quarterly reporting
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Compliance Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-semibold">{reportStats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-2xl font-semibold text-green-600">{reportStats.submitted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-semibold text-yellow-600">{reportStats.late}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Missing</p>
                <p className="text-2xl font-semibold text-red-600">{reportStats.missing}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Compliance</p>
                <p className={`text-2xl font-semibold ${getComplianceColor(reportStats.averageCompliance)}`}>
                  {reportStats.averageCompliance.toFixed(1)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Select 
              value={reportFilters.status} 
              onValueChange={(value) => setReportFilters({...reportFilters, status: value})}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={reportFilters.quarter} 
              onValueChange={(value) => setReportFilters({...reportFilters, quarter: value})}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Quarters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quarters</SelectItem>
                <SelectItem value="Q1">Q1</SelectItem>
                <SelectItem value="Q2">Q2</SelectItem>
                <SelectItem value="Q3">Q3</SelectItem>
                <SelectItem value="Q4">Q4</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={reportFilters.year} 
              onValueChange={(value) => setReportFilters({...reportFilters, year: value})}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
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

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>M&E Report Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.partnerName}</TableCell>
                    <TableCell>{report.businessName}</TableCell>
                    <TableCell>{report.country}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.sector}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{report.quarter} {report.year}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.submissionStatus)}
                        <Badge className={getStatusColor(report.submissionStatus)}>
                          {report.submissionStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={new Date(report.dueDate) < new Date() && report.submissionStatus === 'missing' ? 'text-red-600' : ''}>
                        {new Date(report.dueDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Progress value={report.compliance.dataCompleteness} className="w-16 h-2" />
                          <span className={`text-sm ${getComplianceColor(report.compliance.dataCompleteness)}`}>
                            {report.compliance.dataCompleteness}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.submissionStatus === 'submitted' ? (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-3 h-3 text-green-600" />
                            <span className="text-sm text-green-600">
                              +{report.reportData.revenueGrowth}%
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-3 h-3 text-blue-600" />
                            <span className="text-sm text-blue-600">
                              {report.reportData.employees} jobs
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No data</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>M&E Report Details - {report.quarter} {report.year}</DialogTitle>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-6 max-h-96 overflow-y-auto">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-medium">Business Performance</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Revenue</p>
                                      <p className="font-semibold">{formatCurrency(selectedReport.reportData.revenue)}</p>
                                      <p className="text-sm text-green-600">+{selectedReport.reportData.revenueGrowth}%</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Employees</p>
                                      <p className="font-semibold">{selectedReport.reportData.employees}</p>
                                      <p className="text-sm text-blue-600">+{selectedReport.reportData.employmentGrowth}%</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Gender Distribution</p>
                                    <div className="flex space-x-4 text-sm">
                                      <span>Male: {selectedReport.reportData.maleEmployees}</span>
                                      <span>Female: {selectedReport.reportData.femaleEmployees}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="font-medium">Compliance Metrics</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Data Completeness</p>
                                      <div className="flex items-center space-x-2">
                                        <Progress value={selectedReport.compliance.dataCompleteness} className="flex-1" />
                                        <span className="text-sm font-medium">{selectedReport.compliance.dataCompleteness}%</span>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Quality Score</p>
                                      <div className="flex items-center space-x-2">
                                        <Progress value={selectedReport.compliance.qualityScore} className="flex-1" />
                                        <span className="text-sm font-medium">{selectedReport.compliance.qualityScore}%</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {selectedReport.reportData.milestones.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Key Milestones</h4>
                                  <ul className="space-y-1">
                                    {selectedReport.reportData.milestones.map((milestone, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                        <span className="text-sm">{milestone}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {selectedReport.reportData.challenges && (
                                <div>
                                  <h4 className="font-medium mb-2">Challenges</h4>
                                  <p className="text-sm bg-accent p-3 rounded-lg">{selectedReport.reportData.challenges}</p>
                                </div>
                              )}

                              {selectedReport.reportData.nextSteps && (
                                <div>
                                  <h4 className="font-medium mb-2">Next Steps</h4>
                                  <p className="text-sm bg-primary/5 p-3 rounded-lg">{selectedReport.reportData.nextSteps}</p>
                                </div>
                              )}
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