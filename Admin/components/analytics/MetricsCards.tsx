import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3, MapPin } from 'lucide-react';
import { formatCurrency, formatPercentage } from './helpers';

interface MetricsCardsProps {
  analytics: {
    totalApplications: number;
    approved: number;
    totalFunding: number;
    averageLoanAmount: number;
  };
}

export function MetricsCards({ analytics }: MetricsCardsProps) {
  const approvalRate = (analytics.approved / analytics.totalApplications) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Total Applications</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalApplications}</div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+12%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Approval Rate</span>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+3.2%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Total Funding</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.totalFunding)}</div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+18%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Avg Loan Amount</span>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.averageLoanAmount)}</div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-2%</span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}