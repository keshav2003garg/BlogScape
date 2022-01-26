import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, updateUserDetails } from '../../../actions/userActions';

const UserSettings = () => {
    const dispatch = useDispatch();

    const { userDetails } = useSelector(state => state.user);
    const { name, username, email, about, avatar, socials, categories, _id } = userDetails;

    const [previewImg, setPreviewImg] = useState(avatar.url);
    const [userDetailsForm, setUserDetailsForm] = useState({
        avatarFile: previewImg,
        name: name,
        username: username,
        email: email,
        password: '',
        categories: categories,
        about: about,
        socials: {
            facebook: socials.facebook,
            instagram: socials.instagram,
            twitter: socials.twitter,
            pinterest: socials.pinterest
        }
    });

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        }
        setUserDetailsForm({ ...userDetailsForm, avatarFile: file })
    }
    const checkBoxState = (e) => {
        if (e.target.checked) {
            setUserDetailsForm({ ...userDetailsForm, categories: [...userDetailsForm.categories, e.target.id] });
        }
    }
    const handleUserData = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(userDetailsForm));
    }

    const deleteUserAccount = () => {
        dispatch(deleteUser(_id));
    }
    return (
        <div className='flex-[9] p-5 pt-7'>
            <div className='mb-7 flex-between'>
                <span className='text-3xl font-mono font-semibold text-[lightcoral]'>Update your Account</span>
                <span className='text-sm font-mono font-semibold text-red-600 cursor-pointer' onClick={deleteUserAccount}>Delete Account</span>
            </div>
            <form className='flex flex-col' onSubmit={handleUserData}>
                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="fileInput"><i className="fas fa-camera mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="fileInput">Profile Picture:</label>
                    </div>

                    {previewImg && <label htmlFor="fileInput">
                        <img className='w-20 h-20 rounded-full object-cover' src={previewImg} />
                    </label>}

                    <input className='hidden' type="file" id="fileInput" onChange={handleImage} />
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="name"><i className="fas fa-male mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="name">Name:</label>
                    </div>
                    <input placeholder={name} className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="name" name='name' value={userDetailsForm.name} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, [e.target.name]: e.target.value }) }} />
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="username"><i className="fas fa-user mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="username">Username:</label>
                    </div>
                    <input placeholder={username} className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="username" name='username' value={userDetailsForm.username} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, [e.target.name]: e.target.value }) }} />
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="email"><i className="fas fa-at mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="email">Email:</label>
                    </div>
                    <input disabled placeholder={email} className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="email" name='email' value={userDetailsForm.email} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, [e.target.name]: e.target.value }) }} />
                </div>

                <div className='m-4 mb-7'>
                    <div className='flex items-center'>
                        <label htmlFor="password"><i className="fas fa-key mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="password">Password:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="password" name='password' onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, [e.target.name]: e.target.value }) }} />
                </div>

                <div className='m-4 mb-7'>
                    <div className='flex items-center'>
                        <label><i className="fas fa-boxes mr-1"></i></label>
                        <label className='text-lg font-josefin'>Blog Categories:</label>
                    </div>
                    <div className='checkbox-styling'>
                        {["Food", "Travel", "Health&Fitness", "LifeStyle", "Fashion", "Beauty", "Music", "Bussiness", "Movie", "Religion", "Politics", "Sports", "Art"].map((n, i) => {
                            return (
                                <div key={i}>
                                    <input defaultChecked={userDetailsForm.categories.includes(n) ? true : false} type="checkbox" id={n} onChange={checkBoxState} />
                                    <label htmlFor={n}>{n}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='m-4 mb-7'>
                    <div className='flex items-center'>
                        <label htmlFor="socialmedia"><i className="fas fa-hashtag mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="socialmedia">Social Media Handles:</label>
                    </div>
                    <div className='flex items-center mb-2'>
                        <label htmlFor="facebook"><i className="fab fa-facebook text-2xl mr-3"></i></label>
                        <input className='p-1 pl-3 w-[50%] border border-slate-400 rounded focus:outline-none font-lora' type="text" id="facebook" value={userDetailsForm.socials.facebook} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, socials: { ...userDetailsForm.socials, [e.target.id]: e.target.value } }) }} />
                    </div>
                    <div className='flex items-center mb-2'>
                        <label htmlFor="instagram"><i className="fab fa-instagram text-2xl mr-4"></i></label>
                        <input className='p-1 pl-3 w-[50%] border border-slate-400 rounded focus:outline-none font-lora' type="text" id="instagram" value={userDetailsForm.socials.instagram} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, socials: { ...userDetailsForm.socials, [e.target.id]: e.target.value } }) }} />
                    </div>
                    <div className='flex items-center mb-2'>
                        <label htmlFor="twitter"><i className="fab fa-twitter text-2xl mr-4"></i></label>
                        <input className='p-1 pl-3 w-[50%] border border-slate-400 rounded focus:outline-none font-lora' type="text" id="twitter" value={userDetailsForm.socials.twitter} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, socials: { ...userDetailsForm.socials, [e.target.id]: e.target.value } }) }} />
                    </div>
                    <div className='flex items-center mb-2'>
                        <label htmlFor="pinterest"><i className="fab fa-pinterest text-2xl mr-4"></i></label>
                        <input className='p-1 pl-3 w-[50%] border border-slate-400 rounded focus:outline-none font-lora' type="text" id="pinterest" value={userDetailsForm.socials.pinterest} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, socials: { ...userDetailsForm.socials, [e.target.id]: e.target.value } }) }} />
                    </div>
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="about"><i className="fas fa-address-card mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="about">About:</label>
                    </div>
                    <textarea placeholder={about} className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="about" name='about' value={userDetailsForm.about} onChange={(e) => { setUserDetailsForm({ ...userDetailsForm, [e.target.name]: e.target.value }) }} />
                </div>

                <div className='m-4 flex-center'>
                    <input className='p-2 px-3 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Update" />
                </div>
            </form>
        </div>
    )
}

export default UserSettings
