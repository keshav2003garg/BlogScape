import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

const Post = ({ id, img, title, description, date }) => {

    return (
        <div className='mx-6 my-10 w-1/4'>
            <Link to={`/posts/${id}`}><div className='w-full flex-center'><img className='w-full rounded-2xl' src={img.url} /></div></Link>
            <div className='flex-col-center'>
                <div>
                    <span className='mx-4 font-varelaRound text-xs text-[#be9656] cursor-pointer'>Music</span>
                    <span className='mx-4 font-varelaRound text-xs text-[#be9656] cursor-pointer'>Life</span>
                </div>
                <span className='font-josefin text-2xl font-bold'>{title}</span>
                <hr />
                <span className='font-varelaRound italic text-sm'><TimeAgo date={date} /></span>
            </div>
            <p className='font-lora text-sm break-all line-clamp-4 text-ellipsis'>{description}</p>
        </div>
    )
}

export default Post
