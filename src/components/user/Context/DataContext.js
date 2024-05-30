import { createContext, useEffect ,React, useState} from "react";
import { useQuery,useMutation ,useQueryClient} from "@tanstack/react-query";
import GetApidata, { saleorder, updatestockinfo } from "../Controller/GetApidata";
import Api from "../../Api";
import { updateorder } from "../Controller/GetApidata";
import { CheckStock, OrderstockCheck } from "../functions/GetProductInfo";
import { toast } from "react-toastify";
const DataContext=createContext({})

const DataProvider=({children})=>{
    const [allproducts,setallproducts]=useState(null)
    const [allorders,setallorders]=useState(null)
    const [allcustomers,setallcustomers]=useState(null)
    const queryClient=useQueryClient()

    
    const {data:productdata ,error:producterror,isLoading:productload}=useQuery(
        {queryKey:["productsdata"],queryFn:()=>GetApidata("products")}
        )
    const {data:orderdata ,error:ordererror,isLoading:orderload}=useQuery(
        {queryKey:["orderdata"],queryFn:()=>GetApidata("order")}
        )
    const {data:customerdata ,error:customererror,isLoading:customerload}=useQuery(
        {queryKey:["customersdata"],queryFn:()=>GetApidata("customers")}
        )

    const {mutate:updateordermutate,isPending:updateorderpending,isError,isSuccess}=useMutation({
        mutationFn:(data)=>updateorder(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["orderdata"]})
        }
    })
    const {mutate:saleordermutate,isPending:saleorderpending,isError:salerror,isSuccess:salesuccess}=useMutation({
        mutationFn:(data)=>saleorder(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["orderdata"]})
        }
    })
    const {mutate:updatestockmutate,isPending,isError:updatestockerror,isSuccess:updatestocksuccess}=useMutation({
        mutationFn:(data)=>updatestockinfo(data,allproducts),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["orderdata","productsdata"]})
        }
    })
   
    const handleupdateorder=(data)=>{
        const parsed={
            ...data,
            paid:data.paid=="true"?true:false
        }
        const {newstocks,stockavailable,msg}=CheckStock(allorders,allproducts,parsed)
        if(stockavailable){
            updateordermutate(parsed)
            updatestockmutate(newstocks)
        }else{
            toast.info(msg)
        }       
    }

    const sellordersubmit=(data)=>{
        const dt={...data,last_modified:new Date()}
        if(data.items.length){
            const {newstocks,stockstatus,msg}=OrderstockCheck(allproducts,dt)
            if(stockstatus){
                saleordermutate(dt)
                updatestockmutate(newstocks)
            }else{
                toast.info(msg)
            }
        }else{
            toast.info("Please select products to sale")
        }
     
      }
      
   useEffect(()=>{
     setallproducts(productdata)
   },[productdata])
   useEffect(()=>{
     setallorders(orderdata)
   },[orderdata])
   useEffect(()=>{
     setallcustomers(customerdata)
   },[customerdata])
    return(
        <DataContext.Provider value={{
            allproducts,allorders,allcustomers,handleupdateorder,updateorderpending,sellordersubmit
        }}>
            {children}
        </DataContext.Provider>
    )
}

export  {DataContext,DataProvider}