import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../../../actions/postActions';

import Post from './Post/Post';

const MyPost = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.myPosts);
    useEffect(() => {
        dispatch(getMyPosts());
    }, [])
    return (
        <main className='flex-[9] flex-evenly flex-wrap bg-white'>
            {posts && posts.map((data) => {
                return (
                    <Post key={data._id} id={data._id} img={data.img} title={data.title} description={data.description} date={data.date} />
                )
            })}
        </main>
    )
}

export default MyPost;
