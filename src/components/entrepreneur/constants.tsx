export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning', 
  INFO: 'info',
  URGENT: 'urgent'
} as const;

export const NOTIFICATION_CATEGORIES = {
  APPLICATION: 'application',
  PAYMENT: 'payment', 
  DOCUMENT: 'document',
  TRAINING: 'training',
  SYSTEM: 'system'
} as const;

export const REPORT_TYPES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  ANNUAL: 'annual'
} as const;

export const REPORT_STATUSES = {
  SUBMITTED: 'submitted',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const DOCUMENT_TYPES = {
  APPLICATION: 'application',
  REPORT: 'report',
  PHOTO: 'photo',
  INVOICE: 'invoice',
  OTHER: 'other'
} as const;

export const DOCUMENT_CATEGORIES = {
  REGISTRATION: 'registration',
  FINANCIAL: 'financial',
  BUSINESS_PLAN: 'business_plan',
  MONTHLY_REPORT: 'monthly_report',
  QUARTERLY_REPORT: 'quarterly_report',
  ANNUAL_REPORT: 'annual_report',
  MISC: 'misc'
} as const;

export const DOCUMENT_STATUSES = {
  VERIFIED: 'verified',
  PENDING: 'pending',
  REJECTED: 'rejected'
} as const;

export const APPLICATION_STAGES = [
  {
    id: 'submitted',
    title: 'Application Submitted',
    description: 'Your application has been successfully submitted and is in the queue for initial review.',
    type: 'submission'
  },
  {
    id: 'document_verification',
    title: 'Document Verification',
    description: 'All required documents are being verified and reviewed.',
    type: 'review'
  },
  {
    id: 'financial_assessment',
    title: 'Financial Assessment',
    description: 'Your business financial information is being evaluated by our analysts.',
    type: 'review'
  },
  {
    id: 'committee_review',
    title: 'Committee Review',
    description: 'Application is being presented to the loan approval committee.',
    type: 'decision'
  },
  {
    id: 'final_decision',
    title: 'Final Decision',
    description: 'You will receive notification of the final loan decision.',
    type: 'decision'
  },
  {
    id: 'disbursement',
    title: 'Loan Disbursement',
    description: 'If approved, funds will be disbursed to your registered account.',
    type: 'disbursement'
  }
];

export const EDUCATION_MODULES = [
  {
    id: 'basics',
    title: 'Loan Basics',
    description: 'Understanding different types of business loans and how they work',
    duration: '15 min',
    difficulty: 'Beginner',
    topics: ['Loan Types', 'Interest Rates', 'Repayment Terms', 'Collateral']
  },
  {
    id: 'application',
    title: 'Application Process',
    description: 'Step-by-step guide to completing your loan application',
    duration: '25 min', 
    difficulty: 'Beginner',
    topics: ['Required Documents', 'Business Plan', 'Financial Statements', 'Application Tips']
  },
  {
    id: 'business_planning',
    title: 'Business Planning',
    description: 'Creating effective business plans and financial projections',
    duration: '45 min',
    difficulty: 'Intermediate',
    topics: ['Market Analysis', 'Financial Projections', 'Growth Strategies', 'Risk Management']
  },
  {
    id: 'financial_management',
    title: 'Financial Management',
    description: 'Managing cash flow, budgeting, and loan repayments',
    duration: '35 min',
    difficulty: 'Intermediate',
    topics: ['Cash Flow', 'Budgeting', 'Record Keeping', 'Repayment Planning']
  },
  {
    id: 'digital_marketing',
    title: 'Digital Marketing',
    description: 'Growing your business through online marketing and social media',
    duration: '40 min',
    difficulty: 'Intermediate',
    topics: ['Social Media', 'Online Advertising', 'Content Marketing', 'E-commerce']
  },
  {
    id: 'scaling',
    title: 'Scaling Your Business',
    description: 'Strategies for growing and expanding your creative business',
    duration: '50 min',
    difficulty: 'Advanced',
    topics: ['Expansion Planning', 'Hiring Staff', 'New Markets', 'Investment']
  }
];

export const FAQ_CATEGORIES = [
  {
    id: 'application',
    title: 'Application Process',
    questions: [
      {
        question: 'How long does the application process take?',
        answer: 'The typical application process takes 2-4 weeks from submission to final decision, depending on the completeness of your application and the loan amount requested.'
      },
      {
        question: 'What documents do I need to apply?',
        answer: 'Required documents include business registration (CR12), financial statements, business plan, bank statements, and identification documents.'
      },
      {
        question: 'Can I apply if my business is less than 1 year old?',
        answer: 'Yes, we consider applications from new businesses. However, you may need to provide additional documentation such as a detailed business plan and personal financial history.'
      }
    ]
  },
  {
    id: 'eligibility',
    title: 'Eligibility Requirements',
    questions: [
      {
        question: 'What types of businesses are eligible?',
        answer: 'We support creative economy businesses including fashion, music, arts, gaming, audiovisual, performing arts, and crafts.'
      },
      {
        question: 'What is the minimum and maximum loan amount?',
        answer: 'Loan amounts range from $1,000 to $100,000 depending on your business needs and repayment capacity.'
      },
      {
        question: 'Do I need collateral for a loan?',
        answer: 'Collateral requirements vary by loan amount and type. Smaller loans may not require collateral, while larger amounts typically do.'
      }
    ]
  },
  {
    id: 'repayment',
    title: 'Repayment & Terms',
    questions: [
      {
        question: 'What are the repayment terms?',
        answer: 'Repayment terms typically range from 6 months to 4 years, with monthly payments. Terms depend on the loan amount and your business cash flow.'
      },
      {
        question: 'What happens if I miss a payment?',
        answer: 'Contact us immediately if you anticipate payment difficulties. We offer grace periods and restructuring options for borrowers facing temporary challenges.'
      },
      {
        question: 'Can I pay off my loan early?',
        answer: 'Yes, early repayment is allowed without penalties. This can help reduce your total interest payments.'
      }
    ]
  }
];

export const NOTIFICATION_SETTINGS_DEFAULT = {
  email: true,
  push: true,
  sms: false,
  applicationUpdates: true,
  paymentReminders: true,
  documentRequests: true,
  trainingOpportunities: true,
  systemMaintenance: false
};