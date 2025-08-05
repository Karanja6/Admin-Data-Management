import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Download, 
  BarChart3, 
  PieChart,
  TrendingUp,
  FileImage,
  Printer,
  Share2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie, // ✅ Add this line
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import { User, UserRole } from '../../types';

interface DocumentsVisualsProps {
  user: User;
  filters: {
    country: string;
    valueChain: string;
    timeRange: string;
  };
  searchQuery: string;
}

export function DocumentsVisuals({ user, filters, searchQuery }: DocumentsVisualsProps) {
  const [selectedChart, setSelectedChart] = useState('overview');
  const [chartPeriod, setChartPeriod] = useState('6months');
  const [exportFormat, setExportFormat] = useState('png');

  // Mock data for different visualizations
  const investmentTrendData = [
    { month: 'Jan 2024', investments: 45, amount: 950000, cumulative: 950000 },
    { month: 'Feb 2024', investments: 52, amount: 1100000, cumulative: 2050000 },
    { month: 'Mar 2024', investments: 48, amount: 980000, cumulative: 3030000 },
    { month: 'Apr 2024', investments: 61, amount: 1250000, cumulative: 4280000 },
    { month: 'May 2024', investments: 55, amount: 1150000, cumulative: 5430000 },
    { month: 'Jun 2024', investments: 67, amount: 1380000, cumulative: 6810000 }
  ];

  const sectorPerformanceData = [
    { sector: 'Fashion', investments: 384, amount: 7680000, avgTicket: 20000, success: 92 },
    { sector: 'Music', investments: 287, amount: 5740000, avgTicket: 20000, success: 88 },
    { sector: 'Visual Arts', investments: 193, amount: 3860000, avgTicket: 20000, success: 95 },
    { sector: 'Gaming', investments: 149, amount: 4470000, avgTicket: 30000, success: 85 },
    { sector: 'AudioVisual', investments: 124, amount: 3100000, avgTicket: 25000, success: 90 },
    { sector: 'Crafts', investments: 110, amount: 2200000, avgTicket: 20000, success: 94 }
  ];

  const countryDistribution = [
    { name: 'Kenya', value: 39.2, count: 489, amount: 9780000, color: '#14b8a6' },
    { name: 'Uganda', value: 24.2, count: 302, amount: 6040000, color: '#8b5cf6' },
    { name: 'Rwanda', value: 15.0, count: 187, amount: 3740000, color: '#06b6d4' },
    { name: 'Ethiopia', value: 12.5, count: 156, amount: 3120000, color: '#84cc16' },
    { name: 'Tanzania', value: 9.1, count: 113, amount: 2260000, color: '#f59e0b' }
  ];

  const impactMetricsData = [
    { month: 'Jan', jobsCreated: 245, revenueGrowth: 125, partnersSatisfaction: 4.2 },
    { month: 'Feb', jobsCreated: 278, revenueGrowth: 142, partnersSatisfaction: 4.3 },
    { month: 'Mar', jobsCreated: 312, revenueGrowth: 156, partnersSatisfaction: 4.1 },
    { month: 'Apr', jobsCreated: 289, revenueGrowth: 167, partnersSatisfaction: 4.4 },
    { month: 'May', jobsCreated: 334, revenueGrowth: 189, partnersSatisfaction: 4.5 },
    { month: 'Jun', jobsCreated: 356, revenueGrowth: 201, partnersSatisfaction: 4.3 }
  ];

  const riskAssessmentData = [
    { riskLevel: 'Low Risk', count: 892, percentage: 71.5, color: '#22c55e' },
    { riskLevel: 'Medium Risk', count: 287, percentage: 23.0, color: '#f59e0b' },
    { riskLevel: 'High Risk', count: 68, percentage: 5.5, color: '#ef4444' }
  ];

  const repaymentData = [
    { month: 'Jan', onTime: 95, late: 4, defaulted: 1 },
    { month: 'Feb', onTime: 93, late: 6, defaulted: 1 },
    { month: 'Mar', onTime: 97, late: 2, defaulted: 1 },
    { month: 'Apr', onTime: 92, late: 7, defaulted: 1 },
    { month: 'May', onTime: 96, late: 3, defaulted: 1 },
    { month: 'Jun', onTime: 94, late: 5, defaulted: 1 }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const handleExport = (type: 'image' | 'pdf' | 'data') => {
    console.log(`Exporting chart as ${type}`);
    // Export logic would go here
  };

  const COLORS = ['#14b8a6', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Documents & Visuals</h1>
          <p className="text-muted-foreground">
            Interactive charts and data visualization for investment analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={chartPeriod} onValueChange={setChartPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport('image')}>
            <Download className="w-4 h-4 mr-2" />
            Export Charts
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Trends */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Investment Trends</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleExport('image')}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={investmentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'investments' ? `${value} investments` : formatCurrency(value as number),
                        name
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="investments" fill="#14b8a6" name="Monthly Investments" />
                    <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#8b5cf6" strokeWidth={2} name="Cumulative Amount" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Country Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Geographic Distribution</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleExport('image')}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={countryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {countryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Investment & Growth Trends</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport('data')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={investmentTrendData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#14b8a6" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                    name="Investment Amount"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="investments" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorInvestments)" 
                    name="Number of Investments"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sectorPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="investments" fill="#14b8a6" name="Number of Investments" />
                  <Bar yAxisId="left" dataKey="success" fill="#8b5cf6" name="Success Rate %" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
                {sectorPerformanceData.map((sector) => (
                  <div key={sector.sector} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{sector.sector}</h4>
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Investments:</span>
                        <span className="font-medium">{sector.investments}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Amount:</span>
                        <span className="font-medium">{formatCurrency(sector.amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">{sector.success}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={countryDistribution} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="amount" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countryDistribution.map((country, index) => (
                    <div key={country.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: country.color }}
                          />
                          <span className="font-medium">{country.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{country.count} partners</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(country.amount)}</p>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${country.value}%`, 
                            backgroundColor: country.color 
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-right">{country.value}% of total</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={impactMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="jobsCreated" 
                    stroke="#14b8a6" 
                    strokeWidth={2}
                    name="Jobs Created"
                    dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenueGrowth" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Revenue Growth %"
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={riskAssessmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ riskLevel, percentage }) => `${riskLevel}: ${percentage}%`}
                    >
                      {riskAssessmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repayment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={repaymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="onTime" 
                      stackId="1" 
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      name="On Time %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="late" 
                      stackId="1" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      name="Late %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="defaulted" 
                      stackId="1" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      name="Defaulted %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileImage className="w-5 h-5" />
            <span>Export Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Format:</span>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG Image</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="excel">Excel File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => handleExport('image')}>
              <Download className="w-4 h-4 mr-2" />
              Export Current Chart
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Printer className="w-4 h-4 mr-2" />
              Generate Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}