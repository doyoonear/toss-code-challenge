import React, { useEffect, useRef } from 'react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useModalAnimation } from '../hooks/useModalAnimation';
import FocusTrap from './FocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { isAnimating, shouldRender } = useModalAnimation(isOpen);
  useBodyScrollLock(shouldRender);
  useEscapeKey(isOpen, onClose);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      const focusTimer = setTimeout(() => {
        titleRef.current?.focus();
      }, 100);

      return () => clearTimeout(focusTimer);
    }
  }, [isOpen, titleRef]);
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 ${isAnimating ? 'modal-enter' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
      onClick={handleBackdropClick}
    >
      <FocusTrap 
        isActive={isOpen}
        className={`modal-content relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto ${isAnimating ? 'modal-enter' : ''}`}
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 
                id="modal-title" 
                ref={titleRef}
                tabIndex={-1}
                className="text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="mt-1 text-sm text-gray-600">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="모달 닫기"
              aria-describedby="close-button-description"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4" role="main" aria-label="폼 내용">
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};

export default Modal;