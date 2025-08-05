import { supabase, getSupabaseConnectionStatus, isDevelopmentMode } from '../supabase/client';
import { mlRiskAssessment, ApplicationData, RiskAssessmentResult } from '../ml/riskAssessment';
import { predictiveEngine, PredictiveInsights, PortfolioAnalytics } from '../analytics/predictiveEngine';

// Enhanced mock data for development when Supabase is not connected
const mockData = {
  users: [
    {
      id: 'user-1',
      email: 'admin@heva.org',
      name: 'Sarah Johnson',
      role: 'admin' as const,
      created_at: '2023-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 'user-2',
      email: 'analyst@heva.analyst.org',
      name: 'David Kimani',
      role: 'analyst' as const,
      created_at: '2023-03-01T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 'user-3',
      email: 'grace@gmail.com',
      name: 'Grace Wanjiku',
      role: 'entrepreneur' as const,
      business_info: {
        businessName: 'Wanjiku Fashion House',
        valueChain: 'Fashion',
        employees: 12,
        establishedYear: 2021
      },
      created_at: '2023-06-01T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    }
  ],
  applications: [
    {
      id: 'app-1',
      user_id: 'user-3',
      applicant_name: 'Grace Wanjiku',
      applicant_email: 'grace@gmail.com',
      business_name: 'Wanjiku Fashion House',
      country: 'Kenya',
      value_chain: 'Fashion',
      loan_type: 'loan' as const,
      requested_amount: 25000,
      status: 'under_review' as const,
      ml_assessment: {
        eligibility_score: 78,
        risk_level: 'low',
        confidence: 85,
        overall_score: 82
      },
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    }
  ],
  investments: [
    {
      id: 'inv-1',
      application_id: 'app-1',
      user_id: 'user-3',
      partner_name: 'Grace Wanjiku',
      business_name: 'Wanjiku Fashion House',
      country: 'Kenya',
      sector: 'Fashion',
      investment_amount: 25000,
      date_funded: '2024-01-15T00:00:00Z',
      status: 'active' as const,
      repayment_progress: 65,
      risk_level: 'low' as const,
      jobs_created: 12,
      revenue_growth: 145,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z'
    },
    {
      id: 'inv-2',
      application_id: 'app-2',
      user_id: 'user-4',
      partner_name: 'John Mbeki',
      business_name: 'Mbeki Music Studio',
      country: 'Uganda',
      sector: 'Music',
      investment_amount: 15000,
      date_funded: '2024-01-10T00:00:00Z',
      status: 'active' as const,
      repayment_progress: 80,
      risk_level: 'medium' as const,
      jobs_created: 8,
      revenue_growth: 120,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-18T00:00:00Z'
    }
  ],
  reports: [
    {
      id: 'report-1',
      investment_id: 'inv-1',
      partner_name: 'Grace Wanjiku',
      business_name: 'Wanjiku Fashion House',
      country: 'Kenya',
      sector: 'Fashion',
      quarter: 'Q1',
      year: 2024,
      submission_status: 'submitted' as const,
      created_at: '2024-01-20T00:00:00Z'
    }
  ],
  documents: []
};

export class DataService {
  private connectionStatus = getSupabaseConnectionStatus();

  // Helper method to determine if we should use mock data
  private shouldUseMockData(): boolean {
    return this.connectionStatus.isMock;
  }

  // User Management
  async getUser(id: string) {
    if (this.shouldUseMockData()) {
      const user = mockData.users.find(u => u.id === id);
      return user || null;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: Partial<any>) {
    if (this.shouldUseMockData()) {
      const userIndex = mockData.users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        mockData.users[userIndex] = { 
          ...mockData.users[userIndex], 
          ...updates, 
          updated_at: new Date().toISOString() 
        };
        return mockData.users[userIndex];
      }
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByEmail(email: string) {
    if (this.shouldUseMockData()) {
      return mockData.users.find(u => u.email === email) || null;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Application Management
  async createApplication(applicationData: Partial<any>) {
    // Run ML risk assessment
    const mlAssessment = this.performMLAssessment(applicationData);
    
    const newApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      ml_assessment: mlAssessment,
      risk_score: mlAssessment.overall_score,
      eligibility_score: mlAssessment.eligibility_score,
      status: 'submitted',
      submission_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (this.shouldUseMockData()) {
      mockData.applications.push(newApplication);
      this.logDevelopmentAction('Application created', newApplication.applicant_name);
      return newApplication;
    }

    const { data, error } = await supabase
      .from('applications')
      .insert(newApplication)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getApplications(filters?: {
    user_id?: string;
    status?: string;
    country?: string;
    value_chain?: string;
    date_from?: string;
    date_to?: string;
  }) {
    if (this.shouldUseMockData()) {
      let filteredApps = [...mockData.applications];
      
      if (filters?.user_id) {
        filteredApps = filteredApps.filter(app => app.user_id === filters.user_id);
      }
      if (filters?.status) {
        filteredApps = filteredApps.filter(app => app.status === filters.status);
      }
      if (filters?.country) {
        filteredApps = filteredApps.filter(app => app.country === filters.country);
      }
      
      return filteredApps.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    let query = supabase.from('applications').select('*');

    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.country) query = query.eq('country', filters.country);
    if (filters?.value_chain) query = query.eq('value_chain', filters.value_chain);
    if (filters?.date_from) query = query.gte('submission_date', filters.date_from);
    if (filters?.date_to) query = query.lte('submission_date', filters.date_to);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateApplicationStatus(id: string, status: string, reviewData?: any) {
    const updateData = {
      status,
      review_date: status === 'under_review' ? new Date().toISOString() : undefined,
      approval_date: status === 'approved' ? new Date().toISOString() : undefined,
      ...reviewData,
      updated_at: new Date().toISOString()
    };

    if (this.shouldUseMockData()) {
      const appIndex = mockData.applications.findIndex(app => app.id === id);
      if (appIndex !== -1) {
        mockData.applications[appIndex] = { ...mockData.applications[appIndex], ...updateData };
        const updatedApp = mockData.applications[appIndex];
        
        this.logDevelopmentAction('Application status updated', `${updatedApp.applicant_name} - ${status}`);
        
        // Create investment record if approved
        if (status === 'approved') {
          await this.createInvestmentFromApplication(updatedApp);
        }
        
        return updatedApp;
      }
      return null;
    }

    const { data, error } = await supabase
      .from('applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Create investment record if approved
    if (status === 'approved') {
      await this.createInvestmentFromApplication(data);
    }

    return data;
  }

  // Investment Management
  async createInvestmentFromApplication(application: any) {
    const investmentData = {
      id: `inv-${Date.now()}`,
      application_id: application.id,
      user_id: application.user_id,
      partner_name: application.applicant_name,
      business_name: application.business_name,
      country: application.country,
      sector: application.value_chain,
      investment_amount: application.requested_amount,
      date_funded: new Date().toISOString(),
      status: 'active',
      repayment_progress: 0,
      risk_level: application.ml_assessment?.risk_level || 'medium',
      interest_rate: application.ml_assessment?.suggested_terms?.interest_rate_range?.[0] || 15,
      repayment_period_months: application.ml_assessment?.suggested_terms?.repayment_period_months || 24,
      grace_period_months: application.ml_assessment?.suggested_terms?.grace_period_months || 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (this.shouldUseMockData()) {
      mockData.investments.push(investmentData);
      this.logDevelopmentAction('Investment created', `${investmentData.partner_name} - $${investmentData.investment_amount}`);
      // Update application status to funded
      await this.updateApplicationStatus(application.id, 'funded');
      return investmentData;
    }

    const { data, error } = await supabase
      .from('investments')
      .insert(investmentData)
      .select()
      .single();

    if (error) throw error;

    // Update application status to funded
    await this.updateApplicationStatus(application.id, 'funded');
    return data;
  }

  async getInvestments(filters?: {
    user_id?: string;
    country?: string;
    sector?: string;
    status?: string;
    risk_level?: string;
    date_from?: string;
    date_to?: string;
  }) {
    if (this.shouldUseMockData()) {
      let filteredInvestments = [...mockData.investments];
      
      if (filters?.user_id) {
        filteredInvestments = filteredInvestments.filter(inv => inv.user_id === filters.user_id);
      }
      if (filters?.country) {
        filteredInvestments = filteredInvestments.filter(inv => inv.country === filters.country);
      }
      if (filters?.sector) {
        filteredInvestments = filteredInvestments.filter(inv => inv.sector === filters.sector);
      }
      
      return filteredInvestments.sort((a, b) => 
        new Date(b.date_funded).getTime() - new Date(a.date_funded).getTime()
      );
    }

    let query = supabase.from('investments').select('*');

    if (filters?.user_id) query = query.eq('user_id', filters.user_id);
    if (filters?.country) query = query.eq('country', filters.country);
    if (filters?.sector) query = query.eq('sector', filters.sector);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.risk_level) query = query.eq('risk_level', filters.risk_level);
    if (filters?.date_from) query = query.gte('date_funded', filters.date_from);
    if (filters?.date_to) query = query.lte('date_funded', filters.date_to);

    const { data, error } = await query.order('date_funded', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateInvestment(id: string, updates: Partial<any>) {
    if (this.shouldUseMockData()) {
      const invIndex = mockData.investments.findIndex(inv => inv.id === id);
      if (invIndex !== -1) {
        mockData.investments[invIndex] = { 
          ...mockData.investments[invIndex], 
          ...updates, 
          updated_at: new Date().toISOString() 
        };
        this.logDevelopmentAction('Investment updated', mockData.investments[invIndex].partner_name);
        return mockData.investments[invIndex];
      }
      return null;
    }

    const { data, error } = await supabase
      .from('investments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Dashboard Metrics
  async getDashboardMetrics(filters?: any) {
    const cacheKey = `dashboard_metrics_${JSON.stringify(filters)}`;
    const cached = await this.getCachedAnalytics(cacheKey);
    
    if (cached) return cached;

    const [applications, investments, reports] = await Promise.all([
      this.getApplications(filters),
      this.getInvestments(filters),
      this.getMEReports(filters)
    ]);

    const metrics = {
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter(app => app.status === 'submitted').length || 0,
      totalInvestments: investments?.length || 0,
      totalAmountInvested: investments?.reduce((sum, inv) => sum + inv.investment_amount, 0) || 0,
      activeInvestments: investments?.filter(inv => inv.status === 'active').length || 0,
      averageTicketSize: investments?.length ? 
        (investments.reduce((sum, inv) => sum + inv.investment_amount, 0) / investments.length) : 0,
      reportsSubmitted: reports?.filter(r => r.submission_status === 'submitted').length || 0,
      reportsMissing: reports?.filter(r => r.submission_status === 'missing').length || 0,
      portfolioRisk: this.calculatePortfolioRisk(investments || []),
      // Additional metrics for entrepreneurs
      totalFunded: investments?.filter(inv => inv.status === 'active' || inv.status === 'completed')
        .reduce((sum, inv) => sum + inv.investment_amount, 0) || 0,
      successRate: applications?.length ? 
        (applications.filter(app => app.status === 'funded' || app.status === 'approved').length / applications.length) * 100 : 0,
      jobsCreated: investments?.reduce((sum, inv) => sum + (inv.jobs_created || 0), 0) || 0
    };

    await this.cacheAnalytics(cacheKey, metrics, 600); // 10 minutes cache
    return metrics;
  }

  // Stub methods for other services (to prevent errors)
  async getMEReports(filters?: any) {
    if (this.shouldUseMockData()) {
      return mockData.reports;
    }
    
    try {
      let query = supabase.from('me_reports').select('*');
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) return [];
      return data;
    } catch {
      return [];
    }
  }

  async createMEReport(reportData: any) {
    if (this.shouldUseMockData()) {
      this.logDevelopmentAction('M&E Report created', reportData.business_name);
    }
    return { id: `report-${Date.now()}`, ...reportData };
  }

  async getDocuments(filters?: any) {
    if (this.shouldUseMockData()) {
      return mockData.documents;
    }
    return [];
  }

  async uploadDocument(file: File, metadata: any) {
    if (this.shouldUseMockData()) {
      this.logDevelopmentAction('Document uploaded', file.name);
    }
    return { 
      id: `doc-${Date.now()}`, 
      name: file.name, 
      size: file.size,
      ...metadata 
    };
  }

  async getPortfolioAnalytics(filters?: any): Promise<PortfolioAnalytics> {
    const cacheKey = `portfolio_analytics_${JSON.stringify(filters)}`;
    const cached = await this.getCachedAnalytics(cacheKey);
    
    if (cached) return cached;

    const investments = await this.getInvestments(filters);
    const analytics = predictiveEngine.analyzePortfolio(investments || []);

    await this.cacheAnalytics(cacheKey, analytics, 3600); // 1 hour cache
    return analytics;
  }

  async getPredictiveInsights(filters?: any): Promise<PredictiveInsights> {
    const cacheKey = `predictive_insights_${JSON.stringify(filters)}`;
    const cached = await this.getCachedAnalytics(cacheKey);
    
    if (cached) return cached;

    const investments = await this.getInvestments(filters);
    const insights = predictiveEngine.generatePredictiveInsights(investments || []);

    await this.cacheAnalytics(cacheKey, insights, 1800); // 30 minutes cache
    return insights;
  }

  // ML Assessment
  private performMLAssessment(applicationData: any): RiskAssessmentResult {
    const mlData: ApplicationData = {
      applicantName: applicationData.applicant_name || '',
      businessName: applicationData.business_name || '',
      businessType: applicationData.business_type || applicationData.value_chain || '',
      requestedAmount: applicationData.requested_amount || 0,
      experience: applicationData.experience || '1 year',
      education: applicationData.education || 'Secondary',
      region: applicationData.region || applicationData.country || 'Nairobi',
      age: applicationData.age || 30,
      gender: applicationData.gender || 'Other',
      revenue: applicationData.revenue,
      employees: applicationData.employees,
      existingLoans: applicationData.existing_loans,
      creditHistory: applicationData.credit_history || 'fair',
      collateralValue: applicationData.collateral_value,
      businessPlan: !!applicationData.documents?.business_plan,
      financialStatements: !!applicationData.documents?.financial_statements,
      marketAnalysis: !!applicationData.documents?.market_analysis
    };

    return mlRiskAssessment.assessRisk(mlData);
  }

  // Cache management (simplified for mock environment)
  private async getCachedAnalytics(cacheKey: string) {
    if (this.shouldUseMockData()) {
      // Simple in-memory cache for development
      const cache = (globalThis as any).__analyticCache__ = (globalThis as any).__analyticCache__ || {};
      const cached = cache[cacheKey];
      
      if (cached && cached.expires > Date.now()) {
        return cached.data;
      }
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('analytics_cache')
        .select('data')
        .eq('cache_key', cacheKey)
        .gte('expires_at', new Date().toISOString())
        .single();

      if (error || !data) return null;
      return data.data;
    } catch {
      return null;
    }
  }

  private async cacheAnalytics(cacheKey: string, data: any, ttlSeconds: number) {
    if (this.shouldUseMockData()) {
      const cache = (globalThis as any).__analyticCache__ = (globalThis as any).__analyticCache__ || {};
      cache[cacheKey] = {
        data,
        expires: Date.now() + (ttlSeconds * 1000)
      };
      return;
    }

    try {
      const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
      await supabase
        .from('analytics_cache')
        .upsert({
          cache_key: cacheKey,
          data,
          expires_at: expiresAt,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      // Silently fail for cache operations
    }
  }

  // Utility methods
  private calculatePortfolioRisk(investments: any[]): number {
    if (investments.length === 0) return 0;

    const riskScores = {
      low: 1,
      medium: 2,
      high: 3
    };

    const totalRisk = investments.reduce((sum, inv) => 
      sum + (riskScores[inv.risk_level as keyof typeof riskScores] || 2), 0
    );

    return Math.round((totalRisk / (investments.length * 3)) * 100);
  }

  // Development logging (only in development mode)
  private logDevelopmentAction(action: string, details: string) {
    if (isDevelopmentMode() && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.info(`🔧 HEVA Demo: ${action} - ${details}`);
    }
  }

  // Real-time subscriptions (mock for development)
  subscribeToApplicationUpdates(callback: (payload: any) => void) {
    if (isDevelopmentMode()) {
      // Return mock subscription
      return {
        unsubscribe: () => {}
      };
    }
    
    return supabase
      .channel('applications')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'applications'
      }, callback)
      .subscribe();
  }

  subscribeToInvestmentUpdates(callback: (payload: any) => void) {
    if (isDevelopmentMode()) {
      // Return mock subscription
      return {
        unsubscribe: () => {}
      };
    }
    
    return supabase
      .channel('investments')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'investments'
      }, callback)
      .subscribe();
  }

  // Export functionality
  async exportData(config: {
    dataType: string;
    format: string;
    filters: any;
    fields: string[];
  }) {
    let data: any[] = [];

    // Get data based on type
    switch (config.dataType) {
      case 'investments':
        data = await this.getInvestments(config.filters) || [];
        break;
      case 'applications':
        data = await this.getApplications(config.filters) || [];
        break;
      case 'reports':
        data = await this.getMEReports(config.filters) || [];
        break;
      default:
        throw new Error('Invalid data type');
    }

    // Filter fields
    if (config.fields.length > 0) {
      data = data.map(item => {
        const filtered: any = {};
        config.fields.forEach(field => {
          if (item[field] !== undefined) {
            filtered[field] = item[field];
          }
        });
        return filtered;
      });
    }

    return data;
  }

  // Get connection status
  getConnectionStatus() {
    return this.connectionStatus;
  }
}

// Export singleton instance
export const dataService = new DataService();

// Utility functions for external use
export async function getUserDashboardData(userId: string, role: string) {
  const filters = role === 'entrepreneur' ? { user_id: userId } : {};
  
  const [metrics, applications, investments] = await Promise.all([
    dataService.getDashboardMetrics(filters),
    dataService.getApplications(filters),
    dataService.getInvestments(filters)
  ]);

  return {
    metrics,
    applications: applications?.slice(0, 5) || [], // Latest 5
    investments: investments?.slice(0, 10) || [] // Latest 10
  };
}

export async function getAnalyticsData(filters?: any) {
  const [portfolioAnalytics, insights] = await Promise.all([
    dataService.getPortfolioAnalytics(filters),
    dataService.getPredictiveInsights(filters)
  ]);

  return {
    portfolio: portfolioAnalytics,
    insights
  };
}