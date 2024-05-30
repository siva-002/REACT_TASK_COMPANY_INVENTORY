import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/DataContext'
import { FaRegUserCircle } from "react-icons/fa";
import {
  Icon,Flex,Text
} from '@chakra-ui/react'

const getcustomerprofile=(allcustomers,cid)=>{
  const find=allcustomers?.find((item)=>item.customer==cid)
  return find
}
export const getcustomername=(allcustomers,cid)=>{
  const user=getcustomerprofile(allcustomers,cid) 
  return user.customer_profile.name
}

export const getcustomerpic=(allcustomers,cid)=>{
  const user=getcustomerprofile(allcustomers,cid)
  const [r,g,b]=user?.customer_profile.color
  const clr=`rgb(${r},${g},${b})`
  return  <Icon as={FaRegUserCircle} boxSize={5} color={clr}/>
}

