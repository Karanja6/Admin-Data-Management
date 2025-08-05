import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application } from '../App';

interface DataContextType {
  applications: Application[];
  analytics: {
    totalApplications: number;
    pendingReview: number;
    approved: number;
    rejected: number;
    totalFunding: number;
    averageLoanAmount: number;
    countryDistribution: { [key: string]: number };
    valueChainDistribution: { [key: string]: number };
    loanTypeDistribution: { [key: string]: number };
    monthlyApplications: { month: string; count: number }[];
    genderDistribution: { [key: string]: number };
    riskDistribution: { [key: string]: number };
  };
  filters: {
    country?: string;
    valueChain?: string;
    loanType?: string;
    status?: string;
    dateRange?: { start: string; end: string };
    gender?: string;
    riskLevel?: string;
  };
  searchQuery: string;
  loading: boolean;
  setFilters: (filters: any) => void;
  setSearchQuery: (query: string) => void;
  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  getFilteredApplications: () => Application[];
  exportData: (format: 'csv' | 'excel') => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Mock data for demonstration
const generateMockApplications = (): Application[] => {
  const countries = ['kenya', 'uganda', 'rwanda', 'ethiopia', 'tanzania'];
  const valueChains = ['audiovisual', 'fashion', 'performing_arts', 'gaming', 'music', 'visual_arts', 'crafts'];
  const loanTypes = ['term_loan', 'working_capital', 'equipment_financing', 'trade_finance', 'invoice_financing'];
  const statuses = ['pending', 'under_review', 'shortlisted', 'approved', 'rejected', 'flagged'];
  const genders = ['male', 'female', 'other', 'prefer_not_to_say'];
  const risks = ['low', 'medium', 'high'];

  return Array.from({ length: 150 }, (_, i) => ({
    id: `app-${i + 1}`,
    applicantId: `user-${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)] as any,
    submissionDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    country: countries[Math.floor(Math.random() * countries.length)],
    valueChain: valueChains[Math.floor(Math.random() * valueChains.length)],
    loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
    requestedAmount: Math.floor(Math.random() * 200000) + 10000,
    applicantName: `Applicant ${i + 1}`,
    applicantEmail: `applicant${i + 1}@example.com`,
    applicantPhone: `+254${Math.floor(Math.random() * 900000000) + 100000000}`,
    gender: genders[Math.floor(Math.random() * genders.length)] as any,
    age: Math.floor(Math.random() * 40) + 20,
    region: `Region ${Math.floor(Math.random() * 10) + 1}`,
    education: ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'][Math.floor(Math.random() * 5)],
    experience: Math.floor(Math.random() * 15) + 1,
    businessName: `Business ${i + 1}`,
    businessType: valueChains[Math.floor(Math.random() * valueChains.length)],
    registrationNumber: `REG${Math.floor(Math.random() * 900000) + 100000}`,
    yearsInOperation: Math.floor(Math.random() * 10) + 1,
    employees: Math.floor(Math.random() * 50) + 1,
    currentRevenue: Math.floor(Math.random() * 500000) + 50000,
    loanPurpose: 'Business expansion and equipment purchase',
    businessPlan: 'business-plan-doc-url',
    financialProjections: 'financial-projections-doc-url',
    collateral: 'Equipment and inventory',
    documents: {
      registrationCertificate: 'reg-cert-url',
      financialStatements: 'financial-statements-url',
      businessPlan: 'business-plan-url',
      collateralDocuments: 'collateral-docs-url',
      photos: ['photo1-url', 'photo2-url']
    },
    reviewedBy: Math.random() > 0.5 ? `reviewer-${Math.floor(Math.random() * 5) + 1}` : undefined,
    reviewDate: Math.random() > 0.5 ? new Date().toISOString() : undefined,
    reviewNotes: Math.random() > 0.5 ? 'Initial review completed. Requires additional documentation.' : undefined,
    riskAssessment: risks[Math.floor(Math.random() * risks.length)] as any,
    lastUpdate: new Date().toISOString(),
    revenueGrowth: Math.random() * 100 - 10,
    employmentGrowth: Math.floor(Math.random() * 20),
    milestones: ['Milestone 1', 'Milestone 2']
  }));
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize mock data
  useEffect(() => {
    const mockData = generateMockApplications();
    setApplications(mockData);
    setLoading(false);
  }, []);

  // Calculate analytics
  const analytics = React.useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending' || app.status === 'under_review').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    const totalFunding = applications
      .filter(app => app.status === 'approved')
      .reduce((sum, app) => sum + app.requestedAmount, 0);
    const averageLoanAmount = total > 0 ? applications.reduce((sum, app) => sum + app.requestedAmount, 0) / total : 0;

    // Country distribution
    const countryDistribution = applications.reduce((acc, app) => {
      acc[app.country] = (acc[app.country] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Value chain distribution
    const valueChainDistribution = applications.reduce((acc, app) => {
      acc[app.valueChain] = (acc[app.valueChain] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Loan type distribution
    const loanTypeDistribution = applications.reduce((acc, app) => {
      acc[app.loanType] = (acc[app.loanType] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Gender distribution
    const genderDistribution = applications.reduce((acc, app) => {
      acc[app.gender] = (acc[app.gender] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Risk distribution
    const riskDistribution = applications.reduce((acc, app) => {
      if (app.riskAssessment) {
        acc[app.riskAssessment] = (acc[app.riskAssessment] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    // Monthly applications
    const monthlyApplications = applications.reduce((acc, app) => {
      const month = new Date(app.submissionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ month, count: 1 });
      }
      return acc;
    }, [] as { month: string; count: number }[]);

    return {
      totalApplications: total,
      pendingReview: pending,
      approved,
      rejected,
      totalFunding,
      averageLoanAmount,
      countryDistribution,
      valueChainDistribution,
      loanTypeDistribution,
      monthlyApplications: monthlyApplications.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()),
      genderDistribution,
      riskDistribution
    };
  }, [applications]);

  const addApplication = (application: Application) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, ...updates } : app)
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const getFilteredApplications = () => {
    let filtered = applications;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(query) ||
        app.businessName.toLowerCase().includes(query) ||
        app.applicantEmail.toLowerCase().includes(query) ||
        app.country.toLowerCase().includes(query) ||
        app.valueChain.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.country) {
      filtered = filtered.filter(app => app.country === filters.country);
    }
    if (filters.valueChain) {
      filtered = filtered.filter(app => app.valueChain === filters.valueChain);
    }
    if (filters.loanType) {
      filtered = filtered.filter(app => app.loanType === filters.loanType);
    }
    if (filters.status) {
      filtered = filtered.filter(app => app.status === filters.status);
    }
    if (filters.gender) {
      filtered = filtered.filter(app => app.gender === filters.gender);
    }
    if (filters.riskLevel) {
      filtered = filtered.filter(app => app.riskAssessment === filters.riskLevel);
    }
    if (filters.dateRange) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter(app => {
        const date = new Date(app.submissionDate);
        return date >= start && date <= end;
      });
    }

    return filtered;
  };

  const exportData = (format: 'csv' | 'excel') => {
    const data = getFilteredApplications();
    // Implementation would depend on chosen export library
    console.log(`Exporting ${data.length} records as ${format}`);
    
    // Simple CSV export for demo
    if (format === 'csv') {
      const headers = [
        'ID', 'Applicant Name', 'Business Name', 'Country', 'Value Chain', 
        'Loan Type', 'Requested Amount', 'Status', 'Submission Date'
      ];
      
      const csvContent = [
        headers.join(','),
        ...data.map(app => [
          app.id,
          app.applicantName,
          app.businessName,
          app.country,
          app.valueChain,
          app.loanType,
          app.requestedAmount,
          app.status,
          app.submissionDate
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `heva-applications-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const value: DataContextType = {
    applications,
    analytics,
    filters,
    searchQuery,
    loading,
    setFilters,
    setSearchQuery,
    addApplication,
    updateApplication,
    deleteApplication,
    getFilteredApplications,
    exportData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}