import React from 'react'

const Inputfield = ({label, placeholder, onchange}) => {
  return (
    <div className='py-2'>
        <label htmlFor="name">{label}</label>
        <input onChange={onchange} type="text" placeholder={placeholder} className="w-full p-2 border-2 border-slate-500 rounded-md"/>
    </div>
  )
}

export default Inputfield
