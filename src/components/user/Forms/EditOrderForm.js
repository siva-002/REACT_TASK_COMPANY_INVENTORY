import React, { useContext, useEffect, useState } from 'react'
import {  Box,  Flex,  FormControl,  FormLabel,Input,Button,Icon, Card,Select ,CardHeader, CardBody,Heading,Text,Spacer, HStack } from "@chakra-ui/react";
import { getcustomername } from '../functions/GetcustomerDetails';
import CustomerCard from './CustomerCard';
import { FaRupeeSign } from "react-icons/fa";
import{ calculatePrice } from '../functions/Getprice';
import { useWatch } from 'react-hook-form';
import { getproductstock, getproductunit } from '../functions/GetProductInfo';
import { DataContext } from '../Context/DataContext';
const EditOrderForm = ({customerorder,register,watch,control,completed}) => {
    const {allproducts,allcustomers}=useContext(DataContext)
    const [name,setname]=useState(null)      
    const [totalprice,settotalprice]=useState(null)
   const items=useWatch({
    control,
    name:"items"
   })

    useEffect(()=>{
        const sum=calculatePrice(items)
        settotalprice(sum)
    },[items])

    useEffect(()=>{
        const name=getcustomername(allcustomers,customerorder.customer_id)
        setname(name)
    },[])

   
  return (
    <Box>
        {/* <GetcustomerDetails cid={customerorder.customer_id}  getkey={"cname"} setname={setname} /> */}
        <CustomerCard name={name} cid={customerorder.customer_id} />
     <Card marginTop={"10px"}>
        <CardHeader>
            <Heading size='md'>Order details</Heading>
        </CardHeader>
     <CardBody>
        <Flex gap={"10px"} flexDirection={"column"}>
        {customerorder?.items.map((item,index)=>(
        <Card key={index}  >
            <CardHeader>
             <Heading size='xs' textTransform='uppercase'>
                <Flex>
                    <HStack> <Text>SKU {item.sku_id}</Text>  <Text textTransform='lowercase'>({items[index].quantity}  {getproductunit(allproducts,item.sku_id)})</Text> </HStack>
                    <Spacer/>
                    <Box minW={"50px"} background={"lightgreen"} p="1" borderRadius={"10px"}> <Icon as={FaRupeeSign} boxSize={3}/> {items[index].price * items[index].quantity} </Box>
                </Flex>
            </Heading>  
            </CardHeader>         
            <CardBody>
            <Flex gap={"10px"}>
            <FormControl>
                <FormLabel>Selling Price</FormLabel>
                <Input type="number"   {...register(`items[${index}].price`, { required: true })} disabled={completed}/>
            </FormControl>
            <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input type="number"  {...register(`items[${index}].quantity`, { required: true })} disabled={completed}/>
            </FormControl> 
            </Flex>
            <Box>
                {getproductstock(allproducts,item.sku_id)}
            </Box>
            </CardBody> 
            
         </Card>   
        ))}
        </Flex>
      
        </CardBody>
        <Card >
        <CardHeader>
            <Heading size='md'>Payment details</Heading>
        </CardHeader>
        <CardBody>
        <Flex gap={"10px"} >
            <FormControl>
                <FormLabel>Invoice Date</FormLabel>
                <Input type="text"  {...register(`invoice_date`)} disabled={true}/>               
            </FormControl>
            <FormControl>
                <FormLabel>Invoice No</FormLabel>
                <Input type="text"  {...register(`invoice_no`, { required: true })} disabled={true}/>
            </FormControl> 
        </Flex>
        <Flex gap={"10px"} p="2">
            <FormControl>
                <FormLabel>Total Price (<Icon as={FaRupeeSign} boxSize={3}/>)</FormLabel>
                <Text p="2">{totalprice} </Text>
            </FormControl>
            <FormControl>
                <FormLabel>Payment Status</FormLabel>
                <Select   {...register(`paid`, { required: true })} disabled={completed}>
                <option value={true}>Paid</option>
                <option value={false}>Not Paid</option>               
                </Select>
            </FormControl>   
            </Flex> 
        </CardBody>
        </Card>
        </Card>     
       
       
    </Box>
  )
}

export default EditOrderForm