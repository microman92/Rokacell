'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import type { Product } from '@/data/products';
import styles from './Products.module.scss';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Handle body scroll lock and keyboard events
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !product) return null;

  // Use portal to render modal at document body level
  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modal__closeBtn}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modal__content}>
          <div className={styles.modal__imageWrapper}>
            <img
              src={product.image}
              alt={product.name}
              width={205}
              height={194}
              className={styles.modal__image}
            />
          </div>
          <div className={styles.modal__info}>
            <h3 className={styles.modal__title}>{product.name}</h3>
            <p className={styles.modal__description}>{product.fullDescription}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
