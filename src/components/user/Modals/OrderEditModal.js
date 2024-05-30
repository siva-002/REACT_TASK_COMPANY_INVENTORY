import React, { useContext} from 'react'
import {
    Modal, ModalOverlay,ModalContent, ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,
  } from '@chakra-ui/react'
import EditOrderForm from '../Forms/EditOrderForm'
import { useForm } from 'react-hook-form'
import { DataContext } from '../Context/DataContext'
import { ToastContainer } from 'react-toastify'
const OrderEditModal = ({isOpen,onClose,corder,completed}) => {
const {handleupdateorder,updateorderpending}=useContext(DataContext)

  const {register,handleSubmit,watch,control,
    formState: { errors, isSubmitting }} = useForm({
      defaultValues:{
        orderid:corder.id,
        customer_id:corder?.customer_id,
        items:corder?.items,
        paid:corder?.paid,
        invoice_no:corder?.invoice_no,
        invoice_date:corder?.invoice_date,
        last_modified:new Date()
      }
    })
   
   
  return (
    
    <Modal  closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"lg"} scrollBehavior={"inside"} >
    <ToastContainer/>
    <ModalOverlay />
    <form onSubmit={handleSubmit(handleupdateorder)}>
    <ModalContent >     
      <ModalHeader>{!completed&&"Edit"} Sale Order Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
            <EditOrderForm customerorder={corder} register={register} watch={watch} control={control} completed={completed}/>
      </ModalBody>
      {!completed&&
      <ModalFooter>
        <Button colorScheme='blue' mr={3} type="submit" isLoading={updateorderpending}>
          Update
        </Button>
        <Button onClick={onClose} >Cancel</Button>
      </ModalFooter>
      }
    </ModalContent>
    </form>
  </Modal>

  )
}

export default OrderEditModal