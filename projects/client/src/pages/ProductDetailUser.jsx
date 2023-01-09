import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ProductListBar from "../components/ProductListBar";
import { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";

const ProductDetailUser = () => {
  const toast = useToast();
  const params = useParams();
  const [productDetails, setProductDetails] = useState();
  const [productStock, setProductStock] = useState();

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance.get(`/product/${params.id}`);

      setProductDetails(response.data.data[0]);
      setProductStock(response.data.data[0].ProductBranches[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const pushToCart = async () => {
    try {
      let productToAdd = {
        ProductBranchId: productStock.id,
        quantity: 1,
        current_price: productDetails.product_price,
      };
      await axiosInstance.post("/transaction/addcart", productToAdd);
      console.log(productToAdd);
      toast({ title: "Add product to cart", status: "success" });
    } catch (err) {
      console.log(err);
      toast({ title: "Server error", status: "error" });
    }
  };

  const addCartBtn = () => {
    pushToCart();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
              src={productDetails?.product_image}
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
                {formatRupiah(productDetails?.product_price)}
              </Text>
            </Box>

            <Box fontWeight={""} mt={"5px"}>
              <Text fontSize={"24px"}>{productDetails?.product_name}</Text>
            </Box>

            <Box fontWeight={"normal"} mt={"5px"}>
              <HStack fontSize={"16px"}>
                <Text>Stock</Text>
                <Text color={"#E07A5F"}>{productStock?.stock}</Text>
              </HStack>
            </Box>

            <Box fontWeight={"normal"} mt={"5px"}>
              <Text fontSize={"18px"}>
                {productDetails?.product_description}
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
