import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useData } from '../../contexts/DataContext';
import { 
  Download, 
  FileText, 
  Calendar, 
  BarChart3,
  FileSpreadsheet,
  Eye
} from 'lucide-react';

export function ReportsViewer() {
  const { exportData } = useData();

  const recentReports = [
    { 
      id: 1, 
      name: 'Monthly Applications Report', 
      type: 'Applications', 
      date: '2024-01-15', 
      format: 'PDF',
      size: '2.3 MB'
    },
    { 
      id: 2, 
      name: 'Country Performance Analysis', 
      type: 'Analytics', 
      date: '2024-01-14', 
      format: 'Excel',
      size: '1.8 MB'
    },
    { 
      id: 3, 
      name: 'Sector Distribution Report', 
      type: 'Sectors', 
      date: '2024-01-13', 
      format: 'CSV',
      size: '945 KB'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports Viewer</h1>
          <p className="text-muted-foreground">
            View and download generated reports
          </p>
        </div>
        <Button 
          onClick={() => exportData('csv')}
          variant="outline"
        >
          <Download className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Applications Report</p>
                <p className="text-sm text-muted-foreground">Export application data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Analytics Dashboard</p>
                <p className="text-sm text-muted-foreground">Performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Data Export</p>
                <p className="text-sm text-muted-foreground">Export filtered data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {report.date}
                      </span>
                      <span>{report.size}</span>
                      <Badge variant="outline" className="text-xs">{report.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{report.format}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}