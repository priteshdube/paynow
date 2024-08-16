import React from 'react'

const Button = ({label, onclick}) => {
  return (
    <div className='p-3 bg-black text-white font-semibold text-lg rounded-lg'>
      <button onClick={onclick}  >{label}</button>
    </div>
  )
}

export default Button
