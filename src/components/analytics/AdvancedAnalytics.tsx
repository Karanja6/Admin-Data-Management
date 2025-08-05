import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRealtime } from '../../contexts/RealtimeContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Activity,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  ScatterChart
} from 'recharts';

export function AdvancedAnalytics() {
  const { data, isConnected, subscribe } = useRealtime();
  const [timeRange, setTimeRange] = useState('7d');
  const [realtimeMetrics, setRealtimeMetrics] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe('analytics', (newMetric) => {
      if (isLive) {
        setRealtimeMetrics(prev => [...prev.slice(-29), newMetric]);
      }
    });

    return unsubscribe;
  }, [isConnected, subscribe, isLive]);

  // Enhanced mock data for advanced analytics
  const monthlyTrends = [
    { month: 'Aug', applications: 35, approved: 28, funded: 1200000, revenue: 2800000, jobs: 45 },
    { month: 'Sep', applications: 42, approved: 35, funded: 1500000, revenue: 3200000, jobs: 58 },
    { month: 'Oct', applications: 48, approved: 41, funded: 1800000, revenue: 3800000, jobs: 72 },
    { month: 'Nov', applications: 52, approved: 44, funded: 2000000, revenue: 4200000, jobs: 89 },
    { month: 'Dec', applications: 38, approved: 33, funded: 1500000, revenue: 3500000, jobs: 67 },
    { month: 'Jan', applications: 61, approved: 55, funded: 2500000, revenue: 5100000, jobs: 125 },
    { month: 'Feb', applications: 58, approved: 52, funded: 2300000, revenue: 4800000, jobs: 118 }
  ];

  const performanceMetrics = [
    { name: 'Application Processing Time', current: 2.3, target: 3.0, unit: 'days' },
    { name: 'Funding Disbursement Time', current: 5.2, target: 7.0, unit: 'days' },
    { name: 'Success Rate', current: 87, target: 85, unit: '%' },
    { name: 'Entrepreneur Satisfaction', current: 4.6, target: 4.5, unit: '/5' },
    { name: 'ROI on Funding', current: 340, target: 300, unit: '%' },
    { name: 'Job Creation Rate', current: 2.8, target: 2.5, unit: 'jobs/entrepreneur' }
  ];

  const sectorPerformance = [
    { sector: 'Technology', growth: 45, funding: 980000, success: 92, jobs: 156 },
    { sector: 'Manufacturing', growth: 32, funding: 1200000, success: 89, jobs: 234 },
    { sector: 'Agriculture', growth: 28, funding: 750000, success: 85, jobs: 189 },
    { sector: 'Services', growth: 38, funding: 520000, success: 81, jobs: 145 },
    { sector: 'Retail', growth: 25, funding: 350000, success: 79, jobs: 98 }
  ];

  const cohortAnalysis = [
    { cohort: 'Q1 2023', entrepreneurs: 45, active: 42, revenue: 2800000, retention: 93 },
    { cohort: 'Q2 2023', entrepreneurs: 52, active: 48, revenue: 3200000, retention: 92 },
    { cohort: 'Q3 2023', entrepreneurs: 38, active: 34, revenue: 2100000, retention: 89 },
    { cohort: 'Q4 2023', entrepreneurs: 61, active: 58, revenue: 4100000, retention: 95 },
    { cohort: 'Q1 2024', entrepreneurs: 51, active: 49, revenue: 3600000, retention: 96 }
  ];

  const riskAnalysis = [
    { risk: 'High', count: 8, percentage: 3.2, color: '#ef4444' },
    { risk: 'Medium', count: 24, percentage: 9.7, color: '#f97316' },
    { risk: 'Low', count: 215, percentage: 87.1, color: '#22c55e' }
  ];

  const getMetricTrend = (current: number, target: number) => {
    const isPositive = current >= target;
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs">
          {isPositive ? '+' : ''}{((current - target) / target * 100).toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Advanced Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and real-time performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">
                  {realtimeMetrics.length > 0 ? realtimeMetrics[realtimeMetrics.length - 1].activeUsers : 182}
                </p>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+12% from yesterday</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Funding Velocity</p>
                <p className="text-2xl font-bold">KSh 2.3M</p>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+8% this week</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">87.2%</p>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+2.1% this month</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jobs Created</p>
                <p className="text-2xl font-bold">1,247</p>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+156 this month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding & Revenue Trends</CardTitle>
                <CardDescription>Monthly funding disbursed vs revenue generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => [
                        name.includes('funded') || name.includes('revenue') 
                          ? `KSh ${(value as number / 1000000).toFixed(1)}M` 
                          : value,
                        name
                      ]} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="funded" fill="#14b8a6" name="Funding Disbursed" />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Revenue Generated" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Flow</CardTitle>
                <CardDescription>Applications submitted vs approved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="applications" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="Applications" />
                      <Area type="monotone" dataKey="approved" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} name="Approved" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Creation Impact</CardTitle>
              <CardDescription>Direct and indirect jobs created through funded entrepreneurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="jobs" fill="#f59e0b" name="Jobs Created" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{metric.name}</h4>
                      {getMetricTrend(metric.current, metric.target)}
                    </div>
                    <div className="flex items-end space-x-2">
                      <span className="text-2xl font-bold">{metric.current}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.target}{metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance vs Targets</CardTitle>
              <CardDescription>Current performance metrics compared to organizational targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceMetrics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#14b8a6" name="Current" />
                    <Bar dataKey="target" fill="#94a3b8" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Growth and success rates by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={sectorPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="growth" name="Growth Rate" unit="%" />
                      <YAxis dataKey="success" name="Success Rate" unit="%" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter dataKey="funding" fill="#8b5cf6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Distribution</CardTitle>
                <CardDescription>Total funding allocated by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <RechartsPieChart
                        data={sectorPerformance}
                        dataKey="funding"
                        nameKey="sector"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                      >
                        {sectorPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[
                            '#14b8a6', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b'
                          ][index % 5]} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip formatter={(value) => `KSh ${(value as number / 1000).toLocaleString()}K`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {sectorPerformance.map((sector, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{sector.sector}</h3>
                        <p className="text-sm text-muted-foreground">
                          KSh {(sector.funding / 1000).toLocaleString()}K funded • {sector.jobs} jobs created
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-green-600">{sector.growth}%</p>
                        <p className="text-muted-foreground">Growth</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{sector.success}%</p>
                        <p className="text-muted-foreground">Success</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>Performance tracking by entrepreneur cohorts over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cohortAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cohort" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="active" fill="#14b8a6" name="Active Entrepreneurs" />
                    <Bar yAxisId="left" dataKey="entrepreneurs" fill="#94a3b8" name="Total Entrepreneurs" />
                    <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#8b5cf6" name="Retention Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cohortAnalysis.map((cohort, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{cohort.cohort}</h3>
                      <Badge variant="outline">{cohort.retention}% retention</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entrepreneurs:</span>
                        <span>{cohort.entrepreneurs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Still Active:</span>
                        <span className="text-green-600">{cohort.active}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span>KSh {(cohort.revenue / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Current risk assessment of funded entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <RechartsPieChart
                        data={riskAnalysis}
                        dataKey="count"
                        nameKey="risk"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                      >
                        {riskAnalysis.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Indicators</CardTitle>
                <CardDescription>Key metrics for risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Overdue Reports</p>
                      <p className="text-sm text-muted-foreground">Monthly reports not submitted</p>
                    </div>
                    <Badge variant="destructive">15</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Low Revenue Growth</p>
                      <p className="text-sm text-muted-foreground">Below 10% monthly growth</p>
                    </div>
                    <Badge variant="secondary">23</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">High Fund Utilization</p>
                      <p className="text-sm text-muted-foreground">Above 90% funds used</p>
                    </div>
                    <Badge variant="outline">12</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">No Communication</p>
                      <p className="text-sm text-muted-foreground">No contact for 30+ days</p>
                    </div>
                    <Badge variant="destructive">8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Real-time Monitoring</h3>
              <p className="text-muted-foreground">Live data updates every 3 seconds</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={isLive ? 'text-green-600' : 'text-muted-foreground'}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
              {isLive ? 'Live' : 'Paused'}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Real-time active user count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.analytics.realtimeMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="#14b8a6" 
                      strokeWidth={2}
                      dot={false}
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Applications</p>
                    <p className="text-xl font-bold">
                      {data.analytics.realtimeMetrics.length > 0 
                        ? data.analytics.realtimeMetrics[data.analytics.realtimeMetrics.length - 1].newApplications 
                        : 0}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">Last hour</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Funding Requests</p>
                    <p className="text-xl font-bold">
                      {data.analytics.realtimeMetrics.length > 0 
                        ? data.analytics.realtimeMetrics[data.analytics.realtimeMetrics.length - 1].fundingRequests 
                        : 0}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">Last hour</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Community Posts</p>
                    <p className="text-xl font-bold">
                      {data.analytics.realtimeMetrics.length > 0 
                        ? data.analytics.realtimeMetrics[data.analytics.realtimeMetrics.length - 1].communityPosts 
                        : 0}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">Last hour</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}