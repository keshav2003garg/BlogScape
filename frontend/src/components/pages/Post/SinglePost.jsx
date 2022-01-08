import React from 'react';
import Single from '../../layouts/Posts/Single'
import Sidebar from '../../layouts/Sidebar/Sidebar';

const SinglePost = () => {
    return (
        <div className='flex'>
            <Single />
            <Sidebar />
        </div>
    )
}

export default SinglePost
