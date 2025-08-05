export interface ApplicationData {
  applicantName: string;
  businessName: string;
  businessType: string;
  requestedAmount: number;
  experience: string;
  education: string;
  region: string;
  age: number;
  gender: string;
  revenue?: number;
  employees?: number;
  existingLoans?: boolean;
  creditHistory?: 'excellent' | 'good' | 'fair' | 'poor';
  collateralValue?: number;
  businessPlan?: boolean;
  financialStatements?: boolean;
  marketAnalysis?: boolean;
}

export interface RiskAssessmentResult {
  overall_score: number;
  eligibility_score: number;
  risk_level: 'low' | 'medium' | 'high';
  confidence: number;
  factors: {
    business_viability: number;
    financial_stability: number;
    entrepreneur_profile: number;
    market_opportunity: number;
    documentation_completeness: number;
  };
  recommendations: string[];
  red_flags: string[];
  predicted_default_probability: number;
  suggested_loan_amount: {
    min: number;
    max: number;
    optimal: number;
  };
  suggested_terms: {
    interest_rate_range: [number, number];
    repayment_period_months: number;
    grace_period_months: number;
  };
}

class MLRiskAssessment {
  private sectorWeights = {
    'Fashion': { growth: 1.2, risk: 0.8, market: 1.1 },
    'Music': { growth: 1.0, risk: 1.0, market: 0.9 },
    'Visual Arts': { growth: 0.9, risk: 0.7, market: 0.8 },
    'Gaming': { growth: 1.5, risk: 1.2, market: 1.3 },
    'AudioVisual': { growth: 1.1, risk: 0.9, market: 1.0 },
    'Performing Arts': { growth: 0.8, risk: 0.6, market: 0.7 },
    'Crafts': { growth: 0.9, risk: 0.5, market: 0.9 }
  };

  private regionalFactors = {
    'Nairobi': { economic: 1.3, infrastructure: 1.2, market: 1.4 },
    'Kampala': { economic: 1.1, infrastructure: 1.0, market: 1.1 },
    'Kigali': { economic: 1.2, infrastructure: 1.1, market: 1.0 },
    'Addis Ababa': { economic: 1.0, infrastructure: 0.9, market: 1.0 },
    'Dar es Salaam': { economic: 0.9, infrastructure: 0.8, market: 0.9 }
  };

  // Business Viability Assessment (0-100)
  private assessBusinessViability(data: ApplicationData): number {
    let score = 50; // Base score

    // Sector potential
    const sectorWeight = this.sectorWeights[data.businessType as keyof typeof this.sectorWeights] || 
                        { growth: 1.0, risk: 1.0, market: 1.0 };
    score += sectorWeight.growth * 15;

    // Business plan and documentation
    if (data.businessPlan) score += 15;
    if (data.marketAnalysis) score += 10;
    
    // Experience factor
    const expYears = this.parseExperience(data.experience);
    if (expYears >= 5) score += 15;
    else if (expYears >= 2) score += 10;
    else if (expYears >= 1) score += 5;

    // Revenue history (if available)
    if (data.revenue && data.revenue > 0) {
      const revenueScore = Math.min(20, (data.revenue / 50000) * 20);
      score += revenueScore;
    }

    // Employee count (business scale)
    if (data.employees && data.employees > 1) {
      score += Math.min(10, data.employees * 2);
    }

    return Math.min(100, Math.max(0, score));
  }

  // Financial Stability Assessment (0-100)
  private assessFinancialStability(data: ApplicationData): number {
    let score = 40; // Base score

    // Financial statements availability
    if (data.financialStatements) score += 20;

    // Revenue stability
    if (data.revenue && data.revenue > 0) {
      const monthlyRevenue = data.revenue / 12;
      const loanToRevenueRatio = data.requestedAmount / data.revenue;
      
      if (loanToRevenueRatio < 0.5) score += 20;
      else if (loanToRevenueRatio < 1.0) score += 15;
      else if (loanToRevenueRatio < 2.0) score += 10;
      else score -= 10;
    }

    // Credit history
    switch (data.creditHistory) {
      case 'excellent': score += 25; break;
      case 'good': score += 15; break;
      case 'fair': score += 5; break;
      case 'poor': score -= 15; break;
    }

    // Existing loans impact
    if (data.existingLoans) score -= 10;

    // Collateral
    if (data.collateralValue && data.collateralValue > 0) {
      const collateralRatio = data.collateralValue / data.requestedAmount;
      if (collateralRatio >= 1.0) score += 15;
      else if (collateralRatio >= 0.5) score += 10;
      else if (collateralRatio >= 0.25) score += 5;
    }

    return Math.min(100, Math.max(0, score));
  }

