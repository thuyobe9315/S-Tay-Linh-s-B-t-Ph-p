import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'huyen_dao_teacher_custom_image';
const FIT_KEY = 'huyen_dao_teacher_custom_fit';

interface TeacherImageContextType {
  customImageUrl: string | null;
  imageFit: 'cover' | 'contain';
  setCustomImage: (url: string, fit?: 'cover' | 'contain') => void;
  setImageFit: (fit: 'cover' | 'contain') => void;
  resetCustomImage: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const TeacherImageContext = createContext<TeacherImageContextType | undefined>(undefined);

export const TeacherImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [imageFit, setImageFitState] = useState<'cover' | 'contain'>(() => {
    try {
      return (localStorage.getItem(FIT_KEY) as 'cover' | 'contain') || 'cover';
    } catch {
      return 'cover';
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setCustomImage = (url: string, fit: 'cover' | 'contain' = 'cover') => {
    setCustomImageUrl(url);
    setImageFitState(fit);
    try {
      localStorage.setItem(STORAGE_KEY, url);
      localStorage.setItem(FIT_KEY, fit);
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const setImageFit = (fit: 'cover' | 'contain') => {
    setImageFitState(fit);
    try {
      localStorage.setItem(FIT_KEY, fit);
    } catch (e) {
      console.warn('Could not save fit mode', e);
    }
  };

  const resetCustomImage = () => {
    setCustomImageUrl(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(FIT_KEY);
    } catch (e) {
      console.warn('Could not remove from localStorage', e);
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <TeacherImageContext.Provider
      value={{
        customImageUrl,
        imageFit,
        setCustomImage,
        setImageFit,
        resetCustomImage,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
      }}
    >
      {children}
    </TeacherImageContext.Provider>
  );
};

export const useTeacherImage = () => {
  const context = useContext(TeacherImageContext);
  if (!context) {
    throw new Error('useTeacherImage must be used within a TeacherImageProvider');
  }
  return context;
};
