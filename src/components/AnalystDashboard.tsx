import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Database,
  Settings,
  Search,
  Filter,
  Download,
  Brain,
  MapPin,
  Users,
  DollarSign,
  Target
} from 'lucide-react';
import { User } from '../App';
import { AnalystOverview } from './analyst/AnalystOverview';
import { PartnerInvestments } from './analyst/PartnerInvestments';
import { QuarterlyReports } from './analyst/QuarterlyReports';
import { DocumentsVisuals } from "./analyst/DocumentVisuals";
import { DataExplorer } from './analyst/DataExplorer';
import { UserSettings } from './settings/UserSettings';
import { AdvancedExportTool } from './reports/AdvancedExportTool';

interface AnalystDashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (user: User) => void;
}

export function AnalystDashboard({ user, onLogout, onUserUpdate }: AnalystDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [globalFilters, setGlobalFilters] = useState({
    country: 'all',
    valueChain: 'all',
    timeRange: 'quarterly'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportTool, setShowExportTool] = useState(false);

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Investment Overview',
      icon: BarChart3,
      description: 'Key metrics and insights',
      permissions: ['dataView']
    },
    {
      id: 'investments',
      label: 'Partner Investments',
      icon: TrendingUp,
      description: 'Investment tracking and analysis',
      permissions: ['dataView']
    },
    {
      id: 'reports',
      label: 'M&E Reports',
      icon: FileText,
      description: 'Monitoring & evaluation tracking',
      permissions: ['dataView']
    },
    {
      id: 'visuals',
      label: 'Charts & Analytics',
      icon: BarChart3,
      description: 'Data visualization and trends',
      permissions: ['dataView']
    },
    {
      id: 'explorer',
      label: 'Data Explorer',
      icon: Database,
      description: 'Advanced data analysis',
      permissions: ['dataExport']
    }
  ];

  const countries = [
    { value: 'all', label: 'All Countries' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'uganda', label: 'Uganda' },
    { value: 'rwanda', label: 'Rwanda' },
    { value: 'ethiopia', label: 'Ethiopia' },
    { value: 'tanzania', label: 'Tanzania' }
  ];

  const valueChains = [
    { value: 'all', label: 'All Sectors' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'music', label: 'Music' },
    { value: 'visual-arts', label: 'Visual Arts' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'audiovisual', label: 'AudioVisual' },
    { value: 'performing-arts', label: 'Performing Arts' },
    { value: 'crafts', label: 'Crafts' }
  ];

  const timeRanges = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  // Mock KPI data for the top bar
  const kpiData = {
    totalPartnersInvested: 1247,
    totalAmountInvested: 24800000,
    activeInvestments: 892,
    averageTicketSize: 19900
  };

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

  const hasPermission = (permissions: string[]) => {
    return permissions.every(permission => user.permissions?.[permission as keyof typeof user.permissions]);
  };

  const handleExport = async (config: any) => {
    console.log('Exporting with config:', config);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock file download
    const blob = new Blob(['Mock data for ' + config.dataType], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.fileName || 'export'}.${config.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const availableExportData = {
    countries: ['Kenya', 'Uganda', 'Rwanda', 'Ethiopia', 'Tanzania'],
    valueChains: ['Fashion', 'Music', 'Visual Arts', 'Gaming', 'AudioVisual', 'Performing Arts', 'Crafts'],
    statuses: ['Active', 'Completed', 'Pending', 'Defaulted'],
    fields: [
      { key: 'partnerName', label: 'Partner Name', type: 'text' as const },
      { key: 'businessName', label: 'Business Name', type: 'text' as const },
      { key: 'country', label: 'Country', type: 'text' as const },
      { key: 'sector', label: 'Sector', type: 'text' as const },
      { key: 'investmentAmount', label: 'Investment Amount', type: 'number' as const },
      { key: 'dateFunded', label: 'Date Funded', type: 'date' as const },
      { key: 'status', label: 'Status', type: 'text' as const },
      { key: 'repaymentProgress', label: 'Repayment Progress', type: 'number' as const },
      { key: 'riskLevel', label: 'Risk Level', type: 'text' as const },
      { key: 'jobsCreated', label: 'Jobs Created', type: 'number' as const },
      { key: 'revenueGrowth', label: 'Revenue Growth', type: 'number' as const }
    ]
  };

  if (showExportTool) {
    return (
      <div className="h-full bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setShowExportTool(false)}
            >
              ← Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Export Data</h1>
              <p className="text-muted-foreground">Configure and export investment and analytics data</p>
            </div>
          </div>
          
          <AdvancedExportTool
            defaultConfig={{
              dataType: activeTab === 'investments' ? 'investments' : 
                       activeTab === 'reports' ? 'reports' : 
                       activeTab === 'visuals' ? 'analytics' : 'investments',
              filters: {
                countries: globalFilters.country !== 'all' ? [globalFilters.country] : [],
                valueChains: globalFilters.valueChain !== 'all' ? [globalFilters.valueChain.replace('-', ' ')] : [],
                status: [],
                riskLevels: []
              },
              includeFields: ['partnerName', 'businessName', 'country', 'sector', 'investmentAmount', 'status']
            }}
            onExport={handleExport}
            availableData={availableExportData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Analytics Hub</h2>
              <p className="text-sm text-sidebar-accent-foreground">Investment Insights</p>
            </div>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-sidebar-accent/50 p-2 rounded">
              <p className="text-sidebar-accent-foreground">Partners</p>
              <p className="font-semibold">{formatNumber(kpiData.totalPartnersInvested)}</p>
            </div>
            <div className="bg-sidebar-accent/50 p-2 rounded">
              <p className="text-sidebar-accent-foreground">Invested</p>
              <p className="font-semibold">{formatCurrency(kpiData.totalAmountInvested)}</p>
            </div>
            <div className="bg-sidebar-accent/50 p-2 rounded">
              <p className="text-sidebar-accent-foreground">Active</p>
              <p className="font-semibold">{formatNumber(kpiData.activeInvestments)}</p>
            </div>
            <div className="bg-sidebar-accent/50 p-2 rounded">
              <p className="text-sidebar-accent-foreground">Avg. Size</p>
              <p className="font-semibold">{formatCurrency(kpiData.averageTicketSize)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasAccess = hasPermission(item.permissions);
            
            if (!hasAccess) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/20' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Export */}
        {user.permissions?.dataExport && (
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setShowExportTool(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        )}

        {/* Settings */}
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Filters Bar - Only show for data sections */}
        {['overview', 'investments', 'reports', 'visuals', 'explorer'].includes(activeTab) && (
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search investments, reports, or partners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Select 
                  value={globalFilters.country} 
                  onValueChange={(value) => setGlobalFilters({...globalFilters, country: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={globalFilters.valueChain} 
                  onValueChange={(value) => setGlobalFilters({...globalFilters, valueChain: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {valueChains.map((chain) => (
                      <SelectItem key={chain.value} value={chain.value}>
                        {chain.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={globalFilters.timeRange} 
                  onValueChange={(value) => setGlobalFilters({...globalFilters, timeRange: value})}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {user.permissions?.dataExport && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowExportTool(true)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'overview' && (
            <AnalystOverview 
              user={user} 
              filters={globalFilters}
              searchQuery={searchQuery}
            />
          )}
          
          {activeTab === 'investments' && (
            <PartnerInvestments 
              user={user} 
              filters={globalFilters}
              searchQuery={searchQuery}
            />
          )}
          
          {activeTab === 'reports' && (
            <QuarterlyReports 
              user={user} 
              filters={globalFilters}
              searchQuery={searchQuery}
            />
          )}
          
          {activeTab === 'visuals' && (
            <DocumentsVisuals 
              user={user} 
              filters={globalFilters}
              searchQuery={searchQuery}
            />
          )}
          
          {activeTab === 'explorer' && (
            <DataExplorer 
              user={user} 
              filters={globalFilters}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <UserSettings 
                user={user} 
                onUserUpdate={onUserUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}