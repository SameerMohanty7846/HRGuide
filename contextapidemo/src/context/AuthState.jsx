import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { use } from 'react'
import axios from 'axios'
const AuthState = ({children}) => {
  const[users,setUsers]=useState([])
  useEffect(()=>{
    async function fetchingData(){
        const response= await axios.get("https://jsonplaceholder.typicode.com/users");
         setUsers(response.data)

    }
    fetchingData()



  },[])


  return (
    <AuthContext.Provider value={{users,setUsers}}>
        {children}
      
    </AuthContext.Provider>
  )
}

export default AuthState
