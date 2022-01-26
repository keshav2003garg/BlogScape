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
    UPDATE_USERDETAILS__REQUEST, UPDATE_USERDETAILS__SUCCESS, UPDATE_USERDETAILS__FAIL,
    LOGOUT__REQUEST, LOGOUT__SUCCESS, LOGOUT__FAIL,
    DELETE_USER__REQUEST, DELETE_USER__SUCCESS, DELETE_USER__FAIL,

    CLEAR__ERRORS, CLEAR__MESSAGES
} from '../constants/userConstants';



const initialState = { isAuthenticated: false };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER__REQUEST:
        case RESEND_OTP__REQUEST:
        case RESET_PASSWORD_RESEND_OTP__REQUEST:
        case FORGOT_PASSWORD__REQUEST:
            return {
                ...state,
                loading: true,
                isOTPsend: false
            }
        case REGISTERATION_VERIFICATION__REQUEST:
        case LOGIN__REQUEST:
        case RESET_PASSWORD_VERIFICATION__REQUEST:
            return {
                ...state,
                loading: true,
                isOTPsend: true,
            }
        case CHECK_USER_STATUS__REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }
        case LOGOUT__REQUEST:
        case UPDATE_USERDETAILS__REQUEST:
        case OTP_VERIFICATION_FAILURE__REQUEST:
        case DELETE_USER__REQUEST:
            return {
                ...state,
                loading: true,
            }




        case REGISTER__SUCCESS:
        case FORGOT_PASSWORD__SUCCESS:
            return {
                ...state,
                loading: false,
                isOTPsend: true,
                message: action.payload.message,
                userId: action.payload.userId
            }
        case REGISTERATION_VERIFICATION__SUCCESS:
        case LOGIN__SUCCESS:
        case RESET_PASSWORD_VERIFICATION__SUCCESS:
            return {
                ...state,
                loading: false,
                isOTPsend: undefined,
                message: action.payload.message,
                userId: undefined
            }
        case RESEND_OTP__SUCCESS:
        case RESET_PASSWORD_RESEND_OTP__SUCCESS:
            return {
                ...state,
                loading: false,
                isOTPsend: true,
                message: action.payload.message,
                userId: action.payload.userId
            }
        case CHECK_USER_STATUS__SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userDetails: action.payload.userDetail
            }
        case LOGOUT__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                isAuthenticated: false,
                userDetails: undefined,
            }
        case UPDATE_USERDETAILS__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                userDetails: action.payload.userDetail
            }
        case OTP_VERIFICATION_FAILURE__SUCCESS:
            return {
                ...state,
                loading: false
            }
        case DELETE_USER__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }



        case REGISTER__FAIL:
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
        case LOGOUT__FAIL:
        case UPDATE_USERDETAILS__FAIL:
        case DELETE_USER__FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OTP_VERIFICATION_FAILURE__FAIL:
            return {
                ...state,
                loading: false
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