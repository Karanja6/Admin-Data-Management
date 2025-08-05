import { useState, useEffect, useCallback, useRef } from 'react';
import { dataService } from '../lib/services/dataService';
import { predictiveEngine } from '../lib/analytics/predictiveEngine';
import { mlRiskAssessment } from '../lib/ml/riskAssessment';

// Real-time data hook for applications
export function useApplications(filters?: any) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<any>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataService.getApplications(filters);
      setApplications(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchApplications();

    // Set up real-time subscription
    subscriptionRef.current = dataService.subscribeToApplicationUpdates((payload) => {
      console.log('Application update:', payload);
      
      if (payload.eventType === 'INSERT') {
        setApplications(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setApplications(prev => 
          prev.map(app => app.id === payload.new.id ? payload.new : app)
        );
      } else if (payload.eventType === 'DELETE') {
        setApplications(prev => 
          prev.filter(app => app.id !== payload.old.id)
        );
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchApplications]);

  const submitApplication = useCallback(async (applicationData: any) => {
    try {
      const newApplication = await dataService.createApplication(applicationData);
      return newApplication;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to submit application');
    }
  }, []);

  const updateApplicationStatus = useCallback(async (id: string, status: string, reviewData?: any) => {
    try {
      const updatedApplication = await dataService.updateApplicationStatus(id, status, reviewData);
      return updatedApplication;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update application');
    }
  }, []);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    submitApplication,
    updateApplicationStatus
  };
}

// Real-time investments hook
export function useInvestments(filters?: any) {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<any>(null);

  const fetchInvestments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataService.getInvestments(filters);
      setInvestments(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch investments');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchInvestments();

    // Set up real-time subscription
    subscriptionRef.current = dataService.subscribeToInvestmentUpdates((payload) => {
      if (payload.eventType === 'INSERT') {
        setInvestments(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setInvestments(prev => 
          prev.map(inv => inv.id === payload.new.id ? payload.new : inv)
        );
      } else if (payload.eventType === 'DELETE') {
        setInvestments(prev => 
          prev.filter(inv => inv.id !== payload.old.id)
        );
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [fetchInvestments]);

  return {
    investments,
    loading,
    error,
    refetch: fetchInvestments
  };
}

// ML-powered risk assessment hook
export function useMLRiskAssessment() {
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assessRisk = useCallback(async (applicationData: any) => {
    try {
      setLoading(true);
      setError(null);

      // Prepare data for ML assessment
      const mlData = {
        applicantName: applicationData.applicantName || applicationData.applicant_name || '',
        businessName: applicationData.businessName || applicationData.business_name || '',
        businessType: applicationData.businessType || applicationData.business_type || '',
        requestedAmount: applicationData.requestedAmount || applicationData.requested_amount || 0,
        experience: applicationData.experience || '1 year',
        education: applicationData.education || 'Secondary',
        region: applicationData.region || applicationData.country || 'Nairobi',
        age: applicationData.age || 30,
        gender: applicationData.gender || 'Other',
        revenue: applicationData.revenue,
        employees: applicationData.employees,
        existingLoans: applicationData.existingLoans || applicationData.existing_loans,
        creditHistory: applicationData.creditHistory || applicationData.credit_history || 'fair',
        collateralValue: applicationData.collateralValue || applicationData.collateral_value,
        businessPlan: !!applicationData.documents?.business_plan,
        financialStatements: !!applicationData.documents?.financial_statements,
        marketAnalysis: !!applicationData.documents?.market_analysis
      };

      const result = mlRiskAssessment.assessRisk(mlData);
      setAssessment(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ML assessment failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    assessment,
    loading,
    error,
    assessRisk,
    clearAssessment: () => setAssessment(null)
  };
}

// Dashboard metrics hook with real-time updates
export function useDashboardMetrics(filters?: any) {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataService.getDashboardMetrics(filters);
      setMetrics(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMetrics();

    // Set up periodic refresh for metrics
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    lastUpdated,
    refetch: fetchMetrics
  };
}

// Advanced analytics hook
export function useAnalytics(filters?: any) {
  const [analytics, setAnalytics] = useState<{
    portfolio: any;
    insights: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const [portfolioAnalytics, insights] = await Promise.all([
        dataService.getPortfolioAnalytics(filters),
        dataService.getPredictiveInsights(filters)
      ]);

      setAnalytics({
        portfolio: portfolioAnalytics,
        insights
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  };
}

// M&E Reports hook
export function useMEReports(filters?: any) {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataService.getMEReports(filters);
      setReports(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const createReport = useCallback(async (reportData: any) => {
    try {
      const newReport = await dataService.createMEReport(reportData);
      setReports(prev => [newReport, ...prev]);
      return newReport;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create report');
    }
  }, []);

  return {
    reports,
    loading,
    error,
    refetch: fetchReports,
    createReport
  };
}

// Documents management hook
export function useDocuments(filters?: any) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataService.getDocuments(filters);
      setDocuments(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDocument = useCallback(async (file: File, metadata: any) => {
    try {
      const newDocument = await dataService.uploadDocument(file, metadata);
      setDocuments(prev => [newDocument, ...prev]);
      return newDocument;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upload document');
    }
  }, []);

  return {
    documents,
    loading,
    error,
    refetch: fetchDocuments,
    uploadDocument
  };
}

// Export functionality hook
export function useDataExport() {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportData = useCallback(async (config: {
    dataType: string;
    format: string;
    filters: any;
    fields: string[];
    fileName?: string;
  }) => {
    try {
      setExporting(true);
      setError(null);

      const data = await dataService.exportData(config);
      
      // Convert to requested format
      let exportContent: string;
      let mimeType: string;
      let fileExtension: string;

      switch (config.format) {
        case 'csv':
          exportContent = convertToCSV(data);
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        case 'json':
          exportContent = JSON.stringify(data, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        default:
          throw new Error('Unsupported export format');
      }

      // Download file
      const blob = new Blob([exportContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.fileName || 'export'}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      throw err;
    } finally {
      setExporting(false);
    }
  }, []);

  return {
    exporting,
    error,
    exportData
  };
}

// Utility function for CSV conversion
function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value.toString();
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

// Market insights hook
export function useMarketInsights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = useCallback(async (sector?: string, country?: string) => {
    try {
      setLoading(true);
      setError(null);

      const sectorInsights = sector && country ? 
        [predictiveEngine.predictSectorPerformance(sector, country)] :
        // Generate insights for all major sectors and countries
        ['Fashion', 'Music', 'Gaming', 'Visual Arts'].flatMap(s => 
          ['Kenya', 'Uganda', 'Rwanda'].map(c => 
            predictiveEngine.predictSectorPerformance(s, c)
          )
        );

      setInsights(sectorInsights);
      return sectorInsights;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate insights';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    insights,
    loading,
    error,
    generateInsights
  };
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [performance, setPerformance] = useState<{
    apiLatency: number;
    cacheHitRate: number;
    errorRate: number;
    activeConnections: number;
  } | null>(null);

  useEffect(() => {
    // Mock performance monitoring
    const interval = setInterval(() => {
      setPerformance({
        apiLatency: 150 + Math.random() * 100, // 150-250ms
        cacheHitRate: 85 + Math.random() * 10, // 85-95%
        errorRate: Math.random() * 2, // 0-2%
        activeConnections: Math.floor(50 + Math.random() * 100) // 50-150
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return performance;
}