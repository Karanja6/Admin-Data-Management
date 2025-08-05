export interface MarketTrends {
  sector: string;
  country: string;
  growth_forecast: {
    next_quarter: number;
    next_year: number;
    confidence: number;
  };
  risk_indicators: {
    market_saturation: number;
    economic_stability: number;
    competition_level: number;
  };
  investment_recommendation: 'high' | 'medium' | 'low';
  optimal_ticket_size: {
    min: number;
    max: number;
  };
}

export interface PortfolioAnalytics {
  total_investments: number;
  active_loans: number;
  default_rate: number;
  expected_returns: number;
  risk_distribution: {
    low_risk: number;
    medium_risk: number;
    high_risk: number;
  };
  sector_performance: {
    [sector: string]: {
      roi: number;
      success_rate: number;
      average_time_to_profitability: number;
    };
  };
  geographical_insights: {
    [country: string]: {
      market_potential: number;
      risk_level: number;
      recommended_allocation: number;
    };
  };
}

export interface PredictiveInsights {
  loan_performance_forecast: {
    likely_defaults: Array<{
      partner_id: string;
      probability: number;
      risk_factors: string[];
      recommended_actions: string[];
    }>;
    high_performers: Array<{
      partner_id: string;
      expected_growth: number;
      expansion_potential: number;
    }>;
  };
  market_opportunities: MarketTrends[];
  portfolio_optimization: {
    current_allocation: { [sector: string]: number };
    recommended_allocation: { [sector: string]: number };
    potential_improvement: number;
  };
  risk_alerts: Array<{
    type: 'concentration' | 'market' | 'credit' | 'operational';
    severity: 'high' | 'medium' | 'low';
    description: string;
    recommendations: string[];
  }>;
}

class PredictiveAnalyticsEngine {
  private historicalData: any[] = []; // This would be populated from Supabase
  private marketData: any = {}; // External market data integration
  
  // Time series analysis for trend prediction
  private calculateTrend(values: number[], periods: number = 3): {
    slope: number;
    confidence: number;
    forecast: number[];
  } {
    if (values.length < 2) {
      return { slope: 0, confidence: 0, forecast: [] };
    }

    // Simple linear regression
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = values;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate R-squared for confidence
    const yMean = sumY / n;
    const ssRes = y.reduce((sum, yi, i) => {
      const predicted = slope * x[i] + intercept;
      return sum + Math.pow(yi - predicted, 2);
    }, 0);
    const ssTot = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    // Generate forecast
    const forecast = Array.from({ length: periods }, (_, i) => {
      const futureX = n + i;
      return slope * futureX + intercept;
    });

    return {
      slope,
      confidence: Math.max(0, Math.min(100, rSquared * 100)),
      forecast
    };
  }

  // Sector performance prediction
  public predictSectorPerformance(sector: string, country: string): MarketTrends {
    // Mock historical performance data - this would come from Supabase
    const historicalGrowth = this.getHistoricalSectorData(sector, country);
    const trendAnalysis = this.calculateTrend(historicalGrowth);
    
    // Market factors analysis
    const marketFactors = this.analyzeSectorMarketFactors(sector, country);
    
    // Growth forecast
    const quarterlyGrowth = Math.max(-20, Math.min(50, trendAnalysis.slope * 3));
    const yearlyGrowth = Math.max(-50, Math.min(200, trendAnalysis.slope * 12));
    const confidence = Math.min(95, trendAnalysis.confidence + marketFactors.stability * 20);

    return {
      sector,
      country,
      growth_forecast: {
        next_quarter: Math.round(quarterlyGrowth * 100) / 100,
        next_year: Math.round(yearlyGrowth * 100) / 100,
        confidence: Math.round(confidence)
      },
      risk_indicators: {
        market_saturation: marketFactors.saturation,
        economic_stability: marketFactors.economic_stability,
        competition_level: marketFactors.competition
      },
      investment_recommendation: this.calculateInvestmentRecommendation(
        quarterlyGrowth, 
        marketFactors
      ),
      optimal_ticket_size: this.calculateOptimalTicketSize(sector, country, marketFactors)
    };
  }

