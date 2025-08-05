import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Target,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { Application } from '../../App';

interface MLInsightsProps {
  applications: Application[];
}

interface RiskAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
}

interface Recommendation {
  id: string;
  type: 'risk_mitigation' | 'document_missing' | 'loan_optimization' | 'sector_insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  estimatedImpact: number;
}

export function MLInsights({ applications }: MLInsightsProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterSector, setFilterSector] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  // Mock ML analysis data
  const generateRiskAnalysis = (application: Application): RiskAnalysis => {
    const baseScore = Math.random() * 100;
    const factors = [
      { factor: 'Credit History', impact: Math.random() * 20, description: 'Previous loan performance' },
      { factor: 'Business Stability', impact: Math.random() * 15, description: 'Years in operation and revenue consistency' },
      { factor: 'Market Conditions', impact: Math.random() * 10, description: 'Sector performance and market trends' },
      { factor: 'Documentation Quality', impact: Math.random() * 8, description: 'Completeness and accuracy of submitted documents' },
      { factor: 'Financial Health', impact: Math.random() * 12, description: 'Revenue, profit margins, and cash flow' }
    ];

    return {
      score: Math.round(baseScore),
      level: baseScore > 70 ? 'low' : baseScore > 40 ? 'medium' : 'high',
      factors: factors.sort((a, b) => b.impact - a.impact)
    };
  };

  const generateRecommendations = (application: Application): Recommendation[] => {
    return [
      {
        id: '1',
        type: 'document_missing',
        title: 'Missing Financial Statements',
        description: 'Recent financial statements would improve eligibility assessment',
        priority: 'high',
        actionable: true,
        estimatedImpact: 85
      },
      {
        id: '2',
        type: 'loan_optimization',
        title: 'Consider Alternative Loan Type',
        description: 'Equipment finance might be more suitable than working capital',
        priority: 'medium',
        actionable: true,
        estimatedImpact: 65
      },
      {
        id: '3',
        type: 'risk_mitigation',
        title: 'Collateral Assessment',
        description: 'Additional collateral could reduce risk rating',
        priority: 'medium',
        actionable: false,
        estimatedImpact: 45
      },
      {
        id: '4',
        type: 'sector_insight',
        title: 'Fashion Sector Growth',
        description: 'Fashion sector showing 23% growth - favorable conditions',
        priority: 'low',
        actionable: false,
        estimatedImpact: 30
      }
    ];
  };

  const filteredApplications = applications.filter(app => {
    const matchesSector = filterSector === 'all' || app.valueChain === filterSector;
    const riskAnalysis = generateRiskAnalysis(app);
    const matchesRisk = filterRisk === 'all' || riskAnalysis.level === filterRisk;
    return matchesSector && matchesRisk;
  });

  const avgRiskScore = filteredApplications.reduce((sum, app) => {
    return sum + generateRiskAnalysis(app).score;
  }, 0) / filteredApplications.length || 0;

  const riskDistribution = {
    low: filteredApplications.filter(app => generateRiskAnalysis(app).level === 'low').length,
    medium: filteredApplications.filter(app => generateRiskAnalysis(app).level === 'medium').length,
    high: filteredApplications.filter(app => generateRiskAnalysis(app).level === 'high').length
  };

  const sectorInsights = [
    { sector: 'Fashion', avgScore: 72, trend: '+5%', applications: 23 },
    { sector: 'Technology', avgScore: 68, trend: '+8%', applications: 18 },
    { sector: 'Music', avgScore: 65, trend: '+2%', applications: 15 },
    { sector: 'Gaming', avgScore: 78, trend: '+12%', applications: 12 },
    { sector: 'Visual Arts', avgScore: 61, trend: '-3%', applications: 19 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <span>ML Insights</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered analytics and recommendations for better decision making
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Analysis
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Visual Arts">Visual Arts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">{filteredApplications.length} applications</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Risk Score</p>
                <p className="text-xl font-semibold">{avgRiskScore.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Low Risk</p>
                <p className="text-xl font-semibold">{riskDistribution.low}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
                <p className="text-xl font-semibold">{riskDistribution.medium}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-xl font-semibold">{riskDistribution.high}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="sector-insights">Sector Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low Risk</span>
                    <span className="text-sm font-medium">{riskDistribution.low}</span>
                  </div>
                  <Progress 
                    value={(riskDistribution.low / filteredApplications.length) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Risk</span>
                    <span className="text-sm font-medium">{riskDistribution.medium}</span>
                  </div>
                  <Progress 
                    value={(riskDistribution.medium / filteredApplications.length) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Risk</span>
                    <span className="text-sm font-medium">{riskDistribution.high}</span>
                  </div>
                  <Progress 
                    value={(riskDistribution.high / filteredApplications.length) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Top Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generateRecommendations(filteredApplications[0] || applications[0]).slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      rec.priority === 'high' ? 'bg-red-500' :
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {rec.estimatedImpact}% impact
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk-analysis" className="space-y-4">
          <div className="grid gap-4">
            {filteredApplications.slice(0, 5).map((application) => {
              const riskAnalysis = generateRiskAnalysis(application);
              return (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{application.applicantName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{application.businessName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold">{riskAnalysis.score}</div>
                        <Badge variant={
                          riskAnalysis.level === 'low' ? 'default' :
                          riskAnalysis.level === 'medium' ? 'secondary' : 'destructive'
                        }>
                          {riskAnalysis.level} risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium">Risk Factors</h4>
                      {riskAnalysis.factors.slice(0, 3).map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">{factor.factor}</span>
                            <p className="text-xs text-muted-foreground">{factor.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">{factor.impact.toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {filteredApplications.slice(0, 3).map((application) => {
              const recommendations = generateRecommendations(application);
              return (
                <Card key={application.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{application.applicantName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{application.businessName}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recommendations.map((rec) => (
                        <div key={rec.id} className="flex items-start justify-between p-3 rounded-lg border">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              rec.priority === 'high' ? 'bg-red-500' :
                              rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <div>
                              <h4 className="font-medium text-sm">{rec.title}</h4>
                              <p className="text-sm text-muted-foreground">{rec.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {rec.type.replace('_', ' ')}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {rec.estimatedImpact}% impact
                                </span>
                              </div>
                            </div>
                          </div>
                          {rec.actionable && (
                            <Button size="sm" variant="outline">
                              Take Action
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="sector-insights" className="space-y-4">
          <div className="grid gap-4">
            {sectorInsights.map((insight) => (
              <Card key={insight.sector}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{insight.sector}</h3>
                        <p className="text-sm text-muted-foreground">
                          {insight.applications} applications
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-xl font-semibold">{insight.avgScore}</div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${
                          insight.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {insight.trend}
                        </span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}