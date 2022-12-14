import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import backIcon from "../assets/back_icon.png";
import { useNavigate } from "react-router-dom";

const ProductMutationListBar = () => {
  const navigate = useNavigate();

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
        <Box marginLeft={"10px"} marginTop={"18px"}>
          <Image
            objectFit="cover"
            src={backIcon}
            alt="back"
            height={"40px"}
            onClick={() => navigate(-1)}
          />
        </Box>
        <Spacer />
        <Box margin={"25px"}>Product History</Box>
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

export default ProductMutationListBar;
