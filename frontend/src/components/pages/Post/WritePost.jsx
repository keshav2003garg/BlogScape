import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../../actions/postActions';

const WritePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated } = useSelector(state => state.user);
    const [postDetails, setPostDetails] = useState({
        imgFile: '',
        title: '',
        description: '',
    });

    const [previewImg, setPreviewImg] = useState();

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        }
        setPostDetails({ ...postDetails, imgFile: file })
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        const { imgFile, title, description } = postDetails;
        dispatch(createPost(imgFile, title, description, setPostDetails, setPreviewImg));
    }
    useEffect(() => {
        if (isAuthenticated == false) {
            history.push('/login');
        }
    }, [])
    return (
        <div className='pt-24'>
            {previewImg && <div className="ml-40 mb-4 flex justify-start">
                <img className='w-3/4 h-96 object-cover rounded-2xl' id='previewImg' src={previewImg} />
            </div>}
            <form className='relative' onSubmit={handleCreatePost}>
                <div className='ml-40 flex items-center'>
                    <label htmlFor="postImg">
                        <i className="fas fa-plus p-1 text-[gray] text-2xl border border-slate-300 rounded-full cursor-pointer"></i>
                    </label>
                    <input className='hidden' accept='image/*' type="file" id='postImg' onChange={handleImage} name='img' />
                    <input className='p-5 w-9/12 text-3xl font-josefin focus:outline-none' type="text" placeholder='Title' autoFocus={true} name='title' value={postDetails.title} onChange={(e) => { setPostDetails({ ...postDetails, [e.target.name]: e.target.value }) }} />
                </div>
                <div className='ml-40'>
                    <textarea className='p-5 pl-12 w-9/12 h-[65vh] text-3xl font-josefin focus:outline-none' placeholder='Tell your story...' name='description' value={postDetails.description} onChange={(e) => { setPostDetails({ ...postDetails, [e.target.name]: e.target.value }) }}></textarea>
                </div>
                <button className='p-2 px-3 absolute top-[20px] right-[50px] text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit">Publish</button>
            </form>
        </div>
    )
}

export default WritePost;
