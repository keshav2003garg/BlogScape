import {
    CREATE_POST__REQUEST, CREATE_POST__SUCCESS, CREATE_POST__FAIL,
    GET_ALL_POSTS__REQUEST, GET_ALL_POSTS__SUCCESS, GET_ALL_POSTS__FAIL,
    GET_MY_POSTS__REQUEST, GET_MY_POSTS__SUCCESS, GET_MY_POSTS__FAIL,
} from '../constants/postConstants';



const initialState = { posts: {} };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS__REQUEST:
        case GET_MY_POSTS__REQUEST:
        case CREATE_POST__REQUEST:
            return {
                loading: true,
            }



        case GET_ALL_POSTS__SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case GET_MY_POSTS__SUCCESS:
            return {
                ...state,
                loading: false,
                myPosts: action.payload
            }
        case CREATE_POST__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }



        case GET_ALL_POSTS__FAIL:
        case GET_MY_POSTS__FAIL:
            return {
                ...state,
                loading: false
            }
        case CREATE_POST__FAIL:
            return {
                loading: false,
                error: action.payload
            }



        // case CLEAR__MESSAGES:
        //     return {
        //         ...state,
        //         message: undefined
        //     }
        // case CLEAR__ERRORS:
        //     return {
        //         ...state,
        //         error: undefined
        //     }



        default:
            return state
    }
}



export default userReducer;