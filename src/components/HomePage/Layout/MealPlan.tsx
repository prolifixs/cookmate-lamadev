import Image from 'next/image';

// Add this type at the top of the file
type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const MealPlan = () => {
  // Get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as WeekDay;

  // Get current hour to determine meal time
  const currentHour = new Date().getHours();

  const weeklyMeals = {
    Monday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Oatmeal with berries',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Chicken salad sandwich',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Grilled salmon with vegetables',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Tuesday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Scrambled eggs on toast',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Vegetable soup with crackers',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Beef stir-fry with rice',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Wednesday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Greek yogurt with granola',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Turkey and avocado wrap',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Baked chicken with sweet potato',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Thursday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Smoothie bowl',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Tuna pasta salad',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Meal name here',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Friday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Smoothie bowl',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Tuna pasta salad',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Meal name here',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Saturday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Smoothie bowl',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Tuna pasta salad',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Meal name here',
        time: [16, 23],
        displayName: 'Dinner'
      }
    },
    Sunday: {
      breakfast: { 
        icon: '☕', 
        meal: 'Smoothie bowl',
        time: [5, 11],
        displayName: 'Breakfast'
      },
      lunch: { 
        icon: '🍴', 
        meal: 'Tuna pasta salad',
        time: [11, 16],
        displayName: 'Lunch'
      },
      dinner: { 
        icon: '🍽️', 
        meal: 'Hot dog with chips',
        time: [16, 23],
        displayName: 'Dinner'
      }
    }
  };

  // Get current meal for description
  const getCurrentMeal = () => {
    const todayMeals = weeklyMeals[currentDay];
    if (currentHour >= todayMeals.breakfast.time[0] && currentHour < todayMeals.breakfast.time[1]) {
      return todayMeals.breakfast;
    } else if (currentHour >= todayMeals.lunch.time[0] && currentHour < todayMeals.lunch.time[1]) {
      return todayMeals.lunch;
    } else if (currentHour >= 23 || currentHour < 5) {
      return todayMeals.breakfast;
    } else {
      return todayMeals.dinner;
    }
  };

  // Get next meal and hours until it starts
  const getNextMealTime = () => {
    const todayMeals = weeklyMeals[currentDay];
    if (currentHour >= 23 || currentHour < 5) {
      const hoursUntil = currentHour >= 23 ? 
        (24 - currentHour) + 5 : 
        5 - currentHour;
      return { meal: 'Breakfast', hoursUntil };
    } else if (currentHour < todayMeals.breakfast.time[0]) {
      return { meal: 'Breakfast', hoursUntil: todayMeals.breakfast.time[0] - currentHour };
    } else if (currentHour < todayMeals.lunch.time[0]) {
      return { meal: 'Lunch', hoursUntil: todayMeals.lunch.time[0] - currentHour };
    } else if (currentHour < todayMeals.dinner.time[0]) {
      return { meal: 'Dinner', hoursUntil: todayMeals.dinner.time[0] - currentHour };
    }
    return { meal: 'Dinner', hoursUntil: null };
  };

  const currentMeal = getCurrentMeal();
  const nextMeal = getNextMealTime();

  return <div className='flex flex-col gap-2'>
    <div className='relative w-full h-48'>
      <Image 
        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" 
        alt="" 
        fill 
        className='object-cover rounded-md'
      />
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/60 rounded-md'></div>
      
      {/* Day of week and time - overlaid */}
      <div className='absolute top-2 left-2 right-2 flex items-center justify-between'>
        <span className="font-semibold text-xs text-white">{currentDay}</span>
        <div className="flex items-center gap-1 text-white text-sm font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {nextMeal.hoursUntil === null ? 'Dinner time' : `${nextMeal.meal} in ${nextMeal.hoursUntil}H`}
          </span>
        </div>
      </div>

      {/* DESCRIPTION - overlaid */}
      <div className='absolute inset-0 flex items-center justify-center flex-col gap-2'>
        <span className='text-white text-xs opacity-75'>{currentMeal.displayName}</span>
        <div className='flex items-center gap-2'>
          <span className='text-2xl'>{currentMeal.icon}</span>
          <p className='text-lg text-white font-medium'>{currentMeal.meal}</p>
        </div>
      </div>

      {/* USER - overlaid */}
      <div className='absolute bottom-2 left-2 right-2 flex items-center justify-between'>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-gray-700">{nextMeal.meal.charAt(0)}</span>
          </div>
        </div>
        <Image src="/images/more.png" alt="user" width={12} height={12} />
      </div>
    </div>
    {/* Render current day's meals list */}
    {Object.entries(weeklyMeals[currentDay]).map(([mealTime, meal]) => (
      currentHour < meal.time[1] && nextMeal.meal !== meal.displayName && (
        <div key={mealTime} className='flex items-center justify-between text-xs my-1'>
          <div className='flex gap-1'>
            <div className='flex items-center gap-1 bg-slate-100 px-1.5 py-1 rounded-lg'>
              <span className='font-semibold cursor-pointer'>{meal.displayName.charAt(0)}</span>
              <span className='text-gray-300'>|</span>
              <span className='text-gray-500'>{meal.meal}</span>
            </div>
          </div>
        </div>
      )
    ))}

    {/* Weekly Meal Plan Cards */}
    <div className="flex flex-col gap-4 mt-4">
      {Object.entries(weeklyMeals).map(([day, meals]) => (
        <div key={day} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">{day}</h2>
            <button className="text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 w-6">{meals.breakfast.icon}</span>
              <span className="text-sm">{meals.breakfast.meal}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 w-6">{meals.lunch.icon}</span>
              <span className="text-sm">{meals.lunch.meal}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500 w-6">{meals.dinner.icon}</span>
              <span className="text-sm">{meals.dinner.meal}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
}

export default MealPlan
