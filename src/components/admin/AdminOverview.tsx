import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { User as UserIcon } from 'lucide-react';
import { User, UserRole, Application } from '../../types';

import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

interface AdminOverviewProps {
  user: User;
  detailed?: boolean;
}
export function AdminOverview({ detailed = false }: AdminOverviewProps) {
  const stats = {
    totalEntrepreneurs: 247,
    pendingVerification: 13,
    fundsDisbursed: 2100000,
    successRate: 87,
    avgFunding: 45000,
    regionCoverage: 15
  };

  const genderData = [
    { name: 'Female', value: 58, color: '#8b5cf6' },
    { name: 'Male', value: 42, color: '#14b8a6' }
  ];

  const regionData = [
    { region: 'Nairobi', entrepreneurs: 89, funding: 1200000 },
    { region: 'Mombasa', entrepreneurs: 45, funding: 650000 },
    { region: 'Kisumu', entrepreneurs: 38, funding: 520000 },
    { region: 'Nakuru', entrepreneurs: 32, funding: 480000 },
    { region: 'Eldoret', entrepreneurs: 28, funding: 390000 },
    { region: 'Others', entrepreneurs: 15, funding: 260000 }
  ];

  const monthlyTrends = [
    { month: 'Oct', applications: 45, approved: 38, funded: 1800000 },
    { month: 'Nov', applications: 52, approved: 44, funded: 2000000 },
    { month: 'Dec', applications: 38, approved: 33, funded: 1500000 },
    { month: 'Jan', applications: 61, approved: 55, funded: 2500000 },
    { month: 'Feb', applications: 48, approved: 42, funded: 1900000 }
  ];

  const industryData = [
    { name: 'Manufacturing', value: 35, color: '#14b8a6' },
    { name: 'Technology', value: 25, color: '#8b5cf6' },
    { name: 'Agriculture', value: 20, color: '#06b6d4' },
    { name: 'Services', value: 15, color: '#84cc16' },
    { name: 'Retail', value: 5, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage the HEVA CreativeHub platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Entrepreneurs</p>
                <p className="text-2xl font-bold">{stats.totalEntrepreneurs}</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Funds Disbursed</p>
                <p className="text-2xl font-bold">KSh {(stats.fundsDisbursed / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">+8% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
                <p className="text-2xl font-bold">{stats.pendingVerification}</p>
                <p className="text-xs text-orange-600">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
                <p className="text-xs text-green-600">Above target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gender Diversity</CardTitle>
            <CardDescription>Breakdown of entrepreneurs by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {genderData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Distribution</CardTitle>
            <CardDescription>Entrepreneurs by business sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {industryData.map((industry) => (
                <div key={industry.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{industry.name}</span>
                    <span>{industry.value}%</span>
                  </div>
                  <Progress value={industry.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Entrepreneurs and funding by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'entrepreneurs' ? value : `KSh ${(value as number / 1000).toFixed(0)}K`,
                    name === 'entrepreneurs' ? 'Entrepreneurs' : 'Funding'
                  ]}
                />
                <Bar yAxisId="left" dataKey="entrepreneurs" fill="#14b8a6" name="entrepreneurs" />
                <Bar yAxisId="right" dataKey="funding" fill="#8b5cf6" name="funding" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Sarah Wanjiku', business: 'Eco Crafts Kenya', status: 'approved', time: '2 hours ago' },
                { name: 'John Muturi', business: 'TechSolutions KE', status: 'pending', time: '4 hours ago' },
                { name: 'Mary Njeri', business: 'Agri-Fresh Ltd', status: 'approved', time: '6 hours ago' },
                { name: 'Peter Kimani', business: 'Solar Innovations', status: 'rejected', time: '1 day ago' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.business}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={item.status === 'approved' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'}
                      className={item.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">High Priority</p>
                  <p className="text-sm text-muted-foreground">8 applications pending review for over 48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-orange-50">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Reminders</p>
                  <p className="text-sm text-muted-foreground">15 entrepreneurs have overdue monthly reports</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 border rounded-lg bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Success</p>
                  <p className="text-sm text-muted-foreground">Monthly funding target achieved (102%)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {detailed && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Application and funding trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="applications" stroke="#8b5cf6" name="Applications" />
                  <Line yAxisId="left" type="monotone" dataKey="approved" stroke="#14b8a6" name="Approved" />
                  <Line yAxisId="right" type="monotone" dataKey="funded" stroke="#06b6d4" name="Funding Amount" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}