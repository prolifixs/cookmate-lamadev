# DishyPal Project Structure

## Core Layout 
typescript:src/app/layout.tsx
// Main layout with Navbar and content container
typescript:src/app/page.tsx
// Homepage route

## Components

### HomePage
typescript:src/components/HomePage/index.tsx
// Main HomePage component with 3-column layout
// - Left Panel (300px)
// - Main Content (800px)
// - Right Panel (300px)

### Layout Components
- `src/components/HomePage/Layout/`
  - LeftMenu.tsx (Meal planning sidebar)
  - RightMenu.tsx (Post feed sidebar)
  - KitchenPanel.tsx (Kitchen status carousel)
  - MealPlan.tsx
  - MealPlanList.tsx
  - Recommendation.tsx

### Feed Components
- `src/components/HomePage/Feed/`
  - RecentCooks.tsx
  - PostFeed.tsx
  - Post.tsx
  - Comments.tsx

### Shared Components
- `src/components/`
  - Navbar.tsx
  - MobileMenu.tsx

## Styles
```css:src/app/globals.css
// Global styles and utilities
```

## Current Layout Specifications
- Max width: 2000px
- Left/Right panels: 300px each
- Main content: 800px
- Spacing: gap-8 between columns
- Top padding: pt-8 from navbar

## Dependencies
- Next.js
- Tailwind CSS
- Clerk Authentication

## File Tree
```
dishypal/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── HomePage/
│   │   │   ├── index.tsx
│   │   │   ├── Feed/
│   │   │   │   ├── Comments.tsx
│   │   │   │   ├── Post.tsx
│   │   │   │   ├── PostFeed.tsx
│   │   │   │   └── RecentCooks.tsx
│   │   │   └── Layout/
│   │   │       ├── KitchenPanel.tsx
│   │   │       ├── LeftMenu.tsx
│   │   │       ├── MealPlan.tsx
│   │   │       ├── MealPlanList.tsx
│   │   │       ├── Recommendation.tsx
│   │   │       └── RightMenu.tsx
│   │   ├── Navbar.tsx
│   │   └── MobileMenu.tsx
│   └── styles/
└── public/
    └── images/
```




Benefits of maintaining this file:
1. You can share it with me in future conversations
2. It serves as documentation for your project
3. Helps track component relationships
4. Documents layout decisions and measurements
5. Lists all major dependencies

To keep it updated:
1. Add new components as you create them
2. Update layout changes
3. Document new features or dependencies
4. Note any major refactoring

I'll keep track of your current project structure. I've saved both the detailed documentation and the file tree.
When you make changes or add new files, just let me know and I can help you:
1. Update the file tree
2. Document new components
3. Track layout changes
4. Add new dependencies
5. Maintain component relationships

The current structure shows:
- A HomePage component with 3-column layout (300px - 800px - 300px)
- Feed and Layout components organized in separate folders
- Shared components like Navbar and MobileMenu
- Core app files in the src/app directory
- Current styling using Tailwind CSS
- Authentication handled by Clerk
