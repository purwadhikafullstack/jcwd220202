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
import voucherDiscountStory from "../assets/discount_voucher.png";
import freeShipmentStory from "../assets/shipment.png";
import buy1Get1Story from "../assets/buy1get1.png";

const VoucherCard = ({
  voucher_name,
  branch_name,
  discount_amount_nominal,
  discount_amount_percentage,
  is_Active,
  minimum_payment,
  minimum_transaction_done,
  quantity,
  applied_product,
  voucher_start_date,
  voucher_end_date,
  voucher_type,
  onOpenAlert,
  is_Deleted,
}) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const showDiscount = () => {
    if (
      discount_amount_nominal === null &&
      discount_amount_percentage === null
    ) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>{`-` || "Loading..."}</Text>
        </Box>
      );
    }

    if (discount_amount_nominal === 0) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>
            {`${discount_amount_percentage}%` || "Loading..."}
          </Text>
        </Box>
      );
    }

    if (discount_amount_percentage === 0) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>
            {formatRupiah(discount_amount_nominal) || "Loading..."}
          </Text>
        </Box>
      );
    }
  };

  const showActiveOrInActive = () => {
    if (is_Active == 0 && is_Deleted == 0) {
      return <Badge colorScheme="red">Inactive</Badge>;
    }

    if (is_Active == 0 && is_Deleted == 1) {
      return (
        <>
          <Badge colorScheme="red">Inactive</Badge>
          <Badge colorScheme="red" ml={"10px"}>
            Deleted
          </Badge>
        </>
      );
    }

    if (is_Active == 1) {
      return <Badge colorScheme="green">Active</Badge>;
    }
  };

  const showImage = () => {
    if (voucher_type === "Discount Voucher") {
      return (
        <Image
          src={voucherDiscountStory}
          alt="logo"
          display={"block"}
          mt={"20px"}
          ml={"auto"}
          mr={"auto"}
          height={"80px"}
        />
      );
    }

    if (voucher_type === "Free Shipment") {
      return (
        <Image
          src={freeShipmentStory}
          alt="logo"
          display={"block"}
          mt={"20px"}
          ml={"auto"}
          mr={"auto"}
          height={"80px"}
        />
      );
    }

    if (voucher_type === "Buy 1 Get 1") {
      return (
        <Image
          src={buy1Get1Story}
          alt="logo"
          display={"block"}
          mt={"20px"}
          ml={"auto"}
          mr={"auto"}
          height={"80px"}
        />
      );
    }
  };

  const openDeleteAlert = () => {
    onOpenAlert();

    document.body.style.overflow = "hidden";
  };

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
          <Box
            display={"flex"}
            mt={"5px"}
            borderBottom={"3px solid #E07A5F"}
            mx={"10px"}
            pb={"5px"}
          >
            <Box flex={1} fontWeight={"bold"} textAlign={"left"}>
              {showActiveOrInActive()}
            </Box>
            <Box
              bg="#81B29A"
              flex={"1"}
              borderRadius={"15px"}
              mr={"5px"}
              textAlign={"center"}
              color={"white"}
            >
              {voucher_type || "Loading..."}
            </Box>
          </Box>
          <Flex mt={"5px"} px={"5px"}>
            {is_Deleted === true ? (
              <Box flex="0.5" mt={"25px"}>
                {showImage()}
              </Box>
            ) : (
              <Box flex="0.5">{showImage()}</Box>
            )}
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>{branch_name || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>{voucher_name || "Loading..."}</Text>
              </Box>
              {showDiscount()}
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Applied to:</Text>
                <Text
                  ml={"5px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {applied_product || "-"}
                </Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Payment:</Text>
                <Text ml={"5px"}>{formatRupiah(minimum_payment) || "-"}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Transaction:</Text>
                <Text ml={"5px"}>{minimum_transaction_done || "-"}</Text>
              </Box>
            </Box>
          </Flex>
          <Flex px={"5px"} height={"auto"}>
            <Box flex="0.5" textAlign={"center"}>
              {is_Deleted == 0 ? (
                <Button
                  bg={"#E07A5F"}
                  _hover={{ bgColor: "#E07A5F" }}
                  onClick={openDeleteAlert}
                >
                  Delete
                </Button>
              ) : null}
            </Box>
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Quantity: </Text>
                <Text ml={"5px"}>{`${quantity}x` || "-"}</Text>
              </Box>
              <Box display={"flex"}>
                <Text>{voucher_start_date.split("T")[0] || "-"}</Text>
                <Text px={"4px"} fontWeight={"bold"}>
                  to
                </Text>
                <Text>{voucher_end_date.split("T")[0] || "-"}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default VoucherCard;
