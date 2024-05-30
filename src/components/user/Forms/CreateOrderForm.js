import Multiselect from "./Multiselect"
import {  Box,  Flex,  FormControl,  FormLabel,Input,Button,Icon, Card,Select ,CardHeader, CardBody,Heading,Text,Spacer, HStack } from "@chakra-ui/react";
import { FaRupeeSign,FaTrashAlt } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../Context/DataContext";
import { getproductstock, getproductunit } from "../functions/GetProductInfo";
import { useWatch } from "react-hook-form";
import { calculatePrice } from "../functions/Getprice";
import {getcustomername} from "../functions/GetcustomerDetails"

const CreateOrderForm = ({register,watch,control,append,orderfield,remove,settotalprice}) => {
    const {allproducts,allcustomers}=useContext(DataContext)
    const [products,setproducts]=useState([])   
    const items=useWatch({
        control,name:"items"
    })
    const customername=useWatch({
        control,name:"customer_id"
    })
    const deletestyle={
        ':hover':{
            color:"red",
            cursor:"pointer"
        }
    }
    useEffect(()=>{
        const total=calculatePrice(items)
        settotalprice(total)
    },[items])
    useEffect(()=>{
        remove()
        products?.map((product)=>{
            product.sku.map((item,index)=>{
                append({sku_id:item.id,price:0,quantity:0})
            })
        })     
    },[products])
   
  return (
    <Box>
        <Card p="" margin={"0 0 10px 0"}>
            <CardHeader>
               <Flex gap={"20px"}>
               <Box>
                <Heading size='xs' textTransform='uppercase' width={"max-content"} p="2">
                   Customer Id
                </Heading>   
                         
                <Select width={"150px"} {...register(`customer_id`, { required: true })}>                    
                    {allcustomers.map((item,index)=>(
                        <option key={index} value={item.customer}>{item.customer}</option>
                    ))}
                </Select>
                </Box>   
                <Box>  
                <Heading size='xs' textTransform='uppercase' width={"max-content"} p="2">
                   Customer Name
                </Heading> 
                <Text p="2">
                    {customername&&getcustomername(allcustomers,customername)}    
                </Text>   
                </Box>
                </Flex>
            
                
            </CardHeader>
          
        </Card>
        <Card p="1">
            <CardHeader>
                  <Heading size='xs' textTransform='uppercase' >
                   Product Info
                </Heading>
              </CardHeader>
            <CardBody>
                 <Multiselect setproducts={setproducts}/>
            </CardBody>
        
      
        <Card m="2">
            
             <CardBody>
            {
            orderfield.map((item,index)=>(        
          <Box key={`${item.id}${index}`} p="2">
             <Heading size='xs' textTransform='uppercase'>
                 <Flex>
                    <HStack> <Text>SKU  {item.sku_id}</Text>  <Text textTransform='lowercase'>
                        ({items[index]?.quantity} {getproductunit(allproducts,item.sku_id)} )
                        </Text> </HStack>
                    <Spacer/>
                    <Box margin={"0 20px 0 0"}>
                    <Icon as={FaTrashAlt} sx={deletestyle} onClick={()=>remove(index)} />
                    </Box>                    
                    <Box minW={"50px"} background={"lightgreen"} p="1" borderRadius={"10px"}> 
                    <Icon as={FaRupeeSign} boxSize={3}/> 
                    {items[index]?.price * items[index]?.quantity}
                     </Box>
                </Flex>
            </Heading>  
            <Flex gap={"10px"}>
            <FormControl>
                <FormLabel>Selling Price</FormLabel>
                <Input type="number" {...register(`items[${index}].price`,{require:true})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input type="number" {...register(`items[${index}].quantity`,{require:true})}/>
            </FormControl> 
            </Flex>
            <Box>
                {getproductstock(allproducts,item.sku_id)}
            </Box>
            </Box>
            ))
            }
              </CardBody> 
            </Card>
        
         
         </Card>
        
    </Box>
  )
}

export default CreateOrderForm