import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RegisterForm from '../../layouts/Forms/RegisterForm';
import OtpVerificationForm from '../../layouts/Forms/OtpVerificationForm';
import { register, registerationVerification } from '../../../actions/userActions';

const Registration = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { isOTPsend, userId, isAuthenticated } = useSelector(state => state.user);

    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });
    
    const [otp, setOtp] = useState('');
    const handleRegistration = (e) => {
        e.preventDefault();
        const { name, username, email, password } = credentials;
        dispatch(register(name, username, email, password));
    }
    const handleVerification = (e) => {
        e.preventDefault();
        dispatch(registerationVerification(otp, userId));
    }
    useEffect(() => {
        if (isAuthenticated) {
            history('/');
        }
    }, [isAuthenticated])


    return (
        <div className='h-[calc(100vh-48px)] bg-cover flex-center' style={{ backgroundImage: "url(./images/register-bg.jpg)" }}>
            {!isOTPsend ?
                <RegisterForm credentials={credentials} setCredentials={setCredentials} handleRegistration={handleRegistration} />
                :
                <OtpVerificationForm otp={otp} setOtp={setOtp} handleVerification={handleVerification} />}
        </div>
    )
}

export default Registration;
