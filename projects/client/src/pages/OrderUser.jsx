import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/NavigationBar";
import ProductBox from "../components/ProductBox";
import InfiniteScroll from "react-infinite-scroll-component";

const OrderUser = () => {
  return (
    <Box bgColor={"#81B29A"}>
      <Box pt={"10px"}>
        <Flex display={"flex"}>
          <Text fontSize={"38px"}> Ini Orderrr</Text>
          <Box
            p={"2"}
            mr={"5"}
            color="#E07A5F"
            borderRadius="10px"
            as="b"
            _hover={{
              background: "white",
              color: "#E07A5F",
              transition: "all 1000ms ease",
              cursor: "pointer",
            }}
          >
            <Button onClick={"searchKey"}>Search</Button>
          </Box>
        </Flex>
      </Box>

      <Box h={"600px"} bgColor={"#F4F1DE"} mt={"10px"} position={"relative"}>
        {/* --------------------- */}
        <Box marginTop={"20px"} mx={"20px"}>
          <Flex
            // maxHeight={"185px"}
            fontFamily={"roboto"}
            color={"black"}
            border={"2px solid #E07A5F"}
            borderRadius={"15px"}
            boxShadow={"1px 1px 4px #E07A5F"}
            height={"185px"}
            fontSize={"15px"}
          >
            <Box flex="1" mx={"5px"} mt={"5px"}>
              <Box mt={"10px"}>
                <Image
                  src={"http://localhost:8000/public/1669692949375.jpeg"}
                  alt="search"
                  objectFit={"contain"}
                  height={"80px"}
                  maxW={"300px"}
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
                    {"product_name"}
                  </GridItem>
                </Grid>
              </Box>
              <Box display={"flex"}>
                <Text ml={"5px"}>{"TransactionId"}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"} textDecorationLine={"line-through"}>
                  {"Rp 9999"}{" "}
                </Text>
                <Text
                  fontWeight={"bold"}
                  ml={"5px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"150px"}
                >
                  {"Rp 100"}
                </Text>
              </Box>
              <Box>
                <Text>{"-qty+"}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        {/* ---------------------------- */}
      </Box>
      <Navigation />
    </Box>
  );
};

export default OrderUser;
