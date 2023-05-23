import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { clearErrors, clearMessages, getPostDetails } from '../../../actions/postActions';
import Loading from '../../layouts/Loading/Loading';

const UpdatePost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();
    const { postDetails, loading, message, error } = useSelector(state => state.posts);
    const [updatePost, setUpdatePost] = useState({
        title: '',
        description: '',
    })
    const handleUpdatePost = () => {
        history(`/posts/${id}`);
    }
    useEffect(() => {
        dispatch(getPostDetails(id));
        if (message) {
            alert.success(message);
            dispatch(clearMessages());
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, message, error])
    return (
        <div className='pt-24'>
            {postDetails && <div className="ml-40 mb-4 flex justify-start">
                <img className='w-3/4 h-96 object-cover rounded-2xl' id='previewImg' src={postDetails.img.url} />
            </div>}
            <form className='relative' onSubmit={handleUpdatePost}>
                <div className='ml-40 flex items-center'>
                    <input className='p-5 pl-12 w-9/12 text-3xl font-josefin focus:outline-none' type="text" placeholder='Title' autoFocus={true} name='title' value={postDetails.title} />
                </div>
                <div className='ml-40'>
                    <textarea className='p-5 pl-12 w-9/12 h-[65vh] text-3xl font-josefin focus:outline-none' placeholder='Tell your story...' name='description' value={postDetails.description}></textarea>
                </div>
                <button className='p-2 px-3 absolute top-[20px] right-[50px] text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit">Publish</button>
            </form>
            {loading ? <Loading /> : null}
        </div>
    )
}

export default UpdatePost;
