import { Box, Flex, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import reportStory from "../assets/report.png";

const SalesHistoryCard = ({
  username,
  total_quantity,
  createdAt,
  total_price,
  TransactionId,
  branch_name,
}) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Box
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"180px"}
          columnGap={"2"}
          fontSize={"15px"}
        >
          <Box
            display={"flex"}
            mt={"5px"}
            borderBottom={"3px solid #E07A5F"}
            mx={"10px"}
            pb={"5px"}
          >
            <Box flex={1} fontWeight={"bold"} textAlign={"left"}>
              Sales History
            </Box>
            <Box
              bg="#81B29A"
              flex={"0.5"}
              borderRadius={"15px"}
              mr={"5px"}
              textAlign={"center"}
              color={"white"}
            >
              {moment(createdAt).utcOffset("+07:00").format("YYYY-MM-DD")}
            </Box>
          </Box>
          <Flex mt={"5px"} pl={"10px"}>
            <Box flex={"0.5"} mt={"10px"}>
              <Image
                src={reportStory}
                alt="logo"
                display={"block"}
                ml={"auto"}
                mr={"auto"}
                height={"100px"}
              />
            </Box>
            <Box flex="1" mt={"10px"}>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Transaction ID: </Text>
                <Text ml={"5px"}>{TransactionId || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Branch Name: </Text>
                <Text ml={"5px"}>{branch_name || "Loading..."}</Text>
              </Box>
              <Box
                display={"flex"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"200px"}
              >
                <Text fontWeight={"bold"}>Purchase From: </Text>
                <Text ml={"5px"}>{username || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Selling Price:</Text>
                <Text ml={"5px"}>{formatRupiah(total_price)}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Quantity Sold:</Text>
                <Text ml={"5px"}>{total_quantity || "Loading..."}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SalesHistoryCard;
