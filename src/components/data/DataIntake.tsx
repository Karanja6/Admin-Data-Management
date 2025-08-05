import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useData } from '../../contexts/DataContext';
import { Application } from '../../App';
import { 
  Upload, 
  FileText, 
  User, 
  Building, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Save,
  Send
} from 'lucide-react';

export function DataIntake() {
  const { addApplication } = useData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');
  
  const [formData, setFormData] = useState({
    // Bio Data
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    gender: '',
    age: '',
    region: '',
    education: '',
    experience: '',
    
    // Business Data
    businessName: '',
    businessType: '',
    registrationNumber: '',
    yearsInOperation: '',
    employees: '',
    currentRevenue: '',
    
    // Proposal & Financial
    country: '',
    valueChain: '',
    loanType: '',
    requestedAmount: '',
    loanPurpose: '',
    businessPlan: '',
    financialProjections: '',
    collateral: '',
    
    // Documents
    documents: {
      registrationCertificate: '',
      financialStatements: '',
      businessPlan: '',
      collateralDocuments: '',
      photos: []
    }
  });

  const countries = ['kenya', 'uganda', 'rwanda', 'ethiopia', 'tanzania'];
  const valueChains = ['audiovisual', 'fashion', 'performing_arts', 'gaming', 'music', 'visual_arts', 'crafts'];
  const loanTypes = ['term_loan', 'working_capital', 'equipment_financing', 'trade_finance', 'invoice_financing'];
  const genders = ['male', 'female', 'other', 'prefer_not_to_say'];
  const educationLevels = ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        applicantId: `user-${Date.now()}`,
        status: 'pending',
        submissionDate: new Date().toISOString(),
        country: formData.country,
        valueChain: formData.valueChain,
        loanType: formData.loanType,
        requestedAmount: parseInt(formData.requestedAmount),
        applicantName: formData.applicantName,
        applicantEmail: formData.applicantEmail,
        applicantPhone: formData.applicantPhone,
        gender: formData.gender as any,
        age: parseInt(formData.age),
        region: formData.region,
        education: formData.education,
        experience: parseInt(formData.experience),
        businessName: formData.businessName,
        businessType: formData.businessType,
        registrationNumber: formData.registrationNumber,
        yearsInOperation: parseInt(formData.yearsInOperation),
        employees: parseInt(formData.employees),
        currentRevenue: parseInt(formData.currentRevenue),
        loanPurpose: formData.loanPurpose,
        businessPlan: formData.businessPlan,
        financialProjections: formData.financialProjections,
        collateral: formData.collateral,
        documents: formData.documents,
        lastUpdate: new Date().toISOString(),
        revenueGrowth: 0,
        employmentGrowth: 0,
        milestones: []
      };
      
      addApplication(newApplication);
      setSuccess(true);
      
      // Reset form
      setFormData({
        applicantName: '', applicantEmail: '', applicantPhone: '', gender: '', age: '', 
        region: '', education: '', experience: '', businessName: '', businessType: '', 
        registrationNumber: '', yearsInOperation: '', employees: '', currentRevenue: '', 
        country: '', valueChain: '', loanType: '', requestedAmount: '', loanPurpose: '', 
        businessPlan: '', financialProjections: '', collateral: '', 
        documents: { registrationCertificate: '', financialStatements: '', businessPlan: '', 
        collateralDocuments: '', photos: [] }
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1>Application Data Intake</h1>
        <p className="text-muted-foreground">
          Collect comprehensive application data for funding programs across East Africa
        </p>
      </div>

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Application submitted successfully! It has been added to the review queue.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bio" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Bio Data</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Proposal</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Basic applicant demographic and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="applicantName">Full Name *</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicantEmail">Email Address *</Label>
                    <Input
                      id="applicantEmail"
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicantPhone">Phone Number *</Label>
                    <Input
                      id="applicantPhone"
                      value={formData.applicantPhone}
                      onChange={(e) => handleInputChange('applicantPhone', e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map(gender => (
                          <SelectItem key={gender} value={gender}>
                            {gender.replace('_', ' ').charAt(0).toUpperCase() + gender.replace('_', ' ').slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter age"
                      min="18"
                      max="80"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region *</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      placeholder="Enter region/location"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education Level *</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map(level => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Enter years of experience"
                      min="0"
                      max="50"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Business Information</span>
                </CardTitle>
                <CardDescription>
                  Details about the business and its operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="Enter business name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Input
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      placeholder="Enter business type"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsInOperation">Years in Operation *</Label>
                    <Input
                      id="yearsInOperation"
                      type="number"
                      value={formData.yearsInOperation}
                      onChange={(e) => handleInputChange('yearsInOperation', e.target.value)}
                      placeholder="Enter years in operation"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employees">Number of Employees *</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={formData.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      placeholder="Enter number of employees"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentRevenue">Current Annual Revenue (KSh)</Label>
                    <Input
                      id="currentRevenue"
                      type="number"
                      value={formData.currentRevenue}
                      onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                      placeholder="Enter annual revenue"
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Funding Proposal</span>
                </CardTitle>
                <CardDescription>
                  Details about the funding request and business plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>
                            {country.charAt(0).toUpperCase() + country.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="valueChain">Value Chain *</Label>
                    <Select value={formData.valueChain} onValueChange={(value) => handleInputChange('valueChain', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select value chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {valueChains.map(chain => (
                          <SelectItem key={chain} value={chain}>
                            {chain.replace('_', ' ').charAt(0).toUpperCase() + chain.replace('_', ' ').slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="loanType">Loan Type *</Label>
                    <Select value={formData.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loanTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requestedAmount">Requested Amount (KSh) *</Label>
                    <Input
                      id="requestedAmount"
                      type="number"
                      value={formData.requestedAmount}
                      onChange={(e) => handleInputChange('requestedAmount', e.target.value)}
                      placeholder="Enter requested amount"
                      min="1000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="collateral">Collateral</Label>
                    <Input
                      id="collateral"
                      value={formData.collateral}
                      onChange={(e) => handleInputChange('collateral', e.target.value)}
                      placeholder="Enter collateral description"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                  <Textarea
                    id="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                    placeholder="Describe the purpose of the loan and how it will be used"
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Document Upload</span>
                </CardTitle>
                <CardDescription>
                  Upload required documents for the funding application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    In production, these would upload to Google Drive or OneDrive.
                  </AlertDescription>
                </Alert>
                
                <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Document upload functionality (connects to cloud storage)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Badge variant="outline">
            Required fields marked with *
          </Badge>
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline"
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}