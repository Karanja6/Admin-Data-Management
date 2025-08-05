import { createClient } from '@supabase/supabase-js';

// Client-side environment configuration
const getSupabaseConfig = () => {
  // Try different environment variable access methods
  let supabaseUrl = 'YOUR_SUPABASE_URL';
  let supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

  // Check for Vite environment variables
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;
    supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseAnonKey;
  }

  // Check for Create React App environment variables
  if (typeof window !== 'undefined' && (window as any).__ENV__) {
    const env = (window as any).__ENV__;
    supabaseUrl = env.REACT_APP_SUPABASE_URL || supabaseUrl;
    supabaseAnonKey = env.REACT_APP_SUPABASE_ANON_KEY || supabaseAnonKey;
  }

  // Fallback configuration for development
  if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    // Only log in development, not production
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.info('🔧 HEVA CreativeHub: Running in development mode with demo data');
    }
    return {
      url: 'https://demo.supabase.co',
      key: 'demo-key',
      isMock: true
    };
  }

  return {
    url: supabaseUrl,
    key: supabaseAnonKey,
    isMock: false
  };
};

const config = getSupabaseConfig();

// Create Supabase client with error handling
export const supabase = config.isMock 
  ? createMockSupabaseClient() 
  : createClient(config.url, config.key);

// Mock Supabase client for development
function createMockSupabaseClient() {
  const mockClient = {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
        }),
        gte: (column: string, value: any) => ({
          lte: (column: string, value: any) => ({
            order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
          }),
          order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
        }),
        like: (column: string, value: any) => ({
          delete: () => Promise.resolve({ data: [], error: null })
        }),
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: (data: any) => ({
        select: () => ({
          single: () => Promise.resolve({ 
            data: { ...data, id: `mock-${Date.now()}`, created_at: new Date().toISOString() }, 
            error: null 
          })
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => ({
            single: () => Promise.resolve({ 
              data: { ...data, id: value, updated_at: new Date().toISOString() }, 
              error: null 
            })
          })
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
      }),
      upsert: (data: any) => Promise.resolve({ data: [data], error: null })
    }),
    storage: {
      from: (bucket: string) => ({
        upload: (path: string, file: File) => Promise.resolve({ 
          data: { path }, 
          error: null 
        })
      })
    },
    channel: (name: string) => ({
      on: (event: string, options: any, callback: Function) => ({
        subscribe: () => ({
          unsubscribe: () => {}
        })
      })
    })
  };

  return mockClient;
}

// Database table definitions (same as before)
export interface DatabaseTables {
  users: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'analyst' | 'program_officer' | 'entrepreneur';
    profile_picture?: string;
    phone?: string;
    department?: string;
    location?: string;
    business_info?: any;
    preferences?: any;
    permissions?: any;
    date_joined: string;
    last_active?: string;
    created_at: string;
    updated_at: string;
  };
  applications: {
    id: string;
    user_id: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone?: string;
    business_name?: string;
    business_type?: string;
    country: string;
    region?: string;
    value_chain: string;
    loan_type: 'loan' | 'grant';
    requested_amount: number;
    loan_purpose?: string;
    objective?: string;
    status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'funded';
    ml_assessment?: any;
    risk_score?: number;
    eligibility_score?: number;
    documents?: any;
    social_media?: any;
    non_financial_needs?: any;
    submission_date?: string;
    review_date?: string;
    approval_date?: string;
    created_at: string;
    updated_at: string;
  };
  investments: {
    id: string;
    application_id: string;
    user_id: string;
    partner_name: string;
    business_name: string;
    country: string;
    sector: string;
    investment_amount: number;
    date_funded: string;
    status: 'active' | 'completed' | 'defaulted' | 'restructured';
    repayment_progress: number;
    risk_level: 'low' | 'medium' | 'high';
    jobs_created?: number;
    revenue_growth?: number;
    interest_rate?: number;
    repayment_period_months?: number;
    grace_period_months?: number;
    collateral_value?: number;
    contact_info?: any;
    created_at: string;
    updated_at: string;
  };
  me_reports: {
    id: string;
    investment_id: string;
    partner_name: string;
    business_name: string;
    country: string;
    sector: string;
    quarter: string;
    year: number;
    submission_status: 'submitted' | 'missing' | 'late' | 'draft';
    submission_date?: string;
    due_date: string;
    report_data: {
      revenue: number;
      revenue_growth: number;
      employees: number;
      employment_growth: number;
      male_employees: number;
      female_employees: number;
      milestones: string[];
      challenges: string;
      next_steps: string;
    };
    compliance: {
      data_completeness: number;
      timeliness: 'on-time' | 'late' | 'overdue';
      quality_score: number;
    };
    created_at: string;
    updated_at: string;
  };
  documents: {
    id: string;
    user_id?: string;
    application_id?: string;
    investment_id?: string;
    name: string;
    type: 'application' | 'report' | 'financial' | 'legal' | 'photo' | 'other';
    category: string;
    country: string;
    value_chain: string;
    uploaded_by: string;
    file_path: string;
    file_size: number;
    mime_type: string;
    status: 'verified' | 'pending' | 'rejected' | 'processing';
    download_count: number;
    created_at: string;
    updated_at: string;
  };
  analytics_cache: {
    id: string;
    cache_key: string;
    data: any;
    expires_at: string;
    created_at: string;
  };
}

export type Database = {
  public: {
    Tables: DatabaseTables;
  };
};

// Configuration helper
export function getSupabaseConnectionStatus() {
  return {
    isConnected: !config.isMock,
    isMock: config.isMock,
    url: config.isMock ? 'Development Mode' : config.url,
    mode: config.isMock ? 'development' : 'production'
  };
}

// Development helpers
export function isDevelopmentMode(): boolean {
  return config.isMock;
}

export function getConnectionInfo() {
  return {
    status: config.isMock ? 'development' : 'connected',
    message: config.isMock 
      ? 'Running with demo data for development' 
      : 'Connected to live Supabase database'
  };
}