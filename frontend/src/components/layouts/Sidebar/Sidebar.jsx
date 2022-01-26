import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { userDetails } = useSelector(state => state.user);
    const { about, avatar, categories, socials } = userDetails;
    return (
        <>
            {!avatar.url && !about && categories.length == 0 && socials.facebook == '' && socials.twitter == '' && socials.pinterest == '' && socials.instagram == '' ? null : < aside className='m-5 pb-8 flex-[3] flex flex-col bg-[#fdfbfb]'>
                <div className='flex-col-center'>
                    <span className="m-2 my-1 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">ABOUT ME</span>
                    <img className='mt-4' src={avatar.url || ''} />
                    <p className='px-9 py-5 break-all font-lora'>{about}</p>
                </div>
                {categories.length == 0 ? null : <div className='flex-col-center w-full'>
                    <span className="m-2 mt-1 mb-5 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">CATEGORIES</span>
                    <ul className='p-1 list-styling-around'>
                        <li>{categories[0]}</li>
                        <li>{categories[1]}</li>
                        <li>{categories[2]}</li>
                    </ul>
                    <ul className='p-1 list-styling-around'>
                        <li>{categories[3]}</li>
                        <li>{categories[4]}</li>
                        <li>{categories[5]}</li>
                    </ul>
                </div>}
                {socials.facebook == '' && socials.twitter == '' && socials.pinterest == '' && socials.instagram == '' ? null : <div className='flex-col-center w-full'>
                    <span className="m-2 my-5 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">FOLLOW US</span>
                    <div className='icon-styling-container'>
                        {socials.facebook == '' ? null : <a href={socials.facebook} target='_blank'><i className="fab fa-facebook"></i></a>}
                        {socials.twitter == '' ? null : <a href={socials.twitter} target='_blank'><i className="fab fa-twitter"></i></a>}
                        {socials.pinterest == '' ? null : <a href={socials.pinterest} target='_blank'><i className="fab fa-pinterest"></i></a>}
                        {socials.instagram == '' ? null : <a href={socials.instagram} target='_blank'><i className="fab fa-instagram"></i></a>}
                    </div>
                </div>}
            </aside>}
        </>
    )
}

export default Sidebar
