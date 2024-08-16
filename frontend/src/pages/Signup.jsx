import React from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import Inputfield from '../components/Inputfield'
import Button from '../components/Button'
import Bottomwarning from '../components/Bottomwarning'


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'  
function Signup() {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()

  return (
    <div className='flex justify-center items-center h-screen bg-slate-500'>
        <div className="flex w-[40vw]  justify-center flex-col bg-white border-8 rounded-md p-6">
            <Heading label="Sign Up"  subHeading={'Enter your information to create the account '} />
            <Inputfield onchange={(e)=> setFirstName(e.target.value)} label="First Name" type="text" placeholder="Enter your first name"/>
            <Inputfield onchange={(e)=>{
                setLastName(e.target.value)
            }} label="Last Name" type="text" placeholder="Enter your last name"/>
            <Inputfield onchange={(e)=>{
                setUsername(e.target.value)
            }} label="Username" type="text" placeholder="Enter your email"/>
            <Inputfield onchange={(e)=>{
                setPassword(e.target.value)
            }} label="Password" type="text" placeholder="Enter the password"/>
            <div className='flex justify-center'>
            <Button label={'Sign Up'} onclick={async ()=>{
                axios.post('http://localhost:3000/user/signup', {
                    firstName,
                    lastName,
                    username,
                    password
                })
                .then((response)=>{
                    console.log('here is the response from the server:')
                    console.log(response.data)
                    localStorage.setItem("token", response.data.token)
                })
                .catch((error)=>{
                    console.log('here is the error from the server:')
                    console.log(error)
                })
                // navigate('/dashboard')
            }} />
            </div>
              <Bottomwarning label="Already have an account?"  buttontext="Sign In " onclick={()=>{
                navigate('/signin')
              }} />
    
        </div>
      
    </div>
  )
}

export default Signup
