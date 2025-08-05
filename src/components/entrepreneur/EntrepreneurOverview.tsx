import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users, 
  Brain,
  Lightbulb,
  Target,
  Calendar,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Zap,
  Code
} from 'lucide-react';
import { User, UserRole, Application } from '../../types';
import { useApplications, useDashboardMetrics, useMLRiskAssessment, useMarketInsights } from '../../hooks/useRealTimeData';
import { getSupabaseConnectionStatus, isDevelopmentMode } from '../../lib/supabase/client';
import { DevConfiguration } from '../DevConfiguration';

interface EntrepreneurOverviewProps {
  user: User;
  onNewApplication: () => void;
}

export function EntrepreneurOverview({ user, onNewApplication }: EntrepreneurOverviewProps) {
  const { applications, loading: appsLoading } = useApplications({ user_id: user.id });
  const { metrics, loading: metricsLoading, lastUpdated } = useDashboardMetrics({ user_id: user.id });
  const { insights, generateInsights } = useMarketInsights();
  const { assessment, assessRisk } = useMLRiskAssessment();
  const connectionStatus = getSupabaseConnectionStatus();

  const [showInsights, setShowInsights] = useState(false);
  const [showDevConfig, setShowDevConfig] = useState(false);

  // Get latest application
  const latestApplication = applications?.[0];
  const hasActiveApplication = latestApplication?.status !== 'funded' && latestApplication?.status !== 'rejected';

  // Generate personalized insights
  React.useEffect(() => {
    if (user.businessInfo?.valueChain && user.businessInfo?.location) {
      generateInsights(user.businessInfo.valueChain, user.businessInfo.location);
    }
  }, [user.businessInfo, generateInsights]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'under_review': return <FileText className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'funded': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'funded': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (appsLoading || metricsLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Development Mode Status - More Subtle and Positive */}
      {isDevelopmentMode() && (
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>🚀 <strong>Demo Mode:</strong> Exploring HEVA CreativeHub with AI-powered insights and demo data</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                <Code className="w-3 h-3 mr-1" />
                Development
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDevConfig(!showDevConfig)}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Connect Live DB
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Development Configuration */}
      {showDevConfig && (
        <DevConfiguration />
      )}

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">
            {hasActiveApplication 
              ? `Your ${latestApplication?.loan_type} application is ${latestApplication?.status.replace('_', ' ')}`
              : 'Ready to take your creative business to the next level?'
            }
          </p>
        </div>
        {!hasActiveApplication && (
          <Button onClick={onNewApplication} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Funding
          </Button>
        )}
      </div>

      {/* Application Status Card */}
      {hasActiveApplication && latestApplication && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon(latestApplication.status)}
              <span>Application Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{latestApplication.business_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(latestApplication.requested_amount)} • {latestApplication.loan_type}
                </p>
              </div>
              <Badge className={getStatusColor(latestApplication.status)}>
                {latestApplication.status.replace('_', ' ')}
              </Badge>
            </div>
            
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Application Progress</span>
                <span>{latestApplication.status === 'funded' ? '100%' : 
                       latestApplication.status === 'approved' ? '75%' :
                       latestApplication.status === 'under_review' ? '50%' : '25%'}</span>
              </div>
              <Progress 
                value={latestApplication.status === 'funded' ? 100 : 
                       latestApplication.status === 'approved' ? 75 :
                       latestApplication.status === 'under_review' ? 50 : 25} 
                className="h-2"
              />
            </div>

            {/* ML Assessment Results */}
            {latestApplication.ml_assessment && (
              <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">AI Assessment Results</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Eligibility Score</p>
                    <p className="font-semibold text-lg">{latestApplication.ml_assessment.eligibility_score}/100</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Risk Level</p>
                    <Badge className={
                      latestApplication.ml_assessment.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                      latestApplication.ml_assessment.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {latestApplication.ml_assessment.risk_level}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Submitted {new Date(latestApplication.created_at).toLocaleDateString()} • 
                Expected decision in 2-3 business days
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-semibold">{metrics?.totalApplications || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Funding Received</p>
                <p className="text-2xl font-semibold">{formatCurrency(metrics?.totalFunded || 0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-semibold">{Math.round(metrics?.successRate || 0)}%</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jobs Created</p>
                <p className="text-2xl font-semibold">{metrics?.jobsCreated || 0}</p>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Market Insights */}
      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>AI Market Insights</span>
              <Badge variant="outline">Powered by ML</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{insight.sector} in {insight.country}</h4>
                      <Badge className={
                        insight.investment_recommendation === 'high' ? 'bg-green-100 text-green-800' :
                        insight.investment_recommendation === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {insight.investment_recommendation} opportunity
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Projected growth: +{insight.growth_forecast.next_year}% next year
                    </p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-medium">{insight.growth_forecast.next_year}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowInsights(!showInsights)}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showInsights ? 'Hide' : 'View'} Detailed Insights
              </Button>
            </div>

            {showInsights && insights[0] && (
              <div className="mt-4 space-y-3">
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AI Recommendation:</strong> Based on current market trends, 
                    the {insights[0].sector} sector in {insights[0].country} shows strong growth potential. 
                    Consider applying for funding between {formatCurrency(insights[0].optimal_ticket_size.min)} - {formatCurrency(insights[0].optimal_ticket_size.max)} 
                    for optimal success rates.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Next Steps & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {!hasActiveApplication ? (
              <>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Submit Your Application</h4>
                    <p className="text-sm text-muted-foreground">
                      Start your funding journey with our AI-powered application system
                    </p>
                    <Button size="sm" className="mt-2" onClick={onNewApplication}>
                      Get Started
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-muted-foreground text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Upload Supporting Documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete your application with business plan and financial documents
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Application Under Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team is reviewing your application. You'll receive an update within 2-3 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Prepare for Next Steps</h4>
                    <p className="text-sm text-muted-foreground">
                      Start preparing your M&E reporting framework for when funding is approved
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      {lastUpdated && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Data last updated: {lastUpdated.toLocaleTimeString()}
            {isDevelopmentMode() && (
              <Badge variant="outline" className="ml-2 text-xs">
                Demo Data
              </Badge>
            )}
          </p>
        </div>
      )}
    </div>
  );
}