import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import ErrorCom from "./ErrorCom";
import Chart  from "./Chart.jsx";

const CoinDeatail = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "Є" : "$";

  const daysBtns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d"];


  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  const params = useParams();
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data : chartdata} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartdata.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id , currency , days]);

  if (error) {
    return <ErrorCom message={"Error while fetching Coin..."} />;
  }


  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
          <>
          <Box width={"full"} borderWidth={1}>
              <Chart arr={chartArray} currency={currencysymbol} days={days} />
          </Box>

            
          <HStack p="4" overflowX={"auto"}>
            {daysBtns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"6"}>
            <HStack spacing={"5"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"eur"}>Є EUR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"14"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.6}>
              Last Updated On {coin.market_data.last_updated}
            </Text>
            <Image
              src={coin.image.large}
              w={"18"}
              h={"18"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencysymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlph.700"} color={"black"}>
              {`# ${coin.market_cap_rank}`}
              </Badge>
              
              <CustomBar high={`${currencysymbol}${coin.market_data.high_24h[currency]}`} low={`${currencysymbol}${coin.market_data.low_24h[currency]}`} />
              

              <Box w="full"  p={"4"}>
                <Item title={ "Max Supply"} value={coin.market_data.max_supply} />
                <Item title={ "Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item title={ "Market Cap"} value={`${currencysymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={ "All Time Low"} value={`${currencysymbol}${coin.market_data.atl[currency]}`} />
                <Item title={ "All Time High"} value={`${currencysymbol}${coin.market_data.ath[currency]}`} />
              </Box>
          </VStack>
          
            
          
        </>
      )}
    </Container>
  );
};


const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"}>
    <Text letterSpacing={"widest"}> {title} </Text>
    <Text letterSpacing={"widest"}> {value} </Text>
  </HStack>
)

const CustomBar = ({high , low}) => (
  <VStack w={"full"}>
    <Progress value={25} colorScheme="teal" w={"full"} />
    <HStack justifyContent="space-between" w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"small"}> 24H Range</Text>
      <Badge children={ high} colorScheme="red" />
    </HStack>
  </VStack>
);

export default CoinDeatail;
