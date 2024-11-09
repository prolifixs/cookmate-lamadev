import Post from "./Post"

const PostFeed = () => {
  return <div className='flex flex-col gap-12 bg-white rounded-lg p-4 shadow-md h-full overflow-y-auto scrollbar-hide'>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
  </div>
}

export default PostFeed