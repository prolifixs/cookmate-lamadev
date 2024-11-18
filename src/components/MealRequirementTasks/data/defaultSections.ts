import { Section } from '../types';

export const sections: { [key: string]: Section } = {
  mise: {
    id: 'mise',
    title: 'Mise en place',
    posts: [
      {
        id: 'mise-1',
        title: 'Prep Ingredients',
        image: '/images/prep.jpg',
        steps: [
          'Chop all vegetables',
          'Measure out spices',
          'Prepare marinades'
        ],
        prepTime: {
          prepHours: '1',
          isCustomHours: false,
          customHours: ''
        }
      },
      // Add more mise en place posts as needed
    ]
  },
  tasks: {
    id: 'tasks',
    title: 'Tasks',
    posts: [
      {
        id: 'task-1',
        title: 'Main Cooking Steps',
        image: '/images/cooking.jpg',
        steps: [
          'Preheat oven',
          'Cook base ingredients',
          'Combine and finish'
        ],
        prepTime: {
          prepHours: '2',
          isCustomHours: false,
          customHours: ''
        }
      },
      // Add more task posts as needed
    ]
  }
};
