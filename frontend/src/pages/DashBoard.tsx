// import { useState } from 'react'
// import { useEffect } from 'react'
// import { api } from '../services/api'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/Home.scss'


export function DashBoard() {

  const {user} = useContext(AuthContext)  
    
  return (
    <div>
      <h1>
        {user?.name}
      </h1>
    </div>
  )
}