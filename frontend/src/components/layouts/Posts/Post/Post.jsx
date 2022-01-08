import React from 'react';
import ReactTimeAgo from 'react-time-ago';

const Post = ({ img, title, description, date }) => {
    const displayDate = new Date(date).toLocaleString();
    console.log(displayDate);

    return (
        <div className='mx-6 my-10 w-1/4'>
            <div className='w-full flex-center'><img className='w-full rounded-2xl' src={img.url} /></div>
            <div className='flex-col-center'>
                <div>
                    <span className='mx-4 font-varelaRound text-xs text-[#be9656] cursor-pointer'>Music</span>
                    <span className='mx-4 font-varelaRound text-xs text-[#be9656] cursor-pointer'>Life</span>
                </div>
                <span className='font-josefin text-2xl font-bold'>{title}</span>
                <hr />
                <span className='font-varelaRound italic text-sm'><ReactTimeAgo date={date} locale="en-IN"/></span>
            </div>
            <p className='font-lora text-sm break-all line-clamp-4 text-ellipsis'>{description}</p>
        </div>
    )
}

export default Post
