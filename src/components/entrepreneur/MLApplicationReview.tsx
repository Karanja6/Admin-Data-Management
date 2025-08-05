import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  DollarSign,
  Target,
  Lightbulb,
  Award,
  Calendar
} from 'lucide-react';
import { Application, User } from '../../App';

interface MLApplicationReviewProps {
  user: User;
  application: Partial<Application>;
  onSubmit: (applicationType: 'loan' | 'grant') => void;
  isProcessing?: boolean;
}

export function MLApplicationReview({ user, application, onSubmit, isProcessing = false }: MLApplicationReviewProps) {
  const [selectedType, setSelectedType] = useState<'loan' | 'grant' | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Mock ML analysis based on application data
  const mlAnalysis = {
    eligibilityScore: 78,
    riskScore: 65,
    recommendedType: 'loan' as 'loan' | 'grant',
    confidence: 85,
    processingTime: '2-3 business days',
    approvalLikelihood: 'High',
    keyStrengths: [
      'Strong business plan with clear market analysis',
      'Experienced entrepreneur with 3+ years in sector',
      'Complete financial documentation provided',
      'Positive revenue growth trajectory'
    ],
    improvementAreas: [
      'Add 2024 bank statements to improve risk score',
      'Include collateral documentation for better terms',
      'Provide additional supplier contracts',
      'Update business registration certificate'
    ],
    missingDocuments: [
      'Bank statements (Last 6 months)',
      'Collateral documentation',
      'Supplier agreements'
    ],
    recommendedAmount: {
      min: 15000,
      max: 35000,
      optimal: 25000
    },
    expectedTerms: {
      interestRate: '12-15% annually',
      repaymentPeriod: '18-24 months',
      gracePeriod: '3 months'
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900/20';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900/20';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20';
    }
  };

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit(selectedType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <span>AI-Powered Application Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our AI has analyzed your application and business profile to provide personalized recommendations. 
            Choose between a loan or grant based on your needs and our assessment.
          </p>
        </CardContent>
      </Card>

      {/* Application Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedType === 'loan' ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}
          onClick={() => setSelectedType('loan')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Business Loan</h3>
                  <p className="text-sm text-muted-foreground">Repayable funding with competitive rates</p>
                </div>
              </div>
              {mlAnalysis.recommendedType === 'loan' && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20">
                  Recommended
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Amount Range:</span>
                <span className="font-medium">${mlAnalysis.recommendedAmount.min.toLocaleString()} - ${mlAnalysis.recommendedAmount.max.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Interest Rate:</span>
                <span className="font-medium">{mlAnalysis.expectedTerms.interestRate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Repayment Period:</span>
                <span className="font-medium">{mlAnalysis.expectedTerms.repaymentPeriod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Time:</span>
                <span className="font-medium">{mlAnalysis.processingTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedType === 'grant' ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}
          onClick={() => setSelectedType('grant')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Creative Grant</h3>
                  <p className="text-sm text-muted-foreground">Non-repayable funding for innovation</p>
                </div>
              </div>
              {mlAnalysis.recommendedType === 'grant' && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20">
                  Recommended
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Amount Range:</span>
                <span className="font-medium">$5,000 - $20,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Interest Rate:</span>
                <span className="font-medium">0% (Non-repayable)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Reporting Period:</span>
                <span className="font-medium">Quarterly M&E</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Time:</span>
                <span className="font-medium">3-4 business days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Results */}
      {selectedType && (
        <div className="space-y-6">
          {/* Overall Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>AI Assessment Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Eligibility Score</span>
                    <span className={`font-semibold ${getScoreColor(mlAnalysis.eligibilityScore)}`}>
                      {getScoreStatus(mlAnalysis.eligibilityScore)}
                    </span>
                  </div>
                  <Progress value={mlAnalysis.eligibilityScore} className="h-2" />
                  <p className="text-xs text-muted-foreground">{mlAnalysis.eligibilityScore}/100</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Assessment</span>
                    <span className={`font-semibold ${getScoreColor(100 - mlAnalysis.riskScore)}`}>
                      {mlAnalysis.riskScore < 40 ? 'Low Risk' : mlAnalysis.riskScore < 70 ? 'Medium Risk' : 'High Risk'}
                    </span>
                  </div>
                  <Progress value={100 - mlAnalysis.riskScore} className="h-2" />
                  <p className="text-xs text-muted-foreground">Risk Score: {mlAnalysis.riskScore}/100</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Approval Likelihood</span>
                    <Badge className={getLikelihoodColor(mlAnalysis.approvalLikelihood)}>
                      {mlAnalysis.approvalLikelihood}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{mlAnalysis.processingTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Key Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mlAnalysis.keyStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-600">
                  <Lightbulb className="w-5 h-5" />
                  <span>Improvement Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mlAnalysis.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Missing Documents Alert */}
          {mlAnalysis.missingDocuments.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Missing Documents:</strong> {mlAnalysis.missingDocuments.join(', ')}. 
                Adding these documents could improve your eligibility score and reduce processing time.
              </AlertDescription>
            </Alert>
          )}

          {/* Recommended Amount */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Recommended Funding Amount</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">
                  ${mlAnalysis.recommendedAmount.optimal.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  Based on your business profile, financial history, and sector analysis
                </p>
                <div className="flex justify-center space-x-8 text-sm">
                  <div>
                    <p className="text-muted-foreground">Minimum</p>
                    <p className="font-medium">${mlAnalysis.recommendedAmount.min.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Maximum</p>
                    <p className="font-medium">${mlAnalysis.recommendedAmount.max.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Ready to Submit Your Application?</h3>
                  <p className="text-sm text-muted-foreground">
                    You've selected: <strong>{selectedType === 'loan' ? 'Business Loan' : 'Creative Grant'}</strong>
                  </p>
                </div>
                <Button 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  size="lg"
                  className="ml-4"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}