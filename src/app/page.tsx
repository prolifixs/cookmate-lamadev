import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import KitchenPanel from "@/components/KitchenPanel";
import RecentCooks from "@/components/RecentCooks";
import Recommendation from "@/components/Recommendation";
const Homepage = () => {
  return (
    <div className='flex gap-6 p-4'>
      {/* LEFT */}
      <div className='hidden xl:block w-[20%]'><LeftMenu/></div>
      {/* CENTER */}
      <div className='flex flex-col gap-6'>
        <KitchenPanel/>
        <RecentCooks/>
        <Recommendation/>
        </div>
      {/* RIGHT */}
      <div className='hidden lg:block w-[30%]'><RightMenu/></div>
    </div>
  )
}

export default Homepage