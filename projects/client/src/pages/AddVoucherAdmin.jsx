import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

import uploadProduct from "../assets/product_upload.png";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import VoucherBar from "../components/VocuherBar";
import { useLocation } from "react-router-dom";
import VoucherDiscount from "../components/VoucherDiscount";
import VoucherFreeShipment from "../components/VocuherFreeShipment";
import VoucherBuy1Get1 from "../components/VoucherBuy1Get1";

const AddVoucherAdmin = () => {
  const location = useLocation();

  const showVoucherForm = () => {
    if (location.pathname === "/admin/voucher/discount-voucher") {
      return <VoucherDiscount />;
    }
    if (location.pathname === "/admin/voucher/buy1-get1") {
      return <VoucherBuy1Get1 />;
    }
    if (location.pathname === "/admin/voucher/free-shipment") {
      return <VoucherFreeShipment />;
    }
  };

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"1050px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <VoucherBar />
      </Box>
      {showVoucherForm()}
    </Box>
  );
};

export default AddVoucherAdmin;
