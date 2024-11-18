import MealPlan from "./MealPlan"

const MealPlanList = () => {
  return <div className='flex flex-col gap-12 bg-white rounded-lg p-4 shadow-md h-full overflow-y-auto scrollbar-hide'>
    <MealPlan/>
  </div>
}

export default MealPlanList