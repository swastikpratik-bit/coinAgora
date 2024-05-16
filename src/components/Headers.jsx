import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import React from 'react'
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"orange.600"}  position={"sticky"} top={0}  zIndex={1}>
      <Button variant={"unstyles"} color={"black"}>
        <Link to="/">Home</Link> 
      </Button>
      <Button variant={"unstyles"} color={"black"}>
        <Link to="/exchanges">Exchanges</Link> 
      </Button>
      <Button variant={"unstyles"} color={"black"}>
        <Link to="/coins">Coins</Link> 
      </Button>
    </HStack>
  )
}

export default Headers;