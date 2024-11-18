export type Post = {
  id: string;
  title: string;
  content?: string;
  image?: string;
  timestamp?: string;
  author?: string;
  steps: string[];
  prepTime: {
    prepHours: string;
    isCustomHours: boolean;
    customHours: string;
  };
};

export type Section = {
  id: string;
  title: string;
  posts: Post[];
};

export type ItemPrepTime = {
  prepHours: string;
  isCustomHours: boolean;
  customHours: string;
  isNone?: boolean;
};
