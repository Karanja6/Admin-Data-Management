import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { useData } from '../../contexts/DataContext';
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  Table,
  BarChart3,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

export function ExportReporting() {
  const { exportData, analytics } = useData();
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('all');
  const [reportType, setReportType] = useState('applications');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    exportData(exportFormat as any);
    setLoading(false);
  };

  const reportTypes = [
    { value: 'applications', label: 'Applications Report', icon: FileText },
    { value: 'analytics', label: 'Analytics Report', icon: BarChart3 },
    { value: 'countries', label: 'Country Report', icon: Table },
    { value: 'sectors', label: 'Sector Analysis', icon: FileSpreadsheet }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV File', icon: Table },
    { value: 'excel', label: 'Excel File', icon: FileSpreadsheet },
    { value: 'pdf', label: 'PDF Report', icon: FileImage }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Export & Reporting</h1>
          <p className="text-muted-foreground">
            Generate and export comprehensive reports and data
          </p>
        </div>
        <Button 
          onClick={handleExport}
          disabled={loading}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map(format => (
                    <SelectItem key={format.value} value={format.value}>
                      <div className="flex items-center space-x-2">
                        <format.icon className="h-4 w-4" />
                        <span>{format.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  disabled={dateRange !== 'custom'}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  disabled={dateRange !== 'custom'}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Export Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Records</span>
              <Badge variant="outline">{analytics.totalApplications}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Format</span>
              <Badge variant="outline">{exportFormat.toUpperCase()}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date Range</span>
              <Badge variant="outline">{dateRange === 'all' ? 'All Time' : dateRange}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Size</span>
              <Badge variant="outline">~2.3 MB</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => exportData('csv')}
            >
              <FileText className="h-6 w-6" />
              <span>Applications Summary</span>
              <span className="text-xs text-muted-foreground">CSV Export</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => exportData('excel')}
            >
              <BarChart3 className="h-6 w-6" />
              <span>Analytics Report</span>
              <span className="text-xs text-muted-foreground">Excel Export</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Table className="h-6 w-6" />
              <span>Country Breakdown</span>
              <span className="text-xs text-muted-foreground">PDF Report</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <FileSpreadsheet className="h-6 w-6" />
              <span>Sector Analysis</span>
              <span className="text-xs text-muted-foreground">Excel Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Applications_Report_2024-01-15.csv', date: '2024-01-15', size: '2.3 MB', type: 'CSV' },
              { name: 'Analytics_Dashboard_2024-01-14.xlsx', date: '2024-01-14', size: '1.8 MB', type: 'Excel' },
              { name: 'Country_Analysis_2024-01-13.pdf', date: '2024-01-13', size: '945 KB', type: 'PDF' },
              { name: 'Sector_Report_2024-01-12.csv', date: '2024-01-12', size: '1.2 MB', type: 'CSV' }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{export_.name}</p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {export_.date}
                      </span>
                      <span>{export_.size}</span>
                      <Badge variant="outline" className="text-xs">{export_.type}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}