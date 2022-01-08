import React from 'react'

const UserSettings = () => {
    return (
        <div className='flex-[9] p-5 pt-7'>
            <div className='mb-7 flex-between'>
                <span className='text-3xl font-mono font-semibold text-[lightcoral]'>Update your Account</span>
                <span className='text-sm font-mono font-semibold text-red-600 cursor-pointer'>Delete Account</span>
            </div>
            <form className='flex flex-col'>
                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="fileInput"><i className="fas fa-camera mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="fileInput">Profile Picture:</label>
                    </div>
                    <label htmlFor="fileInput"><img className='w-20 h-20 rounded-full object-cover' src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" /></label>
                    <input className='hidden' type="file" id="fileInput" />
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="username"><i className="fas fa-user mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="username">Username:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="username" />
                </div>

                <div className='m-4'>
                    <div className='flex items-center'>
                        <label htmlFor="email"><i className="fas fa-at mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="email">Email:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="text" id="email" />
                </div>

                <div className='m-4 mb-7'>
                    <div className='flex items-center'>
                        <label htmlFor="password"><i className="fas fa-key mr-1"></i></label>
                        <label className='text-lg font-josefin' htmlFor="password">Password:</label>
                    </div>
                    <input className='p-1 pl-3 w-full border border-slate-400 rounded focus:outline-none font-lora' type="password" id="password" />
                </div>

                <div className='m-4 flex-center'>
                    <input className='p-2 px-3 w-full text-white font-lora bg-[teal] rounded-xl cursor-pointer' type="submit" value="Update" />
                </div>
            </form>
        </div>
    )
}

export default UserSettings
