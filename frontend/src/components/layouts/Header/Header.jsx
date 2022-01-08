import React from 'react';

const Header = () => {
    return (
        <header className='mt-16'>
            <div className='flex-center font-lora text-[#444] relative'>
                <span className='absolute top-0 text-xl'>React & Node</span>
                <span className='absolute top-[29px] text-8xl'>Blog</span>
            </div>
            <img className="mt-20 w-full h-[650px]" src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </header>
    )
}

export default Header;
