import React from 'react'

const Heading = ({label, subHeading}) => {
  return (
    <>
    <div className='flex flex-col items-center border-solid my-5'>
        <div className="font-bold text-2xl">
        {label}
        </div>
       
        <div className="text-lg ">{subHeading}</div>
    </div>
   
    </>
  )
}

export default Heading
