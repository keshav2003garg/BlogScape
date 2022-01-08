import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ credentials, setCredentials, handleLogin }) => {
    let history = useHistory();
    return (
        <form className='p-5 border border-slate-400 rounded-xl' onSubmit={handleLogin} >
            <div className='m-4'>
                <div>
                    <label htmlFor="username"><i className="fas fa-user mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="username">Username:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="username" name='username' value={credentials.username} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
            </div>
            <div className='m-4 mb-7'>
                <div className='flex items-center'>
                    <label htmlFor="password"><i className="fas fa-key mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="password">Password:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="password" name='password' value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
                <div className='text-right font-lora text-slate-400 cursor-pointer' onClick={() => { history.push('/forgot-password') }}>Forgot Password?</div>
            </div>
            <div className='m-4 flex-center'>
                <input className='p-2 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Login" />
            </div>
            <div className='text-center font-lora text-slate-500 cursor-pointer' onClick={() => { history.push('/register') }}>New? Register Now</div>
        </form>
    )
}

export default LoginForm;
