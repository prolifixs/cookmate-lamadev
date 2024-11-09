import Image from 'next/image';
import Comments from './Comments';

const Post = () => {
  return <div className='flex flex-col gap-2'>
    {/* USER */}
    <div className='flex items-center justify-between'>
        <div className="flex items-center gap-2">
            <Image src="https://images.pexels.com/photos/9508852/pexels-photo-9508852.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="user" width={32} height={32} 
            className="w-8 h-8 rounded-full"/>
            <span className="font-semibold text-xs">John Doe</span>

        </div>
        <Image src="/images/more.png" alt="user" width={12} height={12} />
    </div>
    {/* DESCRIPTION */}
    <div className='flex flex-col gap-2'>
        <div className='w-full h-48 relative'>
            <Image src="https://images.pexels.com/photos/8290111/pexels-photo-8290111.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="" fill className='object-cover rounded-md'/>
        </div>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Quisquam, quos.</p>
    </div>
    {/* INTERACTIONS */}
    <div className='flex items-center justify-between text-sm gap-2 my-2'>
        <div className='flex gap-2'>
            <div className='flex items-center gap-1 bg-slate-100 p-2 rounded-xl'>
                <Image src="/images/like.png" alt="like" width={16} height={16}
                className='cursor-pointer' />
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>12k</span>
            </div>
            <div className='flex items-center gap-1 bg-slate-100 p-2 rounded-xl'>
                <Image src="/images/comment.png" alt="comment" width={16} height={16}
                className='cursor-pointer' />
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>567</span>
            </div>
        </div>
        <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1 bg-slate-100 p-2 rounded-xl'>
                <Image src="/images/share.png" alt="like" width={16} height={16}
                className='cursor-pointer' />
                <span className='text-gray-300'>|</span>
                <span className='text-gray-500'>12k</span>
            </div>
        </div>
    </div>
    <Comments/>     
  </div>
}

export default Post