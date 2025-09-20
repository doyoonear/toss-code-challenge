import React, { useRef, PropsWithChildren, MouseEventHandler } from 'react';
import { getFirstAndLastFocusableElements, shouldWrapToFirst, shouldWrapToLast } from '../utils/focusUtils';

interface FocusTrapProps {
  isActive?: boolean;
  className?: string;
  role?: string;
  onClick?: MouseEventHandler<HTMLDivElement> ;
}

const FocusTrap = ({ 
  children, 
  isActive = true,
  className = '',
  ...props 
}: PropsWithChildren<FocusTrapProps>) => {
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
      {...props}
    >
      {children}
    </div>
  );
};

export default FocusTrap;