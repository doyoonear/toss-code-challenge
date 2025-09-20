import { useState, useEffect } from 'react';

interface UseModalAnimationResult {
  isAnimating: boolean;
  shouldRender: boolean;
}

export const useModalAnimation = (isOpen: boolean): UseModalAnimationResult => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else if (shouldRender) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  return { isAnimating, shouldRender };
};