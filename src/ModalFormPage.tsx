import React, { useRef } from 'react';
import { useModal } from './components/ModalService';

const ModalFormPage = () => {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const { openFormModal } = useModal();

  const handleOpenModal = async () => {
    const result = await openFormModal();
    
    if (result) {
      console.log('제출된 데이터:', result);
      alert(`신청이 완료되었습니다!\n이름: ${result.name}\n이메일: ${result.email}\n경력: ${result.experience}${result.githubLink ? `\nGitHub: ${result.githubLink}` : ''}`);
    } else {
      console.log('모달이 취소되었습니다.');
    }
    
    setTimeout(() => {
      openButtonRef.current?.focus();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* 메인 콘텐츠 */}
      <div className="h-96 bg-yellow-200 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-900 mb-8">
            토스 FE Code Challenge
          </h1>
          <p className="text-lg text-yellow-800 mb-8">
            접근성 친화적인 모달 폼 구현
          </p>
          
          <button
            ref={openButtonRef}
            onClick={handleOpenModal}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            신청 폼 작성하기
          </button>
        </div>
      </div>
      
      {/* 스크롤 테스트용 색깔 블럭들 */}
      <div className="h-96 bg-red-200 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-800">Red Block 1</h2>
      </div>
      <div className="h-96 bg-blue-200 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-800">Blue Block 2</h2>
      </div>
      <div className="h-96 bg-green-200 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-green-800">Green Block 3</h2>
      </div>

    </div>
  );
};

export default ModalFormPage;
