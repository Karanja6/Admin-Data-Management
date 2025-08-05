import { NOTIFICATION_TYPES, REPORT_STATUSES, DOCUMENT_STATUSES, APPLICATION_STAGES } from './constants';

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

export const getNotificationIcon = (type: keyof typeof NOTIFICATION_TYPES) => {
  switch (type) {
    case 'SUCCESS': return 'CheckCircle';
    case 'WARNING': return 'AlertTriangle';
    case 'URGENT': return 'AlertTriangle';
    case 'INFO': return 'Info';
    default: return 'Info';
  }
};

export const getNotificationColor = (type: keyof typeof NOTIFICATION_TYPES) => {
  switch (type) {
    case 'SUCCESS': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
    case 'WARNING': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    case 'URGENT': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
    case 'INFO': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
    case 'verified': 
      return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    case 'submitted':
    case 'pending': 
      return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    case 'under_review':
    case 'current': 
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    case 'rejected':
    case 'overdue': 
      return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    default: 
      return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
    case 'verified':
    case 'completed': 
      return 'CheckCircle';
    case 'current':
    case 'submitted': 
      return 'Clock';
    case 'pending': 
      return 'Clock';
    case 'rejected':
    case 'overdue': 
      return 'AlertTriangle';
    default: 
      return 'Clock';
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type: string, name: string) => {
  if (type === 'photo' || name.toLowerCase().includes('photo') || name.toLowerCase().includes('image')) {
    return 'Image';
  }
  return 'FileText';
};

export const calculateProgress = (currentStage: string): number => {
  const stageIndex = APPLICATION_STAGES.findIndex(stage => 
    stage.title.toLowerCase().includes(currentStage.toLowerCase().replace('_', ' '))
  );
  return stageIndex >= 0 ? ((stageIndex + 1) / APPLICATION_STAGES.length) * 100 : 0;
};

export const getTimelineEvents = (currentStage: string) => {
  return APPLICATION_STAGES.map((stage, index) => ({
    ...stage,
    status: index < 2 ? 'completed' : index === 2 ? 'current' : 'pending',
    date: new Date(Date.now() + (index - 2) * 5 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

export const getDaysUntilDue = (dueDate: string): number => {
  return Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
};

export const isUrgent = (dueDate: string): boolean => {
  return getDaysUntilDue(dueDate) <= 7;
};

export const filterNotifications = (notifications: any[], filters: {
  tab: string;
  search?: string;
  category?: string;
}) => {
  return notifications.filter(notification => {
    const matchesTab = filters.tab === 'all' || 
                      (filters.tab === 'unread' && !notification.read) ||
                      (filters.tab === 'urgent' && notification.actionRequired) ||
                      notification.category === filters.tab;
    
    const matchesSearch = !filters.search || 
                         notification.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         notification.message.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || 
                           filters.category === 'all' || 
                           notification.category === filters.category;
    
    return matchesTab && matchesSearch && matchesCategory;
  });
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'application': return 'FileText';
    case 'payment': return 'DollarSign';
    case 'document': return 'FileText';
    case 'training': return 'Users';
    case 'system': return 'Settings';
    default: return 'Info';
  }
};

export const getDocumentStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    case 'pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    case 'missing': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
  }
};

export const generateMockNotifications = () => [
  {
    id: '1',
    type: 'success',
    title: 'Application Status Update',
    message: 'Your application has moved to financial assessment stage.',
    timestamp: '2024-02-01T10:30:00Z',
    read: false,
    category: 'application'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Document Upload Required',
    message: 'Please upload your updated bank statements.',
    timestamp: '2024-01-30T14:20:00Z',
    read: false,
    actionRequired: true,
    category: 'document'
  },
  {
    id: '3',
    type: 'info',
    title: 'Monthly Report Due Soon',
    message: 'Your February report is due in 3 days.',
    timestamp: '2024-01-28T09:15:00Z',
    read: true,
    actionRequired: true,
    category: 'payment'
  }
];

export const generateMockReports = () => [
  {
    id: '1',
    type: 'quarterly',
    period: 'Q4 2023',
    submissionDate: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-15T23:59:59Z',
    status: 'approved',
    revenue: 45000,
    expenses: 32000,
    employees: 8,
    maleEmployees: 3,
    femaleEmployees: 5,
    milestones: ['Launched new product line', 'Hired 2 additional staff'],
    challenges: 'Supply chain delays affecting production.',
    nextSteps: 'Diversify supplier base.',
    attachments: ['Q4_Report.pdf']
  }
];

export const generateMockDocuments = () => [
  {
    id: '1',
    name: 'Business_Registration_Certificate.pdf',
    type: 'application',
    category: 'registration',
    uploadDate: '2024-01-15T10:30:00Z',
    size: 2048576,
    status: 'verified',
    url: '/files/business-reg.pdf',
    description: 'CR12 Business Registration Certificate'
  },
  {
    id: '2',
    name: 'Financial_Statements_2023.pdf',
    type: 'application',
    category: 'financial',
    uploadDate: '2024-01-15T10:35:00Z',
    size: 1536000,
    status: 'verified',
    url: '/files/financial-statements.pdf'
  }
];