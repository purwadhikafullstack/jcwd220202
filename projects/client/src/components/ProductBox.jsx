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
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { axiosInstance } from "../api"

const ProductBox = ({
  id,
  product_name,
  product_price,
  distance,
  product_description,
  product_image,
}) => {
  return (
    <>
      {/* ganti link ke product detail */}
      <Link to={`/product/${id}`}>
        <Card maxW="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{id}</Heading>

              <Heading size="md">{product_name}</Heading>

              <Text color="blue.600" fontSize="2xl">
                {product_price.toLocaleString("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                })}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  )
}

export default ProductBox
