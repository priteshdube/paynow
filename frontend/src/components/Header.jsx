import React from 'react'

function Header() {
  return (
    <div className='flex justify-between px-3 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>

        <div className='text-2xl font-bold  '>PayNow</div>

        <div className="text-2xl rounded-full bg-black text-white p-3">Me</div>
      
    </div>
  )
}

export default Header
