import {
    REGISTER__REQUEST, REGISTER__SUCCESS, REGISTER__FAIL,
    CHANGE_EMAIL_AT_VERIFICATION,
    REGISTERATION_VERIFICATION__REQUEST, REGISTERATION_VERIFICATION__SUCCESS, REGISTERATION_VERIFICATION__FAIL,
    OTP_VERIFICATION_FAILURE__REQUEST, OTP_VERIFICATION_FAILURE__SUCCESS, OTP_VERIFICATION_FAILURE__FAIL,
    RESEND_OTP__REQUEST, RESEND_OTP__SUCCESS, RESEND_OTP__FAIL,
    LOGIN__REQUEST, LOGIN__SUCCESS, LOGIN__FAIL,
    FORGOT_PASSWORD__REQUEST, FORGOT_PASSWORD__SUCCESS, FORGOT_PASSWORD__FAIL,
    RESET_PASSWORD_VERIFICATION__REQUEST, RESET_PASSWORD_VERIFICATION__SUCCESS, RESET_PASSWORD_VERIFICATION__FAIL,
    RESET_PASSWORD_RESEND_OTP__REQUEST, RESET_PASSWORD_RESEND_OTP__SUCCESS, RESET_PASSWORD_RESEND_OTP__FAIL,
    CHECK_USER_STATUS__REQUEST, CHECK_USER_STATUS__SUCCESS, CHECK_USER_STATUS__FAIL,
    LOGOUT__REQUEST, LOGOUT__SUCCESS, LOGOUT__FAIL,
    CLEAR__ERRORS, CLEAR__MESSAGES
} from '../constants/userConstants';

import {
    CREATE_POST__REQUEST, CREATE_POST__SUCCESS, CREATE_POST__FAIL,
    GET_ALL_POSTS__REQUEST, GET_ALL_POSTS__SUCCESS, GET_ALL_POSTS__FAIL,
    GET_MY_POSTS__REQUEST, GET_MY_POSTS__SUCCESS, GET_MY_POSTS__FAIL,
} from '../constants/postConstants';



const initialState = { isAuthenticated: false };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER__REQUEST:
        case OTP_VERIFICATION_FAILURE__REQUEST:
        case FORGOT_PASSWORD__REQUEST:
            return {
                loading: true,
                isOTPsend: false
            }
        case REGISTERATION_VERIFICATION__REQUEST:
        case LOGIN__REQUEST:
        case RESET_PASSWORD_VERIFICATION__REQUEST:
            return {
                ...state,
                loading: true,
                isVerified: false,
                isOTPsend: undefined,
                message: undefined
            }
        case RESEND_OTP__REQUEST:
        case RESET_PASSWORD_RESEND_OTP__REQUEST:
            return {
                ...state,
                loading: true,
                isOTPsend: false,
                message: undefined
            }
        case CHECK_USER_STATUS__REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }
        case GET_ALL_POSTS__REQUEST:
        case GET_MY_POSTS__REQUEST:
        case LOGOUT__REQUEST:
        case CREATE_POST__REQUEST:
            return {
                ...state,
                loading: true,
            }




        case REGISTER__SUCCESS:
        case OTP_VERIFICATION_FAILURE__SUCCESS:
        case FORGOT_PASSWORD__SUCCESS:
            return {
                loading: false,
                isOTPsend: true,
                message: action.payload.message,
                response: action.payload
            }
        case REGISTERATION_VERIFICATION__SUCCESS:
        case LOGIN__SUCCESS:
        case RESET_PASSWORD_VERIFICATION__SUCCESS:
            return {
                ...state,
                loading: false,
                isVerified: true,
                message: action.payload.message,
                response: action.payload
            }
        case RESEND_OTP__SUCCESS:
        case RESET_PASSWORD_RESEND_OTP__SUCCESS:
            return {
                ...state,
                loading: false,
                isOTPsend: true,
                message: action.payload.message,
                response: action.payload
            }
        case CHECK_USER_STATUS__SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userDetails: action.payload
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
        case LOGOUT__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                response: action.payload
            }
        case CREATE_POST__SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                response: action.payload
            }



        case REGISTER__FAIL:
        case OTP_VERIFICATION_FAILURE__FAIL:
        case FORGOT_PASSWORD__FAIL:
            return {
                loading: false,
                isOTPsend: false,
                error: action.payload
            }
        case REGISTERATION_VERIFICATION__FAIL:
        case LOGIN__FAIL:
        case RESET_PASSWORD_VERIFICATION__FAIL:
            return {
                ...state,
                loading: false,
                isVerified: false,
                isOTPsend: true,
                error: action.payload
            }
        case RESEND_OTP__FAIL:
        case RESET_PASSWORD_RESEND_OTP__FAIL:
            return {
                ...state,
                loading: false,
                isOTPsend: false,
                error: action.payload
            }
        case CHECK_USER_STATUS__FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        case GET_ALL_POSTS__FAIL:
        case GET_MY_POSTS__FAIL:
            return {
                ...state,
                loading: false
            }
        case LOGOUT__FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_POST__FAIL:
            return {
                loading: false,
                error: action.payload
            }


        case CHANGE_EMAIL_AT_VERIFICATION:
            return {
                ...state,
                isOTPsend: false
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