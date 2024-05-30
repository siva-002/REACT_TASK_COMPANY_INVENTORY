import React from "react";
import {  Box,  Flex,  FormControl,  FormLabel,Input, Button,} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer,toast } from "react-toastify";
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import Api from "./Api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const usenav=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const loginsubmit = (data) => {
    const link=`${Api()}logindata?email=${data.email}`
    return new Promise(async(resolve,reject)=>{
     await fetch(link,{method:"GET",headers:{"Content-Type":"application/json"}})
      .then(async(res)=>{
        const userdata=await res.json()
        
        if(userdata.length){
          if(userdata[0].password==data.password){
            toast.success("Login Success")
            sessionStorage.setItem("username",userdata[0].name)
           setTimeout(() => {
            usenav("user")
           }, 500);
          }else{
            toast.info("Invalid Password")   
          }
        }else{
          toast.error("Invalid Email")
        }       
       resolve()
      })
      .catch((err)=>{
        toast.error("Something Went Wrong ")
        reject()
      })
   
    })
    
   
  }
  return (
    <>
    <Navbar value="Login"/>
    <Flex alignItems={"center"} justifyContent={"center"} height={"80vh"} >
      <ToastContainer/>         
      <Box width={"300px"} height={"300px"}   border={"1px solid lightgrey"} padding={"40px"} borderRadius={"20px"}>
        <form onSubmit={handleSubmit(loginsubmit)}>
          <Flex flexDirection="column" gap="10px" >
            <FormControl >
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                {...register("email", { required: "This is required" })}
              />
            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
            </FormControl>      
            <FormControl>
              <Button p="20px" type="submit" isLoading={isSubmitting} width={"100%"} margin={"10px 0 0 0"}>
                Login
              </Button>
            </FormControl>
            <FormControl>
            {(errors.email||errors.password)&&<Alert status='error' p="1">
                  <AlertIcon />
                  <AlertTitle>{errors.email?"Email":"Password"} is required</AlertTitle>
              </Alert>}
            </FormControl>
          </Flex>
         
        </form>
      </Box>
    </Flex>
    </>
  )
}


export default Login;
