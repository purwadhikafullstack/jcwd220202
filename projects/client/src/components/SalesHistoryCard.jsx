import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import freeShipmentStory from "../assets/shipment.png";
import reportStory from "../assets/report.png";

const SalesHistoryCard = ({
  branch_name,
  username,
  total_quantity,
  transaction_items,
  createdAt,
  total_price,
  TransactionId,
}) => {
  // console.log(transaction_items[0]);
  console.log(transaction_items);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // let grossPrice = 0;

  // transaction_items.forEach((element) => {
  //   grossPrice = grossPrice + element.price_per_product;
  // });

  // const countGMV = grossPrice * total_quantity;

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Box
          // maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"165px"}
          columnGap={"2"}
          fontSize={"15px"}
        >
          <Box
            display={"flex"}
            mt={"5px"}
            borderBottom={"3px solid #E07A5F"}
            mx={"10px"}
            pb={"5px"}
          >
            <Box flex={1} fontWeight={"bold"} textAlign={"left"}>
              Sales History
            </Box>
            <Box
              bg="#81B29A"
              flex={"0.5"}
              borderRadius={"15px"}
              mr={"5px"}
              textAlign={"center"}
              color={"white"}
            >
              {createdAt.split("T")[0]}
            </Box>
          </Box>
          <Flex mt={"5px"} pl={"10px"}>
            <Box flex={"0.5"}>
              <Image
                src={reportStory}
                alt="logo"
                display={"block"}
                ml={"auto"}
                mr={"auto"}
                height={"100px"}
              />
            </Box>
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>{branch_name || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Transaction ID: </Text>
                <Text ml={"5px"}>{TransactionId || "Loading..."}</Text>
              </Box>
              <Box
                display={"flex"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"200px"}
              >
                <Text fontWeight={"bold"}>Purchase From: </Text>
                <Text ml={"5px"}>{username || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Selling Price:</Text>
                <Text ml={"5px"}>{formatRupiah(total_price)}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Quantity Sold:</Text>
                <Text ml={"5px"}>{total_quantity || "Loading..."}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SalesHistoryCard;
