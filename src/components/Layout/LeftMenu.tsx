import MealPlanList from "./MealPlanList"

const LeftMenu = () => {
  return (
    <div className="h-[calc(100vh-80px)] sticky top-20">
      <MealPlanList/>
    </div>
  )
}

export default LeftMenu