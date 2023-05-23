import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../layouts/Forms/LoginForm';
import { login } from '../../../actions/userActions';

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { isAuthenticated } = useSelector(state => state.user);

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = credentials;
        dispatch(login(username, password));
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            history('/');
        }
    }, [isAuthenticated])

    return (
        <div className='h-[calc(100vh-48px)] bg-cover flex-center' style={{ backgroundImage: "url(./images/login-bg.jpg)" }}>
            <LoginForm credentials={credentials} setCredentials={setCredentials} handleLogin={handleLogin} />
        </div>
    )
}

export default Login;
