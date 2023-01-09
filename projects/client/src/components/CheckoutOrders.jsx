import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useNumberInput,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";

const CheckoutOrders = ({
  id,
  product_name,
  current_price,
  total_product_price,
  quantity,
  product_image,
  onDelete,
  ProductBranchId,
  onQty,
  handleQty,
  qty,
}) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Flex
          // maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"140px"}
          fontSize={"15px"}
        >
          <Box flex="1" mx={"5px"} mt={"5px"}>
            <Box mt={"10px"}>
              <Image
                src={product_image}
                alt="search"
                objectFit={"contain"}
                height={"80px"}
                maxW={"200px"}
              />
            </Box>
          </Box>
          <Box flex="1" mr={"20px"}>
            <Box>
              <Grid templateColumns="repeat(1, 1fr)" gap={1}>
                <GridItem
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"150px"}
                >
                  {product_name}
                </GridItem>
              </Grid>
            </Box>
            <Box display={"flex"}>
              <Text ml={"5px"}>{"TransactionId"}</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} textDecorationLine={"line-through"}>
                {"Rp 9999"}
              </Text>
              <Text>{formatRupiah(current_price)}</Text>
            </Box>
            <Box>
              <Text>x {quantity}</Text>
            </Box>
            <Box>
              <Text>{formatRupiah(total_product_price)}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default CheckoutOrders;
