import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { FormData } from '../types';
import { BUSINESS_TYPES, REVENUE_FREQUENCIES } from '../constants';

interface BusinessInfoTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function BusinessInfoTab({ formData, onInputChange }: BusinessInfoTabProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => onInputChange('businessName', e.target.value)}
            placeholder="Enter business name"
          />
        </div>
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => onInputChange('businessType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => onInputChange('registrationNumber', e.target.value)}
            placeholder="Business registration number"
          />
        </div>
        <div>
          <Label htmlFor="yearsInOperation">Years in Operation</Label>
          <Input
            id="yearsInOperation"
            type="number"
            value={formData.yearsInOperation}
            onChange={(e) => onInputChange('yearsInOperation', e.target.value)}
            placeholder="Years business has been operating"
          />
        </div>
        <div>
          <Label htmlFor="employees">Total Employees</Label>
          <Input
            id="employees"
            type="number"
            value={formData.employees}
            onChange={(e) => onInputChange('employees', e.target.value)}
            placeholder="Total number of employees"
          />
        </div>
        <div>
          <Label htmlFor="maleEmployees">Male Employees</Label>
          <Input
            id="maleEmployees"
            type="number"
            value={formData.maleEmployees}
            onChange={(e) => onInputChange('maleEmployees', e.target.value)}
            placeholder="Number of male employees"
          />
        </div>
        <div>
          <Label htmlFor="femaleEmployees">Female Employees</Label>
          <Input
            id="femaleEmployees"
            type="number"
            value={formData.femaleEmployees}
            onChange={(e) => onInputChange('femaleEmployees', e.target.value)}
            placeholder="Number of female employees"
          />
        </div>
        <div>
          <Label htmlFor="currentRevenue">Current Revenue</Label>
          <Input
            id="currentRevenue"
            type="number"
            value={formData.currentRevenue}
            onChange={(e) => onInputChange('currentRevenue', e.target.value)}
            placeholder="Current revenue amount"
          />
        </div>
        <div>
          <Label htmlFor="revenueFrequency">Revenue Frequency</Label>
          <Select value={formData.revenueFrequency} onValueChange={(value) => onInputChange('revenueFrequency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {REVENUE_FREQUENCIES.map(freq => (
                <SelectItem key={freq.value} value={freq.value}>{freq.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}