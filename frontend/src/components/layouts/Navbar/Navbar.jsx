import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ isAuthenticated, handleLogout }) => {
    const userState = useSelector(state => state.user);
    if (isAuthenticated) {
        const { avatar, socials } = userState.userDetails;
        return (
            <nav className='w-full h-[48px] flex sticky top-0 font-josefin'>
                <div className='flex-[3] flex-center icon-styling-container'>
                    <>
                        {!socials.facebook ? null : <a href={socials.facebook} target='_blank'><i className="fab fa-facebook"></i></a>}
                        {!socials.twitter ? null : <a href={socials.twitter} target='_blank'><i className="fab fa-twitter"></i></a>}
                        {!socials.pinterest ? null : <a href={socials.pinterest} target='_blank'><i className="fab fa-pinterest"></i></a>}
                        {!socials.instagram ? null : <a href={socials.instagram} target='_blank'><i className="fab fa-instagram"></i></a>}
                    </>
                </div>
                <div className='flex-[6] flex-center'>
                    <ul className='list-styling'>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/my-posts'>MYPOSTS</Link></li>
                        <li><Link to='/write'>WRITE</Link></li>
                        <li><Link to='/me'>ACCOUNT</Link></li>
                        <li onClick={handleLogout}>LOGOUT</li>
                    </ul>
                </div>
                <div className='flex-[3] flex-center'>
                    <>
                        {!avatar.url ? null : <Link to='/me'>< img className='mr-5 w-10 h-10 rounded-full object-cover cursor-pointer' src={avatar.url} /></Link>}
                        <i className="fas fa-search icon-styling"></i>
                    </>
                </div>
            </nav >
        )
    }
    else {
        return (
            <nav className='w-full h-[48px] flex sticky top-0 font-josefin'>
                <div className='flex-[3] flex-center icon-styling-container'>{null}</div>
                <div className='flex-[6] flex-center'>
                    <ul className='list-styling'>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/login'>LOGIN</Link></li>
                        <li><Link to='/register'>SIGNUP</Link></li>
                    </ul>
                </div>
                <div className='flex-[3] flex-center'>{null}</div>
            </nav >
        )
    }
}

export default Navbar;


