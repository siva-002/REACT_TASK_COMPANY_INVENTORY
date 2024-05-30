import React, { useContext, useEffect, useState } from 'react'
import {    Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,Text,ModalBody,ModalCloseButton,Button, Spacer, Heading} from '@chakra-ui/react'
import CreateOrderForm from '../Forms/CreateOrderForm'
import { useFieldArray, useForm } from 'react-hook-form'
import moment from 'moment/moment'
import { DataContext } from '../Context/DataContext'
import { ToastContainer } from 'react-toastify'
const CreateOrderModal = ({isOpen,onClose}) => {
  const {sellordersubmit}=useContext(DataContext)
  const [todaydate,settodaydate]=useState(moment().format('DD/MM/Y'))
  const [totalprice,settotalprice]=useState(0)
  const {register,handleSubmit,watch,control,
    formState: { errors, isSubmitting }} = useForm({
      defaultValues:{
        customer_id:"",
        items:[],
        paid:false,
        invoice_no:`Invoice-${todaydate}`,
        invoice_date:todaydate,
        last_modified:new Date()
      }
    })

    const {fields:orderfield,append,remove}=useFieldArray({
      name:"items",
      control
    })
 
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} scrollBehavior={"inside"}>
      <ToastContainer/>
    <ModalOverlay />
    <form onSubmit={handleSubmit(sellordersubmit)}>
    <ModalContent minH={"500px"}>
      <ModalHeader>Create Order</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CreateOrderForm  register={register} watch={watch} 
        control={control} append={append} orderfield={orderfield} remove={remove}
        settotalprice={settotalprice}
        />
      </ModalBody>
      <ModalFooter>
        <Heading size={"md"}>
          Total Price : {totalprice}
        </Heading>
        <Spacer/>
        <Button mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='blue' minW={"100px"} type="submit">Sale</Button>
      </ModalFooter>
    </ModalContent>
    </form>
  </Modal>
  )
}

export default CreateOrderModal