import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center  py-5 h-14">

        <div className="logo font-bold text-2xl">

          <span className='text-green-700'> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>


        </div>
        <ul>
          <li className="flex gap-4">
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul>

        <button className='text-white flex gap-1 justify-center items-center cursor-pointer '>
          <img className='invert' src="/icons/github.svg" alt="github logo" />
          <span className="font-bold">Github</span>
        </button>
        

      </div>
    </nav>
  )
}

export default Navbar
