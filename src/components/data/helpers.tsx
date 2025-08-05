import { FormData } from './types';

export const calculateProgress = (formData: FormData): number => {
  const requiredFields = [
    'applicantName', 'applicantEmail', 'applicantPhone', 'gender', 'age',
    'businessName', 'businessType', 'country', 'valueChain', 'loanType',
    'proposalTitle', 'fundsNeeded', 'objective'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field as keyof FormData]).length;
  return (completedFields / requiredFields.length) * 100;
};

export const handleInputChange = (
  formData: FormData, 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>, 
  field: keyof FormData, 
  value: string
) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};