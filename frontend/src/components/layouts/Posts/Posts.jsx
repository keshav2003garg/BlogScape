import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../../actions/postActions';

import Post from './Post/Post';

const Posts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])
    const { posts } = useSelector(state => state.posts);
    return (
        <main className='flex-evenly flex-wrap bg-white'>
            {posts && posts.map((data) => {
                return (
                    <Post key={data._id} id={data._id} img={data.img} title={data.title} description={data.description} date={data.date} />
                )
            })}
        </main>
    )
}

export default Posts;
