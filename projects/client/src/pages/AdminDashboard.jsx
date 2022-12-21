import {
  Box,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import AdminNavbar from "../components/AdminNavbar";
import LineChartAdmin from "../components/LineChartAdmin";
import UpperBarAdmin from "../components/UpperAdminBar";
import availableOrderLogo from "../assets/delivery.png";
import productToSendLogo from "../assets/checkingbox.png";
import availableVoucherLogo from "../assets/discountexisting.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../api";
import { useEffect } from "react";

const AdminDashboard = () => {
  const [orderInStore, setOrderInStore] = useState(0);
  const [productToSend, setProductToSend] = useState(0);

  const fetchOrderInStore = async () => {
    try {
      const response = await axiosInstance.get(
        "/admin-transaction/active/order"
      );

      setOrderInStore(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductToSend = async () => {
    try {
      const response = await axiosInstance.get(
        "/admin-transaction/active/product-send"
      );

      setProductToSend(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderInStore();
    fetchProductToSend();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box backgroundColor={"#F4F1DE"} height={"1100px"}>
      <UpperBarAdmin />
      <Box
        ml={"30px"}
        pt={"100px"}
        fontWeight={"bold"}
        borderBottom={"3px solid #E07A5F"}
        mr={"30px"}
        height={"140px"}
      >
        What's In Store
      </Box>
      <VStack spacing={4} mx={"30px"} mt={"20px"}>
        <Box
          height={"120px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"2px 2px 2px grey"}
          display={"flex"}
          width={"100%"}
          justifyContent={"space-evenly"}
        >
          <Box width={"120px"} mt={"10px"}>
            <Image
              src={availableOrderLogo}
              alt="voucher type"
              width={"100px"}
              objectFit={"contain"}
            />
          </Box>
          <Link to={"/admin/transaction"}>
            <Box
              width={"120px"}
              mt={"35px"}
              _hover={{ color: "#E07A5F" }}
              color={"black"}
            >
              <Text fontSize={"16px"}>Available Order</Text>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                {orderInStore || 0}
              </Text>
            </Box>
          </Link>
        </Box>
        <Box
          height={"120px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"2px 2px 2px grey"}
          display={"flex"}
          width={"100%"}
          // maxWidth={"385px"}
          justifyContent={"space-evenly"}
        >
          <Box width={"120px"}>
            <Image
              src={productToSendLogo}
              alt="voucher type"
              width={"100px"}
              objectFit={"contain"}
              mt={"10px"}
            />
          </Box>
          <Link to={"/admin/transaction"}>
            <Box
              width={"120px"}
              mt={"35px"}
              _hover={{ color: "#E07A5F" }}
              color={"black"}
            >
              <Text fontSize={"16px"}>Product to Send</Text>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                {productToSend || 0}
              </Text>
            </Box>
          </Link>
        </Box>
        <Box
          height={"120px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"2px 2px 2px grey"}
          display={"flex"}
          width={"100%"}
          // maxWidth={"385px"}
          justifyContent={"space-evenly"}
        >
          <Box width={"120px"}>
            <Image
              src={availableVoucherLogo}
              alt="voucher type"
              width={"100px"}
              objectFit={"contain"}
              mt={"10px"}
            />
          </Box>
          <Link to={"/admin/voucher"}>
            <Box
              width={"130px"}
              mt={"35px"}
              _hover={{ color: "#E07A5F" }}
              color={"black"}
            >
              <Text fontSize={"16px"} ml={"5px"}>
                Active Voucher
              </Text>
              <Text fontSize={"20px"} fontWeight={"bold"} ml={"5px"}>
                {0}
              </Text>
            </Box>
          </Link>
        </Box>
      </VStack>
      <Box
        ml={"30px"}
        mt={"20px"}
        fontWeight={"bold"}
        borderBottom={"3px solid #E07A5F"}
        mr={"30px"}
        height={"40px"}
      >
        Insight
      </Box>
      <Box
        backgroundColor={"white"}
        marginTop={"20px"}
        padding={"5px"}
        marginX={"30px"}
        boxShadow={"1px 1px 1px grey"}
        borderRadius={"10px"}
        style={{
          height: "250px",
        }}
      >
        <LineChartAdmin />
      </Box>
      <Box>
        <Text
          textAlign={"right"}
          marginRight={"30px"}
          marginTop={"10px"}
          fontFamily={"roboto"}
          fontSize={"15px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
        >
          View more..
        </Text>
      </Box>
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