  // Entrepreneur Profile Assessment (0-100)
  private assessEntrepreneurProfile(data: ApplicationData): number {
    let score = 50; // Base score

    // Age factor (experience vs energy trade-off)
    if (data.age >= 25 && data.age <= 45) score += 15;
    else if (data.age >= 18 && data.age < 25) score += 10;
    else if (data.age > 45 && data.age <= 60) score += 10;

    // Education factor
    if (data.education.toLowerCase().includes('university') || 
        data.education.toLowerCase().includes('degree')) {
      score += 15;
    } else if (data.education.toLowerCase().includes('diploma') || 
               data.education.toLowerCase().includes('certificate')) {
      score += 10;
    }

    // Gender diversity (supporting women entrepreneurs)
    if (data.gender.toLowerCase() === 'female') {
      score += 5; // Small boost for gender diversity goals
    }

    // Experience in sector
    const expYears = this.parseExperience(data.experience);
    score += Math.min(20, expYears * 4);

    return Math.min(100, Math.max(0, score));
  }

  // Market Opportunity Assessment (0-100)
  private assessMarketOpportunity(data: ApplicationData): number {
    let score = 50; // Base score

    // Sector market potential
    const sectorWeight = this.sectorWeights[data.businessType as keyof typeof this.sectorWeights] || 
                        { growth: 1.0, risk: 1.0, market: 1.0 };
    score += sectorWeight.market * 20;

    // Regional market factors
    const region = this.getRegionFromLocation(data.region);
    const regionalFactor = this.regionalFactors[region] || 
                          { economic: 1.0, infrastructure: 1.0, market: 1.0 };
    score += regionalFactor.market * 15;

    // Business scale potential
    const requestedAmountScore = this.getAmountScore(data.requestedAmount);
    score += requestedAmountScore;

    return Math.min(100, Math.max(0, score));
  }

  // Documentation Completeness Assessment (0-100)
  private assessDocumentationCompleteness(data: ApplicationData): number {
    let score = 20; // Base score

    const requiredDocs = [
      data.businessPlan,
      data.financialStatements,
      data.marketAnalysis
    ];

    const completedDocs = requiredDocs.filter(Boolean).length;
    score += (completedDocs / requiredDocs.length) * 80;

    return Math.min(100, Math.max(0, score));
  }

  // Main risk assessment function
  public assessRisk(data: ApplicationData): RiskAssessmentResult {
    // Calculate individual factor scores
    const businessViability = this.assessBusinessViability(data);
    const financialStability = this.assessFinancialStability(data);
    const entrepreneurProfile = this.assessEntrepreneurProfile(data);
    const marketOpportunity = this.assessMarketOpportunity(data);
    const documentationCompleteness = this.assessDocumentationCompleteness(data);

    // Weighted overall score
    const weights = {
      businessViability: 0.25,
      financialStability: 0.30,
      entrepreneurProfile: 0.20,
      marketOpportunity: 0.15,
      documentationCompleteness: 0.10
    };

    const overallScore = (
      businessViability * weights.businessViability +
      financialStability * weights.financialStability +
      entrepreneurProfile * weights.entrepreneurProfile +
      marketOpportunity * weights.marketOpportunity +
      documentationCompleteness * weights.documentationCompleteness
    );

    const eligibilityScore = Math.min(100, overallScore * 1.1); // Slightly adjusted for eligibility

    // Risk level determination
    const riskLevel: 'low' | 'medium' | 'high' = 
      overallScore >= 75 ? 'low' : 
      overallScore >= 50 ? 'medium' : 'high';

    // Confidence based on data completeness
    const confidence = Math.min(95, 60 + (documentationCompleteness * 0.35));

    // Default probability prediction (inverse of overall score)
    const predictedDefaultProbability = Math.max(0.02, (100 - overallScore) / 100 * 0.4);

    // Generate recommendations and red flags
    const recommendations = this.generateRecommendations(data, {
      businessViability,
      financialStability,
      entrepreneurProfile,
      marketOpportunity,
      documentationCompleteness
    });

    const redFlags = this.identifyRedFlags(data, {
      businessViability,
      financialStability,
      entrepreneurProfile,
      marketOpportunity,
      documentationCompleteness
    });

    // Suggest loan amount and terms
    const suggestedAmount = this.calculateSuggestedAmount(data, overallScore);
    const suggestedTerms = this.calculateSuggestedTerms(data, overallScore, riskLevel);

    return {
      overall_score: Math.round(overallScore),
      eligibility_score: Math.round(eligibilityScore),
      risk_level: riskLevel,
      confidence: Math.round(confidence),
      factors: {
        business_viability: Math.round(businessViability),
        financial_stability: Math.round(financialStability),
        entrepreneur_profile: Math.round(entrepreneurProfile),
        market_opportunity: Math.round(marketOpportunity),
        documentation_completeness: Math.round(documentationCompleteness)
      },
      recommendations,
      red_flags: redFlags,
      predicted_default_probability: Math.round(predictedDefaultProbability * 100) / 100,
      suggested_loan_amount: suggestedAmount,
      suggested_terms: suggestedTerms
    };
  }

