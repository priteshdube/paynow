import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'


import Search from './Search'
import Button from './Button'

function Userlist() {
    const [search, setSearch] = useState('')
  
    const [users, setUsers] = useState([])

    useEffect(() => {
         axios.get('http://localhost:3000/user/search?filter='+ search)
            .then((response)=>{
                console.log('here is the response:')
                console.log(response.data.users)
                setUsers(response.data.users)
            }) 
    }, [search])

  return (
    <div>
      <Search onchange={(e)=>{
        setSearch(e.target.value)
      }}/>

        <div>

           
            {users.map((user, index)=> <User user={user} key={index}/>)}
            
        </div>


    </div>
  )
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between px-7">
        <div className="flex items-center py-5">
            <div className="rounded-full h-10 w-10 text-black font-bold text-lg bg-slate-100 flex justify-center items-center">
            {user.firstName[0]}
            </div>
            <div className="">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="">
          <Button label={"Pay Now"} onclick={()=>{
             navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }} />
        </div>
       
    </div>
}


export default Userlist
