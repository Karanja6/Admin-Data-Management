import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  MapPin,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';
import { User, UserRole } from '../../types';
interface AnalystOverviewProps {
  user: User;
  filters: {
    country: string;
    valueChain: string;
    timeRange: string;
  };
  searchQuery: string;
}

export function AnalystOverview({ user, filters, searchQuery }: AnalystOverviewProps) {
  // Mock data for KPIs
  const kpiData = {
    totalPartnersInvested: {
      value: 1247,
      change: 12.5,
      trend: 'up'
    },
    totalAmountInvested: {
      value: 24800000,
      change: 8.3,
      trend: 'up'
    },
    activeInvestments: {
      value: 892,
      change: -2.1,
      trend: 'down'
    },
    averageTicketSize: {
      value: 19900,
      change: 15.2,
      trend: 'up'
    }
  };

  // Mock data for top value chains
  const topValueChains = [
    { name: 'Fashion', investments: 384, amount: 7680000, growth: 18.5 },
    { name: 'Music', investments: 287, amount: 5740000, growth: 12.3 },
    { name: 'Visual Arts', investments: 193, amount: 3860000, growth: 25.7 }
  ];

  // Mock data for country performance
  const countryData = [
    { country: 'Kenya', partners: 489, amount: 9780000, growth: 15.2, color: '#14b8a6' },
    { country: 'Uganda', partners: 302, amount: 6040000, growth: 22.1, color: '#8b5cf6' },
    { country: 'Rwanda', partners: 187, amount: 3740000, growth: 18.7, color: '#06b6d4' },
    { country: 'Ethiopia', partners: 156, amount: 3120000, growth: 12.8, color: '#84cc16' },
    { country: 'Tanzania', partners: 113, amount: 2260000, growth: 9.4, color: '#f59e0b' }
  ];

  // Mock data for investment trends
  const trendData = [
    { month: 'Jan', investments: 65, amount: 1300000 },
    { month: 'Feb', investments: 72, amount: 1440000 },
    { month: 'Mar', investments: 85, amount: 1700000 },
    { month: 'Apr', investments: 91, amount: 1820000 },
    { month: 'May', investments: 88, amount: 1760000 },
    { month: 'Jun', investments: 95, amount: 1900000 }
  ];

  // Mock data for sector distribution
  const sectorData = [
    { name: 'Fashion', value: 31, count: 384 },
    { name: 'Music', value: 23, count: 287 },
    { name: 'Visual Arts', value: 15, count: 193 },
    { name: 'Gaming', value: 12, count: 149 },
    { name: 'AudioVisual', value: 10, count: 124 },
    { name: 'Other', value: 9, count: 110 }
  ];

  const COLORS = ['#14b8a6', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444'];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Investment Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics across East Africa creative economy investments
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Partners</p>
                <p className="text-2xl font-semibold">{formatNumber(kpiData.totalPartnersInvested.value)}</p>
                <div className="flex items-center mt-2">
                  {kpiData.totalPartnersInvested.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ml-1 ${
                    kpiData.totalPartnersInvested.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpiData.totalPartnersInvested.change}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-semibold">{formatCurrency(kpiData.totalAmountInvested.value)}</p>
                <div className="flex items-center mt-2">
                  {kpiData.totalAmountInvested.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ml-1 ${
                    kpiData.totalAmountInvested.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpiData.totalAmountInvested.change}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-semibold">{formatNumber(kpiData.activeInvestments.value)}</p>
                <div className="flex items-center mt-2">
                  {kpiData.activeInvestments.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ml-1 ${
                    kpiData.activeInvestments.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(kpiData.activeInvestments.change)}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Ticket Size</p>
                <p className="text-2xl font-semibold">{formatCurrency(kpiData.averageTicketSize.value)}</p>
                <div className="flex items-center mt-2">
                  {kpiData.averageTicketSize.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ml-1 ${
                    kpiData.averageTicketSize.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpiData.averageTicketSize.change}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Investment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'investments' ? `${value} investments` : formatCurrency(value as number),
                    name === 'investments' ? 'Investments' : 'Amount'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="investments" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  yAxisId="right"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  <RechartsPieChart
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sectorData.map((sector, index) => (
                <div key={sector.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span>{sector.name}</span>
                  </div>
                  <span className="font-medium">{sector.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Country Performance & Top Value Chains */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Country Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {countryData.map((country) => (
              <div key={country.country} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: country.color }}
                    />
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(country.amount)}</p>
                    <p className="text-xs text-green-600">+{country.growth}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{country.partners} partners</span>
                  <Progress value={country.growth} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Value Chains */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sectors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topValueChains.map((chain, index) => (
              <div key={chain.name} className="p-4 rounded-lg border bg-accent/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-primary/10 text-primary">#{index + 1}</Badge>
                    <span className="font-medium">{chain.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm">{chain.growth}%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Investments</p>
                    <p className="font-semibold">{chain.investments}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-semibold">{formatCurrency(chain.amount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}