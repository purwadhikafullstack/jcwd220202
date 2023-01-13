import {
  Badge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";

import TransactionListBar from "../components/TransactionListBar";
import { useState } from "react";
import { axiosInstance } from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserTransactionDetail = () => {
  const [transactionDetail, setTransactionDetail] = useState({});
  const [transactionItem, setTransactionItem] = useState([]);

  const params = useParams();
  const navigate = useNavigate;
  const toast = useToast();

  const fetchTransactionDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `/transaction/detail-transaction/${params.id}`
      );
      setTransactionDetail(response.data.data);
      setTransactionItem(response.data.data.TransactionItems);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(transactionDetail);

  const totalPrice = () => {
    let sumPrice = 0;

    for (let i = 0; i < transactionItem.length; i++) {
      sumPrice =
        sumPrice +
        transactionItem[i].current_price +
        transactionItem[i].applied_discount;
    }

    return sumPrice;
  };

  const totalDiscount = () => {
    let discount = 0;

    for (let i = 0; i < transactionItem.length; i++) {
      discount = discount + transactionItem[i].applied_discount;
    }

    return discount;
  };

  const orderDonePostToHistory = async () => {
    try {
      await axiosInstance.post(`/transaction/history/${params.id}`);

      fetchTransactionDetail();
    } catch (err) {
      console.log(err);
    }
  };

  const showReferralVoucher = () => {
    if (transactionDetail.ReferralVoucherId === null) {
      return (
        <Text fontWeight={"normal"} ml={"5px"}>
          {"-"}
        </Text>
      );
    }

    if (transactionDetail.ReferralVoucherId !== null) {
      return (
        <Text fontWeight={"normal"}>
          {/* {transactionDetail?.ReferralVoucher?.voucher_name || "Loading..."} */}
          <Badge
            colorScheme="green"
            textAlign={"center"}
            width={"auto"}
            fontSize={"13px"}
          >
            Referral Voucher Used
          </Badge>
        </Text>
      );
    }
  };

  const showVoucher = () => {
    if (transactionDetail.VoucherId === null) {
      return (
        <Text fontWeight={"normal"} ml={"5px"}>
          {"-"}
        </Text>
      );
    }

    if (transactionDetail?.VoucherId !== null) {
      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type ===
        "Free Shipment"
      ) {
        return (
          <>
            <Badge
              colorScheme="blue"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Free Shipment Voucher
            </Badge>
          </>
        );
      }

      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type ===
        "Discount Voucher"
      ) {
        return (
          <>
            <Badge
              colorScheme="blue"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Discount Voucher
            </Badge>
          </>
        );
      }

      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type === "Buy 1 Get 1"
      ) {
        return (
          <>
            <Badge
              colorScheme="blue"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Buy 1 Get 1
            </Badge>
            <Text fontWeight={"normal"}>
              {transactionDetail?.Voucher?.voucher_name || "Loading..."}
            </Text>
          </>
        );
      }
    }
  };
  const showTransactionStatus = () => {
    if (transactionDetail?.transaction_status === "Waiting For Payment") {
      return (
        <>
          <Box>
            <Badge
              colorScheme="green"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Waiting For Payment
            </Badge>
            <Link to={`/user/payment/${params.id}`}>
              <Button>Pay me!</Button>
            </Link>
          </Box>
        </>
      );
    }

    if (transactionDetail?.transaction_status === "Payment Approved") {
      return (
        <>
          <Badge
            colorScheme="green"
            textAlign={"center"}
            width={"auto"}
            fontSize={"13px"}
          >
            Payment Approved
          </Badge>
        </>
      );
    }

    if (transactionDetail?.transaction_status === "Product In Shipment") {
      return (
        <>
          <Badge
            colorScheme="green"
            textAlign={"center"}
            width={"auto"}
            fontSize={"13px"}
          >
            Product in Shipment
          </Badge>
          <Button onClick={orderDonePostToHistory}>Order accepted</Button>
        </>
      );
    }
    if (transactionDetail?.transaction_status === "Success") {
      return (
        <>
          <Badge
            colorScheme="green"
            textAlign={"center"}
            width={"auto"}
            fontSize={"13px"}
          >
            Success
          </Badge>
        </>
      );
    }
    if (transactionDetail?.transaction_status === "Cancel") {
      return (
        <>
          <Badge
            colorScheme="green"
            textAlign={"center"}
            width={"auto"}
            fontSize={"13px"}
          >
            Cancelled
          </Badge>
        </>
      );
    }
  };

  const finalVoucher = () => {
    if (
      transactionDetail?.VoucherId === null &&
      transactionDetail?.ReferralVoucherId === null
    ) {
      return <Text textAlign={"center"}>{"-"}</Text>;
    } else if (transactionDetail?.ReferralVoucher) {
      return (
        <Text>
          -{" "}
          {formatRupiah(transactionDetail?.ReferralVoucher?.discount_amount) ||
            "Loading..."}
        </Text>
      );
    } else if (transactionDetail?.Voucher) {
      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type ===
        "Free Shipment"
      ) {
        if (transactionDetail?.Voucher?.discount_amount_nominal) {
          return (
            <Text>
              -{" "}
              {formatRupiah(
                transactionDetail?.Voucher?.discount_amount_nominal
              ) || "Loading..."}
            </Text>
          );
        } else if (transactionDetail?.Voucher?.discount_amount_percentage) {
          const countShipmentDiscount =
            (transactionDetail?.Voucher?.discount_amount_percentage / 100) *
            transactionDetail?.shipment_price;
          return (
            <Text>- {formatRupiah(countShipmentDiscount) || "Loading..."}</Text>
          );
        }
      }
      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type === "Buy 1 Get 1"
      ) {
        return <Text textAlign={"center"}>{"-"}</Text>;
      }

      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type ===
        "Discount Voucher"
      ) {
        if (transactionDetail?.Voucher?.discount_amount_nominal) {
          return (
            <Text>
              -{" "}
              {formatRupiah(
                transactionDetail?.Voucher?.discount_amount_nominal
              ) || "Loading..."}
            </Text>
          );
        } else if (transactionDetail?.Voucher?.discount_amount_percentage) {
          const countProductDiscount =
            (transactionDetail?.Voucher?.discount_amount_percentage / 100) *
            transactionDetail?.Voucher?.Product?.product_price;
          return (
            <Text>- {formatRupiah(countProductDiscount) || "Loading..."}</Text>
          );
        }
      }
    }
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const truncate = (string, length) => {
    if (string.length > length) return string.substring(0, length) + "...";
    else return string;
  };

  const renderItemTransaction = () => {
    return transactionItem.map((val) => {
      const countOriginalPrice = val.current_price + val.applied_discount;

      return (
        <Box display={"flex"} mt={"10px"} key={val.id.toString()}>
          <Image
            src={val.ProductBranch?.Product?.product_image || "Loading..."}
            alt="search"
            objectFit={"contain"}
            height={"100px"}
            width={"100px"}
            border={"2px solid #E07A5F"}
            borderRadius={"10px"}
            bgColor={"white"}
          />
          <Box mt={"15px"} ml={"10px"}>
            <Text fontWeight={"bold"}>
              {truncate(val.ProductBranch?.Product?.product_name, 30) ||
                "Loading..."}
            </Text>
            <Box display={"flex"}>
              <Text>{`${val.quantity}x` || "Loading..."}</Text>
              {val.applied_discount ? (
                <>
                  <Text ml={"5px"} textDecoration={"line-through"}>
                    {formatRupiah(countOriginalPrice) || "Loading..."}
                  </Text>
                  <Text ml={"5px"}>
                    {formatRupiah(val.current_price) || "Loading..."}
                  </Text>
                </>
              ) : (
                <Text ml={"5px"}>
                  {formatRupiah(countOriginalPrice) || "Loading..."}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchTransactionDetail();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflowY={"scroll"}
      pb={"80px"}
    >
      <Box pt={"100px"}>
        <Grid templateRows="repeat(3, 1fr)"></Grid>
        <VStack spacing={4} align="stretch" px={"15px"}>
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Detail Product
            </Text>
            <Text fontWeight={"bold"} mt={"10px"}>
              {transactionDetail?.User?.username || "Loading..."}
            </Text>
            <Box>{showTransactionStatus()}</Box>
          </Box>
          <Box
            bgColor={"#F4F1DE"}
            borderRadius={"10px"}
            border={"2px solid #E07A5F"}
            py={"8px"}
            mt={"8px"}
            overflowY={"scroll"}
            maxWidth={"450px"}
            height={"250px"}
            padding={"10px"}
          >
            {renderItemTransaction()}
          </Box>
        </VStack>
        <VStack spacing={4} align="stretch" px={"15px"} mt={"20px"}>
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Voucher Used
            </Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>{showVoucher()}</Text>
          </Box>
        </VStack>
        <VStack spacing={4} align="stretch" px={"15px"} mt={"20px"}>
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Shipment Info
            </Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"} mt={"5px"}>
              Shipping Method:
            </Text>
            <Text fontWeight={"normal"}>
              JNE {transactionDetail?.shipping_method || "Loading..."}
            </Text>
            <Text fontWeight={"normal"}>
              {transactionDetail?.shipping_address || "Loading..."}
            </Text>
          </Box>
        </VStack>
        <VStack
          spacing={1}
          align="stretch"
          px={"15px"}
          mt={"20px"}
          fontWeight={"bold"}
        >
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Payment Info
            </Text>
          </Box>
          <Box
            h="auto"
            display={"flex"}
            justifyContent={"space-between"}
            pt={"20px"}
          >
            <Text>Total Price :</Text>
            <Text>{formatRupiah(totalPrice()) || "Rp 0"}</Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Shipment Price :</Text>
            <Text>
              {transactionDetail.shipment_price
                ? formatRupiah(transactionDetail?.shipment_price)
                : "Rp 0"}
            </Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Discount :</Text>
            <Text>- {formatRupiah(totalDiscount()) || "- Rp 0"}</Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Voucher :</Text>
            {finalVoucher() || "- Rp 0"}
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Grand Total Price :</Text>
            <Text>
              {transactionDetail.total_price
                ? formatRupiah(transactionDetail?.total_price)
                : "Rp 0"}
            </Text>
          </Box>
        </VStack>
      </Box>
      <Box>
        <TransactionListBar />
      </Box>
    </Box>
  );
};

export default UserTransactionDetail;
