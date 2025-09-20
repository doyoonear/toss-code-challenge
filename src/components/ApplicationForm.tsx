import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  experience: string;
  githubLink: string;
}

interface ApplicationFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    experience: '',
    githubLink: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showValidationError, setShowValidationError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.name.trim()) {
      newErrors.push('이름/닉네임');
    }
    if (!formData.email.trim()) {
      newErrors.push('이메일');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('올바른 이메일 형식');
    }
    if (!formData.experience) {
      newErrors.push('FE 경력 연차');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      setShowValidationError(true);
      const errorElement = document.getElementById('validation-error');
      if (errorElement) {
        errorElement.focus();
        errorElement.setAttribute('aria-live', 'polite');
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (showValidationError) {
      setShowValidationError(false);
      setErrors([]);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.experience;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          이름 / 닉네임 <span className="text-red-500" aria-label="필수 입력">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-required="true"
          aria-describedby={errors.some(error => error.includes('이름')) ? 'name-error' : undefined}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          이메일 <span className="text-red-500" aria-label="필수 입력">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-required="true"
          aria-describedby={errors.some(error => error.includes('이메일')) ? 'email-error' : undefined}
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          FE 경력 연차 <span className="text-red-500" aria-label="필수 입력">*</span>
        </label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-required="true"
          aria-describedby={errors.some(error => error.includes('경력')) ? 'experience-error' : undefined}
        >
          <option value="">선택해주세요</option>
          <option value="0-3">0-3년</option>
          <option value="4-7">4-7년</option>
          <option value="8+">8년 이상</option>
        </select>
      </div>

      <div>
        <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-2">
          GitHub 링크 (선택)
        </label>
        <input
          type="url"
          id="githubLink"
          value={formData.githubLink}
          onChange={(e) => handleInputChange('githubLink', e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {showValidationError && errors.length > 0 && (
        <div 
          id="validation-error"
          className="p-3 bg-red-50 border border-red-200 rounded-md mt-4"
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
        >
          <p className="text-sm text-red-700 font-medium">
            {errors.join(', ')} 항목을 입력해주세요.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          취소
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;