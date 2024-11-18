import React from 'react';
import { Post, ItemPrepTime } from '../../types';
import Image from 'next/image';

interface TaskPopupProps {
  post: Post;
  onClose: () => void;
  onSave: () => void;
  itemPrepTimes: { [key: string]: ItemPrepTime };
  setItemPrepTimes: React.Dispatch<React.SetStateAction<{ [key: string]: ItemPrepTime }>>;
}

export function TaskPopup({ 
  post, 
  onClose, 
  onSave, 
  itemPrepTimes,
  setItemPrepTimes 
}: TaskPopupProps) {
  const prepHoursOptions = ['none', '1', '2', '3', '4', '5', '6', 'custom'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <div className="flex gap-3">
            {/* Prep Time Selector */}
            <div className="relative">
              <select
                value={itemPrepTimes[post.id]?.isNone ? 'none' : 
                       (itemPrepTimes[post.id]?.isCustomHours ? 'custom' : 
                       itemPrepTimes[post.id]?.prepHours)}
                onChange={(e) => {
                  const isCustom = e.target.value === 'custom';
                  const isNone = e.target.value === 'none';
                  setItemPrepTimes((prev) => ({
                    ...prev,
                    [post.id]: {
                      prepHours: isCustom || isNone ? '' : e.target.value,
                      isCustomHours: isCustom,
                      customHours: '',
                      isNone: isNone
                    }
                  }));
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {prepHoursOptions.map(hour => (
                  <option key={hour} value={hour}>
                    {hour === 'custom' ? 'Custom' : 
                     hour === 'none' ? 'None' :
                     `${hour} hour${hour === '1' ? '' : 's'}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Steps</h4>
            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
              <ul className="space-y-3">
                {post.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <p className="text-sm text-gray-600">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Media Section */}
          <div>
            <h4 className="text-lg font-medium mb-3">Media</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {post.image && (
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save to Panel
          </button>
        </div>
      </div>
    </div>
  );
}
