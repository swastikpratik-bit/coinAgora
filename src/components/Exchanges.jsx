import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main.jsx";
import { Container, HStack, VStack, Heading , Image , Text, Button} from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import ErrorCom from "./ErrorCom.jsx"
import GoUp from "./GoUp.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }
  
  const btnss = new Array(7).fill(1);


  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, [page]);


  if (error) {
    return <ErrorCom message={"Error while fetching Exchanges..."} />
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                key={i.id}
              />
            ))}
          </HStack>
          <HStack w={"full"} justifyContent={"center"} p={"8"}>
              {
                btnss.map((item , index) => (
                  <Button bgColor={"gray.400"} color={"black"} onClick={() => changePage(index + 1)}>{ index + 1}</Button>  
                ))  
              }  
            </HStack>
            <GoUp/>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack w={"52"} shadow={"lg"} bgColor={"orange.50"} m={"4"} p={"9"} borderRadius={"lg"} transition={"all 0.3s"} css={{
        "&:hover": {
          transform : "scale(1.12)"
        }
      }}>
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />

        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  )
};
export default Exchanges;
