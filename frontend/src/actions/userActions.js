import axios from 'axios';

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



const register = (name, username, email, password) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: REGISTER__REQUEST
                })
                const { data } = await axios.post('http://localhost:5000/api/register',
                    { name, username, email, password },
                    {
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        withCredentials: true
                    }
                );
                dispatch({
                    type: REGISTER__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: REGISTER__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const registerationVerification = (otp, userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: REGISTERATION_VERIFICATION__REQUEST
                })
                const { data } = await axios.post(`http://localhost:5000/api/verify-otp/${userId}`,
                    { otp: otp },
                    {
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        withCredentials: true
                    }
                );
                dispatch({
                    type: REGISTERATION_VERIFICATION__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: REGISTERATION_VERIFICATION__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const otpVericationFailed = (userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: OTP_VERIFICATION_FAILURE__REQUEST
                })
                const { data } = await axios.get(`http://localhost:5000/api/otp-verification-failed/${userId}`);
                dispatch({
                    type: OTP_VERIFICATION_FAILURE__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: OTP_VERIFICATION_FAILURE__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const resendOTP = (userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: RESEND_OTP__REQUEST
                })
                const { data } = await axios.get(`http://localhost:5000/api/resend-otp/${userId}`);
                dispatch({
                    type: RESEND_OTP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: RESEND_OTP__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const login = (username, password) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: LOGIN__REQUEST
                })
                const { data } = await axios.post('http://localhost:5000/api/login',
                    { username, password },
                    {
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        withCredentials: true
                    }
                );
                dispatch({
                    type: LOGIN__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: LOGIN__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}

const forgotPassword = (email) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FORGOT_PASSWORD__REQUEST
                })
                const { data } = await axios.post('http://localhost:5000/api/forgot-password',
                    { email },
                    { headers: { "Content-Type": "application/json" } }
                );
                dispatch({
                    type: FORGOT_PASSWORD__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FORGOT_PASSWORD__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const resetPasswordVerification = (otp, password, confirmPassword, userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: RESET_PASSWORD_VERIFICATION__REQUEST
                })
                const { data } = await axios.post(`http://localhost:5000/api/verify-reset-password/${userId}`,
                    { otp, password, confirmPassword },
                    {
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        withCredentials: true
                    }
                );
                dispatch({
                    type: RESET_PASSWORD_VERIFICATION__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: RESET_PASSWORD_VERIFICATION__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const resetPasswordResendOTP = (userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: RESET_PASSWORD_RESEND_OTP__REQUEST
                })
                const { data } = await axios.get(`http://localhost:5000/api/resend-reset-password-otp/${userId}`);
                dispatch({
                    type: RESET_PASSWORD_RESEND_OTP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: RESET_PASSWORD_RESEND_OTP__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const checkUserStatus = (username, password) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: CHECK_USER_STATUS__REQUEST
                })
                const { data } = await axios.get('http://localhost:5000/api/check-user-status',
                    { withCredentials: true }
                );
                dispatch({
                    type: CHECK_USER_STATUS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: CHECK_USER_STATUS__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const logOut = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: LOGOUT__REQUEST
                })
                const { data } = await axios.get(`http://localhost:5000/api/logout`,
                    { withCredentials: true });
                dispatch({
                    type: LOGOUT__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: LOGOUT__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const changeEmailAtVerification = () => {
    return (
        async (dispatch) => {
            dispatch({ type: CHANGE_EMAIL_AT_VERIFICATION })
        }
    )
}

const clearErrors = () => {
    return (
        async (dispatch) => {
            dispatch({ type: CLEAR__ERRORS });
        }
    )
}


const clearMessages = () => {
    return (
        async (dispatch) => {
            dispatch({ type: CLEAR__MESSAGES });
        }
    )
}


export { register, changeEmailAtVerification, registerationVerification, otpVericationFailed, resendOTP, login, forgotPassword, resetPasswordVerification, resetPasswordResendOTP, checkUserStatus, logOut, clearErrors, clearMessages };