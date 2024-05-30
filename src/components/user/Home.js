import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'

import Denied from '../Denied'
import UserAction from './UserAction'

const Home = () => {
    const [username,setusername]=useState(null)
 
    useEffect(()=>{
        const name=sessionStorage.getItem("username")
        setusername(name)
    },[])

  return (
    <>
    {username?
    <>
    <Navbar value={username}/>
    <UserAction/>
    </>
    :
     <Denied/>
    }
    </>
  )
}

export default Home