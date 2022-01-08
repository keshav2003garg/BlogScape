import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../layouts/Loading/Loading';
import { changeEmailAtVerification, resendOTP } from '../../../actions/userActions';

const OtpVerificationForm = ({ otp, setOtp, handleVerification }) => {
    const dispatch = useDispatch();
    const { loading, response } = useSelector(state => state.user);
    const handleResendOTP = () => {
        const userID = response.userId;
        dispatch(resendOTP(userID));
    }
    const handleChangeEmail = () => {
        dispatch(changeEmailAtVerification());
    }
    return (
        <form className='p-5 w-[30%] border border-slate-400 rounded-xl' onSubmit={handleVerification}>
            <span className='text-left font-lora text-slate-400 cursor-pointer' onClick={handleChangeEmail}>Change EMail</span>
            <div className='m-4 mb-7'>
                <div>
                    <label htmlFor="otp"><i className="fas fa-key mr-1"></i></label>
                    <label className='text-lg font-josefin' htmlFor="otp">OTP:</label>
                </div>
                <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="otp" value={otp} onChange={(e) => { setOtp(e.target.value) }} />
                <span className='text-right font-lora text-slate-400 cursor-pointer' onClick={handleResendOTP}>Resend OTP</span>
            </div>
            <div className='m-4 flex-center'>
                <input className='p-2 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Verify" />
            </div>
            {loading ? <Loading /> : null}
        </form>
    )
}

export default OtpVerificationForm;
