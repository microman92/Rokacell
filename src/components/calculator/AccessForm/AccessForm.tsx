"use client";
import React, { useState } from "react";
import styles from "./AccessForm.module.scss";
import { useAccessStore } from "@/stores/accessStore";
import { useAccessFormValidation } from "@/hooks/useAccessFormValidation";
import Button from "@/components/ui/Button/Button";
import { Dictionary } from "@/lib/i18n";

interface AccessFormProps {
  dict?: NonNullable<Dictionary["calculator"]>["form"];
}

const AccessForm = ({ dict }: AccessFormProps) => {
  const grantAccess = useAccessStore((state) => state.grantAccess);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
  });

  const { errors, validate, clearError } = useAccessFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData, dict?.errors)) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success:
      grantAccess({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        company: formData.company,
      });
    } catch (error) {
      console.error("Submission failed", error);
      // Handle error (e.g., set general error message)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  return (
    <div className={styles.accessForm}>
      <h2 className={styles.accessForm__title}>{dict?.title}</h2>
      <p className={styles.accessForm__subtitle}>{dict?.subtitle}</p>

      <div className={styles.accessForm__card}>
        <form className={styles.accessForm__form} onSubmit={handleSubmit}>
          <div className={styles.accessForm__field}>
            <input
              type="text"
              name="fullName"
              placeholder={dict?.fields?.fullName}
              className={`${styles.accessForm__input} ${errors.fullName ? styles.error : ""}`}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className={styles.accessForm__error}>{errors.fullName}</span>}
          </div>

          <div className={styles.accessForm__field}>
            <input
              type="tel"
              name="phone"
              placeholder={dict?.fields?.phone}
              className={`${styles.accessForm__input} ${errors.phone ? styles.error : ""}`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className={styles.accessForm__error}>{errors.phone}</span>}
          </div>

          <div className={styles.accessForm__field}>
            <input
              type="email"
              name="email"
              placeholder={dict?.fields?.email}
              className={`${styles.accessForm__input} ${errors.email ? styles.error : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.accessForm__error}>{errors.email}</span>}
          </div>

          <div className={styles.accessForm__field}>
            <input
              type="text"
              name="company"
              placeholder={dict?.fields?.company}
              className={`${styles.accessForm__input} ${errors.company ? styles.error : ""}`}
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && <span className={styles.accessForm__error}>{errors.company}</span>}
          </div>

          <Button type="submit" className={styles.accessForm__submit} disabled={loading}>
            {loading ? <span className={styles.spinner}></span> : dict?.submit}
          </Button>
        </form>
      </div>

      <p className={styles.accessForm__disclaimer}>
        {dict?.disclaimer1}
        <br />
        {dict?.disclaimer2}
      </p>
    </div>
  );
};

export default AccessForm;
