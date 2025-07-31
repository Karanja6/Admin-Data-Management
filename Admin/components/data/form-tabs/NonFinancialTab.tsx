import React from 'react';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { FormData } from '../types';
import { 
  MENTORSHIP_NEEDS, 
  TRAINING_NEEDS, 
  NETWORKING_NEEDS, 
  MARKETING_SUPPORT, 
  TECHNICAL_ASSISTANCE 
} from '../constants';

interface NonFinancialTabProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export function NonFinancialTab({ formData, onInputChange }: NonFinancialTabProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Label className="text-base font-medium">Mentorship Needs</Label>
        <p className="text-sm text-muted-foreground mb-3">What areas would you like mentorship in?</p>
        <div className="grid grid-cols-2 gap-3">
          {MENTORSHIP_NEEDS.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox id={`mentorship-${need}`} />
              <Label htmlFor={`mentorship-${need}`} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Training Needs</Label>
        <p className="text-sm text-muted-foreground mb-3">What skills would you like to develop?</p>
        <div className="grid grid-cols-2 gap-3">
          {TRAINING_NEEDS.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox id={`training-${need}`} />
              <Label htmlFor={`training-${need}`} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Networking Needs</Label>
        <p className="text-sm text-muted-foreground mb-3">What networking opportunities interest you?</p>
        <div className="grid grid-cols-2 gap-3">
          {NETWORKING_NEEDS.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox id={`networking-${need}`} />
              <Label htmlFor={`networking-${need}`} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Marketing Support</Label>
        <p className="text-sm text-muted-foreground mb-3">What marketing support do you need?</p>
        <div className="grid grid-cols-2 gap-3">
          {MARKETING_SUPPORT.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox id={`marketing-${need}`} />
              <Label htmlFor={`marketing-${need}`} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">Technical Assistance</Label>
        <p className="text-sm text-muted-foreground mb-3">What technical support do you require?</p>
        <div className="grid grid-cols-2 gap-3">
          {TECHNICAL_ASSISTANCE.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox id={`technical-${need}`} />
              <Label htmlFor={`technical-${need}`} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}