import React, { useEffect, useState } from 'react'
import { Alert,AlertTitle,AlertIcon,AlertDescription} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Denied = () => {
    const [wait,setwait]=useState(false)
    useEffect(()=>{
        setTimeout(() => {
         setwait(true)
        }, 1000);
    },[])
  return (
    wait&&
    <Alert status='error'>
    <AlertIcon />
    <AlertTitle>You are not allowed to view this page</AlertTitle>
    <AlertDescription>Please Login to access this page <Link to="/"><b>click here to login</b></Link></AlertDescription>
    </Alert>
    
  )
}

export default Denied