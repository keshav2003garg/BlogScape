import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav className='w-full h-[48px] flex sticky top-0 font-josefin'>
            <div className='flex-[3] flex-center icon-styling-container'>
                {isAuthenticated == false || isAuthenticated == undefined ?
                    null :
                    <>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-instagram"></i>
                    </>
                }
            </div>
            <div className='flex-[6] flex-center'>
                {isAuthenticated == false || isAuthenticated == undefined ?
                    <ul className='list-styling'>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/login'>LOGIN</Link></li>
                        <li><Link to='/register'>SIGNUP</Link></li>
                    </ul>
                    :
                    <ul className='list-styling'>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/my-posts'>MYPOSTS</Link></li>
                        <li><Link to='/write'>WRITE</Link></li>
                        <li><Link to='/me'>ACCOUNT</Link></li>
                        <li onClick={handleLogout}>LOGOUT</li>
                    </ul>
                }
            </div>
            <div className='flex-[3] flex-center'>
                {isAuthenticated == false || isAuthenticated == undefined ?
                    null
                    :
                    <>
                        < img className='mr-5 w-12 rounded-full' src="https://randomuser.me/api/portraits/thumb/men/7.jpg" />
                        <i className="fas fa-search icon-styling"></i>
                    </>}
            </div>
        </nav>
    )
}

export default Navbar;
