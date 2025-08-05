import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useData } from '../../contexts/DataContext';
import { Download } from 'lucide-react';
import { MetricsCards } from './MetricsCards';
import { ChartsOverview } from './ChartsOverview';
import { CountryAnalysis } from './CountryAnalysis';
import { SectorAnalysis } from './SectorAnalysis';
import { TrendsAnalysis } from './TrendsAnalysis';
import { transformDistributionData } from './helpers';

export function AnalyticsDashboard() {
  const { analytics, filters, setFilters } = useData();
  const [selectedChart, setSelectedChart] = useState('overview');

  // Transform data for charts
  const countryData = transformDistributionData(analytics.countryDistribution);
  const valueChainData = transformDistributionData(analytics.valueChainDistribution);
  const loanTypeData = transformDistributionData(analytics.loanTypeDistribution);

  const monthlyData = analytics.monthlyApplications.map(item => ({
    month: item.month,
    applications: item.count,
    approved: Math.floor(item.count * 0.6),
    rejected: Math.floor(item.count * 0.2)
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Advanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and visualizations for HEVA's funding programs
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filters.country || 'all'} onValueChange={(value) => setFilters({...filters, country: value === 'all' ? undefined : value})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="kenya">Kenya</SelectItem>
              <SelectItem value="uganda">Uganda</SelectItem>
              <SelectItem value="rwanda">Rwanda</SelectItem>
              <SelectItem value="ethiopia">Ethiopia</SelectItem>
              <SelectItem value="tanzania">Tanzania</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <MetricsCards analytics={analytics} />

      <Tabs value={selectedChart} onValueChange={setSelectedChart}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ChartsOverview 
            countryData={countryData}
            valueChainData={valueChainData}
            monthlyData={monthlyData}
          />
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <CountryAnalysis 
            countryData={countryData}
            totalApplications={analytics.totalApplications}
          />
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <SectorAnalysis 
            valueChainData={valueChainData}
            totalApplications={analytics.totalApplications}
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendsAnalysis loanTypeData={loanTypeData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}