import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Post from './Post/Post';

const MyPost = () => {
    const history = useHistory();
    const { isAuthenticated } = useSelector(state => state.user);
    const { posts } = useSelector(state => state.user.myPosts);
    useEffect(() => {
        if (isAuthenticated == false) {
            history.push('/login');
        }
    }, [])
    return (
        <main className='flex-[9] flex-evenly flex-wrap bg-white'>
            {posts && posts.map((data) => {
                return (
                    <Post key={data._id} img={data.img} title={data.title} description={data.description} date={data.date} />
                )
            })}
        </main>
    )
}

export default MyPost
