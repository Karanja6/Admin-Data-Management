import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatPercentage } from './helpers';

interface CountryAnalysisProps {
  countryData: Array<{ name: string; value: number; applications: number }>;
  totalApplications: number;
}

export function CountryAnalysis({ countryData, totalApplications }: CountryAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Country Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {countryData.map((country, index) => (
            <div key={country.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{index + 1}</Badge>
                <div>
                  <h4 className="font-medium">{country.name}</h4>
                  <p className="text-sm text-muted-foreground">{country.applications} applications</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{country.applications}</div>
                <div className="text-sm text-muted-foreground">
                  {formatPercentage(country.applications, totalApplications)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}