import React, { useContext } from 'react'
import { Card, CardHeader, CardBody,Box,Heading,Text,Flex,Spacer } from '@chakra-ui/react'
import { getcustomerpic } from '../functions/GetcustomerDetails'
import { DataContext } from '../Context/DataContext'

const CustomerCard = ({name,cid}) => {
  const {allcustomers}=useContext(DataContext)
  return (
    <Card>
  <CardHeader>
    <Heading size='md'>Customer Info</Heading>
  </CardHeader>

  <CardBody>
    <Flex gap={"100px"}>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Name
        </Heading>

        <Flex p='2' marginTop={"10px"} fontSize='sm' gap={"10px"}>
            {getcustomerpic(allcustomers,cid)}
          <Text>{name}</Text>
        </Flex>
      </Box>
      {/* <Spacer/> */}
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Customer Id
        </Heading>
        <Text  p='2' marginTop={"10px"} fontSize='sm'>
         {cid}
        </Text>
      </Box>
    </Flex>
  </CardBody>
</Card>
  )
}

export default CustomerCard