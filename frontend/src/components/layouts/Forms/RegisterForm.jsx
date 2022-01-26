import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ credentials, setCredentials, handleRegistration }) => {
    return (
        <form className='p-5 w-[30%] border border-slate-400 rounded-xl' onSubmit={handleRegistration}>
            <div className='m-4'>
                <div>
                    <label htmlFor="name"><i className="fas fa-male text-lg mr-2"></i></label>
                    <label className='text-lg font-josefin' htmlFor="name">Name:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="name" name='name' value={credentials.name} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
            </div>
            <div className='m-4'>
                <div>
                    <label htmlFor="username"><i className="fas fa-user mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="username">Username:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="username" name='username' value={credentials.username} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
            </div>
            <div className='m-4'>
                <div>
                    <label htmlFor="email"><i className="fas fa-at mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="email">Email:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="email" id="email" name='email' value={credentials.email} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
            </div>
            <div className='m-4 mb-7'>
                <div>
                    <label htmlFor="password"><i className="fas fa-key mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="password">Password:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="password" name='password' value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }) }} />
            </div>
            <div className='m-4 flex-center'>
                <input className='p-2 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Register" />
            </div>
            <Link to='/login' ><div className='text-center font-lora text-slate-500 cursor-pointer'>Already Registered? Login</div></Link>
        </form>
    )
}

export default RegisterForm;
