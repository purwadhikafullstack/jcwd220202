import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  VStack,
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
import CheckoutCart from "../components/CheckoutCartList";

const CartUser = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/transaction/cart");
      // const cartArr = [...response];

      // console.log(cartArr);
      setCartItems(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(cartItems);

  const renderCartItems = () => {
    return cartItems.map((val) => {
      return (
        <CheckoutCart
          key={val.id.toString()}
          product_name={val.ProductBranch.Product.product_name}
          product_image={val.ProductBranch.Product.product_image}
          total_product_price={val.total_product_price}
        />
      );
    });
  };

  // console.log(renderCartItems())

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Box
        backgroundColor={"#F4F1DE"}
        height={"100vh"}
        fontFamily={"roboto"}
        fontSize={"16px"}
        overflow={"scroll"}
        pb={"120px"}
      >
        <Flex display={"flex"}>
          <Text fontSize={"38px"}> Ini adalah carttttt</Text>
        </Flex>
        {renderCartItems()}
      <Button mt={"50px"} >{"Ceckout gannnnn"}</Button>
      </Box>
      

      <Navigation />
    </>
  );
};

export default CartUser;
