import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  User as UserIcon, 
  Building, 
  MapPin, 
  Mail, 
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Shield
} from 'lucide-react';
import { User, UserRole, Application } from '../../types';

interface EntrepreneurProfileProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export function EntrepreneurProfile({ user, onUserUpdate }: EntrepreneurProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUserUpdate(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const updateBusinessInfo = (field: string, value: string | number) => {
    setEditedUser(prev => ({
      ...prev,
      businessInfo: { ...prev.businessInfo, [field]: value }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and business information
          </p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className="mt-2" variant="secondary">
                  <UserIcon className="w-3 h-3 mr-1" />
                  Entrepreneur
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Joined {new Date(user.dateJoined || '').toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{user.location || 'Location not set'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedUser.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center space-x-2 py-2">
                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center space-x-2 py-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedUser.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="flex items-center space-x-2 py-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={editedUser.location || ''}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Enter your location"
                  />
                ) : (
                  <div className="flex items-center space-x-2 py-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.location || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                {isEditing ? (
                  <Input
                    id="businessName"
                    value={editedUser.businessInfo?.businessName || ''}
                    onChange={(e) => updateBusinessInfo('businessName', e.target.value)}
                    placeholder="Enter business name"
                  />
                ) : (
                  <div className="py-2">
                    <span className="font-medium">{user.businessInfo?.businessName || 'Not provided'}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="valueChain">Value Chain / Sector</Label>
                {isEditing ? (
                  <Select 
                    value={editedUser.businessInfo?.valueChain || ''} 
                    onValueChange={(value) => updateBusinessInfo('valueChain', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Visual Arts">Visual Arts</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="AudioVisual">AudioVisual</SelectItem>
                      <SelectItem value="Performing Arts">Performing Arts</SelectItem>
                      <SelectItem value="Crafts">Crafts</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="py-2">
                    <Badge variant="outline">{user.businessInfo?.valueChain || 'Not selected'}</Badge>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                {isEditing ? (
                  <Input
                    id="registrationNumber"
                    value={editedUser.businessInfo?.registrationNumber || ''}
                    onChange={(e) => updateBusinessInfo('registrationNumber', e.target.value)}
                    placeholder="Business registration number"
                  />
                ) : (
                  <div className="py-2">
                    <span>{user.businessInfo?.registrationNumber || 'Not provided'}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                {isEditing ? (
                  <Input
                    id="employees"
                    type="number"
                    value={editedUser.businessInfo?.employees || ''}
                    onChange={(e) => updateBusinessInfo('employees', parseInt(e.target.value) || 0)}
                    placeholder="Number of employees"
                  />
                ) : (
                  <div className="py-2">
                    <span>{user.businessInfo?.employees || 0} employees</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="currentRevenue">Monthly Revenue ($)</Label>
                {isEditing ? (
                  <Input
                    id="currentRevenue"
                    type="number"
                    value={editedUser.businessInfo?.currentRevenue || ''}
                    onChange={(e) => updateBusinessInfo('currentRevenue', parseInt(e.target.value) || 0)}
                    placeholder="Monthly revenue"
                  />
                ) : (
                  <div className="py-2">
                    <span>${user.businessInfo?.currentRevenue?.toLocaleString() || 'Not provided'}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="establishedYear">Year Established</Label>
                {isEditing ? (
                  <Input
                    id="establishedYear"
                    type="number"
                    value={editedUser.businessInfo?.establishedYear || ''}
                    onChange={(e) => updateBusinessInfo('establishedYear', parseInt(e.target.value) || 0)}
                    placeholder="Year established"
                  />
                ) : (
                  <div className="py-2">
                    <span>{user.businessInfo?.establishedYear || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Application ID</Label>
                <p className="font-medium">{user.applicationStatus?.applicationId || 'No active application'}</p>
              </div>
              <div>
                <Label>Current Stage</Label>
                <Badge variant="outline" className="mt-1">
                  {user.applicationStatus?.currentStage || 'Not Started'}
                </Badge>
              </div>
              <div>
                <Label>Last Update</Label>
                <p className="text-sm text-muted-foreground">
                  {user.applicationStatus?.lastUpdate 
                    ? new Date(user.applicationStatus.lastUpdate).toLocaleDateString()
                    : 'No updates'
                  }
                </p>
              </div>
              <div>
                <Label>Application Status</Label>
                <p className="text-sm text-muted-foreground">
                  {user.applicationStatus?.hasActiveApplication ? 'Active' : 'No active application'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Consent */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy & Consent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Data Processing</Label>
                <Badge variant={user.consentInfo?.dataProcessingConsent ? 'default' : 'secondary'}>
                  {user.consentInfo?.dataProcessingConsent ? 'Granted' : 'Not Granted'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Marketing Communications</Label>
                <Badge variant={user.consentInfo?.marketingConsent ? 'default' : 'secondary'}>
                  {user.consentInfo?.marketingConsent ? 'Granted' : 'Not Granted'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Consent granted: {user.consentInfo?.consentDate ? new Date(user.consentInfo.consentDate).toLocaleDateString() : 'Not available'}</p>
                <p>Version: {user.consentInfo?.consentVersion || 'N/A'}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Manage Privacy Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}