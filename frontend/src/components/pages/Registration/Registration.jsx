import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RegisterForm from '../../layouts/Forms/RegisterForm';
import OtpVerificationForm from '../../layouts/Forms/OtpVerificationForm';
import { register, registerationVerification } from '../../../actions/userActions';

const Registration = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isOTPsend, isVerified, response, isAuthenticated } = useSelector(state => state.user);
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
        const userID = response.userId;
        dispatch(registerationVerification(otp, userID));
    }
    if (isAuthenticated == true) {
        history.push('/');
    }

    return (
        <div className='h-[calc(100vh-48px)] bg-cover flex-center' style={{ backgroundImage: "url(./images/register-bg.jpg)" }}>
            {(isOTPsend == false || isOTPsend == undefined || isVerified == true) ?
                <RegisterForm credentials={credentials} setCredentials={setCredentials} handleRegistration={handleRegistration} />
                :
                <OtpVerificationForm otp={otp} setOtp={setOtp} handleVerification={handleVerification} />}
        </div>
    )
}

export default Registration;
