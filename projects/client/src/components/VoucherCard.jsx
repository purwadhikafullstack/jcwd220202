import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import uploadProduct from "../assets/product_upload.png";

const VoucherCard = () => {
  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Box
          // maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"230px"}
          columnGap={"2"}
          fontSize={"15px"}
        >
          <Box display={"flex"} mt={"5px"}>
            <Box flex={1} fontWeight={"bold"} textAlign={"right"} mr={"10px"}>
              <Badge colorScheme="green">Active</Badge>
            </Box>
            <Box
              bg="#81B29A"
              flex={"1"}
              borderRadius={"15px"}
              mr={"5px"}
              textAlign={"center"}
              color={"white"}
            >
              Voucher Discount
            </Box>
          </Box>
          <Flex mt={"5px"} px={"5px"}>
            <Box flex="0.5">
              <Image
                src={uploadProduct}
                alt="logo"
                display={"block"}
                ml={"auto"}
                mr={"auto"}
                height={"110px"}
              />
            </Box>
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Cabang Bandung</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Diskon Tahun Baru</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Discount:</Text>
                <Text ml={"5px"}>12</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Applied to:</Text>
                <Text ml={"5px"}>12</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Payment:</Text>
                <Text ml={"5px"}>12</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Transaction:</Text>
                <Text ml={"5px"}>12</Text>
              </Box>
            </Box>
          </Flex>
          <Flex px={"5px"} height={"auto"}>
            <Box flex="0.5" textAlign={"center"}>
              <Button bg={"#E07A5F"} _hover={{ bgColor: "#E07A5F" }}>
                Delete
              </Button>
            </Box>
            <Box flex="1">
              {/* <Box display={"flex"}>
                <Text>10x</Text>
                <Box display={"flex"} ml={"20px"}>
                  <Text fontWeight={"bold"}>Valid Until:</Text>
                  <Text ml={"5px"}>12-12-2022</Text>
                </Box>
              </Box> */}
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Quantity: </Text>
                <Text ml={"5px"}>10x</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Valid: </Text>
                <Text ml={"5px"}>10-10-22</Text>
                <Text px={"4px"} fontWeight={"bold"}>
                  to
                </Text>
                <Text>10-12-22</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default VoucherCard;
