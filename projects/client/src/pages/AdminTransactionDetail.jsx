import {
  Badge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminTransactionDetail = () => {
  const [transactionDetail, setTransactionDetail] = useState({});
  const [transactionItem, setTransactionItem] = useState([]);

  const params = useParams();
  const toast = useToast();
  const {
    isOpen: isOpenStatus,
    onOpen: onOpenStatus,
    onClose: onCloseStatus,
  } = useDisclosure();

  const optionsStatus = [
    { value: "Waiting For Payment", label: "Waiting For Payment" },
    { value: "Waiting For Approval", label: "Waiting For Approval" },
    { value: "Payment Approved", label: "Payment Approved" },
    { value: "Product In Shipment", label: "Product In Shipment" },
    { value: "Success", label: "Success" },
    { value: "Cancel", label: "Cancel" },
  ];

  const openChangeStatusModal = () => {
    onOpenStatus();

    document.body.style.overflow = "hidden";
  };

  const closeChangeStatusModal = () => {
    onCloseStatus();

    document.body.style.overflow = "unset";
  };

  const colourStyles = {
    control: (base) => ({
      ...base,
      height: "40px",
      maxWidth: "400px",
    }),
    menu: (base) => ({
      ...base,
      maxWidth: "400px",
      color: "black",
      zIndex: 3,
    }),
  };

  const fetchTransactionDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin-transaction/${params.id}`
      );

      setTransactionDetail(response.data.data);
      setTransactionItem(response.data.data.TransactionItems);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      transaction_status: "",
      note_to_customer: "",
    },
    onSubmit: async ({ transaction_status, note_to_customer }) => {
      if (transaction_status == "Cancel" && note_to_customer) {
        try {
          await axiosInstance.patch(`/admin-transaction/status/${params.id}`, {
            transaction_status: transaction_status,
            note_to_customer: note_to_customer,
          });

          fetchTransactionDetail();
          closeChangeStatusModal();

          toast({
            title: "Transaction Status Updated",
            status: "info",
          });
        } catch (error) {
          console.log(error);
        }
        return;
      }

      if (transaction_status == "Cancel" && !note_to_customer) {
        formik.setFieldError("note_to_customer", "Note a is required ");
      }

      if (transaction_status != "Cancel") {
        try {
          await axiosInstance.patch(`/admin-transaction/status/${params.id}`, {
            transaction_status: transaction_status,
            note_to_customer: note_to_customer,
          });

          fetchTransactionDetail();
          closeChangeStatusModal();

          toast({
            title: "Transaction Status Updated",
            status: "info",
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    validationSchema: Yup.object().shape(
      {
        transaction_status: Yup.mixed()
          .nullable()
          .required("Transaction status is a required field"),
        note_to_customer: Yup.string().when("transaction_status", (val) => {
          if (formik.values.transaction_status == "Cancel") {
            return Yup.string().required("Cancelation needs note to customer");
          } else {
            return Yup.string().notRequired();
          }
        }),
      },
      [
        ["transaction_status", "transaction_status"],
        ["note_to_customer", "note_to_customer"],
      ]
    ),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

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
              colorScheme="green"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Free Shipment Voucher
            </Badge>
            <Text fontWeight={"normal"}>
              {transactionDetail?.Voucher?.voucher_name || "Loading..."}
            </Text>
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
              colorScheme="green"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Discount Voucher
            </Badge>
            <Text fontWeight={"normal"}>
              {transactionDetail?.Voucher?.voucher_name || "Loading..."}
            </Text>
          </>
        );
      }

      if (
        transactionDetail?.Voucher?.VoucherType?.voucher_type === "Buy 1 Get 1"
      ) {
        return (
          <>
            <Badge
              colorScheme="green"
              textAlign={"center"}
              width={"auto"}
              fontSize={"13px"}
            >
              Buy 1 Get 1
            </Badge>
            <Text fontWeight={"normal"}>
              {transactionDetail?.Voucher?.voucher_name || "Loading..."}
            </Text>
            <Text fontWeight={"normal"}>
              {transactionDetail?.Voucher?.Product?.product_name ||
                "Loading..."}
            </Text>
          </>
        );
      }
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
            alt="image"
            objectFit={"contain"}
            height={"100px"}
            width={"100px"}
            bgColor={"white"}
            border={"2px solid #E07A5F"}
            borderRadius={"10px"}
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
        <Grid templateRows="repeat(3, 1fr)">
          <GridItem ml={"15px"} maxHeight={"50px"}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <GridItem w="100%" mt={"5px"}>
                {transactionDetail.transaction_status === "Payment Approved" ||
                transactionDetail.transaction_status ===
                  "Product In Shipment" ||
                transactionDetail.transaction_status === "Success" ? (
                  <Badge
                    colorScheme={"green"}
                    fontStyle={"none"}
                    fontSize={"14px"}
                  >
                    {transactionDetail?.transaction_status || "Loading..."}
                  </Badge>
                ) : (
                  <Badge
                    colorScheme={"red"}
                    fontStyle={"none"}
                    fontSize={"14px"}
                  >
                    {transactionDetail?.transaction_status || "Loading..."}
                  </Badge>
                )}
              </GridItem>
              <GridItem w="100%" textAlign={"center"}>
                <Button
                  height={"40px"}
                  width={"130px"}
                  bgColor={"#81B29A"}
                  _hover={{ bgColor: "#81B29A" }}
                  onClick={openChangeStatusModal}
                >
                  Change Status
                </Button>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={"5px"}>
              <GridItem w="100%" mt={"8px"} fontWeight={"bold"}>
                {transactionDetail?.id || "Loading..."}
              </GridItem>
              <GridItem w="100%" textAlign={"center"}>
                <a href={transactionDetail.payment_proof_img} target="_blank">
                  <Button
                    height={"40px"}
                    bgColor={"#81B29A"}
                    _hover={{ bgColor: "#81B29A" }}
                    width={"130px"}
                    color={"black"}
                  >
                    Payment Proof
                  </Button>
                </a>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={"5px"}>
              <GridItem mt={"8px"} fontWeight={"bold"}>
                {transactionDetail?.createdAt?.split("T")[0] || "Loading..."}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
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
            <Text fontWeight={"bold"}>Referral Voucher:</Text>
            {showReferralVoucher()}
            <Text fontWeight={"bold"} mt={"5px"}>
              Grocerin Voucher:
            </Text>
            {showVoucher()}
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
            <Text fontWeight={"bold"}>Address:</Text>
            <Text fontWeight={"normal"}>
              {transactionDetail?.shipping_address || "Loading..."}
            </Text>
            <Text fontWeight={"bold"} mt={"5px"}>
              Shipping Method:
            </Text>
            <Text fontWeight={"normal"}>
              {transactionDetail?.shipping_method || "Loading..."}
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

      {/* modal for change status */}

      <Modal isOpen={isOpenStatus} onClose={closeChangeStatusModal}>
        <ModalOverlay />
        <ModalContent
          mt={"20vh"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          bgColor={"#F4F1DE"}
        >
          <ModalHeader
            fontSize={"16px"}
            fontWeight="bold"
            mt={"10px"}
            textAlign={"center"}
          >
            Change Transaction Status
          </ModalHeader>
          <ModalBody>
            <Box>
              <Text fontWeight={"bold"}>Currrent Transaction Status:</Text>
              {transactionDetail.transaction_status === "Payment Approved" ||
              transactionDetail.transaction_status === "Product In Shipment" ||
              transactionDetail.transaction_status === "Success" ? (
                <Badge
                  colorScheme={"green"}
                  fontStyle={"none"}
                  fontSize={"14px"}
                  mt={"10px"}
                >
                  {transactionDetail?.transaction_status || "Loading..."}
                </Badge>
              ) : (
                <Badge
                  colorScheme={"red"}
                  fontStyle={"none"}
                  fontSize={"14px"}
                  mt={"10px"}
                >
                  {transactionDetail?.transaction_status || "Loading..."}
                </Badge>
              )}
            </Box>
            <FormControl
              mt={"10px"}
              isInvalid={formik.errors.transaction_status}
            >
              <FormLabel fontWeight={"bold"}>Transaction Status:</FormLabel>
              <Select
                value={
                  formik.values.transaction_status
                    ? {
                        label: formik.values.transaction_status,
                        value: formik.values.transaction_status,
                      }
                    : { label: "Select Transaction Status", value: "" }
                }
                options={optionsStatus}
                styles={colourStyles}
                name="transaction_status"
                onChange={(event) => {
                  formik.setFieldValue("transaction_status", event.value);
                }}
                placeholder={"Select transaction status"}
              />
              <FormErrorMessage>
                {formik.errors.transaction_status}
              </FormErrorMessage>
            </FormControl>

            {formik.values.transaction_status === "Cancel" ? (
              <FormControl
                mt={"5px"}
                isInvalid={formik.errors.note_to_customer}
              >
                <FormLabel fontWeight={"bold"}>Note:</FormLabel>
                <Textarea
                  placeholder="Write note to customer"
                  bgColor={"white"}
                  overflowY={"scroll"}
                  name="note_to_customer"
                  maxWidth={"400px"}
                  value={formik.values.note_to_customer}
                  onChange={formChangeHandler}
                  height={"90px"}
                />
                <FormErrorMessage>
                  {formik.errors.note_to_customer}
                </FormErrorMessage>
              </FormControl>
            ) : null}
          </ModalBody>

          <ModalFooter display={"contents"}>
            <Button
              onClick={closeChangeStatusModal}
              mx={"30px"}
              mt={"10px"}
              borderRadius={"15px"}
              bgColor={"#E07A5F"}
              color={"white"}
              _hover={{
                bgColor: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={formik.handleSubmit}
              mx={"30px"}
              mt={"10px"}
              mb={"40px"}
              borderRadius={"15px"}
              bgColor={"#81B29A"}
              _hover={{
                bgColor: "green.500",
              }}
              isDisabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminTransactionDetail;
