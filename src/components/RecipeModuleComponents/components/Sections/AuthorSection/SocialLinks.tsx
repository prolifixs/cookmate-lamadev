import { SocialLinks } from '../../../types/author.types';

interface SocialLinksProps {
  links: SocialLinks & { text?: string };
}

export const SocialLinksComponent = ({ links }: SocialLinksProps) => {
  return (
    <div className="flex items-center gap-3">
      {links.text && (
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <span className="sr-only">Text</span>
          📝
        </button>
      )}
      {links.youtubeUrl && (
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <span className="sr-only">YouTube</span>
          📺
        </button>
      )}
      {links.instagramUrl && (
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <span className="sr-only">Instagram</span>
          📸
        </button>
      )}
      {links.tiktokUrl && (
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <span className="sr-only">TikTok</span>
          🎵
        </button>
      )}
    </div>
  );
};
