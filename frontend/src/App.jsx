import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transfer from './pages/Transfer.jsx'


function App() {
  

  return (
    <> 
     <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transfer' element={<Transfer />} />
      </Routes>
      
     </Router>
    </>
  )
}

export default App
