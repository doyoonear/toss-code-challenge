import React, { createContext, useContext, useState, ReactElement } from 'react';
import Modal from './Modal';
import ApplicationForm from './ApplicationForm';

interface FormData {
  name: string;
  email: string;
  experience: string;
  githubLink: string;
}

interface ModalState {
  isOpen: boolean;
  resolve?: (value: FormData | null) => void;
}

interface ModalContextType {
  openFormModal: () => Promise<FormData | null>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

  const openFormModal = (): Promise<FormData | null> => {
    return new Promise((resolve) => {
      setModalState({ isOpen: true, resolve });
    });
  };

  const handleFormSubmit = (data: FormData) => {
    modalState.resolve?.(data);
    setModalState({ isOpen: false });
  };

  const handleModalClose = () => {
    modalState.resolve?.(null);
    setModalState({ isOpen: false });
  };

  return (
    <ModalContext.Provider value={{ openFormModal }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        title="신청 폼"
        description="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요."
      >
        <ApplicationForm
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};