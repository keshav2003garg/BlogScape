import React from 'react';
import { useSelector } from 'react-redux'

import Post from './Post/Post';

const Posts = () => {
    const {posts} = useSelector(state => state.user.posts)
    return (
        <main className='flex-evenly flex-wrap bg-white'>
            {posts && posts.map((data)=>{
                return(
                    <Post key={data._id} img={data.img} title={data.title} description={data.description} date={data.date} />
                )
            })}
        </main>
    )
}

export default Posts;
