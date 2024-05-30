import React, { useContext, useEffect,useState } from 'react'
import { DataContext } from '../Context/DataContext'
import {Tr,Td,Icon} from "@chakra-ui/react"
import GetcustomerDetails, { getcustomername, getcustomerpic } from '../functions/GetcustomerDetails';
import {Getprice} from '../functions/Getprice';
import FormatDate from '../functions/FormatDate';
import { BsThreeDots } from "react-icons/bs";
const Activeorderdata = ({handleeditmodal,paid}) => {
    const {allorders,allcustomers}=useContext(DataContext)
    const [orders,setorders]=useState(null)
    useEffect(()=>{
        const filtered=allorders?.filter((item)=>item.paid==paid)
        setorders(filtered)
    },[allorders])
    const editstyle={
        ":hover":{
          cursor:"pointer"
        }
      }
      const aligncenter={
        textAlign:"center"
      }
  return (
    <>
        {orders?.map((item,index)=>(
        <Tr key={index}>
            <Td sx={aligncenter}>{index+1}</Td>  
            <Td sx={aligncenter} display={"flex"} gap={"10px"} justifyContent={"center"}>             
             {getcustomerpic(allcustomers,item.customer_id)} {getcustomername(allcustomers,item.customer_id)}
           </Td>  
            <Td sx={aligncenter}>
              {Getprice(item.items)}
              {/* <Getprice items={item.items} allorders={allorders}/> */}
               </Td>  
            <Td sx={aligncenter}><FormatDate date={item.last_modified}/> </Td>  
           
              <Td sx={aligncenter}><Icon as={BsThreeDots} sx={editstyle} onClick={()=>handleeditmodal(item)}/></Td>
            
        </Tr>
        ))}
    </>
  )
}

export default Activeorderdata