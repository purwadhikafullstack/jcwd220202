import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api";

const ProductBox = ({
  id,
  product_name,
  product_price,
  product_image,
  discountPriceFromBranch,
  priceProduct,
  discount_amount_nominal,
  discount_amount_percentage,
}) => {
  const authSelector = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openAlert = () => {
    onOpen();

    document.body.style.overflow = "hidden";
  };

  const closeAlert = () => {
    onClose();

    document.body.style.overflow = "unset";
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const priceHandler = () => {
    priceProduct();
  };

  // const discountPriceFromBranch = (val) => {
  //   return (
  //     <>
  // <Text fontWeight={"bold"} textDecorationLine={"line-through"}>
  //   {"Rp 9999"}
  // </Text>
  // <Text color="blue.600" fontSize="2xl">
  //   {formatRupiah(val.product_price)}
  // </Text>
  //     </>
  //   );
  // };

  const toProductDetail = () => {
    if (authSelector.is_verified === true) {
      if (discount_amount_nominal === 0 && discount_amount_percentage === 0) {
        return (
          <Card maxW="sm" onClick={() => navigate(`/product/${id}`)}>
            <CardBody>
              <Image src={product_image} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                {/* <Heading size="md">{id}</Heading> */}

                <Heading fontSize="20px">{product_name}</Heading>
                <Box>
                  {/* <Text fontWeight={"bold"} textDecorationLine={"line-through"}>
                    {"Rp 9999"}
                  </Text> */}
                  <Text color="#E07A5F" fontSize="20px">
                    {formatRupiah(product_price)}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      }
      if (discount_amount_nominal !== 0) {
        const total = product_price - discount_amount_nominal;
        return (
          <Card maxW="sm" onClick={() => navigate(`/product/${id}`)}>
            <CardBody>
              <Image src={product_image} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                {/* <Heading size="md">{id}</Heading> */}

                <Heading fontSize="20px">{product_name}</Heading>
                <Box>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"line-through"}
                    fontSize="20px"
                  >
                    {formatRupiah(product_price)}
                  </Text>
                  <Text color="#E07A5F" fontSize="20px">
                    {formatRupiah(total)}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      }
      if (discount_amount_percentage !== 0) {
        const total = product_price * (1 - discount_amount_percentage / 100);
        return (
          <Card maxW="sm" onClick={() => navigate(`/product/${id}`)}>
            <CardBody>
              <Image src={product_image} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                {/* <Heading size="md">{id}</Heading> */}

                <Heading fontSize="20px">{product_name}</Heading>
                <Box>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"line-through"}
                    fontSize="20px"
                  >
                    {formatRupiah(product_price)}
                  </Text>
                  <Text color="#E07A5F" fontSize="20px">
                    {formatRupiah(total)}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      }
    }

    if (authSelector.is_verified !== true) {
      return (
        <Card maxW="sm" onClick={openAlert}>
          <CardBody>
            <Image src={product_image} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              {/* <Heading size="md">{id}</Heading> */}

              <Heading fontSize="20px">{product_name}</Heading>

              <Text color="#E07A5F" fontSize="20px">
                {formatRupiah(product_price)}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      );
    }
  };

  return (
    <>
      {toProductDetail()}

      {/* alert for verification */}
      <AlertDialog isOpen={isOpen} onClose={closeAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"35vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Verify Your Account
            </AlertDialogHeader>

            <AlertDialogBody>
              You haven't verify your email yet, please verifiy your email by
              going to profile page and clicking the verify account button.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={closeAlert}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductBox;
