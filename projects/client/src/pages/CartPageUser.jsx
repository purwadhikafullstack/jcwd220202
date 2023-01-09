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
import CartHeader from "../components/CartHeader";

const CartUser = () => {
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const [checkoutItems, setCheckoutItems] = useState({});

  const checkoutButton = async () => {
    try {
      const response = await axiosInstance.post("/transaction/checkout");

      setCheckoutItems(response.data.data);

      if (response.data.data.id) {
        navigate(`/user/order/${response.data.data.id}`);
      }

      toast({ title: "Product checked out", status: "success" });
    } catch (err) {
      console.log(err);
      toast({ title: "Error handling product", status: "error" });
    }
  };
  const noItem = () => {
    toast({ title: "No item to checked out", status: "error" });
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/transaction/${id}`);

      fetchCartItems();
      toast({ title: "Item deleted", status: "info" });
    } catch (err) {
      console.log(err);
      toast({ title: "Failed to delete item", status: "error" });
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/transaction/cart");

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
          id={val.id}
          ProductBranchId={val.ProductBranchId}
          product_name={val.ProductBranch.Product.product_name}
          product_image={val.ProductBranch.Product.product_image}
          quantity={val.quantity}
          current_price={val.current_price}
          onDelete={() => deleteBtnHandler(val.id)}
        />
      );
    });
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <CartHeader />
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
        {/* <Box height={"600px"} overflowY={"auto"} > */}
        {renderCartItems()}
        {/* </Box> */}
        <Button
          mt={"10px"}
          onClick={cartItems.length == 0 ? noItem : checkoutButton}
        >
          {"Ceckout gannnnn"}
        </Button>
      </Box>

      <Navigation />
    </>
  );
};

export default CartUser;
