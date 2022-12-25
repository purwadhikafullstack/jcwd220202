import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import grocerinLogo from "../assets/grocerin_logo_aja.png";

const UpperBarAdmin = () => {
  return (
    <Box
      backgroundColor={"#81B29A"}
      height={"75px"}
      position={"fixed"}
      top={"0"}
      right={"0"}
      left={"0"}
      fontWeight={"bold"}
      zIndex={"4"}
      margin={"auto"}
      maxWidth={"480px"}
    >
      <Flex fontSize={"18px"} fontFamily={"roboto"}>
        <Box margin={"25px"}>Branch Admin</Box>
        <Spacer />
        <Box>
          <Image
            src={grocerinLogo}
            alt="logo"
            height={"55px"}
            marginRight={"20px"}
            marginTop={"7px"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UpperBarAdmin;
