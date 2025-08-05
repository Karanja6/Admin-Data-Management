import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CHART_COLORS } from './constants';
import { formatPercentage } from './helpers';

interface SectorAnalysisProps {
  valueChainData: Array<{ name: string; value: number; applications: number }>;
  totalApplications: number;
}

export function SectorAnalysis({ valueChainData, totalApplications }: SectorAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {valueChainData.map((sector, index) => (
            <div key={sector.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                />
                <div>
                  <h4 className="font-medium">{sector.name}</h4>
                  <p className="text-sm text-muted-foreground">{sector.applications} applications</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{sector.applications}</div>
                <div className="text-sm text-muted-foreground">
                  {formatPercentage(sector.applications, totalApplications)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}