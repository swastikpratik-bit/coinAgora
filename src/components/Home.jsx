
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>

      <Text w={"full"} h={"10vh"} color={"white"} p={"6"} textAlign={"center"}>
      Welcome to <b>Coin Agora</b> , where innovation meets opportunity in the world of cryptocurrencies! Explore the latest trends, track your favourite coin , and unlock the future of financial freedom—all in one seamless platform. Join us as we revolutionize the way you experience crypto.
      </Text>
      <motion.div
        style={{
          height: "70vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcSrc}
          zIndex={-1}
        />
      </motion.div>

      <Text
        fontSize={"5xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"yellow.300"}
        mt={"-15"}
        shadow={"revert"}
      >
        Coin Agora
      </Text>
    </Box>
  );
};

export default Home;
