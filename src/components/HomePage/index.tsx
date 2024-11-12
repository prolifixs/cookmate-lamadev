import LeftMenu from './Layout/LeftMenu'
import RightMenu from './Layout/RightMenu'
import KitchenPanel from './Layout/KitchenPanel'
import RecentCooks from './Feed/RecentCooks'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 pt-4">
      <div className="flex justify-between max-w-[2000px] mx-auto">
        {/* Left Panel */}
        <div className="w-[300px] flex-shrink-0">
          <LeftMenu />
        </div>

        {/* Main Content */}
        <div className="w-[800px] flex-shrink-0 flex flex-col gap-4 pb-4">
          <KitchenPanel />
          <RecentCooks />
        </div>

        {/* Right Panel */}
        <div className="w-[300px] flex-shrink-0">
          <RightMenu />
        </div>
      </div>
    </div>
  )
}

export default HomePage