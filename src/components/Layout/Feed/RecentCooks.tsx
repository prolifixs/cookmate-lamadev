'use client'

import React from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'

const RecentCooks = () => {
  const [recipes, setRecipes] = React.useState([
    {
      id: 1,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/28714404/pexels-photo-28714404/free-photo-of-honey-drizzle-from-wooden-dipper-on-yellow-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      cookTime: "45 MIN"
    },
    {
      id: 2,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600",
      cookTime: "30 MIN"
    },
    {
      id: 3,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600",
      cookTime: "20 MIN"
    },
    {
      id: 4,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=600",
      cookTime: "15 MIN"
    },
    {
      id: 5,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600",
      cookTime: "10 MIN"
    },
    {
      id: 6,
      title: "Mac & Cheese",
      description: "Explore what fun cooking in simple turns",
      image: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=600",
      cookTime: "5 MIN"
    },
    // Add more recipes...
  ])

  React.useEffect(() => {
    // Any initialization code here
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="font-semibold">Recent Cooks</h2>
        <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">
          View All
        </span>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex gap-4 p-4 overflow-x-auto max-w-[800px] scrollbar-hide">
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="min-w-[250px] w-[250px] h-[200px] flex-none relative rounded-lg overflow-hidden cursor-pointer group"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold text-lg mb-1 truncate">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-200 line-clamp-2">
                  {recipe.description}
                </p>
              </div>
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-white/80">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">{recipe.cookTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentCooks;