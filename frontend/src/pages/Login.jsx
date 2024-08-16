import React from 'react'

import Heading from '../components/Heading'
import Inputfield from '../components/Inputfield'
import Button from '../components/Button'
import Bottomwarning from '../components/Bottomwarning'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className='flex justify-center items-center h-screen bg-slate-500'>
      <div className="flex w-[40vw]  justify-center flex-col bg-white border-8 rounded-md p-6">
        <Heading label="Sign In"  subHeading={'Enter your login credentials'}/>
        <Inputfield onchange={(e) => {
          setUsername(e.target.value)
        }} label="Username" type="text" placeholder="Enter your email" />
        <Inputfield onchange={(e) => {
          setPassword(e.target.value)
        }} label="Password" type="text" placeholder="Enter the password" />

        <div className='flex justify-center'>
          <Button label={'Sign In'} onclick={async () => {
            axios.post('http://localhost:3000/user/signin', {
              username,
              password
            })
              .then((response) => {
                console.log('here is the response from the server:')
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
              })
              .catch((error) => {
                console.log('here is the error from the server:')
                console.log(error)
              })
            // navigate('/dashboard')
          }} />
        </div>

        <Bottomwarning label="Don't have an account?"  buttontext="Sign Up " onclick={()=>{
                navigate('/signup')
              }} />
      </div>
    </div>
  )
        }

      export default Login
