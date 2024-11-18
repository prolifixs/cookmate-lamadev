'use client'

import { useAuthorContext } from '../../../context/AuthorContext';
import { SocialLinksComponent } from './SocialLinks';
import { AuthorProfileComponent } from './AuthorProfile';
import { AuthorContent } from '@/components/RecipeModuleComponents/types/author.types';

interface AuthorSectionProps {
  authorContent: AuthorContent;
}

export default function AuthorSection({ authorContent }: AuthorSectionProps) {
  const { isOpen, content, toggleOpen } = useAuthorContext();

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <div onClick={toggleOpen} className="w-full flex justify-between items-center">
        <h2 className="text-lg">From the Author</h2>
        <div className="flex items-center gap-3">
          <SocialLinksComponent links={content} />
          <span className="text-lg">{isOpen ? '^' : '+'}</span>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <AuthorProfileComponent profile={content.profile} />
          {content.text && (
            <p className="text-gray-700">{content.text}</p>
          )}
        </div>
      )}
    </section>
  );
}
