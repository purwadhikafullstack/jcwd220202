import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

const AdminDashboard = () => {
  return (
    <Box>
      <Box
        backgroundColor={"#D9D9D9"}
        height={"75px"}
        position={"fixed"}
        top={"0"}
        right={"0"}
        left={"0"}
        fontWeight={"bold"}
      >
        <Flex fontSize={"18px"} fontFamily={"roboto"}>
          <Box margin={"25px"}>TOKO GROCERIN</Box>
          <Spacer />
          <Box margin={"25px"}>Box 2</Box>
        </Flex>
      </Box>
      <Box backgroundColor={"#F4F1DE"} height={"900px"}>
        HELLO
      </Box>
    </Box>
  );
};

export default AdminDashboard;
