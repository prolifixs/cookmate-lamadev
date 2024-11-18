import { Post } from '../types';

// Extracts the first step to use as content preview
export const getPostContent = (post: Post): string => {
  return post.steps[0] || '';
};

// Calculates the countdown time based on meal type and prep time
export const getCountdown = (
  prepTime: any, 
  selectedDate: string, 
  mealType: 'breakfast' | 'lunch' | 'dinner'
) => {
  // Return early if required data is missing
  if (!selectedDate || !prepTime) return '';
  
  // Define standard meal times
  const mealTimes = {
    breakfast: '08:00',
    lunch: '12:00',
    dinner: '18:00'
  } as const;

  // Calculate the actual meal datetime
  const mealDateTime = new Date(`${selectedDate}T${mealTimes[mealType]}`);
  
  // Get prep hours (either custom or standard)
  const hours = prepTime.isCustomHours 
    ? Number(prepTime.customHours) 
    : Number(prepTime.prepHours);
  
  // Calculate when prep needs to start
  const prepDateTime = new Date(mealDateTime.getTime() - (hours * 60 * 60 * 1000));
  const now = new Date();
  
  // Calculate hours difference
  const diffInHours = Math.floor((prepDateTime.getTime() - now.getTime()) / (1000 * 60 * 60));
  
  // Return appropriate message based on time difference
  if (diffInHours < 0) return 'Past due';
  if (diffInHours === 0) return 'Less than an hour';
  return `${diffInHours} hours to prep`;
};
