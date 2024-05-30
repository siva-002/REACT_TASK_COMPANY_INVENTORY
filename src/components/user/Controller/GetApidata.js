import Api from '../../Api'
import {toast} from "react-toastify"
import { getproduct } from '../functions/GetProductInfo'

export const saleorder=(data)=>{
    const api=`${Api()}order/`
    const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
    return new Promise(async(resolve,reject)=>{
        await fetch(api,options)
        .then((res)=>{
            // console.log("DATA updated ")
            if(res.ok){
                toast.success("Sale Order Successfull")
            }else{
                toast.info("Sale Order Failed")
            }
            resolve()
        }).catch((err)=>{
            toast.error("Something Went Wrong")
            console.log(err.message)
            reject()
        })
})
}
export const updateorder=(data)=>{
    const api=`${Api()}order/${data.orderid}`
    delete data.orderid
    const options={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
    return new Promise(async(resolve,reject)=>{
            await fetch(api,options)
            .then((res)=>{
                // console.log("DATA updated ")
                if(res.ok){
                    toast.success("Order Updated Successfully")
                }else{
                    toast.info("Order Update Failed")
                }
                resolve()
            }).catch((err)=>{
                toast.error("Something Went Wrong")
                console.log(err.message)
                reject()
            })
    })
}

const GetApidata=async(query)=>{
        const api=`${Api()}${query}`
            return new Promise(async(resolve,reject)=>{
                await fetch(api)
                .then(async(res)=>{
                    const data=await res.json()
                    resolve(data)
                })
                .catch((err)=>{
                    reject(err.message)
                })
            })
     
          

}

export const updatestockinfo=(data,allproducts)=>{
    const productstobeupdated=[]
    data.map((item)=>{
        if(!productstobeupdated.includes(item.product)){
            productstobeupdated.push(item.product)
        }
    })
    productstobeupdated?.map((productid)=>{
        const pdata=allproducts?.filter((item)=>item.id==productid)
        const api=`${Api()}products/${pdata[0].id}`    
    const options={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(pdata[0])}
    return new Promise(async(resolve,reject)=>{
            await fetch(api,options)
            .then((res)=>{
                if(res.ok){
                    // toast.success(`Quantity Updated Successfully for product id ${pdata[0].id}`)
                }else{
                    // toast.info(`Quantity Update Failed for product id ${pdata[0].id}`)
                    console.log(`Quantity Update Failed for product id ${pdata[0].id}`)
                }
                resolve()
            }).catch((err)=>{
                toast.error("Something Went Wrong")
                console.log(err.message)
                reject()
            })
    })
})
}


export default GetApidata