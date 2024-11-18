import { Post, ItemPrepTime } from '../../types';
import { getPostContent } from '../../utils/helpers';

interface TaskCardProps {
  post: Post;
  itemPrepTimes: { [key: string]: ItemPrepTime };
  onPostClick: (post: Post) => void;
}

export function TaskCard({ post, itemPrepTimes, onPostClick }: TaskCardProps) {
  // Get the prep time for this post
  const prepTime = itemPrepTimes[post.id];
  
  return (
    <div 
      onClick={() => onPostClick(post)}
      className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 
                 transition-colors relative cursor-pointer"
    >
      {/* Image Section */}
      {post.image && (
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3" />
      )}
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{post.title}</h4>
        <span className="text-sm text-gray-500">
          {post.steps.length} Steps
        </span>
      </div>
      
      {/* Content Preview */}
      <p className="text-sm text-gray-600">{getPostContent(post)}</p>
      
      {/* Prep Time Display */}
      <p className="text-xs text-gray-500 mt-2">
        {(!prepTime?.isNone)
          ? `${prepTime?.isCustomHours 
              ? prepTime?.customHours 
              : prepTime?.prepHours} hours to prep`
          : 'Set prep time in panel'
        }
      </p>
    </div>
  );
}
