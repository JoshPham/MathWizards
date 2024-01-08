import React, { useState } from 'react'
import useAxios from '../../utils/useAxios'
import { jwtDecode } from 'jwt-decode'

function Dashboard() {
  const [res, setResponse] = useState('') // data
  const api = useAxios()

  const token = localStorage.getItem('authTokens')
  if (token) { // user exists
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
    var first_name = decoded.first_name
  }

  return (
    <>
    <div className="container">
      <div className="main">
        <h5 className='h5'>Welcome, {first_name}</h5>
        <h1 className="h2">My Dashboard</h1>
        <hr/>
      </div>
    </div>
  </>
  )
}

export default Dashboard
