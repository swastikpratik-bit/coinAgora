import { Box, HStack } from '@chakra-ui/layout';

const GoUp = () => {
  
  const helper = () => {
    scrollTo(0, 0);
  }
    return (
      <HStack p={"4"} shadow={"base"} h={"10"} w={"10"} bgColor={"gray.400"} position={"sticky"} left={"96vw"} bottom={5} color={"white"} justifyContent={"center"} borderRadius={4} css={{
        "&:hover": {
          cursor:"pointer"
        }
      }} >
        <Box fontSize={"xx-large"} color={"black"} onClick={()=> helper()} >↑</Box>
      
    </HStack>
  )
}

export default GoUp;