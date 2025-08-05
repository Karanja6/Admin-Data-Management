export interface FormData {
  // Bio Data
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  gender: string;
  age: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  region: string;
  county: string;
  address: string;
  education: string;
  experience: string;
  
  // Business Info
  businessName: string;
  businessType: string;
  registrationNumber: string;
  yearsInOperation: string;
  employees: string;
  maleEmployees: string;
  femaleEmployees: string;
  currentRevenue: string;
  revenueFrequency: string;
  
  // Location
  latitude: string;
  longitude: string;
  locationDescription: string;
  
  // Socials & Website
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
  
  // Proposal
  proposalTitle: string;
  fundsNeeded: string;
  objective: string;
  justification: string;
  loanPurpose: string;
  businessPlan: string;
  marketAnalysis: string;
  financialProjections: string;
  
  // Non-Financial Needs
  mentorshipNeeds: string[];
  trainingNeeds: string[];
  networkingNeeds: string[];
  marketingSupport: string[];
  technicalAssistance: string[];
  
  // Application Details
  country: string;
  valueChain: string;
  loanType: string;
  submissionDate: string;
}

export interface DocumentUploads {
  cr12: File | null;
  financialStatements: File | null;
  businessPlan: File | null;
  photos: File[];
  invoices: File[];
  collateralDocuments: File | null;
  otherDocuments: File[];
}

export interface TabItem {
  id: string;
  label: string;
  icon: any;
}