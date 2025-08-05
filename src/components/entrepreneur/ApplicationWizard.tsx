import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  User, 
  Building2, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  DollarSign,
  MapPin,
  Globe
} from 'lucide-react';
import { User as UserType, Application } from '../../App';
import { BioDataTab } from '../data/form-tabs/BioDataTab';
import { BusinessInfoTab } from '../data/form-tabs/BusinessInfoTab';
import { LocationTab } from '../data/form-tabs/LocationTab';
import { ProposalTab } from '../data/form-tabs/ProposalTab';
import { DocumentsTab } from '../data/form-tabs/DocumentsTab';
import { SocialsTab } from '../data/form-tabs/SocialsTab';
import { NonFinancialTab } from '../data/form-tabs/NonFinancialTab';

interface ApplicationWizardProps {
  user: UserType;
  onSubmit: (application: Partial<Application>) => void;
  onCancel: () => void;
}

export function ApplicationWizard({ user, onSubmit, onCancel }: ApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationData, setApplicationData] = useState<Partial<Application>>({
    applicantEmail: user.email,
    applicantName: user.name,
    status: 'pending',
    submissionDate: new Date().toISOString(),
    documents: {},
    socialMedia: {},
    nonFinancialNeeds: {}
  });

  const steps = [
    {
      id: 0,
      title: 'Bio Information',
      description: 'Personal and contact details',
      icon: User,
      component: 'bio',
      fields: ['applicantName', 'applicantEmail', 'applicantPhone', 'gender', 'age', 'region', 'education', 'experience']
    },
    {
      id: 1,
      title: 'Funding & Proposal',
      description: 'Business details and funding request',
      icon: DollarSign,
      component: 'proposal',
      fields: ['businessName', 'businessType', 'loanType', 'requestedAmount', 'loanPurpose', 'objective']
    },
    {
      id: 2,
      title: 'Documents & Uploads',
      description: 'Required documentation',
      icon: Upload,
      component: 'documents',
      fields: ['documents']
    },
    {
      id: 3,
      title: 'Review & Submit',
      description: 'Final review and submission',
      icon: CheckCircle,
      component: 'review',
      fields: []
    }
  ];

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const getCompletedFields = (stepFields: string[]) => {
    return stepFields.filter(field => {
      if (field === 'documents') {
        return Object.keys(applicationData.documents || {}).length > 0;
      }
      return applicationData[field as keyof Application];
    }).length;
  };

  const isStepValid = (stepIndex: number) => {
    const step = steps[stepIndex];
    const completedFields = getCompletedFields(step.fields);
    const requiredFields = step.fields.length;
    
    // For bio step, require at least basic info
    if (stepIndex === 0) {
      return applicationData.applicantName && applicationData.applicantEmail && applicationData.applicantPhone;
    }
    
    // For proposal step, require business basics
    if (stepIndex === 1) {
      return applicationData.businessName && applicationData.requestedAmount && applicationData.loanType;
    }
    
    // Documents step is optional but recommended
    if (stepIndex === 2) {
      return true; // Allow proceeding even without documents
    }
    
    return completedFields >= Math.max(1, Math.floor(requiredFields * 0.5));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (data: Partial<Application>) => {
    setApplicationData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleSubmit = () => {
    // Add final submission data
    const finalApplication: Partial<Application> = {
      ...applicationData,
      submissionDate: new Date().toISOString(),
      status: 'pending',
      country: applicationData.country || 'Kenya',
      valueChain: applicationData.businessType || 'Fashion'
    };
    
    onSubmit(finalApplication);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'bio':
        return (
          <div className="space-y-6">
            <BioDataTab 
              data={applicationData} 
              onChange={handleDataUpdate}
              showTitle={false}
            />
            <div className="space-y-4">
              <LocationTab 
                data={applicationData} 
                onChange={handleDataUpdate}
                showTitle={false}
              />
              <SocialsTab 
                data={applicationData} 
                onChange={handleDataUpdate}
                showTitle={false}
              />
            </div>
          </div>
        );
      
      case 'proposal':
        return (
          <div className="space-y-6">
            <BusinessInfoTab 
              data={applicationData} 
              onChange={handleDataUpdate}
              showTitle={false}
            />
            <ProposalTab 
              data={applicationData} 
              onChange={handleDataUpdate}
              showTitle={false}
            />
            <NonFinancialTab 
              data={applicationData} 
              onChange={handleDataUpdate}
              showTitle={false}
            />
          </div>
        );
      
      case 'documents':
        return (
          <DocumentsTab 
            data={applicationData} 
            onChange={handleDataUpdate}
            showTitle={false}
          />
        );
      
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-accent/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Applicant Information</h4>
                    <p className="font-medium">{applicationData.applicantName}</p>
                    <p className="text-sm text-muted-foreground">{applicationData.applicantEmail}</p>
                    <p className="text-sm text-muted-foreground">{applicationData.applicantPhone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Business Details</h4>
                    <p className="font-medium">{applicationData.businessName}</p>
                    <p className="text-sm text-muted-foreground">{applicationData.businessType}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Funding Request</h4>
                    <p className="font-medium">${applicationData.requestedAmount?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{applicationData.loanType}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Documents Uploaded</h4>
                    <p className="text-sm">{Object.keys(applicationData.documents || {}).length} files</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Your application will be reviewed within 2-3 business days</li>
                <li>• You'll receive email updates on your application status</li>
                <li>• Our team may contact you for additional information</li>
                <li>• Approved applications will be processed for funding disbursement</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Submit New Application</CardTitle>
              <p className="text-muted-foreground mt-1">
                Complete the application process in {steps.length} simple steps
              </p>
            </div>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(index);
              const completedFields = getCompletedFields(step.fields);
              const totalFields = step.fields.length;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`
                      p-3 rounded-full flex items-center justify-center
                      ${status === 'completed' ? 'bg-green-100 text-green-600' : 
                        status === 'current' ? 'bg-primary text-primary-foreground' : 
                        'bg-muted text-muted-foreground'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      {step.fields.length > 0 && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {completedFields}/{totalFields}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-border mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {React.createElement(steps[currentStep].icon, { className: "w-5 h-5" })}
            <span>{steps[currentStep].title}</span>
          </CardTitle>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </CardHeader>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </div>
          
          {!isStepValid(currentStep) && currentStep < steps.length - 1 && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Please complete the required fields to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}