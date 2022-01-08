import React from 'react';

const ForgotPasswordForm = ({ email, setEmail, handleForgotPassword }) => {
    return (
        <form className='p-5 w-[30%] border border-slate-400 rounded-xl' onSubmit={handleForgotPassword}>
            <div className='m-4'>
                <div>
                    <label htmlFor="email"><i className="fas fa-at mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="email">Email:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className='m-4 flex-center'>
                <input className='p-2 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Request OTP" />
            </div>
        </form>
    )
}

export default ForgotPasswordForm;
