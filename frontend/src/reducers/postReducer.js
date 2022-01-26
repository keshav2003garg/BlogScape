import {
    CREATE_POST__REQUEST, CREATE_POST__SUCCESS, CREATE_POST__FAIL,
    GET_ALL_POSTS__REQUEST, GET_ALL_POSTS__SUCCESS, GET_ALL_POSTS__FAIL,
    GET_MY_POSTS__REQUEST, GET_MY_POSTS__SUCCESS, GET_MY_POSTS__FAIL,
    GET_SINGLE_POST__REQUEST, GET_SINGLE_POST__SUCCESS, GET_SINGLE_POST__FAIL,
    DELETE_POST__REQUEST, DELETE_POST__SUCCESS, DELETE_POST__FAIL,

    CLEAR_MY_POSTS,
    CLEAR__ERRORS, CLEAR__MESSAGES
} from '../constants/postConstants';



const initialState = { posts: [], myPosts: [] };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS__REQUEST:
        case GET_MY_POSTS__REQUEST:
        case CREATE_POST__REQUEST:
        case GET_SINGLE_POST__REQUEST:
        case DELETE_POST__REQUEST:
            return {
                ...state,
                loading: true,
            }



        case GET_ALL_POSTS__SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
            }
        case GET_MY_POSTS__SUCCESS:
            return {
                ...state,
                loading: false,
                myPosts: action.payload.posts
            }
        case CREATE_POST__SUCCESS:
        case DELETE_POST__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case GET_SINGLE_POST__SUCCESS:
            return {
                ...state,
                loading: false,
                postDetails: action.payload.postDetails
            }



        case GET_ALL_POSTS__FAIL:
        case GET_MY_POSTS__FAIL:
        case GET_SINGLE_POST__FAIL:
            return {
                ...state,
                loading: false
            }
        case CREATE_POST__FAIL:
        case DELETE_POST__FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }



        case CLEAR_MY_POSTS:
            return {
                ...state,
                myPosts: []
            }



        case CLEAR__MESSAGES:
            return {
                ...state,
                message: undefined
            }
        case CLEAR__ERRORS:
            return {
                ...state,
                error: undefined
            }



        default:
            return state
    }
}



export default userReducer;