// Define core data types for the meal requirement tasks system

// Represents a single task/post with all its properties
export type Post = {
  id: string;                 // Unique identifier for the post
  title: string;             // Title of the task
  content?: string;          // Optional description (will be derived from first step)
  image?: string;            // Optional image URL
  timestamp?: string;        // Creation/modification date
  author?: string;           // Task author
  steps: string[];           // Array of step-by-step instructions
  prepTime: {                // Preparation time configuration
    prepHours: string;       // Number of hours needed
    isCustomHours: boolean;  // Whether using custom hours
    customHours: string;     // Custom hour value if applicable
  };
};

// Represents a group of related posts (e.g., 'mise en place' or 'tasks')
export type Section = {
  id: string;       // Section identifier
  title: string;    // Section title
  posts: Post[];    // Array of posts in this section
};

// Tracks the prep time state for each item
export type ItemPrepTime = {
  prepHours: string;       // Standard prep hours
  isCustomHours: boolean;  // Flag for custom hours
  customHours: string;     // Custom hours value
  isNone?: boolean;        // Optional flag to indicate no prep time set
};

export * from './recipeFeatures';
