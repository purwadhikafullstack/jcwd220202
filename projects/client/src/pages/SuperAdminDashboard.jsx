import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import LineChart from "../components/LineChart";
import shoppingPic from "../assets/login_logo.png";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import UpperBarSprAdm from "../components/UpperBarSprAdm";

const SuperAdminDashboard = () => {
  return (
    <Box backgroundColor={"#F4F1DE"} height={"932px"}>
      <UpperBarSprAdm />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem
          marginTop={"130px"}
          marginLeft={"30px"}
          height={"80px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"1px 1px 1px grey"}
        >
          <Box marginLeft={"15px"} marginTop={"10px"} fontFamily={"roboto"}>
            <Text fontSize={"16px"}>User Available</Text>
            <Text fontSize={"24px"} fontWeight={"bold"}>
              0
            </Text>
          </Box>
        </GridItem>
        <GridItem
          marginTop={"130px"}
          marginRight={"30px"}
          height={"80px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"1px 1px 1px grey"}
        >
          <Box marginLeft={"15px"} marginTop={"10px"} fontFamily={"roboto"}>
            <Text fontSize={"16px"}>Branch Available</Text>
            <Text fontSize={"24px"} fontWeight={"bold"}>
              0
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Box
        marginTop={"20px"}
        bgColor={"white"}
        height={"80px"}
        mx={"110px"}
        textAlign={"center"}
        borderRadius={"10px"}
        boxShadow={"1px 1px 1px grey"}
        fontFamily={"roboto"}
      >
        <Text
          pt={"10px"}
          textAlign={"left"}
          marginLeft={"15px"}
          fontSize={"16px"}
        >
          Product In Store
        </Text>
        <Text
          textAlign={"left"}
          marginLeft={"15px"}
          fontSize={"24px"}
          fontWeight={"bold"}
        >
          0
        </Text>
      </Box>
      <Box
        backgroundColor={"white"}
        marginTop={"30px"}
        padding={"5px"}
        marginX={"30px"}
        boxShadow={"1px 1px 1px grey"}
        borderRadius={"10px"}
        style={{
          height: "250px",
        }}
      >
        <LineChart />
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
      <Box display={"grid"} my={"10px"}>
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