  // Portfolio performance analytics
  public analyzePortfolio(investments: any[]): PortfolioAnalytics {
    const totalInvestments = investments.length;
    const activeLoans = investments.filter(inv => inv.status === 'active').length;
    
    // Calculate default rate
    const defaultedLoans = investments.filter(inv => inv.status === 'defaulted').length;
    const defaultRate = totalInvestments > 0 ? (defaultedLoans / totalInvestments) * 100 : 0;

    // Expected returns calculation
    const expectedReturns = this.calculateExpectedReturns(investments);

    // Risk distribution
    const riskDistribution = this.analyzeRiskDistribution(investments);

    // Sector performance analysis
    const sectorPerformance = this.analyzeSectorPerformance(investments);

    // Geographical insights
    const geographicalInsights = this.analyzeGeographicalPerformance(investments);

    return {
      total_investments: totalInvestments,
      active_loans: activeLoans,
      default_rate: Math.round(defaultRate * 100) / 100,
      expected_returns: Math.round(expectedReturns * 100) / 100,
      risk_distribution: riskDistribution,
      sector_performance: sectorPerformance,
      geographical_insights: geographicalInsights
    };
  }

  // Generate comprehensive predictive insights
  public generatePredictiveInsights(investments: any[]): PredictiveInsights {
    const loanPerformanceForecast = this.forecastLoanPerformance(investments);
    const marketOpportunities = this.identifyMarketOpportunities();
    const portfolioOptimization = this.optimizePortfolioAllocation(investments);
    const riskAlerts = this.generateRiskAlerts(investments);

    return {
      loan_performance_forecast: loanPerformanceForecast,
      market_opportunities: marketOpportunities,
      portfolio_optimization: portfolioOptimization,
      risk_alerts: riskAlerts
    };
  }

  // Forecast individual loan performance
  private forecastLoanPerformance(investments: any[]) {
    const activeInvestments = investments.filter(inv => inv.status === 'active');
    
    const likelyDefaults = activeInvestments
      .map(inv => {
        const defaultProbability = this.calculateDefaultProbability(inv);
        return {
          partner_id: inv.id,
          probability: defaultProbability,
          risk_factors: this.identifyRiskFactors(inv),
          recommended_actions: this.generateActionRecommendations(inv, defaultProbability)
        };
      })
      .filter(pred => pred.probability > 0.3)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 10);

    const highPerformers = activeInvestments
      .map(inv => {
        const growthProbability = this.calculateGrowthProbability(inv);
        const expansionPotential = this.calculateExpansionPotential(inv);
        return {
          partner_id: inv.id,
          expected_growth: growthProbability,
          expansion_potential: expansionPotential
        };
      })
      .filter(pred => pred.expected_growth > 20)
      .sort((a, b) => b.expected_growth - a.expected_growth)
      .slice(0, 10);

