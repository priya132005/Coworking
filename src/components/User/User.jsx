import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const{userid}=useParams()
  return (
    <div className='p-4 text-3xl text-white bg-blue-600'>User: {userid}</div>
  )
}

export default User