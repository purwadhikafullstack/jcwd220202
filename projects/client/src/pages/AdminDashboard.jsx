import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import AdminNavbar from "../components/AdminNavbar";
import LineChartAdmin from "../components/LineChartAdmin";
import UpperBarAdmin from "../components/UpperAdminBar";
import shoppingPic from "../assets/login_logo.png";

const AdminDashboard = () => {
  return (
    <Box backgroundColor={"#F4F1DE"} height={"932px"}>
      <UpperBarAdmin />
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
          <Box marginLeft={"15px"} marginTop={"10px"} fontFamily={"roboto"}>
            <Text fontSize={"16px"}>Available Order</Text>
            <Text fontSize={"24px"} fontWeight={"bold"}>
              0
            </Text>
          </Box>
        </GridItem>
        <GridItem
          bg="tomato"
          marginTop={"130px"}
          marginRight={"30px"}
          height={"80px"}
          borderRadius={"10px"}
          backgroundColor={"white"}
          boxShadow={"1px 1px 1px grey"}
        >
          <Box marginLeft={"15px"} marginTop={"10px"} fontFamily={"roboto"}>
            <Text fontSize={"16px"}>Product to Send</Text>
            <Text fontSize={"24px"} fontWeight={"bold"}>
              0
            </Text>
          </Box>
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
      <Box display={"grid"} my={"20px"} zIndex={"base"}>
        <Image
          src={shoppingPic}
          alt="logo"
          height={"200px"}
          justifySelf={"center"}
        />
      </Box>
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
