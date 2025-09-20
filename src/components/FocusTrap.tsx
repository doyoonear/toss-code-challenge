import React, { useRef, ReactNode } from 'react';
import { getFirstAndLastFocusableElements, shouldWrapToFirst, shouldWrapToLast } from '../utils/focusUtils';

interface FocusTrapProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

const FocusTrap: React.FC<FocusTrapProps> = ({ 
  children, 
  isActive = true, 
  className = "",
  ...props 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive || e.key !== 'Tab' || !containerRef.current) return;

    const { firstElement, lastElement } = getFirstAndLastFocusableElements(containerRef.current);
    
    if (!firstElement || !lastElement) return;

    const isShiftPressed = e.shiftKey;
    const currentActiveElement = document.activeElement;

    if (isShiftPressed && shouldWrapToLast(currentActiveElement, firstElement)) {
      e.preventDefault();
      lastElement.focus();
    } else if (!isShiftPressed && shouldWrapToFirst(currentActiveElement, lastElement)) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default FocusTrap;