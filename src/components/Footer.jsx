import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full'>
            <div className="logo font-bold text-2xl">

                <span className='text-green-700'> &lt;</span>
                <span>Pass</span>
                <span className="text-green-500">OP/&gt;</span>


            </div>
            <div>
                Created with <img src="icons/heart.png" alt="heart" className="inline h-4 w-4 mx-1" /> by Abhishek
            </div>

        </div>
    )
}

export default Footer


