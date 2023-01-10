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
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";

const ProductBox = ({
  id,
  product_name,
  product_price,
  distance,
  product_description,
  product_image,
}) => {
  const authSelector = useSelector((state) => state.auth);

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
  return (
    <>
      {/* ganti link ke product detail */}
      {authSelector.is_verifed === true ? (
        <Link to={`/product/${id}`}>
          <Card maxW="sm">
            <CardBody>
              <Image
                src={product_image}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{id}</Heading>

                <Heading size="md">{product_name}</Heading>

                <Text color="blue.600" fontSize="2xl">
                  {formatRupiah(product_price)}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Link>
      ) : (
        <Card maxW="sm" onClick={openAlert}>
          <CardBody>
            <Image
              src={product_image}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{id}</Heading>

              <Heading size="md">{product_name}</Heading>

              <Text color="blue.600" fontSize="2xl">
                {formatRupiah(product_price)}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      )}
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
