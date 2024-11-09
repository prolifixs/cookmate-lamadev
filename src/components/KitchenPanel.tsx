import Image from "next/image";
const KitchenPanel = () => {
  return (
  <div className='p-4 bg-white rounded-lg shadow-md w-full text-xs'>
    <div className='flex gap-8 overflow-x-auto pb-4 whitespace-nowrap  scrollbar-hide'>
      {/* KITCHEN PANEL */}
      <div className='flex flex-col gap-2 rounded-lg items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Next Recipe</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Marinating</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Stove Connected</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Marinating</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Blende Use</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Marinating</span>
      </div>
      <div className='flex flex-col gap-2 items-center cursor-pointer flex-shrink-0'>
        <Image src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='kitchen' width={80} height={80} className='w-20 h-20 ring-2' />
        <span className='font-medium'>Marinating</span>
      </div>
    </div>
  </div>
)}

export default KitchenPanel