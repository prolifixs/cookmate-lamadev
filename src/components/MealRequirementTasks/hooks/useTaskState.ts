import { useState } from 'react';
import { Post, ItemPrepTime } from '../types';
import { sections } from '../data/defaultSections';

export function useTaskState() {
  const [activeTab, setActiveTab] = useState<'mise' | 'tasks'>('mise');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [savedItems, setSavedItems] = useState<{ [key: string]: boolean }>({});
  
  const [itemPrepTimes, setItemPrepTimes] = useState<{ [key: string]: ItemPrepTime }>(() => {
    const initialPrepTimes: { [key: string]: ItemPrepTime } = {};
    Object.values(sections).forEach(section => {
      section.posts.forEach(post => {
        initialPrepTimes[post.id] = {
          ...post.prepTime,
          isNone: true
        };
      });
    });
    return initialPrepTimes;
  });

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosePostPopup = () => {
    setSelectedPost(null);
  };

  const handleSaveFromPopup = () => {
    if (selectedPost && itemPrepTimes[selectedPost.id]) {
      setSavedItems(prev => ({
        ...prev,
        [selectedPost.id]: true
      }));
      setSelectedPost(null);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
  };

  return {
    activeTab,
    setActiveTab,
    isModalOpen,
    setIsModalOpen,
    selectedDate,
    setSelectedDate,
    mealType,
    setMealType,
    selectedPost,
    setSelectedPost,
    savedItems,
    setSavedItems,
    itemPrepTimes,
    setItemPrepTimes,
    handlePostClick,
    handleClosePostPopup,
    handleSaveFromPopup,
    handleModalCancel,
    handleModalConfirm
  };
}