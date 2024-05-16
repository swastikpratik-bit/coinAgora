import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main.jsx";
import { Container, HStack, VStack, Heading , Image , Text, Button, RadioGroup, Radio, Center} from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import ErrorCom from "./ErrorCom.jsx"
import { Link } from "react-router-dom";
import GoUp from "./GoUp.jsx";


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencysymbol = currency === "inr" ? "₹" : currency === "eur" ? "Є" : "$";
  
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btnss = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency , page]);


  if (error) {
    return <ErrorCom message={"Error while fetching Coins..."} />
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
          <>
            
            <RadioGroup value={currency} onChange={setCurrency} p={"6"} >
            <HStack spacing={"5"}>
                <Radio value={"inr"}>₹ INR</Radio>
                <Radio value={"eur"}>Є EUR</Radio>
                <Radio value={"usd"}>$ USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                currencySymbol={currencysymbol}
                symbol={i.symbol}
                price={i.current_price}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflow={"auto"} p={"8"}>
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

const CoinCard = ({ id , name, img, price, symbol , currencySymbol= "₹" }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack bgColor={"orange.50"} w={"52"} shadow={"lg"} m={"4"} p={"9"} borderRadius={"lg"} transition={"all 0.3s"} css={{
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
          {symbol}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{ price ? `${currencySymbol} ${price}` : "NA"}</Text>
      </VStack>
    </Link>
  )
};
export default Coins;
