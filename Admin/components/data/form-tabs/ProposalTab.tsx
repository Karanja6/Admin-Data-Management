import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { FormData } from '../types';
import { COUNTRIES, VALUE_CHAINS, LOAN_TYPES } from '../constants';

interface ProposalTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function ProposalTab({ formData, onInputChange }: ProposalTabProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="country">Country *</Label>
          <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="valueChain">Sector/Value Chain *</Label>
          <Select value={formData.valueChain} onValueChange={(value) => onInputChange('valueChain', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {VALUE_CHAINS.map(chain => (
                <SelectItem key={chain} value={chain}>{chain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="loanType">Loan Type *</Label>
          <Select value={formData.loanType} onValueChange={(value) => onInputChange('loanType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              {LOAN_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="proposalTitle">Proposal Title *</Label>
          <Input
            id="proposalTitle"
            value={formData.proposalTitle}
            onChange={(e) => onInputChange('proposalTitle', e.target.value)}
            placeholder="Brief title describing your proposal"
          />
        </div>
        <div>
          <Label htmlFor="fundsNeeded">Funds Needed (USD) *</Label>
          <Input
            id="fundsNeeded"
            type="number"
            value={formData.fundsNeeded}
            onChange={(e) => onInputChange('fundsNeeded', e.target.value)}
            placeholder="Amount of funding required"
          />
        </div>
        <div>
          <Label htmlFor="objective">Objective *</Label>
          <Textarea
            id="objective"
            value={formData.objective}
            onChange={(e) => onInputChange('objective', e.target.value)}
            placeholder="What do you aim to achieve with this funding?"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="justification">Justification *</Label>
          <Textarea
            id="justification"
            value={formData.justification}
            onChange={(e) => onInputChange('justification', e.target.value)}
            placeholder="Why do you need this funding? How will it help your business?"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="loanPurpose">Loan Purpose</Label>
          <Textarea
            id="loanPurpose"
            value={formData.loanPurpose}
            onChange={(e) => onInputChange('loanPurpose', e.target.value)}
            placeholder="Detailed description of how the loan will be used"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="marketAnalysis">Market Analysis</Label>
          <Textarea
            id="marketAnalysis"
            value={formData.marketAnalysis}
            onChange={(e) => onInputChange('marketAnalysis', e.target.value)}
            placeholder="Describe your target market and competitive landscape"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="financialProjections">Financial Projections</Label>
          <Textarea
            id="financialProjections"
            value={formData.financialProjections}
            onChange={(e) => onInputChange('financialProjections', e.target.value)}
            placeholder="Expected revenue and growth projections"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}