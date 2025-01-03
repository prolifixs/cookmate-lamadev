export interface SocialLinks {
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
}

export interface AuthorContent extends SocialLinks {
  text?: string;
  profile: AuthorProfile;
}

export interface AuthorState {
  isOpen: boolean;
  content: AuthorContent;
}

export interface Author {
  id: string;
  name: string;
  title: string | null;
  image: string | null;
  bio: string | null;
  socialLinks?: SocialLinks;
}
