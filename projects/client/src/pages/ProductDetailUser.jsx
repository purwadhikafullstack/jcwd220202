import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProductListBar from "../components/ProductListBar";
import uploadProduct from "../assets/product_upload.png";
import { useState, useEffect } from "react";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailUser = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState();

  const fetchProductDetails = async () => {
    try {
      console.log("hello");
      const response = await axiosInstance.get(`/product/${params.id}`);

      setProductDetails(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pustToCart = async () => {
    try {
      let bookToAdd = {};
      await axiosInstance.post();
    } catch (err) {
      console.log(err);
    }
  };

  const addCartBtn = () => {
    pustToCart()
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"1150px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <ProductListBar />
      </Box>

      <Box display={"grid"}>
        <VStack spacing={4} align="stretch" mt={"90px"}>
          <Box h="300px" display={"flex"} justifyContent={"center"}>
            <Image
              src={
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              }
              alt="search"
              objectFit={"contain"}
              height={"100%"}
            />
          </Box>
          <Box px={"30px"}>
            <Box fontWeight={"bold"} mt={"5px"}>
              <Text
                fontSize={"24px"}
                fontWeight={"extrabold"}
                color={"#E07A5F"}
              >
                Rp {productDetails?.product_price}
              </Text>
            </Box>

            <Box fontWeight={""} mt={"5px"}>
              <Text fontSize={"24px"}>{productDetails?.product_name}</Text>
            </Box>

            <Box fontWeight={"normal"} mt={"5px"}>
              <HStack fontSize={"16px"}>
                <Text>Stock</Text>
                <Text color={"#E07A5F"}>9999</Text>
              </HStack>
            </Box>

            <Box fontWeight={"normal"} mt={"5px"}>
              <Text fontSize={"18px"}>
                {productDetails?.product_description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatum quis quo corrupti laborum iure, quasi consectetur
                suscipit. Repudiandae corrupti placeat mollitia. Voluptatem,
                voluptate!
              </Text>
            </Box>
          </Box>
        </VStack>
      </Box>
      <Box
        backgroundColor={"#E07A5F"}
        height={"75px"}
        position={"fixed"}
        bottom={"0"}
        right={"0"}
        left={"0"}
        fontWeight={"bold"}
      >
        <Box>
          <Button onClick={addCartBtn}>add to cart</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailUser;
