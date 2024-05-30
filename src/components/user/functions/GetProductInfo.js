import React, { useContext, useEffect } from 'react'
import { DataContext } from '../Context/DataContext'
import {Text,Flex} from "@chakra-ui/react"


export const OrderstockCheck=(allproducts,data)=>{
    let msg=""
    let newstocks=[]
    let stockstatus=true
    data?.items.map((item)=>{          
            let stock= getstock(allproducts,item.sku_id)    
            if(item.quantity==0){
                msg=`Product SKU ${item.sku_id} selected as 0 quantity`
                stockstatus=false                
            }
            else if(item.quantity>stock){
                msg=`Out of Stock for product SKU ${item.sku_id}`
                stockstatus=false
            }
        })
    if(stockstatus){
        data?.items.map((item,index)=>{
            let stock= getproduct(allproducts,item.sku_id)
            let q=item.quantity
            newstocks.push(stock[0])
            newstocks[index].quantity_in_inventory-=q         
        })
     
    }
    return {newstocks,stockstatus,msg}
}

export const CheckStock=(allorders,allproducts,data)=>{
    const find=allorders?.filter((item)=>item.id==data.orderid)
    const oldorder=find[0].items
    const neworder=data.items
    let newstocks=[]
    let msg="Stock Available"
    let stockavailable=true

    //to check available stock 
    data?.items.map((item,index)=>{
        let stock= getstock(allproducts,item.sku_id)
        if((neworder[index].quantity-oldorder[index].quantity)>stock){
            msg="out of stock for SKU"+oldorder[index].sku_id
            stockavailable=false
        }
    })

    //to stock value edit purpose
    if(stockavailable){
    data?.items.map((item,index)=>{
        let stock= getproduct(allproducts,item.sku_id)
        let q=neworder[index].quantity-oldorder[index].quantity
        if(q>0){
            newstocks.push(stock[0])
            newstocks[index].quantity_in_inventory=newstocks[index].quantity_in_inventory-q
        }else if(q<0){
            newstocks.push(stock[0])
            newstocks[index].quantity_in_inventory=newstocks[index].quantity_in_inventory+Math.abs(q)
        }else{
            newstocks.push(stock[0])
        }   
    })


    }
   
    
    return {newstocks,stockavailable,msg}
}

const getstock=(allproducts,id)=>{
    const product=getproduct(allproducts,id)
    const stock=product[0].quantity_in_inventory
    return stock
}
export const getproductstock=(allproducts,id)=>{   
    const stock=getstock(allproducts,id)
    const stockinfo=stock==0?
    <Text background={"orangered"} color={"white"} p="2" m="2" borderRadius={"10px"}>Out of Stock</Text>:
    stock>1?
    <Text background={"green"} color={"white"} p="2" m="2" borderRadius={"10px"}><b>{stock}</b> items remaining</Text>:
    <Text background={"orange"} color={"white"} p="2" m="2" borderRadius={"10px"}><b>{stock}</b> item remaining</Text>
    return <Flex justifyContent={"flex-end"} fontSize={"12px"}>{stockinfo}</Flex>
}
export const getproductunit=(allproducts,id)=>{    
   const product=getproduct(allproducts,id) 
   return product[0].unit
}

export const getproduct=(allproducts,id)=>{
    const items=[]
    allproducts?.map((item)=>{
        item.sku.map((ele)=>{
            if(ele.id==id){
                items.push(ele)
            }
        })
    })
    return items
}



