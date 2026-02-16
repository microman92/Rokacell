import { useState } from 'react';

export interface AccessFormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
}

interface ValidationResult {
  errors: Record<string, string>;
  validate: (data: AccessFormData) => boolean;
  clearError: (fieldName: string) => void;
}

export const useAccessFormValidation = (): ValidationResult => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: AccessFormData): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.company.trim()) newErrors.company = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      if (!prev[fieldName]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return { errors, validate, clearError };
};
