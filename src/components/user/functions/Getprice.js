import React, {useEffect, useState } from 'react'

export const calculatePrice=(items)=>{
  let sum=0
  items?.map((item)=>{    
  sum+=item.price * item.quantity
  })
  return sum
}

export const Getprice = (items) => {
      const sum=calculatePrice(items)
      return sum  
}
