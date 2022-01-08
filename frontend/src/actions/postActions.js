import axios from 'axios';

import {
    CREATE_POST__REQUEST, CREATE_POST__SUCCESS, CREATE_POST__FAIL,
    GET_ALL_POSTS__REQUEST, GET_ALL_POSTS__SUCCESS, GET_ALL_POSTS__FAIL,
    GET_MY_POSTS__REQUEST, GET_MY_POSTS__SUCCESS, GET_MY_POSTS__FAIL,
} from '../constants/postConstants';


const createPost = (imgFile, title, description, setPostDetails, setPreviewImg) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: CREATE_POST__REQUEST
                })
                const imgData = new FormData();
                imgData.append('file', imgFile)
                imgData.append('upload_preset', 'ah4iafmp')
                imgData.append('cloud_name', "doizgsvpt")
                const response = await fetch("https://api.cloudinary.com/v1_1/doizgsvpt/image/upload", { method: "POST", body: imgData });
                const { public_id, url } = await response.json();
                const publicID = public_id;
                const Url = url;
                const img = { public_id: publicID, url: Url }
                const { data } = await axios.post('http://localhost:5000/api/posts/create-post',
                    { img, title, description },
                    {
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        withCredentials: true
                    }
                );
                setPostDetails({
                    imgFile: '',
                    title: '',
                    description: '',
                });
                setPreviewImg('');
                dispatch({
                    type: CREATE_POST__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: CREATE_POST__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const getMyPosts = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_MY_POSTS__REQUEST
                })
                const { data } = await axios.get('http://localhost:5000/api/posts/my-posts',
                    { withCredentials: true }
                );
                dispatch({
                    type: GET_MY_POSTS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: GET_MY_POSTS__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const getAllPosts = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_ALL_POSTS__REQUEST
                })
                const { data } = await axios.get('http://localhost:5000/api/posts/get-all-posts');
                dispatch({
                    type: GET_ALL_POSTS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: GET_ALL_POSTS__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}



export { createPost, getAllPosts, getMyPosts };