export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: {
    prep: string;
    cook: string;
    total: string;
  };
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: string;
  craves: number;
  cuisineType: string;
  description: string;
  ingredients: Array<{
    id: string;
    item: string;
    amount: string;
    calories: string;
    allergy: boolean;
    availability: string;
    availabilityValue: number;
  }>;
  author: {
    profile: {
      name: string;
      title: string;
      avatar?: string;
      bio?: string;
    };
    socialLinks?: {
      youtubeUrl?: string;
      instagramUrl?: string;
      tiktokUrl?: string;
    };
  };
} 