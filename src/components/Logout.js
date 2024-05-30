import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert,AlertTitle,AlertIcon,AlertDescription} from '@chakra-ui/react'
const Logout = () => {
        const usenav= useNavigate()
        sessionStorage.removeItem("username") 
        setTimeout(() => {
            usenav("/")
        }, 2000);
        return( <Alert status='info'>        
        <AlertIcon/>
        <AlertTitle>Logged out successfully</AlertTitle>
        <AlertDescription>Redirecting to home page <Link to="/"><b>click here to home</b></Link></AlertDescription>
        </Alert>)      
        
}

export default Logout