import React from 'react'

const Sidebar = () => {
    return (
        <aside className='m-5 pb-8 flex-[3] flex flex-col bg-[#fdfbfb]'>
            <div className='flex-col-center'>
                <span className="m-2 my-1 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">ABOUT ME</span>
                <img className='mt-4' src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" />
                <p className='px-9 py-5 break-all font-lora'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident illum nemo ipsam temporibus debitis sint ex, maiores natus. Cupiditate, harum.</p>
            </div>
            <div className='flex-col-center w-full'>
                <span className="m-2 mt-1 mb-5 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">CATEGORIES</span>
                <ul className='p-1 list-styling-around'>
                    <li>Life</li>
                    <li>Music</li>
                    <li>Style</li>
                </ul>
                <ul className='p-1 list-styling-around'>
                    <li>Sports</li>
                    <li>Technology</li>
                    <li>Cinema</li>
                </ul>
            </div>
            <div className='flex-col-center w-full'>
                <span className="m-2 my-5 p-1 w-4/5 border-y border-[#a7a4a4] text-lg text-center font-varelaRound font-semibold">FOLLOW US</span>
                <div className='icon-styling-container'>
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-pinterest"></i>
                    <i className="fab fa-instagram"></i>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
