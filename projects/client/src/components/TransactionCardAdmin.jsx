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

const TransactionCardAdmin = ({
  TransactionId,
  total_price,
  createdAt,
  username,
  TransactionItems,
  transaction_status,
}) => {
  const showFirstItem = TransactionItems.map((val) => {
    const countDiscount =
      (val.current_price - val.applied_discount) * val.quantity;

    return {
      applied_discount: val.applied_discount,
      product_name: val.ProductBranch.Product.product_name,
      quantity: val.quantity,
      price_per_product: val.price_per_product,
      product_image: val.ProductBranch.Product.product_image,
      discounted_product: countDiscount,
    };
  });

  const showDiscount = () => {
    if (showFirstItem[0].applied_discount) {
      return (
        <>
          <Text ml={"5px"} textDecoration={"line-through"}>
            {formatRupiah(showFirstItem[0].price_per_product) || "Loading..."}
          </Text>
          <Text ml={"5px"}>
            {formatRupiah(showFirstItem[0].discounted_product) || "Loading..."}
          </Text>
        </>
      );
    } else {
      <Text ml={"5px"}>
        {formatRupiah(showFirstItem[0].price_per_product) || "Loading..."}
      </Text>;
    }
  };

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
        <Flex
          // maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"185px"}
          columnGap={"2"}
          fontSize={"15px"}
        >
          <Box flex="1" ml={"20px"} mt={"5px"}>
            <Box>
              <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                <GridItem
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"150px"}
                >
                  {username || "Loading..."}
                </GridItem>
              </Grid>
            </Box>
            <Box display={"flex"}>
              <Text>Trans. ID: </Text>
              <Text ml={"5px"}>{TransactionId || "Loading..."}</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"}>Total: </Text>
              <Text
                fontWeight={"bold"}
                ml={"5px"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"150px"}
              >
                {formatRupiah(total_price) || "Loading..."}
              </Text>
            </Box>
            <Box>{createdAt.split("T")[0] || "Loading..."}</Box>
            <Box>
              {transaction_status === "Payment Approved" ||
              transaction_status === "Product In Shipment" ||
              transaction_status === "Success" ? (
                <Badge
                  colorScheme={"green"}
                  fontStyle={"none"}
                  fontSize={"12px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"150px"}
                >
                  {transaction_status || "Loading..."}
                </Badge>
              ) : (
                <Badge
                  colorScheme={"red"}
                  fontStyle={"none"}
                  fontSize={"12px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"150px"}
                >
                  {transaction_status || "Loading..."}
                </Badge>
              )}
            </Box>
            <Box mt={"5px"}>
              <Link to={`/admin/transaction/${TransactionId}`}>
                <Button
                  width={"100px"}
                  bgColor={"#81B29A"}
                  _hover={{ bgColor: "#81B29A", color: "white" }}
                  // color={"black"}
                >
                  Details
                </Button>
              </Link>
            </Box>
          </Box>
          <Box flex="1" mr={"20px"}>
            <Box mt={"10px"}>
              <Image
                src={showFirstItem[0].product_image || uploadProduct}
                alt="search"
                objectFit={"contain"}
                height={"70px"}
                maxW={"300px"}
                border={"2px solid #E07A5F"}
                borderRadius={"10px"}
              />
            </Box>
            <Box
              fontWeight={"bold"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              maxWidth={"150px"}
            >
              {showFirstItem[0].product_name || "Loading..."}
            </Box>
            <Box display={"flex"}>
              <Text>{`${showFirstItem[0].quantity}x` || "Loading..."}</Text>
              <Box display={"grid"}>{showDiscount()}</Box>
            </Box>
            <Box
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              maxWidth={"150px"}
            >
              + {TransactionItems.length - 1} Other Products
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default TransactionCardAdmin;
