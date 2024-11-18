export const ActionButtonsComponent = () => {
  return (
    <div className="flex gap-3 mt-auto justify-end">
      <button className="p-1.5 rounded-full hover:bg-gray-100">
        <span className="sr-only">Share</span>
        ↩
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100">
        <span className="sr-only">Like</span>
        ♡
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100">
        <span className="sr-only">Bookmark</span>
        🔖
      </button>
      <button className="p-1.5 rounded-full hover:bg-gray-100 flex items-center gap-1">
        <span>💬</span>
        <span className="text-sm">26</span>
      </button>
    </div>
  );
}; 