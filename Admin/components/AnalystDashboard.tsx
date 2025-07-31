import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { AnalystSidebar } from './AnalystSidebar';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { ApplicationsViewer } from './data/ApplicationsViewer';
import { DocumentViewer } from './documents/DocumentViewer';
import { ReportsViewer } from './reports/ReportsViewer';
import { Settings } from './Settings';
import { useData } from '../contexts/DataContext';
import { User } from '../App';

interface AnalystDashboardProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (updatedUser: User) => void;
}

type AnalystView = 'dashboard' | 'applications' | 'analytics' | 'documents' | 'reports' | 'settings';

export function AnalystDashboard({ user, onLogout, onUserUpdate }: AnalystDashboardProps) {
  const [activeView, setActiveView] = useState<AnalystView>('dashboard');
  const { analytics, loading } = useData();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading analytics data...</p>
            </div>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h1>Analytics Overview</h1>
              <p className="text-muted-foreground">
                Data insights and trends for HEVA's funding programs - {user.department}
              </p>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">Top Performing Sector</h3>
                <p className="text-2xl font-bold">Fashion</p>
                <p className="text-sm text-muted-foreground">32% of approved applications</p>
              </div>

              <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-6 rounded-lg border border-secondary/20">
                <h3 className="font-semibold text-secondary mb-2">Growth Trend</h3>
                <p className="text-2xl font-bold">+24%</p>
                <p className="text-sm text-muted-foreground">Quarter-over-quarter growth</p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-700 mb-2">Average Loan Amount</h3>
                <p className="text-2xl font-bold">KSh {(analytics.averageLoanAmount / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Across all sectors</p>
              </div>
            </div>

            {/* Country Performance */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Country Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(analytics.countryDistribution).map(([country, count]) => (
                  <div key={country} className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl">
                        {country === 'kenya' ? '🇰🇪' : 
                         country === 'uganda' ? '🇺🇬' : 
                         country === 'rwanda' ? '🇷🇼' : 
                         country === 'ethiopia' ? '🇪🇹' : '🇹🇿'}
                      </span>
                    </div>
                    <p className="font-semibold capitalize">{country}</p>
                    <p className="text-2xl font-bold text-primary">{count}</p>
                    <p className="text-xs text-muted-foreground">applications</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveView('analytics')}
                  className="p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="text-primary text-2xl mb-2">📊</div>
                  <h4 className="font-medium">Advanced Analytics</h4>
                  <p className="text-sm text-muted-foreground">Deep dive into data insights</p>
                </button>

                <button
                  onClick={() => setActiveView('applications')}
                  className="p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="text-primary text-2xl mb-2">📋</div>
                  <h4 className="font-medium">View Applications</h4>
                  <p className="text-sm text-muted-foreground">Browse and filter applications</p>
                </button>

                <button
                  onClick={() => setActiveView('documents')}
                  className="p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="text-primary text-2xl mb-2">📁</div>
                  <h4 className="font-medium">Document Viewer</h4>
                  <p className="text-sm text-muted-foreground">Access uploaded documents</p>
                </button>

                <button
                  onClick={() => setActiveView('reports')}
                  className="p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="text-primary text-2xl mb-2">📈</div>
                  <h4 className="font-medium">Generate Reports</h4>
                  <p className="text-sm text-muted-foreground">Export and share insights</p>
                </button>
              </div>
            </div>

            {/* Recent Trends */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Recent Trends</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">↗</span>
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Gaming Sector Growth</p>
                      <p className="text-sm text-green-600">45% increase in applications this quarter</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold">+45%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">Fast-Track Approvals</p>
                      <p className="text-sm text-blue-600">Average processing time reduced to 5 days</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold">-3 days</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">🎯</span>
                    </div>
                    <div>
                      <p className="font-medium text-purple-700">Regional Expansion</p>
                      <p className="text-sm text-purple-600">Tanzania showing strongest growth potential</p>
                    </div>
                  </div>
                  <span className="text-purple-600 font-semibold">+67%</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'applications':
        return <ApplicationsViewer />;
      
      case 'analytics':
        return <AnalyticsDashboard />;
      
      case 'documents':
        return <DocumentViewer />;
      
      case 'reports':
        return <ReportsViewer />;
      
      case 'settings':
        return (
          <Settings 
            user={user} 
            onUserUpdate={onUserUpdate} 
            onLogout={onLogout} 
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      sidebar={<AnalystSidebar activeView={activeView} onViewChange={setActiveView} user={user} />}
    >
      {renderContent()}
    </DashboardLayout>
  );
}