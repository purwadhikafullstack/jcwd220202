import {
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
    </>
  );
};

export default ProductBox;
