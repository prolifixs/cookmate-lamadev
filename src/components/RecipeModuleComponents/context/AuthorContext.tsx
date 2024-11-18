import { createContext, useContext, ReactNode } from 'react';
import { AuthorContent } from '../types/author.types';
import { useAuthor } from '../hooks/useAuthor';

interface AuthorContextValue {
  isOpen: boolean;
  content: AuthorContent;
  toggleOpen: () => void;
  updateContent: (newContent: Partial<AuthorContent>) => void;
}

const AuthorContext = createContext<AuthorContextValue | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: ReactNode }) => {
  const authorState = useAuthor();

  return (
    <AuthorContext.Provider value={authorState}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthorContext = () => {
  const context = useContext(AuthorContext);
  if (context === undefined) {
    throw new Error('useAuthorContext must be used within an AuthorProvider');
  }
  return context;
};
