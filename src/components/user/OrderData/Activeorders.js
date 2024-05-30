import React, { useContext, useEffect,useState } from 'react'
import {
    Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableContainer,Icon,Flex, useDisclosure,Box
  } from '@chakra-ui/react'
  import { FaRupeeSign } from "react-icons/fa";

import { DataContext } from '../Context/DataContext';

import OrderEditModal from '../Modals/OrderEditModal';
import Activeorderdata from './Activeorderdata';
const Activeorders = () => {
  const {allorders,allcustomers}=useContext(DataContext) 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [customerorder,setcustomerorder]=useState(null)

  const aligncenter={
    textAlign:"center"
  }
  const handleeditmodal=(corder)=>{
      setcustomerorder(corder)
      onOpen()
  }
  return (
    <Box>
       {isOpen&&<OrderEditModal isOpen={isOpen} onClose={onClose} corder={customerorder} completed={false}/>}
   
    <TableContainer margin="10px 40px" >
    <Table variant='striped' >
      <Thead>
        <Tr>
          <Th sx={aligncenter}>ID</Th>
          <Th sx={aligncenter}>Customer Name</Th>
          <Th sx={aligncenter}>Price (<Icon as={FaRupeeSign}/>)</Th>
          <Th sx={aligncenter}>Last Modified</Th>
          <Th sx={aligncenter}>Edit/View</Th>
        </Tr>
      </Thead>
      <Tbody>

      <Activeorderdata handleeditmodal={handleeditmodal}  paid={false}/>
      
      </Tbody>
      <Tfoot>
      </Tfoot>
    </Table>
  </TableContainer>
  </Box>
  )
}

export default Activeorders