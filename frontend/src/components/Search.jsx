import React from 'react'

const Search = ({onchange}) => {
  return (
    <div className='mt-[3rem] flex justify-around'>
        <div className="w-[60vw] ">
            <input onChange={onchange} type="text" placeholder="Search" className="w-full p-2 border-2 border-slate-500 rounded-md"/>
        </div>
      
    </div>
  )
}

export default Search
