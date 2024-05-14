import { Box, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"} >
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"}>Loading..</Spinner>
      </Box>
    </VStack>
  )
}

export default Loader;