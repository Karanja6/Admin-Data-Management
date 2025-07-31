import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Camera, 
  FileText, 
  MapPin,
  Globe
} from 'lucide-react';

interface ProfileSectionProps {
  isOverview?: boolean;
}

export function ProfileSection({ isOverview = false }: ProfileSectionProps) {
  const [formData, setFormData] = useState({
    name: 'Sarah Wanjiku',
    age: '28',
    gender: 'Female',
    phone: '+254 712 345 678',
    businessName: 'Eco Crafts Kenya',
    businessType: 'Manufacturing',
    website: 'www.ecocraftskenya.com',
    location: 'Nairobi, Kenya'
  });

  const [verificationStatus, setVerificationStatus] = useState({
    nationalId: 'verified',
    businessDocs: 'pending',
    location: 'verified',
    businessPhoto: 'missing'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'missing':
        return <Badge variant="destructive">Required</Badge>;
      default:
        return null;
    }
  };

  const completionPercentage = Object.values(verificationStatus).filter(status => status === 'verified').length / Object.values(verificationStatus).length * 100;

  if (isOverview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Profile Verification
            <span className="text-sm text-muted-foreground">{Math.round(completionPercentage)}% Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="mb-4" />
          <div className="space-y-2">
            {Object.entries(verificationStatus).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                {getStatusIcon(status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Profile & Verification</h1>
        <p className="text-muted-foreground">Complete your profile to access funding opportunities</p>
      </div>

      {/* Verification Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>
            Complete all sections to get verified and access funding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Overall Progress</span>
            <span className="font-medium">{Math.round(completionPercentage)}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>National ID</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(verificationStatus.nationalId)}
                {getStatusBadge(verificationStatus.nationalId)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>Business Documents</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(verificationStatus.businessDocs)}
                {getStatusBadge(verificationStatus.businessDocs)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Location Verification</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(verificationStatus.location)}
                {getStatusBadge(verificationStatus.location)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span>Business Photo</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(verificationStatus.businessPhoto)}
                {getStatusBadge(verificationStatus.businessPhoto)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website/Social Media</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Upload required documents for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">National ID</p>
              <p className="text-xs text-muted-foreground mb-3">Upload clear photo of both sides</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Business Documents</p>
              <p className="text-xs text-muted-foreground mb-3">Business registration certificate</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Business Photo</p>
              <p className="text-xs text-muted-foreground mb-3">Photo of your business/workspace</p>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium mb-1">Location Pin</p>
              <p className="text-xs text-muted-foreground mb-3">Pin your business location</p>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Set Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-secondary">
          Save Profile
        </Button>
      </div>
    </div>
  );
}