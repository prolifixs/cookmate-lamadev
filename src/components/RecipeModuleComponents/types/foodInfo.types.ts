export interface FoodInfoContent {
  id: string;
  title: string;
  cuisineType: string;
  description: string;
  imageUrl: string;
}

export interface FoodInfoState {
  content: FoodInfoContent;
} 