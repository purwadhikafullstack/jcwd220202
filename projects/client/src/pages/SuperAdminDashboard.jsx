import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import shoppingPic from "../assets/login_logo.png";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import UpperBarSprAdm from "../components/UpperBarSprAdm";
import LineChartSuperAdmin from "../components/LineChartSuperAdmin";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [countProduct, setCountProduct] = useState([]);
  const [countBranch, setCountBranch] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/admin-product/super-admin");

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
  }, []);

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <Box backgroundColor={"#F4F1DE"} height={"932px"}>
      <UpperBarSprAdm />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem
          bg="tomato"
          marginTop={"130px"}
          marginLeft={"30px"}
          height={"80px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"1px 1px 1px grey"}
        >
          <Link to={"/super-admin/product"}>
            <Box
              marginLeft={"15px"}
              marginTop={"10px"}
              fontFamily={"roboto"}
              _hover={{ color: "#E07A5F" }}
            >
              <Text fontSize={"16px"}>Product In Store</Text>
              <Text fontSize={"24px"} fontWeight={"bold"}>
                {countProduct || "Loading..."}
              </Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem
          marginTop={"130px"}
          marginRight={"30px"}
          height={"80px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"1px 1px 1px grey"}
        >
          <Link to={"/super-admin/user"}>
            <Box
              marginLeft={"15px"}
              marginTop={"10px"}
              fontFamily={"roboto"}
              _hover={{ color: "#E07A5F" }}
            >
              <Text fontSize={"16px"}>Branch Available</Text>
              <Text fontSize={"24px"} fontWeight={"bold"}>
                {countBranch || "Loading..."}
              </Text>
            </Box>
          </Link>
        </GridItem>
      </Grid>
      <Box
        backgroundColor={"white"}
        marginTop={"60px"}
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
      <Box display={"grid"} my={"20px"} zIndex={"base"}>
        <Image
          src={shoppingPic}
          alt="logo"
          height={"200px"}
          justifySelf={"center"}
        />
      </Box>
      <Box>
        <SuperAdminNavbar />
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
