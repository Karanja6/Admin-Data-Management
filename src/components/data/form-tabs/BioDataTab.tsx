import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { FormData } from '../types';
import { COUNTRIES, EDUCATION_LEVELS } from '../constants';

interface BioDataTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function BioDataTab({ formData, onInputChange }: BioDataTabProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="applicantName">Full Name *</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => onInputChange('applicantName', e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <Label htmlFor="applicantEmail">Email Address *</Label>
          <Input
            id="applicantEmail"
            type="email"
            value={formData.applicantEmail}
            onChange={(e) => onInputChange('applicantEmail', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <div>
          <Label htmlFor="applicantPhone">Phone Number *</Label>
          <Input
            id="applicantPhone"
            value={formData.applicantPhone}
            onChange={(e) => onInputChange('applicantPhone', e.target.value)}
            placeholder="+254 7XX XXX XXX"
          />
        </div>
        <div>
          <Label>Gender *</Label>
          <RadioGroup 
            value={formData.gender} 
            onValueChange={(value) => onInputChange('gender', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
              <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange('age', e.target.value)}
            placeholder="Enter age"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select value={formData.nationality} onValueChange={(value) => onInputChange('nationality', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(country => (
                <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="idNumber">ID/Passport Number</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => onInputChange('idNumber', e.target.value)}
            placeholder="Enter ID or passport number"
          />
        </div>
        <div>
          <Label htmlFor="education">Education Level</Label>
          <Select value={formData.education} onValueChange={(value) => onInputChange('education', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVELS.map(level => (
                <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={(e) => onInputChange('experience', e.target.value)}
            placeholder="Years in creative industry"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address">Physical Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Enter physical address"
          rows={3}
        />
      </div>
    </div>
  );
}