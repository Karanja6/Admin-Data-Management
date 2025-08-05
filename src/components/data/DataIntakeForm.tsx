import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { FileText, User, Building, MapPin, Globe, Heart, Upload } from 'lucide-react';
import { FormData, DocumentUploads, TabItem } from './types';
import { calculateProgress } from './helpers';
import { BioDataTab } from './form-tabs/BioDataTab';
import { BusinessInfoTab } from './form-tabs/BusinessInfoTab';
import { LocationTab } from './form-tabs/LocationTab';
import { SocialsTab } from './form-tabs/SocialsTab';
import { ProposalTab } from './form-tabs/ProposalTab';
import { NonFinancialTab } from './form-tabs/NonFinancialTab';
import { DocumentsTab } from './form-tabs/DocumentsTab';

export function DataIntakeForm() {
  const [currentTab, setCurrentTab] = useState('bio-data');
  const [formData, setFormData] = useState<FormData>({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    gender: '',
    age: '',
    dateOfBirth: '',
    nationality: '',
    idNumber: '',
    region: '',
    county: '',
    address: '',
    education: '',
    experience: '',
    businessName: '',
    businessType: '',
    registrationNumber: '',
    yearsInOperation: '',
    employees: '',
    maleEmployees: '',
    femaleEmployees: '',
    currentRevenue: '',
    revenueFrequency: '',
    latitude: '',
    longitude: '',
    locationDescription: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    tiktok: '',
    proposalTitle: '',
    fundsNeeded: '',
    objective: '',
    justification: '',
    loanPurpose: '',
    businessPlan: '',
    marketAnalysis: '',
    financialProjections: '',
    mentorshipNeeds: [],
    trainingNeeds: [],
    networkingNeeds: [],
    marketingSupport: [],
    technicalAssistance: [],
    country: '',
    valueChain: '',
    loanType: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const [documents, setDocuments] = useState<DocumentUploads>({
    cr12: null,
    financialStatements: null,
    businessPlan: null,
    photos: [],
    invoices: [],
    collateralDocuments: null,
    otherDocuments: []
  });

  const tabs: TabItem[] = [
    { id: 'bio-data', label: 'Bio Data', icon: User },
    { id: 'business-info', label: 'Business Info', icon: Building },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'socials', label: 'Socials & Website', icon: Globe },
    { id: 'proposal', label: 'Proposal', icon: FileText },
    { id: 'non-financial', label: 'Non-Financial Needs', icon: Heart },
    { id: 'documents', label: 'Upload Documents', icon: Upload }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: keyof DocumentUploads, files: FileList | null) => {
    if (!files) return;
    
    if (field === 'photos' || field === 'invoices' || field === 'otherDocuments') {
      setDocuments(prev => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)]
      }));
    } else {
      setDocuments(prev => ({ ...prev, [field]: files[0] }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { formData, documents });
    // Handle form submission
  };

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);

  const navigateTab = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentTabIndex + 1, tabs.length - 1)
      : Math.max(currentTabIndex - 1, 0);
    setCurrentTab(tabs[newIndex].id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Application Data Entry</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <div className="w-32">
                <Progress value={calculateProgress(formData)} className="h-2" />
              </div>
              <span className="text-sm font-medium">{calculateProgress(formData).toFixed(0)}%</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 h-auto p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center space-y-1 py-3 px-2 text-xs"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="bio-data">
              <BioDataTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="business-info">
              <BusinessInfoTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="location">
              <LocationTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="socials">
              <SocialsTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="proposal">
              <ProposalTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="non-financial">
              <NonFinancialTab formData={formData} onInputChange={handleInputChange} />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsTab documents={documents} onFileUpload={handleFileUpload} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation and Submit */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => navigateTab('prev')}
              disabled={currentTabIndex === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentTabIndex + 1} of {tabs.length}
            </div>
            {currentTabIndex === tabs.length - 1 ? (
              <Button onClick={handleSubmit}>
                Submit Application
              </Button>
            ) : (
              <Button onClick={() => navigateTab('next')}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}