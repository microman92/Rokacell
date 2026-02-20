import { useState } from "react";

export interface AccessFormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
}

interface ValidationResult {
  errors: Record<string, string>;
  validate: (
    data: AccessFormData,
    dict?: {
      fullName?: string;
      phone?: string;
      emailReq?: string;
      emailInv?: string;
      company?: string;
    }
  ) => boolean;
  clearError: (fieldName: string) => void;
}

export const useAccessFormValidation = (): ValidationResult => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (
    formData: AccessFormData,
    dict?: {
      fullName?: string;
      phone?: string;
      emailReq?: string;
      emailInv?: string;
      company?: string;
    }
  ): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = dict?.fullName || "Full Name is required";

    if (!formData.phone.trim()) newErrors.phone = dict?.phone || "Phone is required";

    if (!formData.email.trim()) {
      newErrors.email = dict?.emailReq || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = dict?.emailInv || "Invalid email format";
    }

    if (!formData.company.trim()) newErrors.company = dict?.company || "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (fieldName: string) => {
    setErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return { errors, validate, clearError };
};