  // Helper methods
  private parseExperience(experience: string): number {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  private getRegionFromLocation(region: string): string {
    const regionMap: { [key: string]: string } = {
      'nairobi': 'Nairobi',
      'kampala': 'Kampala',
      'kigali': 'Kigali',
      'addis': 'Addis Ababa',
      'dar': 'Dar es Salaam'
    };

    const key = region.toLowerCase();
    for (const [searchKey, mappedValue] of Object.entries(regionMap)) {
      if (key.includes(searchKey)) {
        return mappedValue;
      }
    }
    return 'Nairobi'; // Default
  }

  private getAmountScore(amount: number): number {
    // Optimal loan amounts for creative businesses
    if (amount >= 10000 && amount <= 50000) return 15;
    if (amount >= 5000 && amount < 10000) return 10;
    if (amount > 50000 && amount <= 100000) return 10;
    if (amount < 5000) return 5;
    return 0; // Very large amounts are riskier
  }

  private generateRecommendations(data: ApplicationData, scores: any): string[] {
    const recommendations: string[] = [];

    if (scores.businessViability < 70) {
      recommendations.push('Strengthen your business plan with detailed market analysis and financial projections');
    }

    if (scores.financialStability < 60) {
      recommendations.push('Provide recent bank statements and improve cash flow documentation');
    }

    if (scores.entrepreneurProfile < 60) {
      recommendations.push('Consider additional training or mentorship in your sector');
    }

    if (scores.documentationCompleteness < 80) {
      recommendations.push('Complete all required documentation to improve your application strength');
    }

    if (!data.collateralValue || data.collateralValue === 0) {
      recommendations.push('Consider providing collateral to improve loan terms and approval chances');
    }

    if (data.requestedAmount > 50000) {
      recommendations.push('Consider starting with a smaller loan amount to build credit history');
    }

    return recommendations;
  }

  private identifyRedFlags(data: ApplicationData, scores: any): string[] {
    const redFlags: string[] = [];

    if (scores.financialStability < 40) {
      redFlags.push('Very low financial stability indicators');
    }

    if (data.creditHistory === 'poor') {
      redFlags.push('Poor credit history increases default risk');
    }

    if (data.existingLoans && (!data.revenue || data.revenue < data.requestedAmount)) {
      redFlags.push('High debt-to-income ratio with existing loans');
    }

    if (data.requestedAmount > 100000 && this.parseExperience(data.experience) < 2) {
      redFlags.push('Large loan amount requested with limited business experience');
    }

    if (scores.businessViability < 30) {
      redFlags.push('Business model viability concerns');
    }

    return redFlags;
  }

  private calculateSuggestedAmount(data: ApplicationData, overallScore: number): {
    min: number;
    max: number;
    optimal: number;
  } {
    const baseAmount = data.requestedAmount;
    const scoreMultiplier = overallScore / 100;
    
    // Conservative approach for lower scores
    const maxMultiplier = Math.min(1.2, 0.5 + (scoreMultiplier * 0.7));
    const minMultiplier = Math.max(0.3, scoreMultiplier * 0.8);
    
    return {
      min: Math.round(baseAmount * minMultiplier),
      max: Math.round(baseAmount * maxMultiplier),
      optimal: Math.round(baseAmount * Math.min(1.0, scoreMultiplier * 1.1))
    };
  }

  private calculateSuggestedTerms(data: ApplicationData, overallScore: number, riskLevel: string): {
    interest_rate_range: [number, number];
    repayment_period_months: number;
    grace_period_months: number;
  } {
    // Base rates by risk level
    const rateRanges = {
      low: [8, 12] as [number, number],
      medium: [12, 18] as [number, number],
      high: [18, 25] as [number, number]
    };

    const baseRate = rateRanges[riskLevel];
    
    // Adjust based on amount and sector
    const sectorWeight = this.sectorWeights[data.businessType as keyof typeof this.sectorWeights] || 
                        { growth: 1.0, risk: 1.0, market: 1.0 };
    
    const adjustedRate: [number, number] = [
      Math.max(6, baseRate[0] * sectorWeight.risk),
      Math.min(30, baseRate[1] * sectorWeight.risk)
    ];

    // Repayment period based on amount and risk
    let repaymentMonths = 24; // Default 2 years
    if (data.requestedAmount > 50000) repaymentMonths = 36;
    if (data.requestedAmount > 100000) repaymentMonths = 48;
    if (riskLevel === 'high') repaymentMonths = Math.min(repaymentMonths, 24);

    // Grace period based on business type and experience
    let gracePeriodMonths = 3;
    if (['Gaming', 'AudioVisual'].includes(data.businessType)) gracePeriodMonths = 6;
    if (this.parseExperience(data.experience) < 1) gracePeriodMonths = 1;

    return {
      interest_rate_range: [Math.round(adjustedRate[0]), Math.round(adjustedRate[1])],
      repayment_period_months: repaymentMonths,
      grace_period_months: gracePeriodMonths
    };
  }
}

// Export singleton instance
export const mlRiskAssessment = new MLRiskAssessment();

// Utility function for quick assessment
export function assessApplicationRisk(applicationData: ApplicationData): RiskAssessmentResult {
  return mlRiskAssessment.assessRisk(applicationData);
}