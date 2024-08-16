import React from 'react'


function Bottomwarning({label, buttontext, onclick}) {
  return (
    <div className='flex justify-center mt-3 items-center '>
    <div className=" px-2 text-lg">{label}</div>
    <div className="text-xl cursor-pointer hover:text-yellow-500">
    <button onClick={onclick}>{buttontext}</button>
     </div> 
    </div>
  )
}

export default Bottomwarning
