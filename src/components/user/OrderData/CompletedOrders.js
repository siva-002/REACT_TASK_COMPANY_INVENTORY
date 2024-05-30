import React, { useContext, useState } from 'react'
import {
    Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableContainer,Icon,Flex, useDisclosure,Box
  } from '@chakra-ui/react'
  import { FaRupeeSign } from "react-icons/fa";
import OrderEditModal from '../Modals/OrderEditModal';
import { DataContext } from '../Context/DataContext';
import Activeorderdata from './Activeorderdata';

const CompletedOrders = () => {
    const {allorders,allcustomers}=useContext(DataContext) 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [customerorder,setcustomerorder]=useState(null)
   
    const handleeditmodal=(corder)=>{
      setcustomerorder(corder)
      onOpen()
    }
    const aligncenter={
        textAlign:"center"
      }
    return (
      <Box>
         {isOpen&&<OrderEditModal isOpen={isOpen} onClose={onClose} corder={customerorder} completed={true}/>}
      
      <TableContainer margin="10px 40px">
      <Table variant='striped' >
        <Thead>
          <Tr>
            <Th sx={aligncenter}>ID</Th>
            <Th sx={aligncenter}>Customer Name</Th>
            <Th sx={aligncenter}>Price (<Icon as={FaRupeeSign}/>)</Th>
            <Th sx={aligncenter}>Last Modified</Th>
            <Th sx={aligncenter}>View</Th>
          </Tr>
        </Thead>
        <Tbody>
            <Activeorderdata paid={true} handleeditmodal={handleeditmodal}/>   
        </Tbody>
        <Tfoot>   
    
      
        </Tfoot>
      </Table>
    </TableContainer>
    </Box>
    )
}

export default CompletedOrders