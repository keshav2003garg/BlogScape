import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ForgotPasswordForm from '../../layouts/Forms/ForgotPasswordForm';
import ResetPasswordForm from '../../layouts/Forms/ResetPasswordForm';
import { forgotPassword, resetPasswordVerification } from '../../../actions/userActions';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isOTPsend, userId, isAuthenticated } = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const [resetDetails, setResetDetails] = useState({
        otp: '',
        password: '',
        confirmPassword: ''
    });
    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }
    const handleResetPasswordVerification = (e) => {
        e.preventDefault();
        const { otp, password, confirmPassword } = resetDetails;
        dispatch(resetPasswordVerification(otp, password, confirmPassword, userId));
    }
    useEffect(()=>{
        if (isAuthenticated) {
            history('/');
        }
    },[isAuthenticated])
    return (
        <div className='h-[calc(100vh-48px)] bg-cover flex-center' style={{ backgroundImage: "url(./images/login-bg.jpg)" }}>
            {!isOTPsend ?
                <ForgotPasswordForm email={email} setEmail={setEmail} handleForgotPassword={handleForgotPassword} />
                :
                <ResetPasswordForm resetDetails={resetDetails} setResetDetails={setResetDetails} handleResetPasswordVerification={handleResetPasswordVerification} />}
        </div>
    )
}

export default ForgotPassword;
