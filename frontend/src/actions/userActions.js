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
    UPDATE_USERDETAILS__REQUEST, UPDATE_USERDETAILS__SUCCESS, UPDATE_USERDETAILS__FAIL,
    DELETE_USER__REQUEST, DELETE_USER__SUCCESS, DELETE_USER__FAIL,

    CLEAR__ERRORS, CLEAR__MESSAGES
} from '../constants/userConstants';

import { SocialLinks } from 'social-links';

const host = process.env.REACT_APP_HOST;

const register = (name, username, email, password) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: REGISTER__REQUEST
                })
                const { data } = await axios.post(`${host}/api/register`,
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
                const { data } = await axios.post(`${host}/api/verify-otp/${userId}`,
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
                await axios.get(`${host}/api/delete-user/${userId}`);
                dispatch({
                    type: OTP_VERIFICATION_FAILURE__SUCCESS,
                })
            } catch (error) {
                dispatch({
                    type: OTP_VERIFICATION_FAILURE__FAIL
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
                const { data } = await axios.get(`${host}/api/resend-otp/${userId}`);
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
                const { data } = await axios.post(`${host}/api/login`,
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
                const { data } = await axios.post(`${host}/api/forgot-password`,
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
                const { data } = await axios.post(`${host}/api/verify-reset-password/${userId}`,
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
                const { data } = await axios.get(`${host}/api/resend-reset-password-otp/${userId}`);
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


const checkUserStatus = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: CHECK_USER_STATUS__REQUEST
                })
                const { data } = await axios.get(`${host}/api/check-user-status`,
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
                const { data } = await axios.get(`${host}/api/logout`,
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


const updateUserDetails = ({ avatarFile, name, username, email, password, categories, about, socials }) => {
    const socialLinks = new SocialLinks();
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: UPDATE_USERDETAILS__REQUEST
                })
                const socialLink = {
                    facebook: '',
                    instagram: '',
                    twitter: '',
                    pinterest: ''
                }
                if (!avatarFile) {
                    dispatch({
                        type: UPDATE_USERDETAILS__FAIL,
                        payload: "Please select your Profile Picture"
                    })
                    return;
                }
                if (socials.facebook != '') {
                    const facebookLink = socialLinks.sanitize('facebook', socials.facebook);
                    socialLink.facebook = facebookLink;
                }
                if (socials.instagram != '') {
                    const instagramLink = socialLinks.sanitize('instagram', socials.instagram);
                    socialLink.instagram = instagramLink;
                }
                if (socials.instagram != '') {
                    const instagramLink = socialLinks.sanitize('instagram', socials.instagram);
                    socialLink.instagram = instagramLink;
                }
                if (socials.twitter != '') {
                    const twitterLink = socialLinks.sanitize('twitter', socials.twitter);
                    socialLink.twitter = twitterLink;
                }
                if (socials.pinterest != '') {
                    const pinterestLink = socialLinks.sanitize('linkedin', socials.pinterest);
                    socialLink.pinterest = pinterestLink;
                }
                console.log(socialLink);
                const imgData = new FormData();
                imgData.append('file', avatarFile)
                imgData.append('upload_preset', 'xoswttyc')
                imgData.append('cloud_name', "doizgsvpt")
                const response = await fetch("https://api.cloudinary.com/v1_1/doizgsvpt/image/upload", { method: "POST", body: imgData });
                const { public_id, url } = await response.json();
                const publicID = public_id;
                const Url = url;
                const avatar = { public_id: publicID, url: Url }
                const { data } = await axios.put(`${host}/api/update-profile`,
                    { avatar, name, username, email, password, categories, about, socials: socialLink },
                    { withCredentials: true }
                );
                dispatch({
                    type: UPDATE_USERDETAILS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: UPDATE_USERDETAILS__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const deleteUser = (userId) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: DELETE_USER__REQUEST
                })
                const { data } = await axios.get(`${host}/api/delete-user/${userId}`);
                dispatch({
                    type: DELETE_USER__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: DELETE_USER__FAIL,
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


export {
    register,
    changeEmailAtVerification,
    registerationVerification,
    otpVericationFailed, resendOTP,
    login,
    forgotPassword,
    resetPasswordVerification,
    resetPasswordResendOTP,
    checkUserStatus,
    logOut,
    updateUserDetails,
    deleteUser,
    clearErrors, clearMessages
};