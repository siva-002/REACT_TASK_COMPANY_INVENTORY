import { FormControl,Box } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import Select from "react-select"
import { DataContext } from '../Context/DataContext'

const Multiselect = ({setproducts}) => {
    const {allproducts}=useContext(DataContext)
    const [selectedoptions,setselectedoptions]=useState([])
    const [options,setoptions]=useState()
  
    
    const handleoptionschange=(values)=>{
            setselectedoptions(values)
    }
    useEffect(()=>{
        const productslist=[]
        allproducts?.map((item)=>{
            const product={label:item.name,value:item.id}
            productslist.push(product)
        })
        setoptions(productslist)
    },[allproducts])

    useEffect(()=>{
            const productdata=[]
            selectedoptions?.map((options)=>{
                    allproducts.map((items)=>{
                        if(items.id==options.value){
                            productdata.push(items)
                        }
                    })
            })
           setproducts(productdata)
    },[selectedoptions])

  
  return (
   <Box>
    <FormControl>
            <Select options={options} isMulti={true} value={selectedoptions} onChange={handleoptionschange}/>
    </FormControl>
   </Box>
  )
}

export default Multiselect