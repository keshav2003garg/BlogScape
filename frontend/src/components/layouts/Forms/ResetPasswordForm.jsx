import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeEmailAtVerification, resetPasswordResendOTP } from '../../../actions/userActions';

const ResetPasswordForm = ({ resetDetails, setResetDetails, handleResetPasswordVerification }) => {
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.user);
    
    const handleResendOTP = () => {
        dispatch(resetPasswordResendOTP(userId));
    }
    const handleChangeEmail = () => {
        dispatch(changeEmailAtVerification());
    }
    return (
        <>
            <form className='p-5 w-[30%] border border-slate-400 rounded-xl' onSubmit={handleResetPasswordVerification}>
                <span className='text-left font-lora text-slate-400 cursor-pointer' onClick={handleChangeEmail}>Change EMail</span>
                <div className='m-4 mb-7'>
                    <div>
                        <label htmlFor="otp"><i className="fas fa-key mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="otp">OTP:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="otp" name='otp' value={resetDetails.otp} onChange={(e) => { setResetDetails({ ...resetDetails, [e.target.name]: e.target.value }) }} />
                    <span className='text-right font-lora text-slate-400 cursor-pointer' onClick={handleResendOTP}>Resend OTP</span>
                </div>
                <div className='m-4 mb-7'>
                    <div>
                        <label htmlFor="password"><i className="fas fa-key mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="password">Password:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="password" name='password' value={resetDetails.password} onChange={(e) => { setResetDetails({ ...resetDetails, [e.target.name]: e.target.value }) }} />
                </div>
                <div className='m-4 mb-7'>
                    <div>
                        <label htmlFor="confirmPassword"><i className="fas fa-key mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="confirmPassword">Confirm Password:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="confirmPassword" name='confirmPassword' value={resetDetails.confirmPassword} onChange={(e) => { setResetDetails({ ...resetDetails, [e.target.name]: e.target.value }) }} />
                </div>
                <div className='m-4 flex-center'>
                    <input className='p-2 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Request OTP" />
                </div>
            </form>
        </>
    )
}

export default ResetPasswordForm;
