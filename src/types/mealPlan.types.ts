export interface MealTime {
  morning: string | null;
  afternoon: string | null;
  evening: string | null;
}

export interface DayPlan {
  date: string;
  dayOfWeek: string;
  meals: MealTime;
}

export interface WeekPlan {
  weekNumber: number;
  days: DayPlan[];
}

export interface MonthlyMealPlan {
  userId: string;
  month: number;
  year: number;
  weeks: WeekPlan[];
} 