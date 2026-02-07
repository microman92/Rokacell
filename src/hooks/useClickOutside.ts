'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook для обработки клика вне элемента
 * Полезен для закрытия дропдаунов, модальных окон и т.д.
 * 
 * @param handler - функция, вызываемая при клике вне элемента
 * @returns ref для привязки к элементу
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler]);

  return ref;
}
