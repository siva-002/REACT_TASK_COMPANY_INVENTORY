import React from 'react'
import {Flex,Button,Spacer, useDisclosure} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons"
import { Tabs, TabList, TabPanels, Tab, TabPanel ,Box} from '@chakra-ui/react'
import Activeorders from './OrderData/Activeorders'
import CompletedOrders from './OrderData/CompletedOrders'
import CreateOrderModal from './Modals/CreateOrderModal'

const UserAction = ({active}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
        {isOpen&&<CreateOrderModal  isOpen={isOpen} onClose={onClose}/>}
        <Tabs>
      <TabList paddingBottom={"2"} borderBottom={"none"} m="2">
        <Tab>Active Sale Orders</Tab>
        <Tab>Completed Sale Orders</Tab>
        <Spacer/>
        <Button leftIcon={<AddIcon boxSize={3}/>} onClick={onOpen}>Sale Order</Button>
      
      </TabList>
      <TabPanels>
        <TabPanel>
          <Activeorders/>
        </TabPanel>
        <TabPanel>
         <CompletedOrders/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Box>

  )
}

export default UserAction