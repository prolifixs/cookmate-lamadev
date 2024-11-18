import { useState } from 'react';
import { AuthorContent, AuthorState } from '../types/author.types';
import { sampleAuthorData } from '../data/sampleAuthorData';

export const useAuthor = (initialContent: AuthorContent = sampleAuthorData) => {
  const [state, setState] = useState<AuthorState>({
    isOpen: false,
    content: initialContent
  });

  const toggleOpen = () => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen
    }));
  };

  const updateContent = (newContent: Partial<AuthorContent>) => {
    setState(prev => ({
      ...prev,
      content: {
        ...prev.content,
        ...newContent
      }
    }));
  };

  return {
    ...state,
    toggleOpen,
    updateContent
  };
};
