import React, { useEffect, useState } from 'react'
import { Flex,Box,Heading,IconButton ,Tooltip,Icon} from '@chakra-ui/react'
import Theme from './Theme'
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = ({value}) => {
    const usenav=useNavigate()
    const Logout=()=>{
        usenav("/user/logout")
    }
  return (
   <Flex justifyContent={"space-between"} p={"30px"} boxShadow={"0px 0px 5px lightgrey"}>
    <Box>
        <Heading size="lg" textTransform="capitalize" letterSpacing="2px">
            {value}
        </Heading>
    </Box>
    <Box display="flex" gap="10px">
         <Theme/>
        {value!=="Login"&&
        <Tooltip label="Logout">
        <IconButton  icon={<Icon as={FaSignOutAlt }/>} onClick={Logout}></IconButton>
        </Tooltip>
        }
        
    </Box>
   </Flex>
  )
}

export default Navbar