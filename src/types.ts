
export type UserRole = 'admin' | 'analyst' | 'program_officer' | 'entrepreneur';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  profilePicture?: string;
  department?: string;
  location?: string;
  dateJoined?: string;
  lastActive?: string;
  permissions?: {
    dataEntry: boolean;
    dataView: boolean;
    dataExport: boolean;
    userManagement: boolean;
    systemConfig: boolean;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language?: string;
    defaultCountry?: string;
    defaultView?: string;
  };
  businessInfo?: {
    businessName?: string;
    valueChain?: string;
    registrationNumber?: string;
    employees?: number;
    currentRevenue?: number;
    establishedYear?: number;
    location?: string; // ✅ Added
  };
  applicationStatus?: {
    hasActiveApplication?: boolean;
    currentStage?: string;
    lastUpdate?: string;
    applicationId?: string;
  };
  consentInfo?: {
    dataProcessingConsent: boolean;
    marketingConsent: boolean;
    consentDate: string;
    consentVersion: string;
  };
}

export interface Application {
  id: string;
  status: 'submitted' | 'under_review' | 'approved' | 'funded' | 'rejected';
  requested_amount: number;
  loan_type: string;
  business_name: string;
  created_at: string;
  ml_assessment?: {
    eligibility_score: number;
    risk_level: 'low' | 'medium' | 'high';
  };
}
