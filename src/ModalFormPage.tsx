import React, { useState, useRef } from 'react';
import Modal from './components/Modal';
import ApplicationForm from './components/ApplicationForm';

interface FormData {
  name: string;
  email: string;
  experience: string;
  githubLink: string;
}

const ModalFormPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit = (data: FormData) => {
    console.log('제출된 데이터:', data);
    alert(`신청이 완료되었습니다!\n이름: ${data.name}\n이메일: ${data.email}\n경력: ${data.experience}${data.githubLink ? `\nGitHub: ${data.githubLink}` : ''}`);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      openButtonRef.current?.focus();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          토스 FE Code Challenge
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          접근성 친화적인 모달 폼 구현
        </p>
        
        <button
          ref={openButtonRef}
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          신청 폼 작성하기
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="신청 폼"
        description="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요."
      >
        <ApplicationForm
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default ModalFormPage;