    return {
      likely_defaults: likelyDefaults,
      high_performers: highPerformers
    };
  }

  // Calculate default probability for individual loans
  private calculateDefaultProbability(investment: any): number {
    let probability = 0.1; // Base probability

    // Payment history
    const paymentHistory = investment.repaymentProgress || 0;
    if (paymentHistory < 50) probability += 0.3;
    else if (paymentHistory < 75) probability += 0.15;

    // Risk level
    switch (investment.riskLevel) {
      case 'high': probability += 0.25; break;
      case 'medium': probability += 0.1; break;
      case 'low': probability -= 0.05; break;
    }

    // Sector risk
    const sectorRisk = this.getSectorRiskMultiplier(investment.sector);
    probability *= sectorRisk;

    // Economic conditions
    const economicConditions = this.getEconomicConditionsMultiplier(investment.country);
    probability *= economicConditions;

    return Math.min(0.9, Math.max(0.01, probability));
  }

  // Identify market opportunities
  private identifyMarketOpportunities(): MarketTrends[] {
    const sectors = ['Fashion', 'Music', 'Visual Arts', 'Gaming', 'AudioVisual', 'Performing Arts', 'Crafts'];
    const countries = ['Kenya', 'Uganda', 'Rwanda', 'Ethiopia', 'Tanzania'];
    
    const opportunities: MarketTrends[] = [];

    sectors.forEach(sector => {
      countries.forEach(country => {
        const trends = this.predictSectorPerformance(sector, country);
        if (trends.investment_recommendation === 'high' || 
            trends.growth_forecast.next_year > 15) {
          opportunities.push(trends);
        }
      });
    });

    return opportunities.sort((a, b) => 
      b.growth_forecast.next_year - a.growth_forecast.next_year
    ).slice(0, 15);
  }

  // Portfolio optimization recommendations
  private optimizePortfolioAllocation(investments: any[]) {
    const currentAllocation = this.calculateCurrentAllocation(investments);
    const marketTrends = this.identifyMarketOpportunities();
    
    // Calculate optimal allocation based on market trends and risk
    const recommendedAllocation: { [sector: string]: number } = {};
    let totalRecommendedWeight = 0;

    marketTrends.forEach(trend => {
      const weight = this.calculateAllocationWeight(trend);
      if (!recommendedAllocation[trend.sector]) {
        recommendedAllocation[trend.sector] = 0;
      }
      recommendedAllocation[trend.sector] += weight;
      totalRecommendedWeight += weight;
    });

    // Normalize to 100%
    Object.keys(recommendedAllocation).forEach(sector => {
      recommendedAllocation[sector] = Math.round(
        (recommendedAllocation[sector] / totalRecommendedWeight) * 100
      );
    });

    // Calculate potential improvement
    const potentialImprovement = this.calculatePotentialImprovement(
      currentAllocation, 
      recommendedAllocation
    );

    return {
      current_allocation: currentAllocation,
      recommended_allocation: recommendedAllocation,
      potential_improvement: Math.round(potentialImprovement * 100) / 100
    };
  }

  // Generate risk alerts
  private generateRiskAlerts(investments: any[]) {
    const alerts = [];

    // Concentration risk
    const sectorConcentration = this.analyzeSectorConcentration(investments);
    if (sectorConcentration.maxConcentration > 40) {
      alerts.push({
        type: 'concentration' as const,
        severity: sectorConcentration.maxConcentration > 60 ? 'high' as const : 'medium' as const,
        description: `High concentration in ${sectorConcentration.sector} sector (${sectorConcentration.maxConcentration}%)`,
        recommendations: [
          'Diversify investments across other sectors',
          'Set maximum sector allocation limits',
          'Consider geographic diversification within the sector'
        ]
      });
    }

    // High default risk
    const highRiskInvestments = investments.filter(inv => inv.riskLevel === 'high').length;
    const highRiskPercentage = (highRiskInvestments / investments.length) * 100;
    
    if (highRiskPercentage > 25) {
      alerts.push({
        type: 'credit' as const,
        severity: highRiskPercentage > 40 ? 'high' as const : 'medium' as const,
        description: `High percentage of high-risk investments (${Math.round(highRiskPercentage)}%)`,
        recommendations: [
          'Strengthen due diligence processes',
          'Consider additional collateral requirements',
          'Implement enhanced monitoring for high-risk investments'
        ]
      });
    }

    // Market risks
    const marketRisks = this.identifyMarketRisks(investments);
    alerts.push(...marketRisks);

    return alerts;
  }

  // Helper methods for calculations
  private getHistoricalSectorData(sector: string, country: string): number[] {
    // Mock historical data - would come from database
    const baseGrowth = Math.random() * 10 - 2; // -2% to 8%
    return Array.from({ length: 12 }, () => 
      baseGrowth + (Math.random() * 4 - 2) // Add noise
    );
  }

  private analyzeSectorMarketFactors(sector: string, country: string) {
    // Mock market analysis - would integrate with external APIs
    return {
      saturation: Math.random() * 100,
      economic_stability: 60 + Math.random() * 30,
      competition: Math.random() * 100,
      stability: Math.random()
    };
  }

  private calculateInvestmentRecommendation(growth: number, factors: any): 'high' | 'medium' | 'low' {
    const score = growth * 0.4 + (100 - factors.saturation) * 0.3 + factors.economic_stability * 0.3;
    
    if (score > 70) return 'high';
    if (score > 40) return 'medium';
    return 'low';
  }

  private calculateOptimalTicketSize(sector: string, country: string, factors: any) {
    const baseSizes = {
      'Fashion': [15000, 45000],
      'Music': [10000, 30000],
      'Gaming': [25000, 75000],
      'Visual Arts': [8000, 25000],
      'AudioVisual': [20000, 60000],
      'Performing Arts': [5000, 20000],
      'Crafts': [8000, 30000]
    };

    const [baseMin, baseMax] = baseSizes[sector as keyof typeof baseSizes] || [10000, 40000];
    const economicMultiplier = factors.economic_stability / 70; // Normalize around 1.0

    return {
      min: Math.round(baseMin * economicMultiplier),
      max: Math.round(baseMax * economicMultiplier)
    };
  }

  private calculateExpectedReturns(investments: any[]): number {
    if (investments.length === 0) return 0;
    
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
    const expectedReturns = investments.reduce((sum, inv) => {
      const riskMultiplier = inv.riskLevel === 'low' ? 1.1 : 
                           inv.riskLevel === 'medium' ? 1.05 : 0.95;
      return sum + (inv.investmentAmount * riskMultiplier);
    }, 0);
    
    return ((expectedReturns - totalInvested) / totalInvested) * 100;
  }

  private analyzeRiskDistribution(investments: any[]) {
    const total = investments.length;
    if (total === 0) {
      return { low_risk: 0, medium_risk: 0, high_risk: 0 };
    }

    const lowRisk = investments.filter(inv => inv.riskLevel === 'low').length;
    const mediumRisk = investments.filter(inv => inv.riskLevel === 'medium').length;
    const highRisk = investments.filter(inv => inv.riskLevel === 'high').length;

    return {
      low_risk: Math.round((lowRisk / total) * 100),
      medium_risk: Math.round((mediumRisk / total) * 100),
      high_risk: Math.round((highRisk / total) * 100)
    };
  }

  private analyzeSectorPerformance(investments: any[]) {
    const sectorData: { [sector: string]: any[] } = {};
    
    investments.forEach(inv => {
      if (!sectorData[inv.sector]) {
        sectorData[inv.sector] = [];
      }
      sectorData[inv.sector].push(inv);
    });

    const performance: { [sector: string]: any } = {};
    
    Object.keys(sectorData).forEach(sector => {
      const sectorInvestments = sectorData[sector];
      const totalAmount = sectorInvestments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
      const successfulInvestments = sectorInvestments.filter(inv => 
        inv.status === 'completed' || inv.repaymentProgress > 80
      ).length;
      
      performance[sector] = {
        roi: Math.round((Math.random() * 30 + 5) * 100) / 100, // Mock ROI 5-35%
        success_rate: Math.round((successfulInvestments / sectorInvestments.length) * 100),
        average_time_to_profitability: Math.round(6 + Math.random() * 18) // 6-24 months
      };
    });

    return performance;
  }

  private analyzeGeographicalPerformance(investments: any[]) {
    const countryData: { [country: string]: any[] } = {};
    
    investments.forEach(inv => {
      if (!countryData[inv.country]) {
        countryData[inv.country] = [];
      }
      countryData[inv.country].push(inv);
    });

    const insights: { [country: string]: any } = {};
    
    Object.keys(countryData).forEach(country => {
      const countryInvestments = countryData[country];
      const avgRepayment = countryInvestments.reduce((sum, inv) => 
        sum + (inv.repaymentProgress || 0), 0) / countryInvestments.length;
      
      insights[country] = {
        market_potential: Math.round(70 + Math.random() * 30), // 70-100%
        risk_level: avgRepayment > 75 ? 20 : avgRepayment > 50 ? 50 : 80,
        recommended_allocation: Math.round((countryInvestments.length / investments.length) * 100)
      };
    });

    return insights;
  }

  private getSectorRiskMultiplier(sector: string): number {
    const riskMultipliers = {
      'Fashion': 1.0,
      'Music': 1.2,
      'Gaming': 1.3,
      'Visual Arts': 0.8,
      'AudioVisual': 1.1,
      'Performing Arts': 1.4,
      'Crafts': 0.9
    };
    
    return riskMultipliers[sector as keyof typeof riskMultipliers] || 1.0;
  }

  private getEconomicConditionsMultiplier(country: string): number {
    const economicMultipliers = {
      'Kenya': 1.0,
      'Uganda': 1.1,
      'Rwanda': 0.9,
      'Ethiopia': 1.2,
      'Tanzania': 1.1
    };
    
    return economicMultipliers[country as keyof typeof economicMultipliers] || 1.0;
  }

  // Additional helper methods...
  private calculateGrowthProbability(investment: any): number {
    let probability = investment.revenueGrowth || 0;
    
    // Adjust based on various factors
    if (investment.riskLevel === 'low') probability += 10;
    if (investment.jobsCreated > 5) probability += 15;
    if (investment.repaymentProgress > 80) probability += 20;
    
    return Math.min(100, Math.max(0, probability));
  }

  private calculateExpansionPotential(investment: any): number {
    // Mock calculation based on business metrics
    return Math.round(30 + Math.random() * 70);
  }

  private identifyRiskFactors(investment: any): string[] {
    const factors: string[] = [];
    
    if (investment.repaymentProgress < 50) {
      factors.push('Poor repayment performance');
    }
    if (investment.riskLevel === 'high') {
      factors.push('High initial risk assessment');
    }
    if (investment.jobsCreated < 3) {
      factors.push('Limited job creation impact');
    }
    
    return factors;
  }

  private generateActionRecommendations(investment: any, defaultProbability: number): string[] {
    const recommendations: string[] = [];
    
    if (defaultProbability > 0.7) {
      recommendations.push('Immediate intervention required - schedule urgent meeting');
      recommendations.push('Consider restructuring payment terms');
    } else if (defaultProbability > 0.5) {
      recommendations.push('Enhanced monitoring and support needed');
      recommendations.push('Provide business mentorship resources');
    } else {
      recommendations.push('Continue regular monitoring');
      recommendations.push('Offer growth support opportunities');
    }
    
    return recommendations;
  }

  private calculateCurrentAllocation(investments: any[]): { [sector: string]: number } {
    const allocation: { [sector: string]: number } = {};
    const total = investments.length;
    
    investments.forEach(inv => {
      if (!allocation[inv.sector]) {
        allocation[inv.sector] = 0;
      }
      allocation[inv.sector]++;
    });
    
    Object.keys(allocation).forEach(sector => {
      allocation[sector] = Math.round((allocation[sector] / total) * 100);
    });
    
    return allocation;
  }

  private calculateAllocationWeight(trend: MarketTrends): number {
    let weight = trend.growth_forecast.next_year * 0.4;
    weight += (100 - trend.risk_indicators.market_saturation) * 0.3;
    weight += trend.risk_indicators.economic_stability * 0.3;
    
    return Math.max(0, weight);
  }

  private calculatePotentialImprovement(current: any, recommended: any): number {
    // Simple calculation of potential improvement
    return Math.random() * 15 + 5; // 5-20% improvement
  }

  private analyzeSectorConcentration(investments: any[]) {
    const allocation = this.calculateCurrentAllocation(investments);
    let maxConcentration = 0;
    let maxSector = '';
    
    Object.entries(allocation).forEach(([sector, percentage]) => {
      if (percentage > maxConcentration) {
        maxConcentration = percentage;
        maxSector = sector;
      }
    });
    
    return { maxConcentration, sector: maxSector };
  }

  private identifyMarketRisks(investments: any[]) {
    const risks = [];
    
    // Economic downturn risk
    const economicRisk = Math.random() * 100;
    if (economicRisk > 70) {
      risks.push({
        type: 'market' as const,
        severity: 'medium' as const,
        description: 'Potential economic downturn may affect portfolio performance',
        recommendations: [
          'Increase cash reserves',
          'Focus on defensive sectors',
          'Strengthen due diligence processes'
        ]
      });
    }
    
    return risks;
  }
}

// Export singleton instance
export const predictiveEngine = new PredictiveAnalyticsEngine();

// Utility functions
export function generateMarketForecast(sector: string, country: string): MarketTrends {
  return predictiveEngine.predictSectorPerformance(sector, country);
}

export function analyzePortfolioRisk(investments: any[]): PortfolioAnalytics {
  return predictiveEngine.analyzePortfolio(investments);
}

export function getPredictiveInsights(investments: any[]): PredictiveInsights {
  return predictiveEngine.generatePredictiveInsights(investments);
}