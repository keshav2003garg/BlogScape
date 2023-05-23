import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { clearErrors, clearMessages, deletePost, getMyPosts, getPostDetails } from '../../../actions/postActions';
import Loading from '../Loading/Loading';

const Single = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();
    const { postDetails, loading, myPosts, message, error } = useSelector(state => state.posts);
    const handleDeletePost = () => {
        dispatch(deletePost(id));
        history('/');
    }
    useEffect(() => {
        dispatch(getPostDetails(id));
        dispatch(getMyPosts());
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

        <>
            {loading ?
                <Loading />
                :
                <div className='flex-[9] p-5 pr-0'>
                    <div className='mb-3'>
                        <img className='w-full h-[530px] rounded' src={postDetails && postDetails.img.url} />
                        <h1 className='mt-2 pl-2 flex-between text-center font-josefin text-3xl font-semibold'>{postDetails && postDetails.title}
                            {myPosts.map((data) => {
                                return (
                                    id == data._id ?
                                        <div key={data._id} className='icon-styling-container-sm'>
                                            <Link to={`/updatePost/${id}`} ><i className="fas fa-edit text-green-900 text-xl"></i></Link>
                                            <i className="fas fa-trash-alt text-red-600" onClick={handleDeletePost}></i>
                                        </div>
                                        :
                                        null
                                )
                            })}
                        </h1>
                    </div>
                    <div className='mb-3 px-1 flex-between font-varelaRound text-[#b39656]'>
                        <span>Author: <b>{postDetails && postDetails.user.name}</b></span>
                        <span><b><TimeAgo date={postDetails && postDetails.date} /></b></span>
                    </div>
                    <p className='px-1 text-lg font-lora text-[#666] break-all first-letter:text-3xl first-letter:font-semibold first-letter:ml-5'>{postDetails && postDetails.description}</p>
                </div>}
        </>
    )
}

export default Single;
