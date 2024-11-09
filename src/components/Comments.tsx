import Image from 'next/image';

const Comments = () => {
    return <div className=''>
        {/* WRITE COMMENT */}
        <div className='flex items-center gap-1'>
            <Image src="https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="user" width={24} height={24}
            className='w-6 h-6 rounded-full'/>
            <div className='flex items-center gap-2 justify-between rounded-lg bg-slate-100 text-xs w-full px-2 py-0.5'>
                <input type="text" placeholder='Write a comment...'
                className='w-full bg-transparent outline-none flex-1'/>
                <Image src="/images/emoji.png" 
            alt="user" width={14} height={14}
            className='cursor-pointer'/>
            </div>
        </div>
        {/* COMMENTS */}
        <div className='hidden'>
            <div className='flex justify-between mt-4 gap-2'>
                {/* AVATAR */}
                <Image src="https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="user" width={32} height={32}
                className='w-8 h-8 rounded-full'/>
                {/* DESCRIPTION */}
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold'>John Doe</span>
                    <span className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
                </div>
                {/* ICON */}
                <Image src="/images/more.png" 
                alt="user" width={16} height={16}
            className='cursor-pointer w-4 h-4'/>
            </div>
        </div>
        
    </div>
}

export default Comments