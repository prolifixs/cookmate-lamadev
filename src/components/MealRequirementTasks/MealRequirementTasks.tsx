import { useTaskState } from './hooks/useTaskState';
import { TaskCard } from './components/RecipeModule/TaskCard';
import { TaskPopup } from './components/RecipeModule/TaskPopup';
import { TaskTabs } from './components/RecipeModule/TaskTabs';
import { sections } from './data/defaultSections';

export function MealRequirementTasks() {
  const {
    activeTab,
    setActiveTab,
    selectedPost,
    itemPrepTimes,
    setItemPrepTimes,
    handlePostClick,
    handleClosePostPopup,
    handleSaveFromPopup,
  } = useTaskState();

  // Get current section based on active tab
  const currentSection = sections[activeTab];

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      {/* Navigation Tabs */}
      <TaskTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {/* Content Area */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {currentSection.title}
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {currentSection.posts.map((post) => (
              <TaskCard
                key={post.id}
                post={post}
                itemPrepTimes={itemPrepTimes}
                onPostClick={handlePostClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedPost && (
        <TaskPopup
          post={selectedPost}
          onClose={handleClosePostPopup}
          onSave={handleSaveFromPopup}
          itemPrepTimes={itemPrepTimes}
          setItemPrepTimes={setItemPrepTimes}
        />
      )}
    </section>
  );
}
