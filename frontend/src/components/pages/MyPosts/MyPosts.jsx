import React from 'react';

import MyPost from '../../layouts/Posts/MyPost';
import Sidebar from '../../layouts/Sidebar/Sidebar';

const MyPosts = () => {
    return (
        <div className='flex'>
            <MyPost />
            <Sidebar />
        </div>
    )
}

export default MyPosts
