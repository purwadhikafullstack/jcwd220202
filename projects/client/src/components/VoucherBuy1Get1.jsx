import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Select from "react-select";
import { DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import buy1Get1Story from "../assets/buy1get1.png";
import { axiosInstance } from "../api";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const VoucherBuy1Get1 = () => {
  const [activeProduct, setActiveProduct] = useState([]);
  const [appliedProduct, setAppliedProduct] = useState([]);

  const toast = useToast();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/admin-product/active");

      setActiveProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProduct = activeProduct.map((val) => {
    return {
      value: val.id,
      label: val.product_name,
    };
  });

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "grey",
        paddingLeft: "10px",
      };
    },
  };

  const appliedProductId = appliedProduct.map((val) => {
    return {
      ProductId: val.value,
    };
  });

  const formik = useFormik({
    initialValues: {
      voucher_name: "",
      products: null,
      minimum_payment: "",
      voucher_start_date: null,
      voucher_end_date: null,
      quantity: "",
    },
    onSubmit: async ({
      voucher_name,
      products,
      minimum_payment,
      voucher_start_date,
      voucher_end_date,
      quantity,
    }) => {
      try {
        const response = await axiosInstance.post("/admin-voucher/buy1-get1", {
          voucher_name: voucher_name,
          products: appliedProductId,
          minimum_payment: minimum_payment,
          voucher_start_date: voucher_start_date,
          voucher_end_date: voucher_end_date,
          quantity: quantity,
        });

        formik.setFieldValue("voucher_name", "");
        formik.setFieldValue("products", null);
        formik.setFieldValue("minimum_payment", "");
        formik.setFieldValue("voucher_start_date", null);
        formik.setFieldValue("voucher_end_date", null);
        formik.setFieldValue("quantity", "");

        toast({
          title: "voucher created",
          description: response.data.message,
          status: "success",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "voucher not created",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      voucher_name: Yup.string()
        .required("voucher name is a required field")
        .min(1, "must be at least 1 characters")
        .max(25, "must be at most 20 characters"),
      products: Yup.mixed()
        .nullable()
        .required("applied product is a required field"),
      voucher_start_date: Yup.mixed().required(
        "voucher start date is a required field"
      ),
      voucher_end_date: Yup.mixed().required(
        "voucher end date is a required field"
      ),
      minimum_payment: Yup.number()
        .min(0, "minimum payment must be at least 0")
        .required("at least put 0 if discount doesnt exist"),
      quantity: Yup.number()
        .min(1, "quantity must be at least 0")
        .required("at least put 0 if discount doesnt exist"),
    }),
    validateOnChange: false,
  });

  console.log(formik.values);

  const quantityHandler = (value) => {
    formik.setFieldValue("quantity", value);
  };

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Box
      display={"grid"}
      pt={"30px"}
      backgroundColor={"#F4F1DE"}
      height={"1100px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <VStack spacing={4} align="stretch" mt={"90px"}>
        <Box
          ml={"30px"}
          bgColor={"#81B29A"}
          h={"40px"}
          width={"50%"}
          textAlign={"center"}
          border={"1px solid"}
          borderRadius={"5px"}
          borderTopRightRadius={"15px"}
          fontWeight={"bold"}
          color={"white"}
        >
          <Text mt={"8px"}>Buy 1 Get 1</Text>
        </Box>
        <Image
          src={buy1Get1Story}
          alt="search"
          objectFit={"contain"}
          height={"200px"}
          // maxW={"300px"}
        />
        <Box h="auto" px={"30px"}>
          <FormControl mt={"5px"} isInvalid={formik.errors.voucher_name}>
            <FormLabel fontWeight={"bold"} display={"flex"}>
              Voucher Name:
            </FormLabel>
            <Input
              type="text"
              placeholder="Enter voucher name"
              _placeholder={{ color: "black.500" }}
              name="voucher_name"
              bgColor={"white"}
              value={formik.values.voucher_name}
              onChange={formChangeHandler}
            />
            <FormErrorMessage>{formik.errors.voucher_name}</FormErrorMessage>
          </FormControl>
          <FormControl mt={"5px"} isInvalid={formik.errors.products}>
            <FormLabel fontWeight={"bold"}>Applied Product:</FormLabel>
            <Select
              value={
                formik.values.products === null
                  ? renderProduct.find(
                      ({ value }) => value === activeProduct.product_name
                    ) || null
                  : formik.values.products || null
              }
              options={renderProduct}
              styles={colourStyles}
              name="products"
              isMulti
              onChange={(event) => {
                formik.setFieldValue("products", event);

                setAppliedProduct(event);
              }}
              placeholder={"Select Product"}
            />
            <FormErrorMessage>{formik.errors.products}</FormErrorMessage>
          </FormControl>
          <FormControl mt={"5px"} isInvalid={formik.errors.minimum_payment}>
            <FormLabel fontWeight={"bold"}>Minimum Payment:</FormLabel>
            <InputGroup mt={"8px"}>
              <InputLeftAddon
                backgroundColor={"#81B29A"}
                color={"white"}
                width={"52px"}
              >
                Rp.
              </InputLeftAddon>
              <Input
                type="number"
                placeholder="Enter Minimum Payment"
                _placeholder={{ color: "black.500" }}
                name="minimum_payment"
                bgColor={"white"}
                value={formik.values.minimum_payment}
                onChange={formChangeHandler}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.minimum_payment}</FormErrorMessage>
          </FormControl>
          <Box mt={"5px"} fontWeight={"bold"}>
            <Text>Valid Until:</Text>
          </Box>
          <Box display={"flex"} columnGap={2}>
            <FormControl
              mt={"5px"}
              isInvalid={formik.errors.voucher_start_date}
            >
              <DatePicker
                name="voucher_start_date"
                style={{
                  fontFamily: "roboto",
                  width: "100%",
                  borderRadius: "5px",
                }}
                placement="bottomLeft"
                placeholder="Start Date"
                size="large"
                popupStyle={{
                  size: "small",
                  fontSize: "14px",
                  position: "revert",
                  width: "280px",
                }}
                onChange={(value) => {
                  let newStartDate = moment(new Date(value)).format(
                    "YYYY-MM-DD"
                  );

                  if (newStartDate === "1970-01-01") {
                    newStartDate = "";
                  }

                  formik.setFieldValue("voucher_start_date", newStartDate);
                }}
                allowClear={true}
              />
              <FormErrorMessage>
                {formik.errors.voucher_start_date}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={"5px"} isInvalid={formik.errors.voucher_end_date}>
              <DatePicker
                name="voucher_end_date"
                style={{
                  fontFamily: "roboto",
                  width: "100%",
                  borderRadius: "5px",
                }}
                placement="bottomRight"
                placeholder="End Date"
                size="large"
                popupStyle={{
                  size: "small",
                  fontSize: "14px",
                  position: "revert",
                  width: "280px",
                }}
                onChange={(value) => {
                  let newEndDate = moment(new Date(value)).format("YYYY-MM-DD");

                  if (newEndDate === "1970-01-01") {
                    newEndDate = "";
                  }

                  formik.setFieldValue("voucher_end_date", newEndDate);
                }}
                allowClear={true}
              />
              <FormErrorMessage>
                {formik.errors.voucher_end_date}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <FormControl
            mt={"5px"}
            borderRadius={"5px"}
            isInvalid={formik.errors.quantity}
          >
            <FormLabel fontWeight={"bold"} display={"flex"}>
              <Text>Quantity:</Text>
              <Text
                marginLeft={"10px"}
                fontStyle={"italic"}
                color={"#E07A5F"}
                fontSize={"14px"}
                mt={"2px"}
              >
                - Qty applies to each product
              </Text>
            </FormLabel>
            <NumberInput
              min={0}
              bgColor={"white"}
              mt={"8px"}
              borderRadius={"5px"}
              name="quantity"
              value={formik.values.quantity}
              onChange={quantityHandler}
            >
              <NumberInputField placeholder="Enter voucher quantity" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            bgColor={"#81B29A"}
            borderRadius={"15px"}
            _hover={{
              bgColor: "#81B29A",
            }}
            color={"white"}
            width={"100%"}
            marginX={"30px"}
            mt={"10px"}
            onClick={formik.handleSubmit}
          >
            Add Voucher
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default VoucherBuy1Get1;
