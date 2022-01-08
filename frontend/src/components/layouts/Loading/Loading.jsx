import React from 'react';

const Loading = () => {
    return (
        <div className='w-full h-full fixed top-0 div-center' style={{background: "rgb(28 29 30 / 66%)"}}>
            <div className="flex-center w-[5%] h-[10%] bg-white border-[3px] border-white rounded">
                <div className="w-[50%] h-[50%] border-[5px] border-white border-t-[5px] border-t-slate-700 rounded-full animate-spin"></div>
            </div>
        </div>
    )
}

export default Loading;
