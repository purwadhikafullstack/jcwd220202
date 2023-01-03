import { Box, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";
import shoppingPic from "../assets/login_logo.png";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import UpperBarSprAdm from "../components/UpperBarSprAdm";
import LineChartSuperAdmin from "../components/LineChartSuperAdmin";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Link } from "react-router-dom";
import productInBox from "../assets/checkingbox.png";
import branchAvailable from "../assets/opened.png";

const SuperAdminDashboard = () => {
  const [countProduct, setCountProduct] = useState([]);
  const [countBranch, setCountBranch] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/admin-product/active");

      setCountProduct(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranch = async () => {
    try {
      const response = await axiosInstance.get("/admin-branch");

      setCountBranch(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchBranch();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box backgroundColor={"#F4F1DE"} height={"1000px"}>
      <UpperBarSprAdm />
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
              src={productInBox}
              alt="voucher type"
              width={"100px"}
              objectFit={"contain"}
            />
          </Box>
          <Link to={"/super-admin/product"}>
            <Box
              width={"120px"}
              mt={"35px"}
              _hover={{ color: "#E07A5F" }}
              color={"black"}
            >
              <Text fontSize={"16px"}>Product In Store</Text>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                {countProduct !== 0 || countProduct !== null
                  ? countProduct
                  : "Loading..."}
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
              src={branchAvailable}
              alt="voucher type"
              width={"120px"}
              objectFit={"contain"}
            />
          </Box>
          <Link to={"/super-admin/branch"}>
            <Box
              width={"120px"}
              mt={"35px"}
              _hover={{ color: "#E07A5F" }}
              color={"black"}
            >
              <Text fontSize={"16px"}>Branch Available</Text>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                {countBranch !== 0 || countBranch !== null
                  ? countBranch
                  : "Loading..."}
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
        <LineChartSuperAdmin />
      </Box>
      <Box>
        <Link to={"/super-admin/statistic"}>
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
        </Link>
      </Box>
      <Box>
        <SuperAdminNavbar />
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
